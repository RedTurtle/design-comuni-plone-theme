/**
 * RequestTimeout.
 * @module components/theme/RequestTimeout/RequestTimeout
 */
/*
  Custumizations:
    - Added check for blocked keywords in the URL to display new Adblock message
    - Changed paragraph size
*/

import React from 'react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { Container } from 'semantic-ui-react';
import config from '@plone/volto/registry';
import { useLocation } from 'react-router-dom';

/**
 * @function RequestTimeout
 * @returns {string} Markup of the not found page.
 */

const messages = defineMessages({
  adBlockMessage: {
    id: 'requestTimeout_adBlockMessage',
    defaultMessage:
      'In some cases, the problem could also be caused by extensions like AdBlock installed on the browser: try temporarily disabling them and repeating the operation.',
  },
});

const RequestTimeout = () => {
  const location = useLocation();
  const currentPath = location.pathname.toLowerCase();
  const intl = useIntl();

  const blockedKeywords = [
    'ads',
    'adserver',
    'sponsor',
    'advertising',
    'banner',
    'popup',
    'tracking',
    'affiliate',
    'doubleclick',
    'tracker',
    'promo',
    'pubblicita',
    'annuncio',
    'tracciamento',
    'affiliato',
  ];

  const hasBlockedKeyword = blockedKeywords.some((keyword) =>
    currentPath.includes(keyword),
  );

  const errorMessage = (
    <p
      className="description"
      style={{
        textAlign: 'center',
        margin: '20px auto',
        width: hasBlockedKeyword ? 'auto' : '475px',
        maxWidth: '780px',
      }}
    >
      <FormattedMessage
        id="The backend is not responding, due to a server timeout or a connection problem of your device. Please check your connection and try again."
        defaultMessage="The backend is not responding, due to a server timeout or a connection problem of your device. Please check your connection and try again."
      />
      {hasBlockedKeyword && (
        <>
          <br />
          {intl.formatMessage(messages.adBlockMessage)}
        </>
      )}
    </p>
  );

  return (
    <Container
      className="view-wrapper"
      style={{
        fontFamily: 'Helvetica, sans-serif',
        fontSize: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem 0',
      }}
    >
      {__DEVELOPMENT__ && (
        <>
          <h1 style={{ textAlign: 'center', lineHeight: '40px' }}>
            <FormattedMessage
              id="No connection to the server"
              defaultMessage="There is no connection to the server, due to a timeout o no network connection."
            />
            <br />
            <a href={config.settings.apiPath}>{config.settings.apiPath}</a>
          </h1>
          {errorMessage}
        </>
      )}
      {!__DEVELOPMENT__ && (
        <>
          {errorMessage}
          <p style={{ textAlign: 'center' }}>
            <FormattedMessage id="Thank you." defaultMessage="Thank you." />
          </p>
        </>
      )}
    </Container>
  );
};

export default RequestTimeout;
