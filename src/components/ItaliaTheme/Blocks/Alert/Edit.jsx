/**
 * Edit Alert block.
 * @module components/manage/Blocks/Image/Edit
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Container, Row, Col } from 'design-react-kit/dist/design-react-kit';

import { EditTextBlock } from '@plone/volto/components';
import AlertWrapper from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Alert/AlertWrapper.jsx';

import { SidebarPortal } from '@plone/volto/components';
import { AlertSidebar } from 'design-comuni-plone-theme/components/ItaliaTheme';

const Edit = (props) => {
  const {
    data,
    block,
    selected,
    index,
    onChangeBlock,
    onSelectBlock,
    onDeleteBlock,
    onFocusPreviousBlock,
    onFocusNextBlock,
    onAddBlock,
  } = props;

  useEffect(() => {
    if (!data.bg_color) {
      onChangeBlock(block, {
        ...data,
        bg_color: data.color ?? 'warning',
      });
    }
  }, [data, onChangeBlock, block]);

  return (
    <AlertWrapper data={data} {...props}>
      <div className="public-ui">
        <div className={cx('alertblock', { selected })}>
          <Row className={cx('row-full-width p-5', 'bg-alert-' + data.color)}>
            <Container className="ui">
              <Row className="align-items-start">
                {data.image?.data && (
                  <Col sm={2} className="pb-3 image-col">
                    <img
                      src={`data:${data.image['content-type']};${data.image.encoding},${data.image.data}`}
                      alt=""
                      className={cx('left-image', [
                        data.sizeImage ? 'size-' + data.sizeImage : 'size-l',
                      ])}
                    />
                  </Col>
                )}
                <Col>
                  <EditTextBlock
                    data={data}
                    detached={true}
                    index={index}
                    selected={selected}
                    block={props.block}
                    onAddBlock={onAddBlock}
                    onChangeBlock={onChangeBlock}
                    onDeleteBlock={onDeleteBlock}
                    onMutateBlock={props.onMutateBlock}
                    onFocusPreviousBlock={onFocusPreviousBlock}
                    onFocusNextBlock={onFocusNextBlock}
                    onSelectBlock={onSelectBlock}
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
    </AlertWrapper>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Edit.propTypes = {
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  request: PropTypes.shape({
    loading: PropTypes.bool,
    loaded: PropTypes.bool,
  }).isRequired,
  pathname: PropTypes.string.isRequired,
  onChangeBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
  createContent: PropTypes.func.isRequired,
};
export default Edit;
