import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";

import { history, store } from "./store";
import { Trismegistus } from "./Trismegistus";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Trismegistus />
      </Router>
    </Provider>
  </React.StrictMode>
);
