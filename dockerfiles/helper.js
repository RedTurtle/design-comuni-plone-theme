const fs = require('fs');
const path = require('path');

const ADDON_NAME = process.env.ADDON_NAME || '';

const appFolder = path.resolve('/app');
const voltoConfigPath = path.resolve(appFolder, 'volto.config.js');
const rootPackageJsonPath = path.resolve(appFolder, 'package.json');

fs.writeFileSync(
  voltoConfigPath,
  `const addons = ["${ADDON_NAME}"];
const theme = "${ADDON_NAME}";

module.exports = {
  addons,
  theme,
};
`,
);

// Yarn-only `resolutions` in the addon's package.json have no effect under
// pnpm; pin the same versions via the workspace root's `pnpm.overrides`.
const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath));
rootPackageJson.pnpm = {
  ...rootPackageJson.pnpm,
  overrides: {
    ...rootPackageJson.pnpm?.overrides,
    react: '18.2.0',
    'react-dom': '18.2.0',
    // @eeacms/volto-taxonomy -> react-sortable-tree@2.8.0 ships a bundle
    // that references both the old decorator API (DragSource/DropTarget/
    // DragLayer) AND the newer context API (DndContext/DndProvider) from
    // react-dnd. The only version actually in the tree is react-dnd@5.0.0
    // (from volto-subblocks), which predates DndContext/DndProvider, so
    // the build fails with "export 'DndContext' was not found in
    // 'react-dnd'". 10.0.2 is the last react-dnd generation that still
    // exports both APIs, so pin it globally - it should satisfy
    // volto-subblocks' decorator usage too.
    'react-dnd': '10.0.2',
  },
  // pnpm skips build scripts for untrusted deps by default. sharp (pulled in
  // by webpack-image-resize-loader, used for our own IMG_LOADER webpack
  // rule) needs its postinstall to compile/download its native binary, or
  // any png/jpg import fails at build time with a missing sharp.node error.
  onlyBuiltDependencies: [
    ...(rootPackageJson.pnpm?.onlyBuiltDependencies || []),
    'sharp',
  ],
};
fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2));

// @plone/volto's own ButtonsWidget/AlignWidget snapshot tests embed
// react-aria's auto-incremented useId() output (e.g. "react-aria-:r6:").
// That counter depends on the exact dependency resolution order, which
// isn't stable once an addon's own tree is installed alongside core, so
// these two fail here regardless of anything in this addon. Not fixable
// from a consuming project - see https://github.com/plone/volto/issues/8305
// (closed upstream without a core fix). Exclude them from this addon's
// test run rather than leave a permanently-red, unactionable check.
// Patched directly on @plone/volto's own package.json (rather than
// forwarded through the root "test" script via pnpm's `--filter ... --`)
// because that route inserts an extra "--" that vitest then treats as an
// end-of-flags marker, so --exclude gets read as a positional test-name
// filter instead of an actual option.
const voltoPackageJsonPath = path.resolve(
  appFolder,
  'core/packages/volto/package.json',
);
const voltoPackageJson = JSON.parse(fs.readFileSync(voltoPackageJsonPath));
voltoPackageJson.scripts = {
  ...voltoPackageJson.scripts,
  test: `${voltoPackageJson.scripts.test} --exclude "**/ButtonsWidget.test.tsx" --exclude "**/AlignWidget.test.tsx"`,
};
fs.writeFileSync(
  voltoPackageJsonPath,
  JSON.stringify(voltoPackageJson, null, 2),
);
