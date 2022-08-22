import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Party, PartySlot } from "@/types";

import { MainState } from ".";
import { getServant } from "./ServantReducer";

const partySlice = createSlice({
  name: "party",
  initialState: [] as Party,
  reducers: {
    setPartySlot(
      state,
      {
        payload: { slot, servantId },
      }: PayloadAction<{ slot: PartySlot; servantId: number }>
    ) {
      state[slot] = servantId;
    },
  },
});

export function partySlotSelectorCreator(slot: PartySlot) {
  return (state: MainState) => {
    const servantId = state.party[slot];
    return servantId ? getServant(state, servantId) : undefined;
  };
}
export const {
  reducer: PartyReducer,
  actions: { setPartySlot },
} = partySlice;
