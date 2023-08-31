import React from 'react';

import config from '@plone/volto/registry';
import { getImageAttributes } from 'design-comuni-plone-theme/components/Image/helpers';

const ListingImage = ({
  item,
  loading,
  className = 'listing-image',
  responsive = true,
  ...imageProps
}) => {
  const PreviewImage = config.getComponent({ name: 'PreviewImage' }).component;

  return (
    <PreviewImage
      className={className}
      item={item}
      loading={loading}
      aria-hidden="true"
      alt=""
      title={item.title}
      responsive={responsive}
      role="presentation"
      {...imageProps}
    />
  );
};

export const getListingImageBackground = (item, size) => {
  //[ToDo]:vedere dove viene usato e verificare che funzioni bene
  let url = null;
  if (item.image_field) {
    url = getImageAttributes(item['@id'], {
      imageField: item.image_field,
    })?.src;

    if (size) {
      url = url.replace('/listing', '/' + size);
    }
  }

  return url;
};
export default ListingImage;
