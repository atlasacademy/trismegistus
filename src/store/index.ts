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
import { setupBidirectionalURISync } from "./URI";

export function prepareStore() {
  const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({
      history: createHashHistory(),
    });
  const listeners = createListenerMiddleware();
  setupBidirectionalURISync(listeners as any);

  const store = configureStore({
    reducer: {
      router: routerReducer,
      [gameProviderApi.reducerPath]: gameProviderApi.reducer,
      party: PartyReducer,
    },
    middleware(defaultMiddlewares) {
      return defaultMiddlewares()
        .concat(routerMiddleware)
        .concat(gameProviderApi.middleware)
        .prepend(listeners.middleware);
    },
  });
  const history = createReduxHistory(store);

  return { store, history, listeners };
}

const storeApi = prepareStore();

export const { store, history } = storeApi;

export type MainState = ReturnType<typeof store.getState>;
export type MainDispatch = typeof store.dispatch;
export type MainListerners = ListenerMiddlewareInstance<
  MainState,
  MainDispatch
>;

export const listeners = storeApi.listeners as MainListerners;
export const useMainDispatch: () => MainDispatch = useDispatch;
export const useMainSelector: TypedUseSelectorHook<MainState> = useSelector;
