/* eslint-disable react-hooks/exhaustive-deps */
/**
 * LoginButton component.
 * @module components/ItaliaTheme/Header/HeaderSlim/LoginButton
 */

import React, { useState, useEffect } from 'react';
import { Button } from 'design-react-kit';
import config from '@plone/volto/registry';

const LoginButton = ({ children, size = 'full' }) => {
  // per retrocompatibilità con il vecchio config arLoginUrl
  const [loginURL, setLoginURL] = useState(
    config.settings.siteProperties?.arLoginUrl || '/login',
  );

  useEffect(() => {
    if (loginURL && __CLIENT__) {
      if (loginURL.indexOf('came_from') < 0) {
        const came_from = window?.location?.href ?? '/';
        setLoginURL(
          (loginURL) => `${loginURL.split('?')[0]}?came_from=${came_from}`,
        );
      }
    }
  }, []);

  return loginURL ? (
    <Button
      className="btn-icon"
      color="primary"
      href={loginURL}
      icon={false}
      size={size}
      tag="a"
      data-element="personal-area-login"
    >
      {children}
    </Button>
  ) : (
    <></>
  );
};

export default LoginButton;
