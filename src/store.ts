import { configureStore } from "@reduxjs/toolkit";
import { createHashHistory } from "history";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { createReduxHistoryContext } from "redux-first-history";

export function prepareStore() {
  const { createReduxHistory, routerMiddleware, routerReducer } =
    createReduxHistoryContext({ history: createHashHistory() });

  const store = configureStore({
    reducer: {
      router: routerReducer,
    },
    middleware(defaultMiddlewares) {
      return defaultMiddlewares().concat(routerMiddleware);
    },
  });

  const history = createReduxHistory(store);

  return { store, history };
}

export const { store, history } = prepareStore();

export type MainState = ReturnType<typeof store.getState>;
export type MainDispatch = typeof store.dispatch;

export const useMainDispatch: () => MainDispatch = useDispatch;
export const useMainSelector: TypedUseSelectorHook<MainState> = useSelector;
