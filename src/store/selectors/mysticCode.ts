import { createSelector } from "@reduxjs/toolkit";

import { TrismegistusState } from "@/store";
import { selectTeamById } from "@/store/slice/teamSlice";
import { selectMysticCodeDefaults } from "@/store/slice/userSlice";
import { TeamEntry } from "@/types";
import {
  createUserMysticCode,
  InputMysticCode,
  UserMysticCode,
} from "@/types/userMysticCode";
import { InputTeam } from "@/types/userTeam";

export function selectUserMysticCode(team: InputTeam): InputMysticCode {
  return team.mysticCode ?? {};
}

export function selectTeamMysticCode(
  state: TrismegistusState,
  teamId: TeamEntry["teamId"]
): InputMysticCode {
  const team = selectTeamById(state, teamId);
  return team != null ? selectUserMysticCode(team) : {};
}

export function createTeamMysticCodeSelector(): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"]
) => InputMysticCode;
export function createTeamMysticCodeSelector(
  useDefaults: true
): (state: TrismegistusState, teamId: TeamEntry["teamId"]) => UserMysticCode;
export function createTeamMysticCodeSelector(
  useDefaults?: boolean
): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"]
) => InputMysticCode | UserMysticCode {
  if (!useDefaults) return selectTeamMysticCode;
  return createSelector(
    [selectTeamMysticCode, selectMysticCodeDefaults],
    (userMysticCode, defaults) => {
      return createUserMysticCode(userMysticCode, defaults);
    }
  );
}
