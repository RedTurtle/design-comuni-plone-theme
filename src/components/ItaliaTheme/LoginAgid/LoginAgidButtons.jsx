/**
 * Login container.
 * @module components/theme/Login/Login
 */

import React from 'react';
import { Button } from 'design-react-kit';
import { defineMessages, useIntl, injectIntl } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';
import { Icon } from 'design-comuni-plone-theme/components/ItaliaTheme';
import { useLocation } from 'react-router-dom';

const messages = defineMessages({
  loginOther: {
    id: 'login_agid_other',
    defaultMessage: 'Other users',
  },
  loginOtherDescription: {
    id: 'login_agid_other_description',
    defaultMessage: 'Alternatively you can use these methods.',
  },
  loginSpid: {
    id: 'login_spid',
    defaultMessage: 'SPID',
  },
  loginSpidDescription: {
    id: 'login_spid_description',
    defaultMessage: 'Log in with SPID, the public digital identity system.',
  },
  loginSpidButton: {
    id: 'login_with_spid',
    defaultMessage: 'Login with Spid',
  },
  loginSpidHelp: {
    id: 'login_spid_help',
    defaultMessage: 'How to activate SPID',
  },
  loginPloneUser: {
    id: 'login_plone_user',
    defaultMessage: 'Log in as employee',
  },
});

// https://v5.reactrouter.com/web/example/query-parameters
function useQueryV5() {
  const { search } = useLocation();
  return React.useMemo(() => new URLSearchParams(search), [search]);
}

const LoginAgidButtons = () => {
  const intl = useIntl();
  const query = useQueryV5();
  const came_from = query.get('came_from')
    ? `?came_from=${query.get('came_from')}`
    : '';
  const spidLoginUrl = `${
    __CLIENT__
      ? window.env.RAZZLE_SPID_LOGIN_URL
      : process.env.RAZZLE_SPID_LOGIN_URL
  }${came_from}`;

  return (
    <>
      <div className="login-method">
        <h2>{intl.formatMessage(messages.loginSpid)}</h2>
        <p className="description">
          {intl.formatMessage(messages.loginSpidDescription)}
        </p>
        <div className="authorized-spid-login mb-4">
          <Button
            className="btn-icon"
            color="primary"
            href={spidLoginUrl}
            tag="a"
            data-element="personal-area-login"
            size="big"
          >
            <span className="rounded-icon">
              <Icon color="primary" icon="it-user" padding={false} size="" />
            </span>
            <span>{intl.formatMessage(messages.loginSpidButton)}</span>
          </Button>
          <div>
            <UniversalLink href="https://www.spid.gov.it/cos-e-spid/come-attivare-spid">
              <small>{intl.formatMessage(messages.loginSpidHelp)}</small>
            </UniversalLink>
          </div>
        </div>
      </div>
      <div className="login-method">
        <h3>{intl.formatMessage(messages.loginOther)}</h3>
        <p className="description">
          {intl.formatMessage(messages.loginOtherDescription)}
        </p>
        <div className="unauthorized-spid-login">
          <Button color="primary" outline href="/login-operatore" tag="button">
            <span>{intl.formatMessage(messages.loginPloneUser)}</span>
          </Button>
        </div>
      </div>
    </>
  );
};

export default LoginAgidButtons;
