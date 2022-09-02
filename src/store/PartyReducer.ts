import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Party, PartySlot } from "@/types";

import { MainState } from ".";

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

export function createPartyServantSlotSelector(slot: PartySlot) {
  return (state: MainState) => {
    return getPartyServantAtSlot(state, slot);
  };
}
export const {
  reducer: PartyReducer,
  actions: { setParty, setPartySlot, setPartyMysticCode },
} = partySlice;
