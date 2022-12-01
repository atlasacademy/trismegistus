import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { Trismegistus } from "@/Trismegistus";

import { persistor, store } from "./store";

const appElement = document.getElementById("root")!;
createRoot(appElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Trismegistus />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
