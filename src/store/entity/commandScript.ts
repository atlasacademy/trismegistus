import { Skill } from "@atlasacademy/api-connector";
import { createSelector } from "@reduxjs/toolkit";
import { deferP0, pipe } from "ts-functional-pipe";

import { selectEntitySkill, selectServant } from "@/api/selectors";
import { TrismegistusState } from "@/store";
import {
  selectTeamServantBySlot,
  selectUserServantSkill,
} from "@/store/entity/servant";
import { selectTeamById } from "@/store/slice/teamSlice";
import { MemberSlot, SkillNum, UserCommandScript, UserTeam } from "@/types";
import { coalesce } from "@/util/func";

export function selectCommandScript(team: UserTeam): UserCommandScript {
  return team.commandScript;
}

export function getInitialCommandScriptState(): UserCommandScript {
  return [];
}

export function selectTeamCommandScript(
  teamId: number
): (state: TrismegistusState) => UserCommandScript {
  return pipe(
    deferP0(selectTeamById)(teamId),
    coalesce(selectCommandScript, [])
  );
}

export function selectResolvedCommand() {}

export function selectCommandSkill(
  teamId: number,
  source: MemberSlot,
  skillNum: SkillNum
): (
  state: TrismegistusState
) => [skill: Skill.Skill | undefined, level: number] {
  const userServantSelector = selectTeamServantBySlot(teamId, source);
  return createSelector(
    [
      userServantSelector,
      (state) => {
        const userServant = userServantSelector(state);
        return selectServant(userServant)(state);
      },
      () => skillNum,
    ],
    (userServant, servant, selectorSkillNum) => {
      const skillLevel = selectUserServantSkill(userServant, selectorSkillNum);
      if (servant == null) return [undefined, skillLevel];
      const skill = selectEntitySkill(servant, selectorSkillNum);
      return [skill, skillLevel];
    }
  );
}
