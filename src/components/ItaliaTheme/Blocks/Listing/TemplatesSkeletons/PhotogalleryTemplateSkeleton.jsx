import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PhotogalleryTemplate from 'design-comuni-plone-theme/components/ItaliaTheme/Blocks/Listing/PhotogalleryTemplate';

const PhotogalleryTemplateSkeleton = (data) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  let items = [];
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].forEach((i) => {
    items.push({ '@id': i + '' });
  });
  return (
    <div className="skeleton-template">
      {/* PhotogalleryTemplate is gated by injectLazyLibs('reactSlick'), whose
      "loaded" flag comes from Redux and can already be true by the client's
      first hydration pass (e.g. warm chunk cache), while SSR is always
      null: mounting it only after a guaranteed post-hydration effect keeps
      the first client render identical to SSR. */}
      {mounted && <PhotogalleryTemplate {...data} items={items} />}
    </div>
  );
};

PhotogalleryTemplateSkeleton.propTypes = {
  linkHref: PropTypes.any,
  isEditMode: PropTypes.bool,
  title: PropTypes.string,
};

export default PhotogalleryTemplateSkeleton;
