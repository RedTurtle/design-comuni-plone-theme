/**
 * Image helpers for blocks that store an image in their `image` field
 * (testo_riquadro_immagine, alert).
 *
 * Supported formats:
 * - legacy: an object with the base64 file embedded
 *   `{ data, encoding, 'content-type', filename }`
 * - new: a list with a reference to a Plone Image content
 *   `[{ '@id', image_field, image_scales }]`
 *
 * Legacy support can be removed once all sites have run the
 * design.plone.policy upgrade step that migrates block images.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { Message } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';

const messages = defineMessages({
  legacyImageNotice: {
    id: 'blockImage_legacy_notice',
    defaultMessage:
      'Immagine nel vecchio formato: caricane o selezionane una per sostituirla.',
  },
});

// Alert block: the image is in a `sm={2}` column, full width below sm.
export const ALERT_IMAGE_SIZES = '(max-width: 575px) 100vw, 200px';

export const isLegacyImage = (image) =>
  !!image && !Array.isArray(image) && !!image.data;

export const getImageItem = (image) =>
  Array.isArray(image) && image.length > 0 ? image[0] : null;

export const hasBlockImage = (image) =>
  isLegacyImage(image) || !!getImageItem(image);

/**
 * Converts the arguments of the ImageWidget onChange
 * (`onChange(id, url, { image_field, image_scales })`)
 * to the value stored in the block.
 */
export const toImageValue = (url, extra) => {
  if (!url) return null;
  const item = {
    '@id': flattenToAppURL(url),
    image_field: extra?.image_field || 'image',
    image_scales: extra?.image_scales,
  };
  Object.keys(item).forEach((key) => {
    if (item[key] === undefined) delete item[key];
  });
  return [item];
};

const BlockImage = ({
  image,
  className,
  alt = '',
  sizes,
  loading = 'lazy',
  responsive = true,
  ...imgProps
}) => {
  if (isLegacyImage(image)) {
    return (
      <img
        src={`data:${image['content-type']};${image.encoding},${image.data}`}
        alt={alt}
        className={className}
        loading={loading}
        {...imgProps}
      />
    );
  }

  const item = getImageItem(image);
  if (item) {
    const Image = config.getComponent({ name: 'Image' }).component;
    return (
      <Image
        item={item}
        alt={alt}
        className={className}
        sizes={sizes}
        loading={loading}
        responsive={responsive}
        {...imgProps}
      />
    );
  }

  return null;
};

BlockImage.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  className: PropTypes.string,
  alt: PropTypes.string,
  sizes: PropTypes.string,
  loading: PropTypes.string,
  responsive: PropTypes.bool,
};

/**
 * Shown in block sidebars above the image widget when the block still has
 * a legacy (base64) image: the widget starts empty and the new value
 * replaces the legacy one.
 */
export const LegacyImageNotice = ({ image }) => {
  const intl = useIntl();
  if (!isLegacyImage(image)) return null;
  return (
    <Message info size="small" className="block-image-legacy-notice">
      <BlockImage
        image={image}
        style={{ display: 'block', maxWidth: '100%', maxHeight: '120px' }}
      />
      <p>{intl.formatMessage(messages.legacyImageNotice)}</p>
    </Message>
  );
};

LegacyImageNotice.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]),
};

export default BlockImage;
