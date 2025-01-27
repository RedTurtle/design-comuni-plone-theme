import React from 'react';
const CarouselWrapper = ({ className, children }) => {
  return <div className={`it-carousel-all ${className ?? ''}`}>{children}</div>;
};

export default CarouselWrapper;
