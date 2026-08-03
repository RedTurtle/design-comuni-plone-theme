/*
 * original: https://raw.githubusercontent.com/collective/volto-gdpr-privacy/v2.3.4/src/components/CookieBanner/ui/Button.jsx
 *
 * CUSTOMIZATIONS:
 * - customized to use design-react-kit's Button instead of semantic-ui-react's Button
 * - map className modifiers to design-react-kit props: "primary" -> color="primary"; "close-button" -> color="link" + outline
 * - strip the semantic-ui-only "basic" prop, unsupported by design-react-kit
 * */

import React from 'react';

import { Button as DesignButton } from 'design-react-kit';

/*This component facilitates the customization of buttons*/

const Button = (props) => {
  let { className, ...otherProps } = props;
  className = (className || '') + ' gdpr-privacy-banner-button';
  if (props.className?.indexOf('primary') >= 0) {
    otherProps.color = 'primary';
  }
  if (props.className?.indexOf('close-button') >= 0) {
    otherProps.color = 'link';
    otherProps.outline = true;
  }

  delete otherProps.basic;

  otherProps.className = className;
  return <DesignButton {...otherProps} />;
};

export default Button;
