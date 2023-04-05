/* eslint-disable react-hooks/exhaustive-deps */
/**
 * SpidLogin component.
 * @module components/ItaliaTheme/Header/HeaderSlim/SpidLogin
 */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import jwtDecode from 'jwt-decode';
import {
  Row,
  Col,
  DropdownMenu,
  DropdownToggle,
  LinkList,
  LinkListItem,
  UncontrolledDropdown,
} from 'design-react-kit';

import { getUser, logout, purgeMessages } from '@plone/volto/actions';

import { BodyClass } from '@plone/volto/helpers';

import {
  Icon,
  UserLoggedMenu,
  LoginButton,
} from 'design-comuni-plone-theme/components/ItaliaTheme';

const messages = defineMessages({
  spidLogin: {
    id: "Accedi all'area personale",
    defaultMessage: "Accedi all'area personale",
  },
  areaPersonale: {
    id: 'areaPersonale',
    defaultMessage: 'Area personale',
  },
  areaOperatore: {
    id: 'areaOperatore',
    defaultMessage: 'Area operatore',
  },
  spidLogout: {
    id: 'spidLogout',
    defaultMessage: 'Esci',
  },
});

const SpidLogin = () => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const userId = useSelector((state) =>
    state.userSession.token ? jwtDecode(state.userSession.token).sub : null,
  );

  const userLogged = useSelector((state) => state.users.user);
  const userLoggedSt = useSelector((state) => state.users);

  useEffect(() => {
    if (!userLoggedSt?.get?.loading && userId) {
      dispatch(getUser(userId));
    }
  }, [userId]);

  const doLogout = () => {
    dispatch(logout());
    dispatch(purgeMessages());
  };

  let rolesBodyClasses = [];
  // eslint-disable-next-line no-unused-expressions
  userLogged?.roles?.forEach((role) => {
    rolesBodyClasses.push(`role-${role.toLowerCase()}`);
  });

  if (!userLogged?.roles || userLogged?.roles?.length === 0) {
    rolesBodyClasses.push('no-user-roles');
  }

  const spidLoginUrl = __CLIENT__
    ? window.env.RAZZLE_SPID_LOGIN_URL
    : process.env.RAZZLE_SPID_LOGIN_URL;
  const spidLogoutUrl = __CLIENT__
    ? window.env.RAZZLE_SPID_LOGOUT_URL
    : process.env.RAZZLE_SPID_LOGOUT_URL;

  return (
    <>
      {/* add user roles classes to body */}
      {rolesBodyClasses?.length > 0 && (
        <BodyClass className={rolesBodyClasses.join(' ')} />
      )}

      {spidLoginUrl ? (
        <>
          {!userId ? (
            // not logged

            <LoginButton>
              <span className="rounded-icon">
                <Icon color="primary" icon="it-user" padding={false} size="" />
              </span>
              <span className="d-none d-lg-block">
                {intl.formatMessage(messages.spidLogin)}
              </span>
            </LoginButton>
          ) : (
            // logged
            <>
              {/* dropdown */}
              <UncontrolledDropdown nav tag="div">
                <DropdownToggle
                  aria-haspopup
                  caret
                  color="secondary"
                  nav
                  className="btn-icon"
                >
                  <span className="rounded-icon">
                    <Icon color="primary" icon="it-user" size="" />
                  </span>
                  <span className="d-none d-lg-block">
                    {userLogged.fullname
                      ? userLogged.fullname
                      : userLogged.username}
                  </span>
                  <Icon color="" icon="it-expand" padding={false} size="" />
                </DropdownToggle>
                <DropdownMenu flip tag="div">
                  <Row tag="div">
                    <Col
                      size="12"
                      tag="div"
                      widths={['xs', 'sm', 'md', 'lg', 'xl']}
                    >
                      <LinkList tag="div">
                        <UserLoggedMenu />
                        <LinkListItem divider tag="a" />

                        {/* Gestione IO-CITTADINO */}
                        {userLogged.roles &&
                        userLogged?.roles.find(
                          (e) => e === 'Gestore Pratiche',
                        ) ? (
                          <>
                            <LinkListItem
                              href={'/area-personale-operatore'}
                              title={intl.formatMessage(messages.areaOperatore)}
                              tag="a"
                              className="link-areaOperatore"
                            >
                              <span>
                                {intl.formatMessage(messages.areaOperatore)}
                              </span>
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
                              <span>
                                {intl.formatMessage(messages.areaPersonale)}
                              </span>
                            </LinkListItem>
                            <LinkListItem divider tag="a" />
                          </>
                        )}

                        <LinkListItem
                          href={spidLogoutUrl || '/logout'}
                          title={intl.formatMessage(messages.spidLogout)}
                          tag="a"
                          onClick={() => {
                            if (!spidLogoutUrl) {
                              doLogout();
                            }
                          }}
                          className="logout"
                        >
                          <Icon color="" icon="sign-out-alt" size="sm" left />
                          <span>{intl.formatMessage(messages.spidLogout)}</span>
                        </LinkListItem>
                      </LinkList>
                    </Col>
                  </Row>
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
          )}
        </>
      ) : null}
    </>
  );
};

export default SpidLogin;
