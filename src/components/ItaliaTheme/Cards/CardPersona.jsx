import React from 'react';
import { Card, CardBody, CardTitle, CardText } from 'design-react-kit';

import { UniversalLink } from '@plone/volto/components';
import { CardCategory } from 'design-comuni-plone-theme/components/ItaliaTheme';
import {
  ListingCategory,
  ListingImage,
} from 'design-comuni-plone-theme/components/ItaliaTheme';

export const CardPersona = ({
  item,
  className,
  titleClassName = '',
  titleTagName = 'h3',
  showImage,
  natural_image_size,
  listingText,
  icon,
  type,
  isEditMode,
}) => {
  const image = ListingImage({
    item,
    maxSize: 300,
    useOriginal: false,
  });
  return (
    <Card
      className={`card-persona card-big p-3 card-teaser-image card-flex no-after ${
        className ?? ''
      }`}
    >
      <div className="card-image-wrapper">
        <CardBody>
          {(icon || type) && (
            <CardCategory iconName={icon}>
              <ListingCategory category={type} item={item} />
            </CardCategory>
          )}
          <CardTitle tag={titleTagName} className={titleClassName}>
            <UniversalLink
              item={!isEditMode ? item : null}
              href={isEditMode ? '#' : ''}
            >
              {item.title || item.id}
            </UniversalLink>
          </CardTitle>
          {listingText && <CardText>{listingText}</CardText>}
        </CardBody>
        {showImage && (
          <div className="card-image card-image-rounded">{image}</div>
        )}
      </div>
    </Card>
  );
};

export default CardPersona;
