import React from 'react';
import CardWithImageTemplate from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Listing/CardWithImageTemplate';
const RenderItems = ({ items }) => {
  return (
    <>
      <CardWithImageTemplate items={items} full_width={false} />
    </>
  );
};
export default RenderItems;
