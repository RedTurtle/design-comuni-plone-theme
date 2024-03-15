import React from 'react';
import cx from 'classnames';

const BodyWrapper = ({ data, inEditMode, children, id, hasArguments }) => {
  return (
    <div
      className={cx('container pt-5 argumentsCardsWrapper', {
        'p-5': inEditMode,
      })}
    >
      <h2 id={id + 'title'}>{data.text}</h2>
      <div className="grid mt-5">{children}</div>
    </div>
  );
};
export default BodyWrapper;
