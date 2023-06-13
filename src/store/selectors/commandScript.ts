import { Skill } from "@atlasacademy/api-connector";
import { createSelector } from "@reduxjs/toolkit";

import { selectEntitySkill } from "@/api/selectors";
import { TrismegistusState } from "@/store";
import {
  createTeamServantSelector,
  createTeamUserServantSelector,
  selectUserServantSkillLevel,
} from "@/store/selectors/servant";
import { selectCommandScript } from "@/store/slice/commandScriptSlice";
import { selectTeamById } from "@/store/slice/teamSlice";
import { SkillActivation, TeamEntry } from "@/types";
import { MemberSlot, SkillNum } from "@/types/enums";
import {
  InputCommandScript,
  UserSkillActivation,
} from "@/types/userCommandScript";

export function selectTeamCommandScript(
  state: TrismegistusState,
  teamId: TeamEntry["teamId"]
): InputCommandScript {
  const team = selectTeamById(state, teamId);
  return team != null ? selectCommandScript(team) : [];
}

export function createCommandSkillSelector(): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  source: MemberSlot,
  skillNum: SkillNum
) => [skill: Skill.Skill | undefined, level: number] {
  const userServantSelector = createTeamUserServantSelector(true);
  const servantSelector = createTeamServantSelector();
  return createSelector(
    [
      userServantSelector,
      servantSelector,
      (_, _1, _2, skillNum: SkillNum) => skillNum,
    ],
    (userServant, servant, skillNum) => {
      const skillLevel = selectUserServantSkillLevel(userServant, skillNum);
      if (servant == null) return [undefined, skillLevel];
      const skill = selectEntitySkill(servant, skillNum);
      return [skill, skillLevel];
    }
  );
}

export function createSkillActivationSelector(): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  userSkillActivation: UserSkillActivation
) => SkillActivation {
  const selectCommandSkill = createCommandSkillSelector();
  return createSelector(
    [
      (
        state: TrismegistusState,
        teamId: TeamEntry["teamId"],
        { source }: UserSkillActivation
      ) => source,
      (
        state: TrismegistusState,
        teamId: TeamEntry["teamId"],
        { target }: UserSkillActivation
      ) => target,
      (state, teamId, { source, type }) => {
        return selectCommandSkill(state, teamId, source, type);
      },
    ],
    (source, target, skill): SkillActivation => {
      return { source, target, skill };
    }
  );
}
