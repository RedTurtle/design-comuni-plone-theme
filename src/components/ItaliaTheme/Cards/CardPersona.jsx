import React from 'react';
import {
  Card,
  CardBody,
  CardTitle,
  CardText,
} from 'design-react-kit/dist/design-react-kit';

import { UniversalLink } from '@plone/volto/components';
import { CardCategory } from 'design-comuni-plone-theme/components/ItaliaTheme';
import {
  ListingCategory,
  ListingImage,
} from 'design-comuni-plone-theme/components/ItaliaTheme';

export const CardPersona = ({
  item,
  className,
  showImage,
  natural_image_size,
  listingText,
  icon,
  type,
  isEditMode,
}) => {
  const image = ListingImage({
    item,
    sizes: '80px',
    style: { margin: 0 },
  });
  return (
    <Card
      className={`card-persona card-teaser card-flex no-after ${
        className ?? ''
      }`}
    >
      <CardBody>
        {(icon || type) && (
          <CardCategory iconName={icon}>
            <ListingCategory category={type} item={item} />
          </CardCategory>
        )}
        <CardTitle tag="h3">
          <UniversalLink
            item={!isEditMode ? item : null}
            href={isEditMode ? '#' : ''}
          >
            {item.title || item.id}
          </UniversalLink>
        </CardTitle>
        {listingText && <CardText>{listingText}</CardText>}
      </CardBody>
      {showImage && <div className="avatar ml-3 size-xl">{image}</div>}
    </Card>
  );
};

export default CardPersona;
