/**
 * Login container.
 * @module components/theme/Login/Login
 */

import React, { Component } from 'react';
import { Helmet } from '@plone/volto/helpers';
import { compose } from 'redux';
import { Container } from 'semantic-ui-react';
import { BodyClass } from '@plone/volto/helpers';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
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

/**
 * LoginAgid class.
 * @class LoginAgid
 * @extends Component
 */
class LoginAgid extends Component {
  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */

  render() {
    if (!config.settings.siteProperties.spidLogin) {
      // no spid login set
      return <Login {...this.props}></Login>;
    }
    return (
      <div id="page-login">
        <Helmet title={this.props.intl.formatMessage(messages.login)} />
        <Container className="view-wrapper">
          <BodyClass className="public-ui" />
          <RemoveBodyClass className="cms-ui" />
          <h1>
            <FormattedMessage {...messages.login} />
          </h1>
          <p className="description">
            <FormattedMessage {...messages.loginDescription} />
          </p>
          <LoginAgidButtons />
        </Container>
      </div>
    );
  }
}

export default compose(withRouter, injectIntl)(LoginAgid);
