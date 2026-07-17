/**
 * @module components/theme/Unauthorized/Unauthorized
 */

/*
 * original: https://raw.githubusercontent.com/plone/volto/19.1.5/packages/volto/src/components/theme/Unauthorized/Unauthorized.jsx
 *
 * CUSTOMIZATIONS:
 * - Replaced the whole default Volto markup (Container, FormattedMessage
 *   messages, login link, site administration link, "Thank you." message
 *   and the withServerErrorCode(401) wrapper) with the Italia Design theme
 *   Unauthorized component
 * - Delegates rendering entirely to `Unauthorized` imported from
 *   `design-comuni-plone-theme/components/ItaliaTheme`
 */

import React from 'react';

import { Unauthorized as UnauthorizedItalia } from 'design-comuni-plone-theme/components/ItaliaTheme';

/**
 * unauthorized function.
 * @function Unauthorized
 * @returns {string} Markup of the unauthorized page.
 */
const Unauthorized = () => {
  return <UnauthorizedItalia />;
};

export default Unauthorized;
