import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
const messages = defineMessages({
  carouselSlide: {
    id: 'carouselSlide',
    defaultMessage: 'Slide',
  },
});
const SingleSlideWrapper = ({ className, key, index, children, onKeyDown }) => {
  const intl = useIntl();
  const wrapperKey = key ?? 'slide-wrapper-' + index;

  return (
    <div
      className={`it-single-slide-wrapper ${className ?? ''}`}
      key={wrapperKey}
      data-slide={index}
      role="button"
      aria-roledescription="group"
      aria-label={
        intl.formatMessage(messages.carouselSlide) +
        ' ' +
        (index ? index + 1 : '')
      }
      onKeyDown={onKeyDown}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      tabIndex={0}
    >
      {children}
    </div>
  );
};

export default SingleSlideWrapper;
