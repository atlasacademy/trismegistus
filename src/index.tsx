import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import ReactModal from "react-modal";
import { Provider } from "react-redux";
import { HistoryRouter as Router } from "redux-first-history/rr6";
import { PersistGate } from "redux-persist/integration/react";

import { history, persistor, store } from "./store";
import { Trismegistus } from "./Trismegistus";

const appElement = document.getElementById("root")!;
createRoot(appElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Trismegistus />
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
ReactModal.setAppElement(appElement);
