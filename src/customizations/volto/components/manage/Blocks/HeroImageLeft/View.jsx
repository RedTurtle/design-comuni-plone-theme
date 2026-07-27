/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import StoresButtons from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/HeroImageLeft/StoresButtons';
import { toSlateValue } from 'design-comuni-plone-theme/helpers';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  const show_bg = data.show_block_bg === undefined ? true : data.show_block_bg;

  return (
    <div className="public-ui">
      <div className="block hero">
        <div className="block-inner-wrapper">
          {data.url && (
            <div className="hero-image">
              <img
                src={`${flattenToAppURL(data.url)}/@@images/image/teaser`}
                alt=""
                aria-hidden="true"
                loading="lazy"
              />
            </div>
          )}
          <div
            className={cx('hero-body', {
              'no-bg': !show_bg,
            })}
          >
            {data.title && <h2>{data.title}</h2>}
            {data.description && (
              <TextBlockView data={{ value: toSlateValue(data.description) }} />
            )}
            <StoresButtons data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default View;
