import { Skill } from "@atlasacademy/api-connector";
import {
  Action,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import { selectEntitySkill } from "@/api/selectors";
import { TrismegistusState } from "@/store";
import {
  createTeamServantSelector,
  createTeamUserServantSelector,
  selectUserServantSkillLevel,
} from "@/store/slice/servantSlice";
import { selectTeamById } from "@/store/slice/teamSlice";
import {
  BattleEntry,
  MemberSlot,
  SkillActivation,
  SkillNum,
  TeamEntry,
} from "@/types";
import {
  createUserBattleStep,
  InputCommandScript,
  UserBattleCommand,
  UserCommand,
} from "@/types/userCommandScript";
import { InputTeam } from "@/types/userTeam";

export function selectCommandScript(team: InputTeam): InputCommandScript {
  return team.commandScript ?? [];
}

export function selectTeamCommandScript(
  state: TrismegistusState,
  teamId: TeamEntry["teamId"]
): InputCommandScript {
  const team = selectTeamById(state, teamId);
  return team != null ? selectCommandScript(team) : [];
}

export interface BattleStep<T> extends BattleEntry {
  item: T;
}

export const {
  reducer: commandScriptReducer,
  actions: commandScriptActions,
  getInitialState: getCommandScriptInitialState,
} = createSlice({
  name: "commandScript",
  initialState: (): InputCommandScript => [],
  reducers: {
    startNewTurn(state, _: Action) {
      state.push(createUserBattleStep());
    },
    addCommand(state, action: PayloadAction<BattleStep<UserCommand>>) {
      const {
        payload: { step, item: userCommand },
      } = action;
      if (state.length === 0) {
        state.push(createUserBattleStep());
      }
      const target = step ?? state.length - 1;
      state[target]?.commands?.push(userCommand);
    },
    addBattleCommand(
      state,
      action: PayloadAction<BattleStep<UserBattleCommand>>
    ) {
      const {
        payload: { step, item: userBattleCommand },
      } = action;
      if (state.length === 0) {
        state.push(createUserBattleStep());
      }
      const target = step ?? state.length - 1;
      state[target]?.battleCommands?.push(userBattleCommand);
    },
  },
});

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
  userCommand: UserCommand
) => SkillActivation {
  const selectCommandSkill = createCommandSkillSelector();
  return createSelector(
    [
      (
        state: TrismegistusState,
        teamId: TeamEntry["teamId"],
        { source }: UserCommand
      ) => source,
      (
        state: TrismegistusState,
        teamId: TeamEntry["teamId"],
        { target }: UserCommand
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
