/**
 * Login container.
 * @module components/theme/Login/Login
 */

import React from 'react';
import { Helmet } from '@plone/volto/helpers';
import { compose } from 'redux';
import { BodyClass } from '@plone/volto/helpers';
import { defineMessages, useIntl, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import { Login } from '@plone/volto/components';
import { Row, Col, Container } from 'design-react-kit';
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
  const spidLoginUrl = __CLIENT__
    ? window.env.RAZZLE_SPID_LOGIN_URL
    : process.env.RAZZLE_SPID_LOGIN_URL;

  return (
    <>
      {!spidLoginUrl ? (
        <Login {...props}></Login>
      ) : (
        <div id="page-login">
          <Helmet title={intl.formatMessage(messages.login)} />
          <BodyClass className="public-ui" />
          <RemoveBodyClass className="cms-ui" />
          <Container className="view-wrapper py-5">
            <Row className="view-container">
              <Col xs={12} lg={{ size: 10, offset: 1 }}>
                <h1 sans-serfif="true">{intl.formatMessage(messages.login)}</h1>
                <p className="description">
                  {intl.formatMessage(messages.loginDescription)}
                </p>
              </Col>
            </Row>
            <hr className="d-none d-lg-block mt-0 mb-4" />
            <Row>
              <Col xs={12} lg={{ size: 8, offset: 2 }}>
                <LoginAgidButtons />
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </>
  );
};

export default compose(withRouter, injectIntl)(LoginAgid);
