/*
 * original: https://raw.githubusercontent.com/collective/volto-gdpr-privacy/v2.3.4/src/components/CookieBanner/ui/Container.jsx
 *
 * CUSTOMIZATIONS:
 * - customized to use design-react-kit's Container instead of semantic-ui-react's Container
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
