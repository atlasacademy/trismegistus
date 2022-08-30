import { decode, encode } from "@msgpack/msgpack";
import deepEquals from "fast-deep-equal";
import { LOCATION_CHANGE, push } from "redux-first-history";

import { Party } from "@/types";
import { base64ToBytes, bytesToBase64 } from "@/util/base64";

import { MainListerners, MainState } from ".";
import { getParty, setParty } from "./PartyReducer";

export function serializeUserState(state: MainState) {
  const party = getParty(state);
  const msgpack = encode(party);
  return bytesToBase64(msgpack);
}

export function deserializeUserState(state: string) {
  const bytes = base64ToBytes(state);
  const party = decode(bytes);
  return party as Party;
}

export function setupBidirectionalURISync(listeners: MainListerners) {
  listeners.startListening({
    predicate(action, currentState, previousState) {
      return (
        !deepEquals(getParty(currentState), getParty(previousState)) &&
        action.type !== LOCATION_CHANGE
      );
    },
    effect: async (_action, listenerApi) => {
      listenerApi.cancelActiveListeners();
      await listenerApi.delay(1000);
      const uri = serializeUserState(listenerApi.getState());
      listenerApi.dispatch(push(uri));
    },
  });
  listeners.startListening({
    predicate(action, state, previousState) {
      return (
        action.type == LOCATION_CHANGE &&
        !deepEquals(
          state.router.location?.pathname,
          previousState.router.location?.pathname
        )
      );
    },
    effect: async (_action, listenerApi) => {
      const uri = listenerApi.getState().router.location?.pathname;
      if (uri != null) {
        const party = deserializeUserState(uri);
        listenerApi.dispatch(setParty(party));
      }
    },
  });
}
