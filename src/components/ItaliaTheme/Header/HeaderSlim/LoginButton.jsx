/* eslint-disable react-hooks/exhaustive-deps */
/**
 * LoginButton component.
 * @module components/ItaliaTheme/Header/HeaderSlim/LoginButton
 */

import React, { useState, useEffect } from 'react';

import { Button } from 'design-react-kit/dist/design-react-kit';

import config from '@plone/volto/registry';

const LoginButton = ({ children, size = 'full' }) => {
  const [loginURL, setLoginURL] = useState(
    config.settings.siteProperties?.arLoginUrl,
  );

  useEffect(() => {
    if (loginURL && __CLIENT__) {
      const current = window?.location?.href;
      if (
        current &&
        loginURL.indexOf('came_from') < 0 &&
        current.indexOf('came_from') < 0
      ) {
        const sep = loginURL.indexOf('?') >= 0 ? '&' : '?';
        setLoginURL(`${loginURL}${sep}came_from=${current}`);
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
    >
      {children}
    </Button>
  ) : (
    <></>
  );
};

export default LoginButton;
