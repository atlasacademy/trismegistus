import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Party, PartySlot } from "@/types";

import { TrismegistusState } from ".";

export interface ServantSlot {
  servantId: number;
  slot: PartySlot;
}

const initialState: Party = { servants: [] };

const partySlice = createSlice({
  name: "party",
  initialState,
  reducers: {
    resetParty() {
      return initialState;
    },
    setPartyServant(state, { payload }: PayloadAction<ServantSlot>) {
      const { slot, servantId } = payload;
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

export function selectParty(state: TrismegistusState) {
  return state.party;
}

export function selectPartyServant(state: TrismegistusState, slot: PartySlot) {
  return selectParty(state).servants[slot];
}

export function selectPartyMysticCode(state: TrismegistusState) {
  return selectParty(state).mysticCode;
}

export function createPartyServantSlotSelector(slot: PartySlot) {
  return (state: TrismegistusState) => {
    return selectPartyServant(state, slot);
  };
}
export const {
  reducer: PartyReducer,
  actions: { resetParty, setParty, setPartyServant, setPartyMysticCode },
} = partySlice;
