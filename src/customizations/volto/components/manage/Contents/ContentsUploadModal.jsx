/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Contents/ContentsUploadModal.jsx
 *
 * CUSTOMIZATIONS:
 * - added file upload restraint message as per agid regulations: when the
 *   destination path matches /servizi/.../modulistica/ and the folder does
 *   not have "File"/"Modulo" as an addable type, the upload dropzone is
 *   replaced by a "modulistica_restraint" warning message and uploads are
 *   blocked (see the showFileRestraint check in render())
 * - added getTypes action + connected `types` state (addable content types)
 *   and a componentDidMount call to getTypes(), needed to compute the
 *   showFileRestraint check above
 * - added an error toast when the upload request fails (e.g. an alias with
 *   the same id already exists in this location); the modal stays open so
 *   the user can remove or rename the conflicting file and retry
 */

/**
 * Contents upload modal.
 * @module components/manage/Contents/ContentsUploadModal
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  Button,
  Dimmer,
  Header,
  Icon,
  Loader,
  Modal,
  Table,
  Segment,
  TableCell,
} from 'semantic-ui-react';
import loadable from '@loadable/component';
import concat from 'lodash/concat';
import filter from 'lodash/filter';
import map from 'lodash/map';
import filesize from 'filesize';
import { readAsDataURL } from 'promise-file-reader';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import FormattedRelativeDate from '@plone/volto/components/theme/FormattedDate/FormattedRelativeDate';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { createContent, getTypes } from '@plone/volto/actions';
import { validateFileUploadSize } from '@plone/volto/helpers/FormValidation/FormValidation';
import { getBaseUrl } from '@plone/volto/helpers/Url/Url';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import Image from '@plone/volto/components/theme/Image/Image';

const Dropzone = loadable(() => import('react-dropzone'));

const messages = defineMessages({
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  upload: {
    id: '{count, plural, one {Upload {count} file} other {Upload {count} files}}',
    defaultMessage:
      '{count, plural, one {Upload {count} file} other {Upload {count} files}}',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  uploadError: {
    id: 'upload_error',
    defaultMessage: 'An error has occurred while uploading files.',
  },
});

const SUBREQUEST = 'batch-upload';

/**
 * ContentsUploadModal class.
 * @class ContentsUploadModal
 * @extends Component
 */
