/**
 * @module components/theme/Unauthorized/Unauthorized
 */

import React from 'react';
import { FormattedMessage, defineMessages } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';
import { BodyClass } from '@plone/volto/helpers';
import {
  LoginAgidButtons,
  RemoveBodyClass,
} from 'design-comuni-plone-theme/components/ItaliaTheme';

/**
 * unauthorized function.
 * @function Unauthorized
 * @returns {string} Markup of the unauthorized page.
 */

const messages = defineMessages({
  unauthorizedDescription: {
    id: 'unauthorized_description',
    defaultMessage:
      'You are trying to access a protected resource, please login first.',
  },
});

const Unauthorized = () => {
  return (
    <Container className="view-wrapper">
      <BodyClass className="public-ui" />
      <RemoveBodyClass className="cms-ui" />
      <h1>
        <FormattedMessage id="Unauthorized" defaultMessage="Unauthorized" />
      </h1>
      <p className="description">
        <FormattedMessage {...messages.unauthorizedDescription} />
      </p>
      <LoginAgidButtons />
      <p>
        <FormattedMessage
          id="If you are certain you have the correct web address but are encountering an error, please contact the {site_admin}."
          defaultMessage="If you are certain you have the correct web address but are encountering an error, please contact the {site_admin}."
          values={{
            site_admin: (
              <Link to="/contact-form">
                <FormattedMessage
                  id="Site Administration"
                  defaultMessage="Site Administration"
                />
              </Link>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage id="Thank you." defaultMessage="Thank you." />
      </p>
    </Container>
  );
};

export default withServerErrorCode(401)(Unauthorized);
