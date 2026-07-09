/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */

/*
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/components/theme/Breadcrumbs/Breadcrumbs.jsx
 *
 * CUSTOMIZATIONS:
 * - Replaced the semantic-ui-react Segment/Breadcrumb/Icon markup (home.svg
 *   icon, defineMessages for home/breadcrumbs/controlpanel labels, useIntl,
 *   the `getBreadcrumbs` redux action dispatch guarded by `hasApiExpander`,
 *   and the special-cased "/controlpanel" -> "Site Setup" breadcrumb item)
 *   with the `Breadcrumbs` component from
 *   design-comuni-plone-theme/components/ItaliaTheme, imported as
 *   `ItaliaBreadcrumbs` and invoked directly as a plain function call with
 *   `{ pathname }` (not rendered as a JSX element), which handles
 *   fetching/deriving the breadcrumb items itself.
 * - Added a `state.content.data` selector and a hardcoded
 *   `CT_CustomBreadcrumbs` list (currently `['Pagina Argomento']`): when the
 *   current content's `@type` is in that list the component renders nothing
 *   (`return null`), since those content-types render their own breadcrumbs
 *   in their content-type view.
 * - Wrapped the rendered breadcrumbs in a `.public-ui` div and a
 *   `<section id="briciole" className="container px-4 mt-4">` instead of the
 *   upstream `Segment`/`Container` markup.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { Breadcrumbs as ItaliaBreadcrumbs } from 'design-comuni-plone-theme/components/ItaliaTheme';

const Breadcrumbs = ({ pathname }) => {
  let brdc = ItaliaBreadcrumbs({ pathname: pathname });

  const content = useSelector((state) => state.content?.data);

  const CT_CustomBreadcrumbs = ['Pagina Argomento']; //don't display breadcrumbs for this content-types. They will be displayed by content-type view if needed.
  if (CT_CustomBreadcrumbs?.indexOf(content?.['@type']) >= 0) {
    return null;
  }
  return (
    <div className="public-ui">
      <section id="briciole" className="container px-4 mt-4">
        <div className="">{brdc}</div>
      </section>
    </div>
  );
};

Breadcrumbs.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default Breadcrumbs;
