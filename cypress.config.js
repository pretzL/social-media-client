require("dotenv").config();
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    URL: "http://127.0.0.1:5500/",
    setupNodeEvents(on, config) {
      config.env = {
        ...process.env,
        ...config.env,
      };
      return config;
    },
  },
  video: false,
});
