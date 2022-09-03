import {
  configureStore,
  createListenerMiddleware,
  ListenerMiddlewareInstance,
} from "@reduxjs/toolkit";
import { createHashHistory } from "history";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createReduxHistoryContext } from "redux-first-history";

import { gameProviderApi } from "@/api";

import { PartyReducer } from "./PartyReducer";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createHashHistory(),
  });
const listenersMiddleware = createListenerMiddleware();
export const store = configureStore({
  reducer: {
    router: routerReducer,
    [gameProviderApi.reducerPath]: gameProviderApi.reducer,
    party: PartyReducer,
  },
  middleware(defaultMiddlewares) {
    return defaultMiddlewares()
      .concat(routerMiddleware)
      .concat(gameProviderApi.middleware)
      .prepend(listenersMiddleware.middleware);
  },
});

export const history = createReduxHistory(store);

export type MainState = ReturnType<typeof store.getState>;
export type MainDispatch = typeof store.dispatch;
export type MainListeners = ListenerMiddlewareInstance<MainState, MainDispatch>;

export const listeners = listenersMiddleware as MainListeners;
export const useMainDispatch: () => MainDispatch = useDispatch;
export const useMainSelector: TypedUseSelectorHook<MainState> = useSelector;
