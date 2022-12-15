import {
  configureStore,
  createListenerMiddleware,
  ListenerMiddlewareInstance,
} from "@reduxjs/toolkit";
import { useMemo } from "react";
import {
  EqualityFn,
  NoInfer,
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
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
import { deserializeProtoState } from "@/store/deserializeProtoState";
import { teamsReducer } from "@/store/slice/teamSlice";
import { userReducer } from "@/store/slice/userSlice";

const listenersMiddleware = createListenerMiddleware();

function createStore() {
  const serializedInitialState = new URLSearchParams(
    window.location.search
  ).get("o");
  const teams = deserializeProtoState(serializedInitialState);

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

/**
 * An augmented version of {@link useReduxSelector} that accepts selector
 * creators and memoizes the given selector based on extra params.
 */
export function useMemoSelector<TSelected, TParams extends any[]>(
  selectorFactory: (
    ...params: [...TParams]
  ) => (state: TrismegistusState) => TSelected,
  params: TParams,
  equalityFn?: EqualityFn<NoInfer<TSelected>>
): TSelected {
  const memoizedSelector = useMemo(
    () => selectorFactory(...params),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectorFactory, ...params]
  );
  return useSelector(memoizedSelector, equalityFn);
}
export { selectTeamServantWithDefaults } from "@/store/entity/servant";
