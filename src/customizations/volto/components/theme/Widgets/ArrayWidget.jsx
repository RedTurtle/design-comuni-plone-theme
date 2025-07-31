// customization:
// - prevent breaking if array does not have standard fields

import React from 'react';
import cx from 'classnames';

const ArrayWidget = ({ value, children, className }) => {
  return value ? (
    <span className={cx(className, 'array', 'widget')}>
      {value.map((item, key) => (
        <>
          {key ? ', ' : ''}
          {item.token || item.title || typeof item === 'string' ? (
            <span key={item.token || item.title || item}>
              {children
                ? children(item.title || item.token || item)
                : item.title || item.token || item}
            </span>
          ) : Object.keys(item).length > 0 ? (
            <div>
              {Object.keys(item).map((el) => (
                <div>
                  <span className="fw-bold">{el}</span>: <span>{item[el]}</span>
                </div>
              ))}
            </div>
          ) : (
            <></>
          )}
        </>
      ))}
    </span>
  ) : (
    ''
  );
};

export default ArrayWidget;
