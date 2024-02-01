import React from 'react';
import { UniversalLink } from '@plone/volto/components';
import { Container } from 'design-react-kit';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';

const SlideItemDefault = ({
  item,
  index,
  image,
  show_image_title,
  full_width,
  intl,
  setUserAutoplay,
  userAutoplay,
  slider,
  messages,
  handleKeyboardUsers,
}) => {
  return (
    <React.Fragment>
      {image ? (
        <figure className="img-wrapper">{image}</figure>
      ) : (
        <div className="img-placeholder"></div>
      )}
      {show_image_title && (
        <div className="slide-title">
          <UniversalLink
            item={item}
            title={intl.formatMessage(messages.viewImage)}
            tabIndex={0}
            data-slide={index}
            className={'slide-link no-external-if-link'}
            onKeyDown={handleKeyboardUsers}
          >
            {full_width ? (
              <Container>
                {item.title} <Icon icon="arrow-right" key="arrow-right-fw" />
              </Container>
            ) : (
              <>
                {item.title} <Icon icon="arrow-right" key="arrow-right" />
              </>
            )}
          </UniversalLink>
        </div>
      )}
    </React.Fragment>
  );
};

export default SlideItemDefault;
