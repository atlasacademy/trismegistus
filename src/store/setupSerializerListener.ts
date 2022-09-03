import { MainListeners, MainState } from ".";

export interface SetupSerializerListenerOptions<T> {
  listeners: MainListeners;
  selector: (state: MainState) => T;
  serializer: (state: T) => string;
  onComplete: (serializedState: string) => void;
}

export function setupSerializerListener<T>({
  listeners,
  selector,
  serializer,
  onComplete,
}: SetupSerializerListenerOptions<T>) {
  return listeners.startListening({
    predicate(_, currentState, previousState) {
      return selector(currentState) !== selector(previousState);
    },
    effect: async (_, listenerApi) => {
      const { cancelActiveListeners, delay, getState } = listenerApi;
      cancelActiveListeners();
      await delay(1000);
      const state = selector(getState());
      const serializedState = serializer(state);
      onComplete(serializedState);
    },
  });
}
