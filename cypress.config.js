const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  reporter: 'mochawesome',

  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: true,
    json: true,
  },

  e2e: {
    // implement node event listeners here
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    baseUrl: "https://coreloops-v2-350156031212.europe-west2.run.app/auth/login"
  },
  viewportWidth: 1440,
  viewportHeight: 900,

  video: true,

  screenshotOnRunFailure: true,

  defaultCommandTimeout: 10000,

  pageLoadTimeout: 30000,

  requestTimeout: 15000,

  responseTimeout: 15000,
});
