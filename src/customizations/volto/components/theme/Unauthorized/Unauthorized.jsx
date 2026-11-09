/**
 * @module components/theme/Unauthorized/Unauthorized
 */

import React from 'react';

import { Unauthorized as UnauthorizedItalia } from 'design-comuni-plone-theme/components/ItaliaTheme';

/**
 * unauthorized function.
 * @function Unauthorized
 * @param {Object} props Props passed by Volto's View (staticContext, error, ...)
 * @returns {string} Markup of the unauthorized page.
 */
const Unauthorized = (props) => {
  return <UnauthorizedItalia {...props} />;
};

export default Unauthorized;
