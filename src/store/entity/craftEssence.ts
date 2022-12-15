import { CraftEssence } from "@atlasacademy/api-connector";
import { deferP0, pipe } from "ts-functional-pipe";

import { selectCraftEssence } from "@/api/selectors";
import { TrismegistusState } from "@/store";
import { createSlotListSelectors } from "@/store/entity/slot";
import { MemberSlot, UserCraftEssence, UserTeam } from "@/types";
import { createUserCraftEssence } from "@/types/utils";
import { fallback } from "@/util";
import { coalesce } from "@/util/func";

export function selectCraftEssences(team: UserTeam) {
  return team.craftEssences;
}

export function getInitialCraftEssencesState(): UserCraftEssence[] {
  return [];
}

export const {
  selectBySlot: selectTeamCraftEssenceBySlot,
  selectSlots: selectTeamCraftEssenceSlots,
} = createSlotListSelectors(selectCraftEssences, createUserCraftEssence);

export const selectCraftEssenceAttack = (
  { atkGrowth }: CraftEssence.CraftEssence,
  { craftEssenceLevel }: UserCraftEssence
) => atkGrowth[craftEssenceLevel - 1] ?? 0;

export const selectTeamCraftEssenceAttackBySlot = (
  userCraftEssence: UserCraftEssence
) => {
  return pipe(
    selectCraftEssence(userCraftEssence),
    coalesce(deferP0(selectCraftEssenceAttack)(userCraftEssence), 0)
  );
};

export const selectTeamCraftEssenceWithDefaults = (
  teamId: number,
  memberSlot: MemberSlot
): ((state: TrismegistusState) => UserCraftEssence) => {
  return pipe(
    selectTeamCraftEssenceBySlot(teamId, memberSlot),
    ({ craftEssenceId, craftEssenceLevel, maxLimitBreak }) => ({
      craftEssenceId,
      craftEssenceLevel: fallback(craftEssenceLevel, 1),
      maxLimitBreak,
    })
  );
};
