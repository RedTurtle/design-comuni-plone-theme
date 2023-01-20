/*
DEV NOTES!
This component makes use of new plone.restapi magic trick regarding
uncontrolled and unmanaged widgetProps passed as a dict to directives.
Anything can be serialized into field schema now. ANYTHING!
It's awfully untidy, but oh well, let's use it to make a shiny toy.
Configure widget in backend along these lines to use this component:
  directives.widget(
    "timeline_tempi_scadenze",
    DataGridFieldFactory,
    frontendOptions={
        "widget": "data_grid",
        "widgetProps": {
            "milestone": {
                "order": 0,
                "width": "full",
                "pre_label": None,
                'wrapped': True,
            },
            "milestone_description": {
                "order": 1,
                "width": "full",
                "pre_label": None,
                'wrapped': True,
            },
            "data_scadenza": {
                "order": 2,
                "width": "full",
                "pre_label": "Bla bla cose",
                'wrapped': True,
            },
            "interval_qt": {
                "order": 3,
                "width": "half",
                "pre_label": "Intervallo",
                'wrapped': False,
            },
            "interval_type": {
                "order": 3,
                "width": "half",
                "pre_label": None,
                'wrapped': False,
            },
        }
    },
  )
I'm gonna add some strict proptypes for my own sanity.
For backend developer sanity, put these configs in some utils file,
and document for fellow backend devs.
*/
import React, { useState, useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { FormFieldWrapper, Icon } from '@plone/volto/components';
import { Grid, Button } from 'semantic-ui-react';
import FieldFormModal from './FieldFormModal';
import PropTypes from 'prop-types';
import { injectLazyLibs } from '@plone/volto/helpers/Loadable/Loadable';
import editingSVG from '@plone/volto/icons/editing.svg';
import dragSVG from '@plone/volto/icons/drag.svg';

const defaultSchema = {
  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [],
    },
  ],
  properties: {},
  required: [],
};

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 4;

const getItemStyle = (isDragging, draggableStyle) => {
  return {
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    cursor: isDragging ? 'grab !important' : 'auto',
    alignItems: 'center',
    display: 'flex',
    borderRadius: '4px',
    // change background colour if dragging
    background: isDragging ? 'var(--bs-primary)' : 'var(--bs-white)',
    color: isDragging ? 'var(--bs-white)' : 'inherit',
    border: '1px solid #517776',

    // styles we need to apply on draggables
    ...draggableStyle,
  };
};

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'var(--bs-info)' : 'transparent',
  padding: grid * 2,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  width: '100%',
});

