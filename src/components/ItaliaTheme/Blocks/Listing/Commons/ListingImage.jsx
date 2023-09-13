import React from 'react';

import config from '@plone/volto/registry';
import { getImageAttributes } from 'design-comuni-plone-theme/helpers';

const ListingImage = ({
  item,
  loading,
  className = 'listing-image',
  responsive = true,
  sizes = '(max-width:320px) 200px, (max-width:425px) 300px, (max-width:768px) 400px, 300px',
  ...imageProps
}) => {
  const PreviewImage = config.getComponent({ name: 'PreviewImage' }).component;

  return (
    <PreviewImage
      className={className}
      item={{
        ...item,
        image_field: 'image', //[ToDo]: rimuove image_field quando cekk ritorna i dati corretti per i listing
        image: { ...item.image, download: item.image?.scales?.huge?.download }, //[ToDo]: rimuove image_field quando cekk ritorna i dati corretti per i listing
      }}
      loading={loading}
      aria-hidden="true"
      alt=""
      title={item.title}
      responsive={responsive}
      sizes={sizes}
      role="presentation"
      {...imageProps}
    />
  );
};

export const getListingImageBackground = (item, size) => {
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
