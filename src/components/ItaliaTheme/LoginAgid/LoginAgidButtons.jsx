/**
 * Login container.
 * @module components/theme/Login/Login
 */

import React from 'react';
import { Button } from 'design-react-kit';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { UniversalLink } from '@plone/volto/components';
import {
  Icon,
  LoginButton,
} from 'design-comuni-plone-theme/components/ItaliaTheme';

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

/**
 * LoginAgidButtons class.
 * @class LoginAgidButtons
 * @extends Component
 */
const LoginAgidButtons = () => {
  let loginUrl = __CLIENT__ ? window?.location?.href : '';
  if (loginUrl.endsWith('/login')) {
    loginUrl += '-operatore';
  }

  return (
    <div id="page-login">
      <div className="login-method">
        <h3>
          <FormattedMessage {...messages.loginSpid} />
        </h3>
        <p className="description">
          <FormattedMessage {...messages.loginSpidDescription} />
        </p>
        <div className="unauthorized-spid-login">
          <LoginButton size="big">
            <span className="rounded-icon">
              <Icon color="primary" icon="it-user" padding={false} size="" />
            </span>
            <span>
              <FormattedMessage {...messages.loginSpidButton} />
            </span>
          </LoginButton>
          <div>
            <a href="https://www.spid.gov.it/cos-e-spid/come-attivare-spid">
              <FormattedMessage {...messages.loginSpidHelp} />
            </a>
          </div>
        </div>
      </div>
      <div className="login-method">
        <h3>
          <FormattedMessage {...messages.loginOther} />
        </h3>
        <p className="description">
          <FormattedMessage {...messages.loginOtherDescription} />
        </p>
        <div className="unauthorized-spid-login">
          <Button
            className="btn-icon"
            color="white"
            tag={UniversalLink}
            href={loginUrl}
            icon={false}
            size="lg"
          >
            <span>
              <FormattedMessage {...messages.loginPloneUser} />
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(LoginAgidButtons);
