/*
 * original: https://raw.githubusercontent.com/RedTurtle/volto-feedback/v0.7.2/src/components/FeedbackForm/Steps/Commons/FormHeader.jsx
 *
 * CUSTOMIZATIONS:
 * - flattened the upstream `Commons/FormHeader.jsx` file into a single
 *   `Commons.jsx` file, and changed the export from `export default
 *   FormHeader` to a named export `export const FormHeader`
 * - added a new `hidden` prop, used to hide the header while keeping it in
 *   the DOM (via `aria-hidden` and a `d-none` class) instead of unmounting it
 * - added `classnames` (`cx`) to conditionally toggle the `d-none` class on
 *   the legend and the step counter based on `hidden`
 * - added `data-element="feedback-rating-question"` and `aria-hidden={hidden}`
 *   attributes to the `<legend>` element
 * - added CSS classes `w-100 p-0` to the `<legend>` and wrapped `title` in a
 *   `<div className="m-0 fs-6">` instead of rendering it as plain text
 *   inside `<legend>`
 * - changed the step counter from a plain `<span>` to a `<div>` with the
 *   `fs-6` class (plus the conditional `d-none` class)
 */
import React from 'react';
import cx from 'classnames';

export const FormHeader = ({ title, step, totalSteps, className, hidden }) => {
  return (
    <div className={className}>
      <legend
        data-element="feedback-rating-question"
        aria-hidden={hidden}
        className={cx('w-100 p-0', {
          'd-none': hidden,
        })}
      >
        <div className={'m-0 fs-6'}>{title}</div>
      </legend>
      <div
        className={cx('fs-6', {
          'd-none': hidden,
        })}
      >{`${step}/${totalSteps}`}</div>
    </div>
  );
};
