/**
 * Replace with custom razzle config when needed.
 * @module razzle.config
 */

const path = require('path');

/**
 * This file is required through the `design-comuni-plone-theme` symlink
 * inside a consuming site's node_modules. Node resolves symlinked modules to
 * their real filesystem path before processing further requires, so a plain
 * `require('@plone/razzle-dev-utils/...')` here would search this repo's own
 * (sibling, unrelated) directory tree instead of the consuming site's
 * node_modules. Anchor the resolution to process.cwd() - razzle always runs
 * with the site's root as the working directory - to find the real package.
 */
const makeLoaderFinder = require(
  require.resolve('@plone/razzle-dev-utils/makeLoaderFinder', {
    paths: [process.cwd()],
  }),
);
const fileLoaderFinder = makeLoaderFinder('file-loader');
const urlLoaderFinder = makeLoaderFinder('url-loader');
const lessLoaderFinder = makeLoaderFinder('less-loader');
const babelLoaderFinder = makeLoaderFinder('babel-loader');

const plugins = (defaultPlugins) => {
  const newPlugins = defaultPlugins.filter((plugin) => plugin.name !== 'scss');
  newPlugins.push({
    name: 'scss',
    object: require(
      require.resolve('@plone/volto/webpack-plugins/webpack-scss-plugin', {
        paths: [process.cwd()],
      }),
    ),
    options: {
      sass: {
        dev: {
          sassOptions: {
            includePaths: ['node_modules'],
            outputStyle: 'expanded',
            sourceMap: true,
            quiet: true,
            quietDeps: true,
            silenceDeprecations: [
              'import',
              'global-builtin',
              'color-functions',
              'legacy-js-api',
            ],
          },
        },
        prod: {
          sassOptions: {
            includePaths: ['node_modules'],
            outputStyle: 'expanded',
            sourceMap: true,
            quiet: true,
            quietDeps: true,
            silenceDeprecations: [
              'import',
              'global-builtin',
              'color-functions',
              'legacy-js-api',
            ],
          },
        },
      },
    },
  });
  return newPlugins;
};

const modify = (webpackConfig, { target, dev }, webpackObject) => {
  const fileLoader = webpackConfig.module.rules.find(fileLoaderFinder);
  fileLoader.exclude = [
    /bootstrap-italia\/src\/svg\/.*\.svg$/,
    ...fileLoader.exclude,
  ];

  const SVG_LOADER = {
    test: /bootstrap-italia\/src\/svg\/.*\.svg$/,
    use: [
      {
        loader: 'svg-loader',
      },
      {
        loader: 'svgo-loader',
        options: {
          plugins: [
            { name: 'removeTitle', params: { removeTitle: true } },
            { name: 'convertPathData', params: { convertPathData: false } },
            {
              name: 'removeUselessStrokeAndFill',
              params: { removeUselessStrokeAndFill: true },
            },
            { name: 'removeViewBox', params: { removeViewBox: false } },
            'removeDimensions',
          ],
        },
      },
    ],
  };

  webpackConfig.module.rules.push(SVG_LOADER);

  const urlLoader = webpackConfig.module.rules.find(urlLoaderFinder);
  urlLoader.exclude = [/\.(png|jpe?g)$/i, ...(urlLoader.exclude || [])];
  // see: node_modules/@plone/razzle/config/createConfig.js
  const IMG_LOADER = {
    test: /\.(png|jpe?g)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'static/media/[name].[hash:8].[ext]',
          emitFile: target === 'web',
        },
      },
      {
        // currently webpack 5 w/ asset is not supported by webpack-image-resize-loader
        // see https://github.com/Calvin-LL/webpack-image-resize-loader/issues/491
        // when Volto moves to webpack 5 w/ asset, this loader need to be reevaluated
        // or substituted by responsive-loader
        loader: 'webpack-image-resize-loader',
        // see https://github.com/Calvin-LL/webpack-image-resize-loader for options.
        // options: {
        //   width: 1000,
        // },
      },
    ],
  };

  webpackConfig.module.rules.push(IMG_LOADER);

  const lessLoader = webpackConfig.module.rules.find(lessLoaderFinder);
  lessLoader.include.push(/node_modules\/volto-data-grid-widget/);
  // This addon is consumed through a plain filesystem symlink
  // (site/src/addons/design-comuni-plone-theme -> this repo), not a
  // node_modules one, so webpack's registry-derived include entries don't
  // cover it; add its own real path explicitly.
  lessLoader.include.push(path.resolve(__dirname));

  // See https://github.com/italia/design-react-kit/pull/885#issuecomment-1420886066
  const babelLoader = webpackConfig.module.rules.find(babelLoaderFinder);
  babelLoader.include.push(/node_modules\/design-react-kit/);

  return webpackConfig;
};

module.exports = {
  modify,
  plugins,
};
