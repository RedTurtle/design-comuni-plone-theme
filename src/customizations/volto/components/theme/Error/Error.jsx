/**
 * @module components/theme/Error/Error
 *
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/components/theme/Error/Error.jsx
 *
 * CUSTOMIZATIONS:
 * - added Sentry error logging: lazily loads @sentry/browser and reports
 *   errors to Sentry via a notifySentry() helper, passing the component
 *   props as context
 * - added console.error logging and a notifySentry() call for the
 *   "undefined status" dev-mode CORS error branch
 * - added an explicit branch for error.status.toString() === 'corsError'
 *   that also logs to console and calls notifySentry() (upstream only
 *   handled the undefined-status case)
 */

import React from 'react';
import loadable from '@loadable/component';
import config from '@plone/volto/registry';

const sentryLibraries = {
  Sentry: loadable.lib(
    () => import(/* webpackChunkName: "s_entry-browser" */ '@sentry/browser'),
  ),
};

/**
 * Error function.
 * @function Error
 * @returns {string} Markup of the error page.
 */
const Error = (props) => {
  const { views } = config;
  const { error } = props;
  let FoundView;

  // CUSTOMIZATION: added logging of errors
  const notifySentry = (message) => {
    const loaders = Object.entries(sentryLibraries).map(
      ([name, Lib]) =>
        new Promise((resolve) =>
          Lib.load().then((mod) => resolve([name, mod])),
        ),
    );
    Promise.all(loaders).then((libs) => {
      const libraries = Object.assign(
        {},
        ...libs.map(([name, lib]) => ({ [name]: lib })),
      );
      class MaybeCorsError extends Error {
        constructor(...args) {
          super(...args);
          this.name = 'MaybeCorsError';
        }
      }
      libraries.Sentry.captureException(new MaybeCorsError(message), {
        contexts: {
          props,
        },
      });
    });
  };

  if (error.status === undefined) {
    // For some reason, while development and if CORS is in place and the
    // requested resource is 404, it returns undefined as status, then the
    // next statement will fail
    // eslint-disable-next-line no-console
    console.error(
      'DEV MODE CORS ERROR in Error component: ',
      JSON.stringify(props, null, 2),
    );
    notifySentry('DEV MODE CORS ERROR in Error component');
    FoundView = views.errorViews.corsError;
  } else {
    if (error.status.toString() === 'corsError') {
      // eslint-disable-next-line no-console
      console.error(
        'CORS ERROR in Error component: ',
        JSON.stringify(props, null, 2),
      );
      notifySentry('CORS ERROR in Error component');
    }
    FoundView = views.errorViews[error.status.toString()];
  }
  if (!FoundView) {
    FoundView = views.errorViews['404']; // default to 404
  }
  return (
    <div id="view">
      <FoundView {...props} />
    </div>
  );
};

export default Error;
