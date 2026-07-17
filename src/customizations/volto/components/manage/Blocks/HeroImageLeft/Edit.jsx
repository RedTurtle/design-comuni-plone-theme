/**
 * Edit Hero block.
 * @module components/manage/Blocks/Image/Edit
 */

/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/manage/Blocks/Image/Edit.jsx
 *
 * CUSTOMIZATIONS:
 * - This is not the upstream Image block (a small function component with
 *   plain align/size handling and no title/description/link fields); it is
 *   the same file further customized into a "hero" block with a title, a
 *   description and app store links, rather than a plain image block.
 * - Adopted the current upstream image-editing pattern: `ImageInput`
 *   (object browser + drag/drop + upload, from
 *   `@plone/volto/components/manage/Widgets/ImageWidget`) instead of the
 *   old manual `onUploadImage`/`readAsDataURL`/`createContent` upload-only
 *   flow, and the `item`/`image_field`/`image_scales` responsive-image
 *   pattern in place of a hardcoded `/@@images/image` URL. No `size`
 *   (l/m/s) or `align` (full-width) handling - the hero image is always
 *   full-width and rendered with `sizes="100vw"`.
 * - Kept a simple inline "clear image" toolbar button (rather than
 *   upstream's ImageSidebar-driven removal) since `HeroSidebar` doesn't
 *   manage the image field itself.
 * - Uses `HeroSidebar` (design-comuni-plone-theme/components/ItaliaTheme/
 *   Blocks/HeroImageLeft/HeroSidebar) via `SidebarPortal` instead of the
 *   upstream `ImageSidebar`.
 * - Added an editable title (`h1`) and description (`p`), each rendered
 *   with `TextEditorWidget` (design-comuni-plone-theme/components/
 *   ItaliaTheme, Slate-based) bound to the block's `title`/`description`
 *   data, using the shared `useHandleDetachedBlockFocus` hook (design-
 *   comuni-plone-theme/helpers/blocks, the same one used by Callout/Alert/
 *   CTABlock/etc.) to move focus between the two fields.
 * - Added `StoresButtons` (design-comuni-plone-theme/components/
 *   ItaliaTheme/Blocks/HeroImageLeft/StoresButtons), rendered with
 *   `data={data}` below the title/description.
 * - Wrapped the block markup in an extra `.public-ui` div, and renders
 *   `.block.hero` / `.hero-image` / `.hero-body` (with a `no-bg` modifier
 *   driven by `data.show_block_bg`) instead of the upstream
 *   `.block.image.align`/align modifier markup.
 * - No `withBlockExtensions` wrapper, no link/`UniversalLink` support.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import config from '@plone/volto/registry';
import { ImageInput } from '@plone/volto/components/manage/Widgets/ImageWidget';

import clearSVG from '@plone/volto/icons/clear.svg';

import { TextEditorWidget } from 'design-comuni-plone-theme/components/ItaliaTheme';
import StoresButtons from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/HeroImageLeft/StoresButtons';
import HeroSidebar from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/HeroImageLeft/HeroSidebar';
import { useHandleDetachedBlockFocus } from 'design-comuni-plone-theme/helpers/blocks';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
});

/**
 * Edit hero image block.
 * @function Edit
 * @returns {string} Markup for the component.
 */
const Edit = (props) => {
  const { data, block, selected, onChangeBlock } = props;
  const intl = useIntl();
  const { selectedField, setSelectedField } = useHandleDetachedBlockFocus(
    props,
    'title',
  );
  const Image = config.getComponent({ name: 'Image' }).component;

  const handleChangeImage = React.useCallback(
    (id, image, { image_field, image_scales } = {}) => {
      const url = Array.isArray(image)
        ? image?.[0]?.['@id']
        : image
          ? image['@id'] || image
          : '';
      onChangeBlock(block, {
        ...data,
        url: flattenToAppURL(url),
        image_field,
        image_scales,
      });
    },
    [onChangeBlock, block, data],
  );

  if (__SERVER__) {
    return <div />;
  }

  return (
    <div className="public-ui" tabIndex="-1">
      <div
        className={cx('block hero', {
          selected,
        })}
      >
        {selected && !!data.url && (
          <div className="toolbar">
            <Button.Group>
              <Button
                icon
                basic
                onClick={() =>
                  onChangeBlock(block, {
                    ...data,
                    url: '',
                    image_field: undefined,
                    image_scales: undefined,
                  })
                }
              >
                <Icon name={clearSVG} size="24px" color="#e40166" />
              </Button>
            </Button.Group>
          </div>
        )}
        <div className="block-inner-wrapper">
          {data.url ? (
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
                    : `${flattenToAppURL(data.url)}/@@images/image`
                }
                sizes="100vw"
                alt=""
                responsive={true}
              />
            </div>
          ) : (
            <div className="image-add">
              <ImageInput
                onChange={handleChangeImage}
                placeholderLinkInput={data.placeholder}
                block={block}
                id={block}
                objectBrowserPickerType={'image'}
              />
            </div>
          )}
          <div
            className={cx('hero-body', {
              'no-bg': !data.show_block_bg,
            })}
          >
            <div className="edit-title">
              <h1>
                <TextEditorWidget
                  {...props}
                  showToolbar={false}
                  data={data}
                  fieldName="title"
                  selected={selected && selectedField === 'title'}
                  placeholder={intl.formatMessage(messages.title)}
                  setSelected={setSelectedField}
                  focusNextField={() => setSelectedField('description')}
                />
              </h1>
            </div>

            <p>
              <TextEditorWidget
                {...props}
                showToolbar={false}
                data={data}
                fieldName="description"
                selected={selected && selectedField === 'description'}
                placeholder={intl.formatMessage(messages.description)}
                setSelected={setSelectedField}
                focusPrevField={() => setSelectedField('title')}
              />
            </p>

            <StoresButtons data={data} />
          </div>
        </div>
      </div>
      <SidebarPortal selected={selected}>
        <HeroSidebar {...props} />
      </SidebarPortal>
    </div>
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
  onChangeBlock: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  onFocusPreviousBlock: PropTypes.func.isRequired,
  onFocusNextBlock: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

export default Edit;
