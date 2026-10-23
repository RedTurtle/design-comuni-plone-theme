/**
 * Edit Alert block.
 * @module components/manage/Blocks/Image/Edit
 */

import React, { useEffect } from 'react';

import cx from 'classnames';
import { Container, Row, Col } from 'design-react-kit';

import { SidebarPortal } from '@plone/volto/components';
import { defineMessages, useIntl } from 'react-intl';
import { useHandleDetachedBlockFocus } from 'design-comuni-plone-theme/helpers/blocks';
import {
  AlertSidebar,
  TextEditorWidget,
} from 'design-comuni-plone-theme/components/ItaliaTheme';
import BlockImage, {
  hasBlockImage,
  ALERT_IMAGE_SIZES,
} from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Common/BlockImage';

const messages = defineMessages({
  content_placeholder: {
    id: 'Type text…',
    defaultMessage: 'Digita il testo…',
  },
});

const Edit = (props) => {
  const { data, onChangeBlock, block, selected } = props;
  const intl = useIntl();
  const { selectedField, setSelectedField } = useHandleDetachedBlockFocus(
    props,
    'text',
  );

  useEffect(() => {
    if (!data.bg_color) {
      onChangeBlock(block, {
        ...data,
        bg_color: data.color ?? 'warning',
      });
    }
  }, [data, onChangeBlock, block]);

  return __SERVER__ ? (
    <div />
  ) : (
    <div className="public-ui" tabIndex="-1">
      <div
        className={cx('alertblock', {
          selected: selected,
        })}
      >
        <Row className={cx('full-width p-5', 'bg-alert-' + data.bg_color)}>
          <Container className="ui">
            <Row className="align-items-start">
              {hasBlockImage(data.image) && (
                <Col sm={2} className="pb-3 image-col">
                  <BlockImage
                    image={data.image}
                    alt=""
                    className={cx('left-image', [
                      data.sizeImage ? 'size-' + data.sizeImage : 'size-l',
                    ])}
                    loading="lazy"
                    sizes={ALERT_IMAGE_SIZES}
                  />
                </Col>
              )}
              <Col>
                <TextEditorWidget
                  {...props}
                  data={data}
                  fieldName="text"
                  selected={selected && selectedField === 'text'}
                  setSelected={setSelectedField}
                  placeholder={intl.formatMessage(messages.content_placeholder)}
                  showToolbar={true}
                />
              </Col>
            </Row>
          </Container>
        </Row>
      </div>
      <SidebarPortal selected={selected}>
        <AlertSidebar {...props} />
      </SidebarPortal>
    </div>
  );
};

export default Edit;
