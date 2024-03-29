import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { BattleEntry } from "@/types";
import {
  createUserBattleStep,
  InputCommandScript,
  UserBattleCommand,
  UserSkillActivation,
} from "@/types/userCommandScript";
import { InputTeam } from "@/types/userTeam";

export function selectCommandScript(team: InputTeam): InputCommandScript {
  return team.commandScript ?? [];
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
    addCommand(state, action: PayloadAction<BattleStep<UserSkillActivation>>) {
      const {
        payload: { step, item: userSkillActivation },
      } = action;
      if (state.length === 0) {
        state.push(createUserBattleStep());
      }
      const target = step ?? state.length - 1;
      state[target]?.skills?.push(userSkillActivation);
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
