/*
 * CUSTOMIZATIONS:
 * - customized to use design-react-kit elements instead semantic-ui elements
 * - keep the site language/direction when the page content is in another one
 */
import React from 'react';
import { Container as DesignContainer } from 'design-react-kit';
import { useSiteLanguage } from 'design-comuni-plone-theme/helpers/contentLanguage';

/*This component facilitates the customization of Container*/

const Container = (props) => {
  const siteLanguage = useSiteLanguage();
  return <DesignContainer {...siteLanguage} {...props} />;
};

export default Container;
