/*
DEV NOTES!
My parent has some info regarding me, I may seem complete rubbish
but blame plone6/plone.restapi for enabling me to exist.
*/
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { orderBy } from 'lodash';
import { Button, Form, Header, Modal, Grid } from 'semantic-ui-react';
import { defineMessages, injectIntl } from 'react-intl';
import { Field, Icon } from '@plone/volto/components';
import cx from 'classnames';
import clearSVG from '@plone/volto/icons/clear.svg';
import saveSVG from '@plone/volto/icons/save.svg';

const FieldFormModal = ({
  open,
  fieldValue,
  openModal,
  closeModal,
  saveChange,
  additionalWidgetProps,
  index,
  trigger,
  schema,
  intl,
  isNewTerm,
}) => {
  const defaultItem = useMemo(
    () =>
      Object.keys(schema.properties).reduce((acc, curr) => {
        return {
          ...acc,
          [curr]: null,
        };
      }, {}),
    [schema.properties],
  );

  const [internalValue, setInternalValue] = useState({});

  const updateValue = (key, value) => {
    setInternalValue({ ...internalValue, [key]: value });
  };

  useEffect(() => {
    if (isNewTerm) setInternalValue(defaultItem);
    else setInternalValue(fieldValue);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewTerm, fieldValue]);

  const formSchemasAndValues = useMemo(
    () =>
      orderBy(
        Object.keys(additionalWidgetProps)?.reduce((acc, curr) => {
          if (curr in internalValue) {
            return [
              ...acc,
              {
                ...additionalWidgetProps[curr],
                value: internalValue[curr],
                fieldName: curr,
              },
            ];
          }
          return acc;
        }, []),
        ['order'],
        ['asc'],
      ),
    [internalValue, additionalWidgetProps],
  );

  return (
    <Modal
      open={open}
      className={'timeline-addable-data-grid-widget-modal'}
      centered
      closeIcon
      trigger={trigger}
      onClose={(e) => {
        e.preventDefault();
        closeModal();
      }}
      onOpen={(e) => {
        e.preventDefault();
        openModal(index);
      }}
    >
      <Header>
        {isNewTerm
          ? intl.formatMessage(messages.addHeader)
          : intl.formatMessage(messages.editHeader)}
      </Header>
      <Modal.Content scrolling>
        <Modal.Description>
          <Form className="data-grid-widget timeline-addable-data-grid-widget">
            <Grid verticalAlign="middle" stackable columns="equal">
              {formSchemasAndValues?.map((field, index) => (
                <Fragment key={index}>
                  {field?.pre_label && (
                    <div className="field-pre-label">
                      <span className={cx('', { unwrapped: !field?.wrapped })}>
                        {field?.pre_label}
                      </span>
                    </div>
                  )}
                  <Grid.Row
                    key={field?.fieldName + index}
                    className={cx(field?.width, { unwrapped: !field?.wrapped })}
                  >
                    <Grid.Column
                      className="field-column"
                      key={field?.fieldName}
                    >
                      <Field
                        {...schema.properties[field?.fieldName]}
                        wrapped={field?.wrapped ?? true}
                        fieldSet={field?.fieldName}
                        value={field?.value}
                        required={schema.required.includes(field?.fieldName)}
                        placeholder={schema.properties[field?.fieldName].title}
                        key={field?.fieldName + index}
                        id={field?.fieldName}
                        onChange={(id, value) => updateValue(id, value)}
                        focus={index === 0}
                      />
                      {!field?.wrapped && (
                        <p className="help">
                          {schema.properties[field?.fieldName].description}
                        </p>
                      )}
                    </Grid.Column>
                  </Grid.Row>
                </Fragment>
              ))}
            </Grid>
          </Form>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button
          basic
          circular
          primary
          floated="right"
          icon={
            <Icon name={saveSVG} className="contents circled" size="30px" />
          }
          aria-label={intl.formatMessage(messages.save)}
          title={intl.formatMessage(messages.save)}
          size="big"
          onClick={(e) => {
            e.preventDefault();
            saveChange(internalValue, index);
            closeModal();
          }}
        />

        <Button
          basic
          circular
          secondary
          icon={<Icon name={clearSVG} className="circled" size="30px" />}
          aria-label={intl.formatMessage(messages.cancel)}
          title={intl.formatMessage(messages.cancel)}
          floated="right"
          size="big"
          onClick={(e) => {
            e.preventDefault();
            closeModal();
          }}
        />
      </Modal.Actions>
    </Modal>
  );
};

export default injectIntl(FieldFormModal);

const messages = defineMessages({
  save: {
    id: 'addable_data_grid_widget_add_save',
    defaultMessage: 'Salva',
  },
  cancel: {
    id: 'addable_data_grid_widget_add_cancel',
    defaultMessage: 'Annulla',
  },
  editHeader: {
    id: 'addable_data_grid_widget_add_edit_header',
    defaultMessage: 'Modifica valore',
  },
  addHeader: {
    id: 'addable_data_grid_widget_add_add_header',
    defaultMessage: 'Aggiungi valore',
  },
});

FieldFormModal.propTypes = {
  open: PropTypes.bool.isRequired,
  fieldValue: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  isNewTerm: PropTypes.bool.isRequired,
  trigger: PropTypes.element.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  saveChange: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  schema: PropTypes.shape({
    fieldsets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        fields: PropTypes.array.isRequired,
      }).isRequired,
    ).isRequired,
    properties: PropTypes.object.isRequired,
    required: PropTypes.array.isRequired,
  }).isRequired,
  additionalWidgetProps: PropTypes.objectOf(
    PropTypes.shape({
      order: PropTypes.number.isRequired,
      width: PropTypes.string,
      pre_label: PropTypes.string,
      wrapped: PropTypes.bool.isRequired,
      rest: PropTypes.object,
    }).isRequired,
  ).isRequired,
};
