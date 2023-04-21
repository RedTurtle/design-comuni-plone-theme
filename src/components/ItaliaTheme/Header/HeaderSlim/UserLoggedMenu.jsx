/**
 * UserLoggedMenu component.
 * @module components/ItaliaTheme/Header/HeaderSlim/UserLoggedMenu
 *
 * le azione proposte sono configurate in config.settings.siteProperties.UserLoggedMenu
 * nella forma:
 *     UserLoggedMenu: [
 *       {
 *         href: { it: '/area-personale-cittadino' },
 *         title: { it: 'Area personale' },
 *         roles: [],
 *         className: 'link-areaPersonale',
 *       },
 *       {
 *         href: { it: '/area-personale-operatore' },
 *         title: { it: 'Area operatore' },
 *         roles: ['Gestore Pratiche'],
 *         className: 'link-areaOperatore',
 *       },
 *     ],
 *
 */

import React from 'react';
import { useIntl } from 'react-intl';
import { LinkListItem } from 'design-react-kit';
import config from '@plone/volto/registry';

// const messages = defineMessages({
//   areaPersonale: {
//     id: 'areaPersonale',
//     defaultMessage: 'Area personale',
//   },
//   areaOperatore: {
//     id: 'areaOperatore',
//     defaultMessage: 'Area operatore',
//   },
// });

const UserLoggedMenu = ({ userLogged }) => {
  const intl = useIntl();
  const items = config.settings.siteProperties.UserLoggedMenu || [];
  return (
    <>
      <LinkListItem divider tag="a" />
      {items
        .filter(
          (item) =>
            !item.roles ||
            item.roles.length === 0 ||
            (item.roles &&
              userLogged.roles &&
              userLogged?.roles.find((e) => item.roles.includes(e))),
        )
        .map((item, index) => (
          <>
            <LinkListItem
              key={index}
              href={item.href?.[intl.locale] || item.href.it}
              title={item.title?.[intl.locale] || item.title.it}
              tag="a"
              className={item.className}
            >
              <span>{item.title?.[intl.locale] || item.title.it}</span>
            </LinkListItem>
            <LinkListItem divider tag="a" />
          </>
        ))}
      {/* {userLogged.roles &&
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
      )} */}
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
