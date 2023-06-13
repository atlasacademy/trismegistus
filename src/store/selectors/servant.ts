import { Servant } from "@atlasacademy/api-connector";
import { createSelector } from "@reduxjs/toolkit";

import { createServantSelector, selectEntityAtk } from "@/api/selectors";
import { composeSelectors } from "@/helpers/composeSelectors";
import { TrismegistusState } from "@/store";
import { createSlotsSelectors } from "@/store/slice/slotSlice";
import { selectTeamById } from "@/store/slice/teamSlice";
import { selectServantDefaults } from "@/store/slice/userSlice";
import { TeamEntry } from "@/types";
import { MemberSlot, SkillNum } from "@/types/enums";
import {
  createUserServant,
  InputServant,
  UserServant,
} from "@/types/userServant";
import { InputTeam } from "@/types/userTeam";

export function selectServants(team: InputTeam): InputServant[] {
  return team.servants ?? [];
}

export function selectTeamServants(
  state: TrismegistusState,
  teamId: TeamEntry["teamId"]
): InputServant[] {
  const team = selectTeamById(state, teamId);
  return team != null ? selectServants(team) : [];
}

export const {
  createBySlotSelector: createUserServantBySlotSelector,
  createSlotsSelector: createUserServantSlotsSelector,
} = createSlotsSelectors((): InputServant => ({}));

export function selectUserServantSkillLevel(
  userServant: UserServant,
  skillNum: SkillNum
): number {
  switch (skillNum) {
    case SkillNum.Skill1:
      return userServant.skill1;
    case SkillNum.Skill2:
      return userServant.skill2;
    case SkillNum.Skill3:
      return userServant.skill3;
  }
}

export function createTeamUserServantSlotsSelector() {
  return composeSelectors(selectTeamServants, createUserServantSlotsSelector());
}

export function createTeamInputServantSelector(): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  slot: MemberSlot
) => InputServant {
  return composeSelectors(
    selectTeamServants,
    createUserServantBySlotSelector()
  );
}

export function createTeamServantSelector(): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  slot: MemberSlot
) => Servant.Servant | undefined {
  const inputServantSelector = createTeamInputServantSelector();
  const selectServant = createServantSelector();
  return (state, teamId, slot) => {
    const { servantColNo } = inputServantSelector(state, teamId, slot);
    return selectServant(state, servantColNo);
  };
}

export function createTeamUserServantSelector(): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  slot: MemberSlot
) => InputServant;
export function createTeamUserServantSelector(
  useDefaults: true
): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  slot: MemberSlot
) => UserServant;
export function createTeamUserServantSelector(
  useDefaults?: boolean
): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  slot: MemberSlot
) => InputServant | UserServant {
  const inputServantSelector = createTeamInputServantSelector();
  if (!useDefaults) return inputServantSelector;
  const servantSelector = createTeamServantSelector();
  return createSelector(
    [inputServantSelector, selectServantDefaults, servantSelector],
    (userServant, defaults, servant): UserServant => {
      return createUserServant(userServant, defaults, servant);
    }
  );
}

export function selectServantAttack(
  { servantLevel }: UserServant,
  servant?: Servant.Servant
): number {
  return servant != null ? selectEntityAtk(servant, servantLevel) ?? 0 : 0;
}

export function createServantAttackSelector(): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  slot: MemberSlot
) => number {
  const selectUserServant = createTeamUserServantSelector(true);
  const selectServant = createServantSelector();
  return (state, teamId, slot) => {
    const userServant = selectUserServant(state, teamId, slot);
    const servant = selectServant(state, userServant.servantColNo);
    return selectServantAttack(userServant, servant);
  };
}
