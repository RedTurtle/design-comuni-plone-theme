import React from 'react';
import PropTypes from 'prop-types';
import { WideImage } from 'design-comuni-plone-theme/components/ItaliaTheme/View';
import config from '@plone/volto/registry';

/**
 * ContentImage view component class.
 * @function ContentImage
 * @params {object} content: Content object.
 * @returns {string} Markup of the component.
 */
const ContentImage = ({ content, position }) => {
  const view =
    (content?.image || content?.image_caption) &&
    config.settings.italiaThemeViewsConfig.imagePosition === position;

  const fullWidth =
    config.settings.italiaThemeViewsConfig.imagePosition === 'afterHeader';
  console.log(fullWidth);
  return view ? (
    <div className="content-image">
      <WideImage
        title={content?.title}
        image={content?.image}
        caption={content?.image_caption}
        fullWidth={fullWidth}
        sizes={fullWidth ? '100vw' : '(max-width: 768px) 90vw, 800px'}
      />
    </div>
  ) : null;
};
export default ContentImage;

ContentImage.propTypes = {
  params: PropTypes.shape({
    title: PropTypes.string,
    image: PropTypes.shape({
      download: PropTypes.string,
    }),
    caption: PropTypes.string,
    fullWidth: PropTypes.bool,
  }),
};
