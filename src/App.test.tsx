import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { describe, expect } from "vitest";
import { render, screen } from "@testing-library/react";
//
import { store } from "./store";
import App from "./App";

describe("App", () => {
  it("renders the home", () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );
    // note that the test uses a key instead of a real text,
    //  because i18n is currently not used in the test context
    expect(screen.getByText(/home.intro/i)).toBeDefined();
  });
});
