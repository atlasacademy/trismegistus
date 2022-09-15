import { Skill } from "@atlasacademy/api-connector";
import { createSelector } from "@reduxjs/toolkit";

import { apiEndpoints } from "@/api/index";
import { TrismegistusState } from "@/store";
import {
  createPartyServantIdSelector,
  selectPartyMysticCodeId,
} from "@/store/partySlice";
import { PartySlot, SkillNum } from "@/types";

export const createPartyServantSelector = createSelector(
  [(slot: PartySlot) => slot, createPartyServantIdSelector],
  (selectorSlot, servantIdSelector) => (state: TrismegistusState) => {
    const servantId = servantIdSelector(state);
    const endpoint = apiEndpoints.servant.select(servantId)(state);
    return endpoint.data;
  },
  { memoizeOptions: { maxSize: 6 } }
);

export const createPartyServantSkillSelector = createSelector(
  [
    (slot: PartySlot) => slot,
    (_, skillNum: SkillNum) => skillNum,
    createPartyServantSelector,
  ],
  (selectorSlot, skillNum, servantSelector) => (state: TrismegistusState) => {
    const servant = servantSelector(state);
    return servant?.skills?.reduce((acc, next) => {
      if (
        (next.num === skillNum && next.priority) ??
        0 > (acc?.priority ?? 0)
      ) {
        return next;
      }
      return acc;
    }, undefined as Skill.Skill | undefined);
  },
  { memoizeOptions: { maxSize: 6 * 3 } }
);

export function selectPartyMysticCode(state: TrismegistusState) {
  const mysticCodeId = selectPartyMysticCodeId(state);
  return apiEndpoints.mysticCode.select(mysticCodeId)(state).data;
}

export const createMysticCodeSkillSelector = createSelector(
  [(skillNum: SkillNum) => skillNum],
  (skillNum) => (state: TrismegistusState) => {
    const mysticCode = selectPartyMysticCode(state);
    return mysticCode?.skills[skillNum - 1];
  }
);
