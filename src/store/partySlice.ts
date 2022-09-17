import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

import {
  MysticCodeSkillBattleAction,
  NPBattleAction,
  ServantSkillBattleAction,
} from "@/battle";
import { Party, PartyMemberSlot } from "@/types";

import { TrismegistusState } from ".";

export interface ServantSlot {
  servantId: number;
  slot: PartyMemberSlot;
}

export interface CraftEssenceSlot {
  craftEssenceId: number;
  slot: PartyMemberSlot;
}

const getInitialState = (): Party => ({
  servants: [],
  craftEssences: [],
  actions: [],
});

const partySlice = createSlice({
  name: "party",
  initialState: getInitialState,
  reducers: {
    resetParty() {
      return getInitialState();
    },
    setPartyServant(state, { payload }: PayloadAction<ServantSlot>) {
      const { slot, servantId } = payload;
      state.servants[slot] = servantId;
    },
    setPartyCraftEssence(state, { payload }: PayloadAction<CraftEssenceSlot>) {
      const { slot, craftEssenceId } = payload;
      state.craftEssences[slot] = craftEssenceId;
    },
    setPartyMysticCode(state, { payload }: PayloadAction<number>) {
      state.mysticCode = payload;
    },
    setParty(_, { payload }: PayloadAction<Party>) {
      return payload;
    },
    activateServantSkill(
      state,
      { payload }: PayloadAction<ServantSkillBattleAction>
    ) {
      state.actions.push(payload);
    },
    activateMysticCodeSkill(
      state,
      { payload }: PayloadAction<MysticCodeSkillBattleAction>
    ) {
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
  slot: PartyMemberSlot
) {
  return selectParty(state).servants[slot];
}

function selectPartyCraftEssenceId(
  state: TrismegistusState,
  slot: PartyMemberSlot
) {
  return selectParty(state).craftEssences[slot];
}

export function selectPartyMysticCodeId(state: TrismegistusState) {
  return selectParty(state).mysticCode;
}

export const createPartyServantIdSelector = createSelector(
  (slot: PartyMemberSlot) => slot,
  (slot) => (state: TrismegistusState) => {
    return selectPartyServantId(state, slot);
  },
  { memoizeOptions: { maxSize: 6 } }
);

export const createPartyCraftEssenceIdSelector = createSelector(
  (slot: PartyMemberSlot) => slot,
  (slot) => (state: TrismegistusState) => {
    return selectPartyCraftEssenceId(state, slot);
  },
  { memoizeOptions: { maxSize: 6 } }
);

export const {
  reducer: partyReducer,
  actions: {
    resetParty,
    setParty,
    setPartyServant,
    setPartyCraftEssence,
    setPartyMysticCode,
    activateMysticCodeSkill,
    activateServantSkill,
    fireNoblePhantasm,
  },
} = partySlice;
