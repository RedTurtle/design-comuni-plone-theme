/*
 * Jest's jsdom test environment does not expose Node's built-in global
 * `crypto` (available natively in Node 20+). `serialize-javascript`
 * (a dependency of @plone/volto's `Html.jsx` helper) calls
 * `crypto.getRandomValues()` at module-load time, so this polyfill must
 * run before any other setup file that may transitively import it.
 */
const nodeCrypto = require('crypto');

if (
  typeof global.crypto === 'undefined' ||
  typeof global.crypto.getRandomValues !== 'function'
) {
  global.crypto = nodeCrypto.webcrypto;
}
