/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

/*
 * original: https://raw.githubusercontent.com/plone/volto/18.0.3/packages/volto/src/components/manage/Blocks/Image/View.jsx
 *
 * CUSTOMIZATIONS:
 * - Like the sibling Edit.jsx, this is not the current upstream Image
 *   View (a small component using the registry `Image` component,
 *   `image_field`/`image_scales`, `size`/`align` classes and an optional
 *   `UniversalLink` wrapper for `data.href`); it is a fork of an older
 *   version of that block turned into a "hero" block.
 * - Renders `<Image src=".../@@images/image/teaser" aria-hidden="true"
 *   loading="lazy">` (a plain `src` URL, not `item`/`imageField`), and has
 *   no `image_field`/`image_scales`, `size`, `align` or
 *   link/`UniversalLink` handling.
 * - Root markup is `.public-ui > .block.hero > .block-inner-wrapper`
 *   (with `.hero-image` around the image) instead of a single `<p
 *   className="block image align …">`.
 * - Added a `.hero-body` div (with a `no-bg` modifier when
 *   `data.show_block_bg` is falsy) rendering `data.title` as an `h1` and
 *   `data.description` as a `p`.
 * - Added `StoresButtons` (design-comuni-plone-theme/components/
 *   ItaliaTheme/Blocks/HeroImageLeft/StoresButtons), rendered with
 *   `data={data}` below the title/description.
 * - No `withBlockExtensions` wrapper.
 */

import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers';
import Image from '@plone/volto/components/theme/Image/Image';
import StoresButtons from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/HeroImageLeft/StoresButtons';

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
              <Image
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
            {data.title && <h1>{data.title}</h1>}
            {data.description && <p>{data.description}</p>}
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
