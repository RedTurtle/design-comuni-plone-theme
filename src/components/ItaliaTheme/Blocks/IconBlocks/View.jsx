/**
 * View IconsBlock block.
 * @module components/ItaliaTheme/Blocks/Accordion/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import ViewBlock from './Block/ViewBlock';
import { Row, Col } from 'design-react-kit';
import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import Wrapper from './Wrapper';

/**
 * View IconsBlock block class.
 * @class View
 * @extends Component
 */
const IconsBlockView = ({ data, block }) => {
  const id = new Date().getTime();
  const xlColumns = `${12 / (data.columns ?? 4)}`;

  return (
    <div className="block iconBlocks">
      <Wrapper data={data}>
        <div className="block-header">
          {data.title && (
            <div className="title">
              <h2>{data.title}</h2>
            </div>
          )}
          {data.description && (
            <div className="description">
              <TextBlockView data={{ value: data.description }} />
            </div>
          )}
        </div>
        <Row>
          {data.subblocks.map((subblock, index) => (
            <Col lg="4" xl={xlColumns} key={subblock.id}>
              <ViewBlock
                data={subblock}
                key={index}
                id={id}
                index={index}
                blockHasTitle={!!data.title}
              />
            </Col>
          ))}
        </Row>

        {data.href && data.linkMoreTitle && (
          <div className="link-button text-center my-4">
            <UniversalLink
              href={flattenToAppURL(data.href)}
              className="btn btn-tertiary"
            >
              {data.linkMoreTitle}
            </UniversalLink>
          </div>
        )}
      </Wrapper>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
IconsBlockView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default IconsBlockView;
