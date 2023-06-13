import { useEffect } from "react";
import { AnyAction } from "redux";

import { listeners, TrismegistusState } from "@/store";

export interface UseSerializedStateOptions<T> {
  searchParam: string;
  predicate(
    action: AnyAction,
    currentState: TrismegistusState,
    previousState: TrismegistusState
  ): boolean;
  selector(state: TrismegistusState): T;
  serializer(state: T): string;
}

export function useSerializedState<T>({
  searchParam,
  predicate,
  selector,
  serializer,
}: UseSerializedStateOptions<T>) {
  useEffect(() => {
    return listeners.startListening({
      predicate,
      effect: async (_, listenerApi) => {
        const { cancelActiveListeners, delay, getState } = listenerApi;
        cancelActiveListeners();
        await delay(250);
        const state = selector(getState());
        const serializedState = serializer(state);
        const queryParams = new URLSearchParams({
          [searchParam]: serializedState,
        }).toString();
        window.history.replaceState(null, "", `?${queryParams}`);
      },
    });
  });
}
