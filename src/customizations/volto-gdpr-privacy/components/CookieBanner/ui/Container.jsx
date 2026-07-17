/*
 * original: https://raw.githubusercontent.com/collective/volto-gdpr-privacy/v2.3.4/src/components/CookieBanner/ui/Container.jsx
 *
 * CUSTOMIZATIONS:
 * - customized to use design-react-kit's Container instead of semantic-ui-react's Container
 */
import React from 'react';
import { Container as DesignContainer } from 'design-react-kit';

/*This component facilitates the customization of Container*/

const Container = (props) => {
  return <DesignContainer {...props} />;
};

export default Container;
