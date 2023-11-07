/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { matchPath } from 'react-router';

import { useLocation } from 'react-router-dom';
import { isEqual } from 'lodash';
import { getBreadcrumbs } from '@plone/volto/actions';
import { getBaseUrl, flattenToAppURL } from '@plone/volto/helpers';

import { UniversalLink } from '@plone/volto/components';
import { Row, Col, BreadcrumbItem } from 'design-react-kit';
import GoogleBreadcrumbs from 'design-comuni-plone-theme/components/ItaliaTheme/Breadcrumbs/GoogleBreadcrumbs';
import config from '@plone/volto/registry';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
});

const Breadcrumbs = ({ pathname }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const location = useLocation();

  let items = useSelector((state) => state.breadcrumbs.items, isEqual);
  const subsite = useSelector((state) => state.subsite?.data);

  useEffect(() => {
    dispatch(getBreadcrumbs(getBaseUrl(pathname)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (subsite) {
    //se siamo nella root di un sottosito, non mostriamo le breadcrumbs. Serve anche per nasconderle dalla pagina dei risultati di ricerca quando si fa la ricerca in un sottosito
    if (
      items.length === 1 &&
      items[0].url === flattenToAppURL(subsite['@id'])
    ) {
      items = [];
    }
  }

  //Gestione delle rotte statiche. Se definito nel config della rotta un breadcrumbs_title, lo aggiungo alle breadcrumbs
  const breadcrumbs_routes = config.addonRoutes.filter((route) => {
    const paths = typeof route.path === 'string' ? [route.path] : route.path;
    return (
      paths.filter(
        (p) =>
          matchPath(location.pathname, p) != null ||
          matchPath(location.pathname, p.replace('**/', '')) != null,
      ).length > 0 && route.breadcrumbs_title != null
    );
  });

  if (breadcrumbs_routes.length > 0) {
    const route = breadcrumbs_routes[0];
    if (items === null) {
      items = [];
    }
    if (
      (items.length > 0 && items[items.length - 1].url !== location.pathname) ||
      items.length == 0
    ) {
      items.push({
        url: location.pathname,
        title: intl.formatMessage(route.breadcrumbs_title),
      });
    }
  }
  /** fine della gestione delle rotte statiche */

  return items?.length > 0 ? (
    <>
      <GoogleBreadcrumbs items={items} />
      <Row>
        <Col>
          <nav className="breadcrumb-container" aria-label="breadcrumb">
            <ol className="breadcrumb" data-element="breadcrumb">
              <BreadcrumbItem tag="li">
                <UniversalLink href="/">
                  {intl.formatMessage(messages.home)}
                </UniversalLink>
                <span className="separator">/</span>
              </BreadcrumbItem>
              {items.map((item, index, items) => (
                <BreadcrumbItem tag="li" key={item.url}>
                  {index < items.length - 1 && (
                    <UniversalLink href={item.url}>{item.title}</UniversalLink>
                  )}
                  {index === items.length - 1 && <span>{item.title}</span>}
                  {index < items.length - 1 && (
                    <span className="separator">/</span>
                  )}
                </BreadcrumbItem>
              ))}
            </ol>
          </nav>
        </Col>
      </Row>
    </>
  ) : null;
};

Breadcrumbs.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Breadcrumbs;
