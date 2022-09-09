import React from "react";
import "./i18next.config";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
//
import "@vismaux/nordic-cool/dist/css/nc.min.css";
import "./index.css";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
