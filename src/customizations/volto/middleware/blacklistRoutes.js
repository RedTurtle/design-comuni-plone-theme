/**
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/middleware/blacklistRoutes.js
 * (backport of https://github.com/plone/volto/pull/4854)
 *
 * PR #4854 ("Strip `++api++` from location changes") was merged upstream in 2024, but the
 * `/++api++` handling is no longer present in the 18.0.3 `blacklistRoutes.js` (it appears to have
 * been reworked/relocated, e.g. towards `MultilingualRedirector`), so this file still diverges
 * from current upstream rather than being a no-op.
 *
 * CUSTOMIZATIONS:
 * - `pathname` is destructured with `let` (instead of `const`) so it can be reassigned below.
 * - On `@@router/LOCATION_CHANGE`, if `pathname` starts with `/++api++`, strips that prefix from
 *   `actionToSend.payload.location.pathname`, updates `pathname` accordingly, and calls
 *   `window.history.replaceState(window.history.state, '', pathname)` so the browser URL no
 *   longer shows the `++api++` traversal segment.
 * - Dispatches the mutated `actionToSend` (rather than the original `action`) to `next(...)`, and
 *   uses `route.url(actionToSend.payload)` instead of `route.url(action.payload)` when an
 *   external route matches.
 */

import config from '@plone/volto/registry';
import { matchPath } from 'react-router';

const blacklistRoutes =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    if (typeof action === 'function') {
      return next(action);
    }

    switch (action.type) {
      case '@@router/LOCATION_CHANGE':
        let { pathname } = action.payload.location;
        const { externalRoutes = [] } = config.settings;

        const route = externalRoutes.find((route) =>
          matchPath(pathname, route.match),
        );

        let actionToSend = action;
        if (pathname.startsWith('/++api++')) {
          actionToSend.payload.location.pathname =
            actionToSend.payload.location.pathname.substring(8);
          // To handle the `window.location.replace`
          pathname = actionToSend.payload.location.pathname;
          if (window.history) {
            window.history.replaceState(window.history.state, '', pathname);
          }
        }

        if (!route) {
          return next(actionToSend);
        } else {
          window.location.replace(
            route.url ? route.url(actionToSend.payload) : pathname,
          );
        }
        break;
      default:
        return next(action);
    }
  };

export default blacklistRoutes;
