import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Portal } from 'react-portal';
import { v4 as uuid } from 'uuid';
import { isEmpty } from 'lodash';
import { Form as UIForm } from 'semantic-ui-react';

import { FormFieldWrapper, Form, Sidebar } from '@plone/volto/components';
import { setBlockWidgetSelected } from 'volto-blocks-widget/actions';
import config from '@plone/volto/registry';
import { useLocation } from 'react-router-dom';

import 'volto-blocks-widget/widget/blocks_widget.css';

const BlocksWidget = (props) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { value = {}, id, onChange, focus } = props;
  const currentFieldSelected = useSelector(
    (state) => state.blocksWidgetSelected?.value,
  );
  const widgetRef = useRef();
  //const intl = useIntl();
  const defaultBlockId = uuid();
  if (!value.blocks_layout || isEmpty(value.blocks_layout.items)) {
    value.blocks_layout = {
      items: [defaultBlockId],
    };
  }
  if (!value.blocks || isEmpty(value.blocks)) {
    value.blocks = {
      [defaultBlockId]: {
        '@type': config.settings.defaultBlockType,
      },
    };
  }

  const onChangeBlocks = (data) => {
    onChange(id, {
      blocks: data.blocks,
      blocks_layout: data.blocks_layout,
    });
  };

  const onFocusWidget = () => {
    if (currentFieldSelected !== id && focus) {
      dispatch(setBlockWidgetSelected(id));
    }
  };

  const onBlurWidget = () => {
    props.onBlur(id, value);
  };

  useEffect(() => {
    if (widgetRef) {
      const currentWidget = widgetRef.current;
      currentWidget.addEventListener('click', onFocusWidget);

      return () => {
        currentWidget.removeEventListener('click', onFocusWidget);
      };
    }
  }, [widgetRef]);

  return (
    <>
      <div className="blocks-widget" ref={widgetRef} onBlur={onBlurWidget}>
        <UIForm.Field inline id={id}>
          <FormFieldWrapper {...props}>
            <div className="blocks-widget-container">
              <Form
                key={id}
                formData={value}
                visual={true}
                hideActions
                onChangeFormData={onChangeBlocks}
                allowedBlocks={
                  config.settings['volto-blocks-widget']?.allowedBlocks
                }
                showRestricted={
                  config.settings['volto-blocks-widget']?.showRestricted
                }
                isFormSelected={currentFieldSelected === id}
                pathname={location.pathname}
              />
            </div>
          </FormFieldWrapper>
        </UIForm.Field>
      </div>

      <Portal node={document.getElementById('sidebar')}>
        {currentFieldSelected === id && <Sidebar />}
      </Portal>
    </>
  );
};

export default BlocksWidget;
