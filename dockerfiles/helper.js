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
  },
};
fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2));
