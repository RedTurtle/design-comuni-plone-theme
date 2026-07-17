import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { BodyClass } from '@plone/volto/helpers';
import ScrollToTop from 'design-comuni-plone-theme/components/ItaliaTheme/ScrollToTop/ScrollToTop';
import { SubsiteLoader } from 'volto-subsites';
import config from '@plone/volto/registry';

const GenericAppExtras = (props) => {
  const location = useLocation();

  // TEMP DEBUG: log every add/remove of the cms-ui/public-ui body classes,
  // with a timestamp, to see the exact sequence during a SPA route
  // transition. Remove once the flicker is diagnosed.
  useEffect(() => {
    if (!__CLIENT__) return;
    const log = (label) =>
      // eslint-disable-next-line no-console
      console.log(
        `[body-class-debug] ${performance.now().toFixed(1)}ms ${label} -> "${document.body.className}"`,
      );
    log('init');
    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => log('mutation'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const subsite = useSelector((state) => state.subsite?.data);
  const subsiteLoadable =
    config.settings.loadables['subsite-' + subsite?.subsite_css_class?.token];
  if (subsiteLoadable) {
    subsiteLoadable.load();
  }

  const FORCE_PUBLIC_UI = ['/sitemap', '/search'];
  const normalizedPathname = `/${location.pathname}`.replace(/\/$/, '');
  // endsWith (not a substring regex) so e.g. "/a-search-folder/contents" doesn't
  // false-positive into public-ui just because its path contains "/search"
  const isPublicUI = FORCE_PUBLIC_UI.some((route) =>
    normalizedPathname.endsWith(route),
  );

  return (
    <>
      {isPublicUI && (
        <>
          <BodyClass className="public-ui" />
          <BodyClass className="cms-ui" remove={true} />
        </>
      )}
      <ScrollToTop />
      <SubsiteLoader pathname={location.pathname} />
    </>
  );
};
export default GenericAppExtras;
