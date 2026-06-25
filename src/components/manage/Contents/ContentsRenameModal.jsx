/*CUSTOMIZATION
- added message for MAX_AFFECTED_LIMIT (`limit` prop)
*/
import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { concat, merge, map } from 'lodash';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';

import { usePrevious } from '@plone/volto/helpers';
import { updateContent } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components';
import { Message } from 'semantic-ui-react';

const messages = defineMessages({
  renameItems: {
    id: 'Rename items',
    defaultMessage: 'Rename items',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  shortName: {
    id: 'Short name',
    defaultMessage: 'Short name',
  },
  shortNameDescription: {
    id: 'This name will be displayed in the URL.',
    defaultMessage: 'This name will be displayed in the URL.',
  },
  loadingMessage: {
    id: 'Rename Items Loading Message',
    defaultMessage: 'Renaming items...',
  },
});

const ContentsRenameModal = (props) => {
  const { onOk, open, items, onCancel, limit } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const request = useSelector((state) => state.content.update);
  const prevrequestloading = usePrevious(request.loading);

  const affectedItems = useSelector(
    (state) => state.search?.subrequests?.affected_items?.total ?? 0,
  );

  useEffect(() => {
    if (prevrequestloading && request.loaded) {
      onOk();
    }
  }, [onOk, prevrequestloading, request.loaded]);

  const onSubmit = useCallback(
    (data) => {
      dispatch(
        updateContent(
          map(items, (item) => item.url),
          map(items, (item, index) => ({
            id: data[`${index}_id`],
            title: data[`${index}_title`],
          })),
        ),
      );
    },
    [items, dispatch],
  );

  return (
    open && (
      <ModalForm
        open={open}
        loading={request.loading}
        loadingMessage={intl.formatMessage(messages.loadingMessage)}
        onSubmit={onSubmit}
        onCancel={onCancel}
        formData={merge(
          ...map(items, (item, index) => ({
            [`${index}_title`]: item.title,
            [`${index}_id`]: item.id,
          })),
        )}
        title={
          <>
            {intl.formatMessage(messages.renameItems)}{' '}
            {affectedItems > limit ? (
              <Message warning style={{ fontSize: '1rem', marginTop: '1rem' }}>
                <FormattedMessage
                  id="You are renaming more then {limit} items. It's recommended to contact administrators to do this operation."
                  defaultMessage="You are renaming more then {limit} items. It's recommended to contact administrators to do this operation."
                  values={{ limit }}
                />
              </Message>
            ) : null}
          </>
        }
        schema={{
          fieldsets: [
            {
              id: 'default',
              title: intl.formatMessage(messages.default),
              fields: concat(
                ...map(items, (item, index) => [
                  `${index}_title`,
                  `${index}_id`,
                ]),
              ),
            },
          ],
          properties: merge(
            ...map(items, (item, index) => ({
              [`${index}_title`]: {
                title: intl.formatMessage(messages.title),
                type: 'string',
                description: '',
              },
              [`${index}_id`]: {
                title: intl.formatMessage(messages.shortName),
                type: 'id',
                description: intl.formatMessage(messages.shortNameDescription),
              },
            })),
          ),
          required: [],
        }}
      />
    )
  );
};

ContentsRenameModal.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  ).isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ContentsRenameModal;
