import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000",
    defaultCommandTimeout: 60000,
    experimentalStudio: true,
    specPattern: "./src/**/*.cypress.ts",
    viewportHeight: 800,
    viewportWidth: 1280,
  },
});
