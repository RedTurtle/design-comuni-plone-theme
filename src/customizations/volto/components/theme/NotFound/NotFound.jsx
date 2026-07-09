/*
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/components/theme/NotFound/NotFound.jsx
 *
 * CUSTOMIZATIONS:
 * - Extracted `navigationRootPath` (the multilingual-aware root path,
 *   `/${toBackendLang(lang)}` when `config.settings.isMultilingual`,
 *   otherwise `/`) into its own const, reused both in the `getNavigation`
 *   dispatch inside `useEffect` and in a newly added link (see below),
 *   instead of upstream's inline ternary computed only inside the dispatch
 *   call.
 * - Added a new paragraph, `<p><Link to={navigationRootPath}><FormattedMessage
 *   id="Home page" defaultMessage="Home page" /></Link></p>`, linking to the
 *   site's home page.
 * - Removed (commented out, not deleted) the upstream paragraph with the
 *   FormattedMessage id/defaultMessage "If you are certain you have the
 *   correct web address but are encountering an error, please contact the
 *   {site_admin}.", whose `site_admin` value was a `<Link to="/contact-form">`
 *   wrapping a FormattedMessage id/defaultMessage "Site Administration" —
 *   so the 404 page no longer offers that "Site Administration" contact
 *   link.
 */

import { useEffect } from 'react';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import {
  toBackendLang,
  withServerErrorCode,
} from '@plone/volto/helpers/Utils/Utils';
import { useDispatch, useSelector } from 'react-redux';
import { getNavigation } from '@plone/volto/actions/navigation/navigation';
import config from '@plone/volto/registry';

/**
 * Not found function.
 * @function NotFound
 * @returns {string} Markup of the not found page.
 */
const NotFound = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.intl.locale);

  const navigationRootPath = config.settings.isMultilingual
    ? `/${toBackendLang(lang)}`
    : '/';

  useEffect(() => {
    dispatch(getNavigation(navigationRootPath, config.settings.navDepth));
  }, [dispatch, lang, navigationRootPath]);

  return (
    <Container className="view-wrapper">
      <BodyClass className="page-not-found" />
      <h1>
        <FormattedMessage
          id="This page does not seem to exist…"
          defaultMessage="This page does not seem to exist…"
        />
      </h1>
      <p className="description">
        <FormattedMessage
          id="We apologize for the inconvenience, but the page you were trying to access is not at this address. You can use the links below to help you find what you are looking for."
          defaultMessage="We apologize for the inconvenience, but the page you were trying to access is not at this address. You can use the links below to help you find what you are looking for."
        />
      </p>
      <p>
        <Link to={navigationRootPath}>
          <FormattedMessage id="Home page" defaultMessage="Home page" />
        </Link>
      </p>
      {/* <p>
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
      </p> */}
      <p>
        <FormattedMessage id="Thank you." defaultMessage="Thank you." />
      </p>
    </Container>
  );
};

export default withServerErrorCode(404)(NotFound);
