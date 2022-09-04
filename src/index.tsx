import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import ReactModal from "react-modal";
import { Provider } from "react-redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";

import { history, store } from "./store";
import { Trismegistus } from "./Trismegistus";

const appElement = document.getElementById("root")!;
createRoot(appElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <Trismegistus />
      </Router>
    </Provider>
  </React.StrictMode>
);
ReactModal.setAppElement(appElement);