const TimelineAddableDatagridWidget = (props) => {
  const intl = useIntl();

  const {
    value,
    id,
    onChange,
    items = defaultSchema,
    widgetOptions,
    reactBeautifulDnd,
  } = props; //, required, title, description
  const schema = items;
  const [values, setValues] = useState([]);
  const [isNewTerm, setIsNewTerm] = useState(false);
  const [fieldFormModalOpen, setFieldFormModalOpen] = useState({});
  const additionalProps = widgetOptions?.frontendOptions?.widgetProps;
  const { DragDropContext, Droppable, Draggable } = reactBeautifulDnd;

  useEffect(() => {
    setValues(value?.length > 0 ? value : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, value?.length]);

  const handleChangeConfiguration = (v) => {
    onChange(id, v);
    setIsNewTerm(false);
  };

  const openEditModal = (index) => {
    setFieldFormModalOpen({ [index]: true });
  };

  const closeEditModal = () => {
    isNewTerm && setIsNewTerm(false);
    setFieldFormModalOpen({});
  };

  const onChangeTerm = (value, index) => {
    let newValues = [...values];
    if (index < newValues?.length) newValues[index] = value;
    else newValues = [...newValues, value];

    handleChangeConfiguration(newValues);
  };

  const addTerm = () => {
    setIsNewTerm(true);
  };

  const deleteTerm = (index) => {
    let newValues = [...values];
    newValues.splice(index, 1);

    handleChangeConfiguration(newValues);
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const items = reorder(
      values,
      result.source.index,
      result.destination.index,
    );
    handleChangeConfiguration(items);
    setValues(items);
  };

  useEffect(() => {
    if (isNewTerm) setFieldFormModalOpen({ [values?.length]: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isNewTerm]);

  return (
    <FormFieldWrapper {...props}>
      <div className="data-grid-widget timeline-addable-data-grid-widget">
        {schema && additionalProps && (
          <Grid verticalAlign="middle" stackable columns="equal">
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable" style={{ width: '100%' }}>
                {(provided, snapshot) => {
                  return (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)}
                    >
                      {values?.map((term, index) => {
                        const draggableId =
                          schema?.required?.length > 0
                            ? term?.[schema.required[0]] + index
                            : JSON.stringify(term) + index;

                        return (
                          <Draggable
                            key={draggableId}
                            draggableId={draggableId}
                            index={index}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                    snapshot.isDragging,
                                    provided.draggableProps.style,
                                  )}
                                >
                                  <Grid.Row
                                    key={'row_' + draggableId}
                                    className={
                                      'timeline-draggable-datagrid-field'
                                    }
                                  >
                                    <Grid.Column
                                      width={1}
                                      className="term-actions drag"
                                    >
                                      <Icon name={dragSVG} size="18px" />
                                    </Grid.Column>
                                    <Grid.Column
                                      className="timeline-addable-datagrid-field-item"
                                      width={9}
                                    >
                                      <div className="timeline-addable-datagrid-field-item-title">
                                        {term.milestone}
                                      </div>
                                    </Grid.Column>
                                    <FieldFormModal
                                      open={
                                        !isNewTerm
                                          ? !!fieldFormModalOpen?.[index]
                                          : !!fieldFormModalOpen?.[
                                              values?.length
                                            ]
                                      }
                                      openModal={openEditModal}
                                      setNewTerm={setIsNewTerm}
                                      closeModal={closeEditModal}
                                      fieldValue={term}
                                      index={isNewTerm ? values?.length : index}
                                      isNewTerm={isNewTerm}
                                      schema={schema}
                                      key={'field-form_' + draggableId}
                                      additionalWidgetProps={additionalProps}
                                      saveChange={onChangeTerm}
                                      trigger={
                                        <Grid.Column
                                          width={1}
                                          className="term-actions"
                                        >
                                          <Button
                                            className="timeline-addable-datagrid-field edit"
                                            title={`${intl.formatMessage(
                                              messages.editTerm,
                                            )}: ${term.milestone}`}
                                            key={index}
                                            size={'small'}
                                            primary
                                          >
                                            <Icon
                                              name={editingSVG}
                                              size="18px"
                                              title={`${intl.formatMessage(
                                                messages.editTerm,
                                              )}: ${term.milestone}`}
                                            />
                                          </Button>
                                        </Grid.Column>
                                      }
                                    />

                                    <Grid.Column
                                      width={1}
                                      className="term-actions"
                                    >
                                      <Button
                                        icon="trash"
                                        negative
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          deleteTerm(index);
                                        }}
                                        className="delete-term"
                                        title={intl.formatMessage(
                                          messages.deleteTerm,
                                        )}
                                        size="small"
                                      />
                                    </Grid.Column>
                                  </Grid.Row>
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}

                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DragDropContext>
            <Grid.Row className="bottom-buttons">
              <Grid.Column textAlign="center">
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addTerm();
                  }}
                  primary
                  size="mini"
                >
                  {intl.formatMessage(messages.addTerm)}
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        )}
      </div>
    </FormFieldWrapper>
  );
};

export default injectLazyLibs('reactBeautifulDnd')(
  TimelineAddableDatagridWidget,
);

const messages = defineMessages({
  addTerm: {
    id: 'data_grid_widget_add_term',
    defaultMessage: 'Add term',
  },
  deleteTerm: {
    id: 'data_grid_widget_remove_term',
    defaultMessage: 'Remove term',
  },
  editTerm: {
    id: 'data_grid_widget_edit_term',
    defaultMessage: 'Edit term',
  },
});

TimelineAddableDatagridWidget.propTypes = {
  value: PropTypes.arrayOf(PropTypes.object).isRequired,
  id: PropTypes.string.isRequired,
  items: PropTypes.shape({
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
  onChange: PropTypes.func.isRequired,
  reactBeautifulDnd: PropTypes.object.isRequired,
  widgetOptions: PropTypes.shape({
    frontendOptions: PropTypes.shape({
      widget: PropTypes.string.isRequired,
      widgetProps: PropTypes.objectOf(
        PropTypes.shape({
          order: PropTypes.number.isRequired,
          width: PropTypes.string,
          pre_label: PropTypes.string,
          wrapped: PropTypes.bool.isRequired,
          rest: PropTypes.object,
        }).isRequired,
      ),
    }),
  }),
};
