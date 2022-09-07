import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BattleAction } from "@/battle";
import { Party, PartySlot, SkillNum } from "@/types";

import { TrismegistusState } from ".";

export interface ServantSlot {
  servantId: number;
  slot: PartySlot;
}

export interface ServantSlotSkill {
  slot: PartySlot;
  skillNum: SkillNum;
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
    setParty(_state, { payload }: PayloadAction<Party>) {
      return payload;
    },
    addBattleAction(state, { payload }: PayloadAction<BattleAction<any>>) {
      state.actions.push(payload);
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
