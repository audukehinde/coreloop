const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',

  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },

  retries: {
    runMode: 2,
    openMode: 0,
  },

  viewportWidth: 1440,
  viewportHeight: 900,

  video: true,
  screenshotOnRunFailure: true,

  e2e: {
    baseUrl:
      process.env.CYPRESS_BASE_URL ||
      'https://coreloops-v2-350156031212.europe-west2.run.app/auth/login',

    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',

    setupNodeEvents(on, config) {
      return config;
    },
  },
});