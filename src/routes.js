/**
 * Routes.
 * @module routes
 */

import { App, Search } from '@plone/volto/components';
import { defaultRoutes, multilingualRoutes } from '@plone/volto/routes';
import loadable from '@loadable/component';
import config from '@plone/volto/registry';

const ReleaseLog = loadable(() =>
  import('design-comuni-plone-theme/components/ReleaseLog/ReleaseLog'),
);

export const italiaRoutes = [
  // Add design-comuni-plone-theme routes here
  {
    path: '/**/search',
    component: Search,
  },
  {
    path: '/release-log',
    component: ReleaseLog,
  },
];

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */

const filteredRoutes = defaultRoutes.filter(
  (item) => item.path !== '/contact-form',
);

const routes = [
  {
    path: '/',
    component: App, // Change this if you want a different component
    routes: [
      ...italiaRoutes,
      ...(config.addonRoutes || []),
      ...((config.settings?.isMultilingual && multilingualRoutes) || []),
      ...filteredRoutes,
    ],
  },
];

export default routes;
