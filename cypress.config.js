const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'design-comuni-plone-theme',
  e2e: {
    baseUrl: 'http://localhost:3000',
    excludeSpecPattern: ['*~'],
    specPattern: 'cypress/tests/**/*.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
