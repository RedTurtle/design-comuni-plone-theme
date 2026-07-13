/**
 * If you want to apply semantic ui only to the toolbar
 * and all administrative or editorial views,
 * uncomment the following line and comment the line:
 * `import 'semantic-ui-less/semantic.less';`
 *
 * Then, in your `theme.config` file, change the following variable:
 * `@container   : 'pastanaga-cms-ui'`
 */

/*
 * original: https://raw.githubusercontent.com/plone/volto/18.35.0/packages/volto/src/theme.js
 *
 * CUSTOMIZATIONS:
 * - Swapped which semantic-ui build is active: `semantic-ui-less/semantic.less`
 *   is now commented out and this add-on's own fork of
 *   `@plone/volto/../theme/themes/pastanaga-cms-ui/extras/cms-ui.semantic.less`
 *   (see `design-comuni-plone-theme/theme/vendor-overrides/cms-ui.semantic.less`)
 *   is imported instead, so the pastanaga-cms-ui container variant (Volto's
 *   toolbar/admin skin) is applied everywhere, not just in the toolbar - plus
 *   on #page-login, since Volto 18.35 made /login `public-ui` by default but
 *   its stock Login.jsx still relies on this semantic-ui component styling.
 * - Added `typeface-titillium-web`, `typeface-roboto-mono` and `typeface-lora`
 *   imports, needed by the Bootstrap Italia / design-comuni-plone-theme font
 *   stack.
 * - Added `design-comuni-plone-theme/theme/site.scss` to load this add-on's
 *   own Bootstrap Italia based theme entry point on top of Volto's base
 *   styles.
 */
import 'design-comuni-plone-theme/theme/vendor-overrides/cms-ui.semantic.less';
// import '@plone/volto/../theme/themes/pastanaga-cms-ui/extras/cms-ui.semantic.less';
// import 'semantic-ui-less/semantic.less';
import '@plone/volto/../theme/themes/pastanaga/extras/extras.less';
import 'typeface-titillium-web';
import 'typeface-roboto-mono';
import 'typeface-lora';
import 'design-comuni-plone-theme/theme/site.scss';
