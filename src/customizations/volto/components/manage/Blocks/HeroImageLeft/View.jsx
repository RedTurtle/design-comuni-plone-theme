/**
 * View image block.
 * @module components/manage/Blocks/Hero/View
 */

/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Blocks/Image/View.jsx
 *
 * CUSTOMIZATIONS:
 * - Like the sibling Edit.jsx, this is not the upstream Image View (a
 *   small component with `size`/`align` classes and an optional
 *   `UniversalLink` wrapper for `data.href`); it is the same file turned
 *   into a "hero" block.
 * - Adopted the current upstream `item`/`image_field`/`image_scales`
 *   responsive-image pattern (falling back to a plain `src` URL for
 *   blocks saved before this rewrite, which only have `data.url`). No
 *   `size`/`align`/link handling - the hero image is always full-width
 *   and rendered with `sizes="100vw"`.
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
import config from '@plone/volto/registry';
import StoresButtons from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/HeroImageLeft/StoresButtons';

/**
 * View image block class.
 * @class View
 * @extends Component
 */
const View = ({ data }) => {
  const show_bg = data.show_block_bg === undefined ? true : data.show_block_bg;
  const Image = config.getComponent({ name: 'Image' }).component;

  return (
    <div className="public-ui">
      <div className="block hero">
        <div className="block-inner-wrapper">
          {data.url && (
            <div className="hero-image">
              <Image
                item={
                  data.image_scales
                    ? {
                        '@id': data.url,
                        image_field: data.image_field,
                        image_scales: data.image_scales,
                      }
                    : undefined
                }
                src={
                  data.image_scales
                    ? undefined
                    : `${flattenToAppURL(data.url)}/@@images/image/teaser`
                }
                sizes="100vw"
                alt=""
                aria-hidden="true"
                loading="lazy"
                responsive={true}
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
