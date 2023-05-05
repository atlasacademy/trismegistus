import {
  configureStore,
  createListenerMiddleware,
  ListenerMiddlewareInstance,
} from "@reduxjs/toolkit";
import {
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  useStore as useReduxStore,
} from "react-redux";
import { persistStore } from "redux-persist";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist/es/constants";

import { apiMiddleware, apiReducer, apiReducerPath } from "@/api";
import { deserializeState } from "@/helpers/deserializeState";
import { teamsReducer } from "@/store/slice/teamSlice";
import { userReducer } from "@/store/slice/userSlice";

const listenersMiddleware = createListenerMiddleware();

function createStore() {
  const queryParams = new URLSearchParams(window.location.search);
  const serializedInitialState = queryParams.get("o") ?? "";
  const teams = deserializeState(serializedInitialState);

  return configureStore({
    reducer: {
      [apiReducerPath]: apiReducer,
      user: userReducer,
      teams: teamsReducer,
    },
    middleware(defaultMiddlewares) {
      return defaultMiddlewares({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      })
        .concat(apiMiddleware)
        .prepend(listenersMiddleware.middleware);
    },
    preloadedState: { teams },
  });
}
export const store = createStore();

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
export const useStore = useReduxStore<TrismegistusState>;
