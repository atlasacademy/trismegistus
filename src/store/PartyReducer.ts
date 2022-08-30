import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Party, PartySlot } from "@/types";

import { MainState } from ".";
import { getMysticCode } from "./MysticCodeReducer";
import { getServant } from "./ServantReducer";

const partySlice = createSlice({
  name: "party",
  initialState: { servants: [] } as Party,
  reducers: {
    setPartySlot(
      state,
      {
        payload: { slot, servantId },
      }: PayloadAction<{ slot: PartySlot; servantId: number }>
    ) {
      state.servants[slot] = servantId;
    },
    setPartyMysticCode(state, { payload }: PayloadAction<number>) {
      state.mysticCode = payload;
    },
    setParty(_state, { payload }: PayloadAction<Party>) {
      return payload;
    },
  },
});

export function getParty(state: MainState) {
  return state.party;
}

export function getPartyServantAtSlot(state: MainState, slot: PartySlot) {
  return getParty(state).servants[slot];
}

export function getPartyMysticCodeId(state: MainState) {
  return getParty(state).mysticCode;
}

export function getPartyMysticCode(state: MainState) {
  const mysticCodeId = getPartyMysticCodeId(state);
  return mysticCodeId ? getMysticCode(state, mysticCodeId) : undefined;
}

export function createPartyServantSlotSelector(slot: PartySlot) {
  return (state: MainState) => {
    const servantId = getPartyServantAtSlot(state, slot);
    return servantId ? getServant(state, servantId) : undefined;
  };
}
export const {
  reducer: PartyReducer,
  actions: { setParty, setPartySlot, setPartyMysticCode },
} = partySlice;
