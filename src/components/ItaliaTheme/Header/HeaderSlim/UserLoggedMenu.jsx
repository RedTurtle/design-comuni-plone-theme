/**
 * UserLoggedMenu component.
 * TODO: usare plone portal actions ?
 */

import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { LinkListItem } from 'design-react-kit';

const messages = defineMessages({
  areaPersonale: {
    id: 'areaPersonale',
    defaultMessage: 'Area personale',
  },
  areaOperatore: {
    id: 'areaOperatore',
    defaultMessage: 'Area operatore',
  },
});

const UserLoggedMenu = ({ userLogged }) => {
  const intl = useIntl();

  return (
    <>
      <LinkListItem divider tag="a" />
      {userLogged.roles &&
      userLogged?.roles.find((e) => e === 'Gestore Pratiche') ? (
        <>
          <LinkListItem
            href={'/area-personale-operatore'}
            title={intl.formatMessage(messages.areaOperatore)}
            tag="a"
            className="link-areaOperatore"
          >
            <span>{intl.formatMessage(messages.areaOperatore)}</span>
          </LinkListItem>
          <LinkListItem divider tag="a" />
        </>
      ) : (
        <>
          <LinkListItem
            href={'/area-personale-cittadino'}
            title={intl.formatMessage(messages.areaPersonale)}
            tag="a"
            className="link-areaPersonale"
          >
            <span>{intl.formatMessage(messages.areaPersonale)}</span>
          </LinkListItem>
          <LinkListItem divider tag="a" />
        </>
      )}
    </>
  );

  /*Example:

  return (
    <>
      <LinkListItem
        to="/ar/i-miei-servizi"
        title={intl.formatMessage(messages.ar_i_miei_servizi)}
        tag={Link}
      >
        <span>{intl.formatMessage(messages.ar_i_miei_servizi)}</span>
      </LinkListItem>
      <LinkListItem
        to="/ar/le-mie-pratiche"
        title={intl.formatMessage(messages.ar_le_mie_pratiche)}
        tag={Link}
      >
        <span>{intl.formatMessage(messages.ar_le_mie_pratiche)}</span>
      </LinkListItem>
      <LinkListItem
        to="/ar/notifiche"
        title={intl.formatMessage(messages.notifiche)}
        tag={Link}
      >
        <span>{intl.formatMessage(messages.notifiche)}</span>
      </LinkListItem>
    </>
  );
  */
};

export default UserLoggedMenu;
