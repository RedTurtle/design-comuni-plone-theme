/* eslint-disable react-hooks/exhaustive-deps */
/**
 * LoginButton component.
 * @module components/ItaliaTheme/Header/HeaderSlim/LoginButton
 */

import React, { useState, useEffect } from 'react';
import { Button } from 'design-react-kit';
import { getBaseUrl } from '@plone/volto/helpers';
import { useLocation } from 'react-router-dom';

const LoginButton = ({ children, baseLoginUrl, size = 'full' }) => {
  const location = useLocation();
  const [loginURL, setLoginURL] = useState(baseLoginUrl);

  useEffect(() => {
    if (loginURL) {
      if (!loginURL.includes('came_from')) {
        const came_from = getBaseUrl(location.pathname);
        setLoginURL(
          (loginURL) =>
            `${loginURL}${
              loginURL.includes('?') ? '&' : '?'
            }came_from=${came_from}`,
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
