const { defineConfig } = require("cypress");
const allureWriter = require("@shelex/cypress-allure-plugin/writer");


module.exports = defineConfig({
  e2e: {
    specPattern: "cypress/e2e/*.feature",
    baseUrl: "https://opensource-demo.orangehrmlive.com",
    setupNodeEvents(on, config) {
      require('@cypress/grep/src/plugin')(config)
      allureWriter(on, config);
      return require("./cypress/plugins")(on, config);
    },
    env: {
      allureReuseAfterSpec: true,
      download_dir: "./cypress/downloads",
      allure: true,
      allureResulsPath: "allure-results",
      snapshotOnly: true,
      
    },

    videosFolder: "allure-results/",
    screenshotOnRunFailure: true,
  },
});