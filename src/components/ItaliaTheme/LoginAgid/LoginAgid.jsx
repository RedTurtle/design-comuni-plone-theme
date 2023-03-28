/**
 * Login container.
 * @module components/theme/Login/Login
 */

import React from 'react';
import { Helmet } from '@plone/volto/helpers';
import { compose } from 'redux';
import { Container } from 'semantic-ui-react';
import { BodyClass } from '@plone/volto/helpers';
import { defineMessages, useIntl, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Login } from '@plone/volto/components';
import {
  RemoveBodyClass,
  LoginAgidButtons,
} from 'design-comuni-plone-theme/components/ItaliaTheme';

import config from '@plone/volto/registry';

const messages = defineMessages({
  login: {
    id: 'login_agid',
    defaultMessage: 'Log in',
  },
  loginDescription: {
    id: 'login_agid_description',
    defaultMessage:
      'To access the site and its services, use one of the following methods.',
  },
});

const LoginAgid = (props) => {
  const intl = useIntl();

  return (
    <>
      {!config.settings.siteProperties.spidLogin && <Login {...props}></Login>}
      <div id="page-login">
        <Helmet title={intl.formatMessage(messages.login)} />
        <Container className="view-wrapper py-5">
          <BodyClass className="public-ui" />
          <RemoveBodyClass className="cms-ui" />
          <h1>{intl.formatMessage(messages.login)}</h1>
          <p className="description">
            {intl.formatMessage(messages.loginDescription)}
          </p>
          <LoginAgidButtons />
        </Container>
      </div>
    </>
  );
};

export default compose(withRouter, injectIntl)(LoginAgid);
