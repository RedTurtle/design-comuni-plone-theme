import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { BodyClass, hasBlocksData } from '@plone/volto/helpers';
import ScrollToTop from 'design-comuni-plone-theme/components/ItaliaTheme/ScrollToTop/ScrollToTop';
import { SubsiteLoader } from 'volto-subsites';
import config from '@plone/volto/registry';

const GenericAppExtras = (props) => {
  const location = useLocation();

  // volto-blocks-widget (used by non-visual content types such as News/Event
  // for their single "blocks" field) keeps its own Sidebar always mounted
  // (just hidden via CSS) to avoid a createPortal crash on Volto 19. That
  // Sidebar instance still fires its own `has-sidebar`/`has-sidebar-collapsed`
  // BodyClass on mount even while hidden, so the layout permanently reserves
  // sidebar width on those forms. Suppress the classes declaratively (via the
  // customized BodyClass's order-independent `remove`) unless we're either on
  // a genuinely block-editable content type (real Sidebar in use) or the
  // widget's field is actually focused (its Sidebar is actually visible).
  // See https://github.com/collective/volto-blocks-widget/issues/13
  const schemaProperties = useSelector(
    (state) => state.schema?.schema?.properties,
  );
  const blocksWidgetFieldSelected = useSelector(
    (state) => state.blocksWidgetSelected?.value,
  );
  const isVisualContentType = hasBlocksData(schemaProperties || {});
  const shouldSuppressSidebarClass =
    !isVisualContentType && !blocksWidgetFieldSelected;

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
      {shouldSuppressSidebarClass && (
        <>
          <BodyClass className="has-sidebar" remove={true} />
          <BodyClass className="has-sidebar-collapsed" remove={true} />
        </>
      )}
      <ScrollToTop />
      <SubsiteLoader pathname={location.pathname} />
    </>
  );
};
export default GenericAppExtras;
