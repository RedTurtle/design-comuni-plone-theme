import { forwardRef, ForwardedRef } from 'react';
import { Button as RACButton, ButtonProps } from 'react-aria-components';
import './Button.css';

export const Button = forwardRef(function _Button(
  props: ButtonProps,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <RACButton
      ref={ref}
      {...props}
      className={`react-aria-button  ${props.className}`}
    />
  );
});
