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
  const Image = config.getComponent({ name: 'Image' }).component;

  const image = (
    <Image
      aria-hidden="true"
      alt=""
      role="presentation"
      className={className}
      item={{
        ...item,
        image_field: 'image', //[ToDo]: rimuove image_field quando cekk ritorna i dati corretti per i listing
        image: { ...item.image, download: item.image?.scales?.huge?.download }, //[ToDo]: rimuove image_field quando cekk ritorna i dati corretti per i listing
      }}
      loading={loading}
      title={item.title}
      responsive={responsive}
      sizes={sizes}
      {...imageProps}
    />
  );

  if (!image) return null;

  return image;
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
