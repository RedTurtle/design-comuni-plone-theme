/*
 * CUSTOMIZATIONS:
 * - customized to use design-react-kit elements instead semantic-ui elements
 * - keep the site language/direction when the page content is in another one
 * */

import React from 'react';

import { Button as DesignButton } from 'design-react-kit';
import { useSiteLanguage } from 'design-comuni-plone-theme/helpers/contentLanguage';

/*This component facilitates the customization of buttons*/

const Button = (props) => {
  const siteLanguage = useSiteLanguage();
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
  return <DesignButton {...siteLanguage} {...otherProps} />;
};

export default Button;
