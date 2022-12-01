import { CraftEssence } from "@atlasacademy/api-connector";
import { createEntityAdapter } from "@reduxjs/toolkit";

import { apiEndpoints } from "@/api";
import { TrismegistusState } from "@/store";
import { currySlotSelectors } from "@/store/currySlotSelectors";
import { MemberSlot, UserCraftEssence, UserTeam } from "@/types";
import { createUserCraftEssence } from "@/types/utils";

export function selectCraftEssences(team: UserTeam) {
  return team.craftEssences;
}

export const {
  getInitialState: getInitialCraftEssencesState,
  getSelectors: getCraftEssenceSelectors,
  ...craftEssencesAdapter
} = createEntityAdapter<UserCraftEssence>({
  selectId: ({ slot }) => slot,
});

export const {
  selectById: selectTeamCraftEssenceBySlot,
  selectIds: selectTeamCraftEssenceSlots,
  selectAll: selectTeamCraftEssences,
  selectTotal: selectTotalTeamCraftEssences,
} = currySlotSelectors(
  getCraftEssenceSelectors(selectCraftEssences),
  (slot) => {
    return createUserCraftEssence({ slot });
  }
);

export const selectCraftEssenceAttack = (
  { craftEssenceLevel }: UserCraftEssence,
  { atkGrowth }: CraftEssence.CraftEssence
) => atkGrowth[craftEssenceLevel - 1] ?? 0;

export const selectTeamCraftEssenceAttackBySlot = (
  teamId: number,
  slot: MemberSlot
) => {
  const userCraftEssenceSelector = selectTeamCraftEssenceBySlot(teamId, slot);
  return (state: TrismegistusState) => {
    const userCraftEssence = userCraftEssenceSelector(state);
    const { data: craftEssence } = apiEndpoints.craftEssence.select(
      userCraftEssence.craftEssenceId
    )(state);
    if (craftEssence == null) return 0;
    return selectCraftEssenceAttack(userCraftEssence, craftEssence);
  };
};
