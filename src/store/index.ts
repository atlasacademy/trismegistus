import {
  configureStore,
  createListenerMiddleware,
  ListenerMiddlewareInstance,
} from "@reduxjs/toolkit";
import { createHashHistory } from "history";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
} from "react-redux";
import { createReduxHistoryContext } from "redux-first-history";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { gameProviderApi } from "@/api";

import { PartyReducer } from "./PartyReducer";

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({
    history: createHashHistory(),
  });

const listenersMiddleware = createListenerMiddleware();
const { reducerPath, reducer: gameProviderReducer } = gameProviderApi;
const apiReducer = persistReducer(
  {
    key: "api",
    storage,
  },
  gameProviderReducer
);

export const store = configureStore({
  reducer: {
    router: routerReducer,
    [reducerPath]: apiReducer,
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
export const persistor = persistStore(store);

export type TrismegistusState = ReturnType<typeof store.getState>;
export type TrismegistusDispatch = typeof store.dispatch;
export type TrismegistusListeners = ListenerMiddlewareInstance<
  TrismegistusState,
  TrismegistusDispatch
>;

export const listeners = listenersMiddleware as TrismegistusListeners;
export const useDispatch: () => TrismegistusDispatch = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<TrismegistusState> =
  useReduxSelector;
