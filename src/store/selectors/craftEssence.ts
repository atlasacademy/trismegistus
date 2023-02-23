import { CraftEssence } from "@atlasacademy/api-connector";
import { createSelector } from "@reduxjs/toolkit";

import { createCraftEssenceSelector, selectEntityAtk } from "@/api/selectors";
import { composeSelectors } from "@/helpers/composeSelectors";
import { TrismegistusState } from "@/store";
import { createUserCraftEssenceBySlotSelector } from "@/store/slice/craftEssenceSlice";
import { selectTeamById } from "@/store/slice/teamSlice";
import { TeamEntry } from "@/types";
import { MemberSlot } from "@/types/enums";
import {
  createUserCraftEssence,
  InputCraftEssence,
  UserCraftEssence,
} from "@/types/userCraftEssence";
import { InputTeam } from "@/types/userTeam";

export function selectCraftEssences(team: InputTeam): InputCraftEssence[] {
  return team.craftEssences ?? [];
}

export function selectTeamCraftEssences(
  state: TrismegistusState,
  teamId: TeamEntry["teamId"]
): InputCraftEssence[] {
  const team = selectTeamById(state, teamId);
  return team != null ? selectCraftEssences(team) : [];
}

export function createTeamUserCraftEssenceSelector(): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  slot: MemberSlot
) => InputCraftEssence;
export function createTeamUserCraftEssenceSelector(
  useDefaults: true
): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  slot: MemberSlot
) => UserCraftEssence;
export function createTeamUserCraftEssenceSelector(
  useDefaults?: boolean
): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  slot: MemberSlot
) => InputCraftEssence | UserCraftEssence {
  const userCraftEssenceSelector = composeSelectors(
    selectTeamCraftEssences,
    createUserCraftEssenceBySlotSelector()
  );
  if (!useDefaults) return userCraftEssenceSelector;
  return createSelector([userCraftEssenceSelector], (userCraftEssence) => {
    return createUserCraftEssence(userCraftEssence);
  });
}

export function selectCraftEssenceAttack(
  { craftEssenceLevel }: UserCraftEssence,
  craftEssence?: CraftEssence.CraftEssence
): number {
  return craftEssence != null
    ? selectEntityAtk(craftEssence, craftEssenceLevel) ?? 0
    : 0;
}

export function createCraftEssenceAttackSelector(): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  slot: MemberSlot
) => number {
  const selectUserCraftEssence = createTeamUserCraftEssenceSelector(true);
  const selectCraftEssence = createCraftEssenceSelector();
  return (state, teamId, slot) => {
    const userCraftEssence = selectUserCraftEssence(state, teamId, slot);
    const craftEssence = selectCraftEssence(
      state,
      userCraftEssence.craftEssenceId
    );
    return selectCraftEssenceAttack(userCraftEssence, craftEssence);
  };
}
