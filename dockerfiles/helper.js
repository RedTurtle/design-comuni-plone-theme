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
