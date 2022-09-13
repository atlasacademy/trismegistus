import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { NPBattleAction, SkillBattleAction } from "@/battle";
import { Party, PartySlot } from "@/types";

import { TrismegistusState } from ".";

export interface ServantSlot {
  servantId: number;
  slot: PartySlot;
}

const initialState: Party = { servants: [], actions: [] };

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
    setParty(_, { payload }: PayloadAction<Party>) {
      return payload;
    },
    activateSkill(state, { payload }: PayloadAction<SkillBattleAction>) {
      state.actions.push(payload);
    },
    fireNoblePhantasm(state, { payload }: PayloadAction<NPBattleAction>) {
      state.actions.push(payload);
    },
  },
});

export function selectParty(state: TrismegistusState) {
  return state.party;
}

export function selectPartyServantId(
  state: TrismegistusState,
  slot: PartySlot
) {
  return selectParty(state).servants[slot];
}

export function selectPartyMysticCodeId(state: TrismegistusState) {
  return selectParty(state).mysticCode;
}

export const createPartyServantIdSelector = createSelector(
  (slot: PartySlot) => slot,
  (selectorSlot) => (state: TrismegistusState) => {
    return selectPartyServantId(state, selectorSlot);
  },
  { memoizeOptions: { maxSize: 6 } }
);

export const {
  reducer: partyReducer,
  actions: {
    resetParty,
    setParty,
    setPartyServant,
    setPartyMysticCode,
    activateSkill,
    fireNoblePhantasm,
  },
} = partySlice;
