import { UniversalLink } from '@plone/volto/components';
import DefaultImageSVG from '@plone/volto/components/manage/Blocks/Listing/default-image.svg';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const ListingImage = ({
  item = {},
  loading = 'lazy',
  showDefault = false,
  className = 'listing-image',
  responsive = true,
  sizes = '(max-width:320px) 200px, (max-width:425px) 300px, (max-width:767px) 500px, 410px',
  noWrapLink = false,
  ...imageProps
}) => {
  const Image = config.getComponent({ name: 'Image' }).component;

  //Verifies if the item has a preview image or an header image
  const showTitleAttr = !!(
    (item.hasPreviewImage && item.preview_caption) ||
    (item.image_field && item.image_caption)
  );

  //Verifies with caption to show as alt and title text
  const imageCaption =
    item.hasPreviewImage && item.preview_caption
      ? item.preview_caption
      : item.image_field && item.image_caption
      ? item.image_caption
      : null;

  let commonImageProps = {
    item,
    'aria-hidden': imageProps.alt || item.title ? false : true,
    alt: imageProps.alt ?? imageCaption ?? '',
    role: imageProps.alt || item.title ? '' : 'presentation',
    className,
    loading,
    responsive,
    sizes,
    ...imageProps,
  };

  // show title attribute if preview_caption or image_caption is present for the alt text
  if (showTitleAttr) {
    commonImageProps = {
      ...commonImageProps,
      title: imageCaption,
    };
  }
  // photogallery needs to check for null image
  // https://stackoverflow.com/questions/33136399/is-there-a-way-to-tell-if-reactelement-renders-null

  const image = Image(commonImageProps);
  const defaultImage = <img src={DefaultImageSVG} alt="" />;

  if (image === null && !showDefault) return null;

  return !noWrapLink ? (
    <UniversalLink item={item} className="img-wrapper">
      {image ?? defaultImage}
    </UniversalLink>
  ) : (
    image ?? defaultImage
  );
};

export const getListingImageBackground = (item = {}, size = 'listing') => {
  let url = null;
  if (item.image_field) {
    url =
      item.image_scales?.[item.image_field]?.[0]?.[size] ||
      `${flattenToAppURL(item['@id'])}/@@images/${item.image_field}/${size}`;
  }

  return url;
};
export default ListingImage;
