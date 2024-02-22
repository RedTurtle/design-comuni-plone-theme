import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
const messages = defineMessages({
  carouselSlide: {
    id: 'carouselSlide',
    defaultMessage: 'Slide',
  },
});
const SingleSlideWrapper = ({ className, key, index, children }) => {
  const intl = useIntl();
  const wrapperKey = key ?? 'slide-wrapper-' + index;

  return (
    <div
      className={`it-single-slide-wrapper ${className ?? ''}`}
      key={wrapperKey}
      data-slide={index}
      role="group"
      aria-label={
        intl.formatMessage(messages.carouselSlide) +
        ' ' +
        (index ? index + 1 : '')
      }
    >
      {children}
    </div>
  );
};

export default SingleSlideWrapper;