class ContentsUploadModal extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    createContent: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    request: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    open: PropTypes.bool.isRequired,
    onOk: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    getTypes: PropTypes.func,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs ContentsUploadModal
   */
  constructor(props) {
    super(props);
    this.onRemoveFile = this.onRemoveFile.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      files: [],
    };
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.request.loading && nextProps.request.loaded) {
      this.props.onOk();
      this.setState({
        files: [],
      });
    }
    if (this.props.request.loading && nextProps.request.error) {
      const msgBody =
        nextProps.request.error?.response?.body?.message ||
        this.props.intl.formatMessage(messages.uploadError);
      this.props.toastify.toast.error(
        <Toast
          error
          title={this.props.intl.formatMessage(messages.error)}
          content={msgBody}
        />,
      );
    }
  }

  /**
   * Remove file handler
   * @method onRemoveFile
   * @param {Object} event Event object
   * @returns {undefined}
   */
  onRemoveFile(event) {
    this.setState({
      files: filter(
        this.state.files,
        (file, index) =>
          index !== parseInt(event.target.getAttribute('value'), 10),
      ),
    });
  }

  /**
   * Drop handler
   * @method onDrop
   * @param {array} files File objects
   * @returns {undefined}
   */
  onDrop = async (files) => {
    const validFiles = [];
    for (let i = 0; i < files.length; i++) {
      if (validateFileUploadSize(files[i], this.props.intl.formatMessage)) {
        await readAsDataURL(files[i]).then((data) => {
          const fields = data.match(/^data:(.*);(.*),(.*)$/);
          files[i].preview = fields[0];
        });
        validFiles.push(files[i]);
      }
    }
    this.setState({
      files: concat(this.state.files, validFiles),
    });
  };

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.onCancel();
    this.setState({
      files: [],
    });
  }

  /**
   * Submit handler
   * @method onSubmit
   * @returns {undefined}
   */
  onSubmit() {
    Promise.all(map(this.state.files, (file) => readAsDataURL(file))).then(
      (files) => {
        this.props.createContent(
          this.props.pathname,
          map(this.state.files, (file, index) => {
            const fields = files[index].match(/^data:(.*);(.*),(.*)$/);
            const image = fields[1].split('/')[0] === 'image';
            return {
              '@type': image ? 'Image' : 'File',
              title: file.name,
              [image ? 'image' : 'file']: {
                data: fields[3],
                encoding: fields[2],
                'content-type': fields[1],
                filename: file.name,
              },
            };
          }),
          SUBREQUEST,
        );
      },
    );
  }

  componentDidMount() {
    this.props.getTypes(getBaseUrl(this.props.pathname));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    // as per agid guidelines, files cannot be uploaded in modulistica folder inside ct servizio
    // show restraint and hide upload button when page is called modulistica and when there's a restraint
    // this is enough to identify this only case bc even if another page is called 'modulistica', it will have 'File'
    // and "Modulo" as addable type
    const showFileRestraint =
      getBaseUrl(this.props.pathname).match(/\/servizi\/.*\/modulistica\/?$/) &&
      !this.props.types.some(
        (type) => type.id === 'File' || type.id === 'Modulo',
      );

    return (
      this.props.open && (
        <Modal open={this.props.open}>
          <Header>
            <FormattedMessage id="Upload files" defaultMessage="Upload files" />
          </Header>
          <Dimmer active={this.props.request.loading}>
            <Loader>
              <FormattedMessage
                id="Uploading files"
                defaultMessage="Uploading files"
              />
            </Loader>
          </Dimmer>
          <Modal.Content>
            <Dropzone
              onDrop={this.onDrop}
              className="dropzone"
              noDragEventsBubbling={true}
              multiple={true}
            >
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps({ className: 'dashed' })}>
                  <Segment>
                    <Table basic="very">
                      <Table.Body>
                        {showFileRestraint ? (
                          <Table.Row>
                            <TableCell>
                              <FormattedMessage
                                id="modulistica_restraint"
                                defaultMessage="As per the official information architecture outlined in measure 1.4.1, all forms must be properly uploaded in the designated section within Amministrazione > Documenti e Dati > Modulistica, and linked to the relevant service sheet. It is no longer possible to upload files and attachments directly into this container."
                              />
                            </TableCell>
                          </Table.Row>
                        ) : (
                          <Table.Row>
                            <Table.Cell>
                              <FormattedMessage
                                id="Drag and drop files from your computer onto this area or click the “Browse” button."
                                defaultMessage="Drag and drop files from your computer onto this area or click the “Browse” button."
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <Button className="ui button primary">
                                <FormattedMessage
                                  id="Browse"
                                  defaultMessage="Browse"
                                />
                              </Button>
                              <input
                                {...getInputProps({
                                  type: 'file',
                                  style: { display: 'none' },
                                })}
                              />
                            </Table.Cell>
                          </Table.Row>
                        )}
                      </Table.Body>
                    </Table>
                  </Segment>
                </div>
              )}
            </Dropzone>
            {this.state.files.length > 0 && (
              <Table compact singleLine>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={8}>
                      <FormattedMessage
                        id="Filename"
                        defaultMessage="Filename"
                      />
                    </Table.HeaderCell>
                    <Table.HeaderCell width={4}>
                      <FormattedMessage
                        id="Last modified"
                        defaultMessage="Last modified"
                      />
                    </Table.HeaderCell>
                    <Table.HeaderCell width={4}>
                      <FormattedMessage
                        id="File size"
                        defaultMessage="File size"
                      />
                    </Table.HeaderCell>
                    <Table.HeaderCell width={4}>
                      <FormattedMessage id="Preview" defaultMessage="Preview" />
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {map(this.state.files, (file, index) => (
                    <Table.Row className="upload-row" key={file.name}>
                      <Table.Cell>{file.name}</Table.Cell>
                      <Table.Cell>
                        {file.lastModifiedDate && (
                          <FormattedRelativeDate date={file.lastModifiedDate} />
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        {filesize(file.size, { round: 0 })}
                      </Table.Cell>
                      <Table.Cell>
                        {file.type.split('/')[0] === 'image' && (
                          <Image
                            src={file.preview}
                            height={60}
                            className="ui image"
                          />
                        )}
                      </Table.Cell>
                      <Table.Cell>
                        <Icon
                          name="close"
                          value={index}
                          link
                          onClick={this.onRemoveFile}
                        />
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            )}
          </Modal.Content>
          <Modal.Actions>
            {this.state.files.length > 0 && (
              <Button
                basic
                circular
                primary
                floated="right"
                icon="arrow right"
                aria-label={this.props.intl.formatMessage(messages.upload, {
                  count: this.state.files.length,
                })}
                onClick={this.onSubmit}
                title={this.props.intl.formatMessage(messages.upload, {
                  count: this.state.files.length,
                })}
                size="big"
              />
            )}
            <Button
              basic
              circular
              secondary
              icon="remove"
              aria-label={this.props.intl.formatMessage(messages.cancel)}
              title={this.props.intl.formatMessage(messages.cancel)}
              floated="right"
              size="big"
              onClick={this.onCancel}
            />
          </Modal.Actions>
        </Modal>
      )
    );
  }
}

export default compose(
  injectIntl,
  injectLazyLibs(['toastify']),
  connect(
    (state) => ({
      request: state.content.subrequests?.[SUBREQUEST] || {},
      types: filter(state.types.types, 'addable'),
    }),
    { createContent, getTypes },
  ),
)(ContentsUploadModal);
