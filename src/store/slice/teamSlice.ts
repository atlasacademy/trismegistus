import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { deferP0, pipe } from "ts-functional-pipe";

import { TrismegistusState } from "@/store";
import { getInitialCommandScriptState } from "@/store/entity/commandScript";
import { getInitialCraftEssencesState } from "@/store/entity/craftEssence";
import { getInitialServantsState } from "@/store/entity/servant";
import { removeItem, setItem, updateItem } from "@/store/entity/slot";
import {
  MemberSlot,
  TeamBattleStep,
  TeamEntry,
  TeamMemberEntry,
  UserBattleCommand,
  UserCommand,
  UserCraftEssence,
  UserMysticCode,
  UserServant,
  UserTeam,
} from "@/types";
import {
  AtLeast,
  createUserBattleStep,
  createUserMysticCode,
} from "@/types/utils";
import { fallback } from "@/util";
import { coalesce } from "@/util/func";

function getUserTeamInitialState({
  teamId,
  servants,
  craftEssences,
  mysticCode,
  commandScript,
}: AtLeast<UserTeam, "teamId">): UserTeam {
  return {
    teamId,
    servants: servants ?? getInitialServantsState(),
    craftEssences: craftEssences ?? getInitialCraftEssencesState(),
    mysticCode: mysticCode ?? createUserMysticCode({}),
    commandScript: commandScript ?? getInitialCommandScriptState(),
  };
}

const {
  getInitialState: getTeamsInitialState,
  getSelectors: getTeamsSelectors,
  addOne: addTeam,
} = createEntityAdapter<UserTeam>({
  selectId: ({ teamId }) => teamId,
});

const teamSlice = createSlice({
  name: "teams",
  initialState: getTeamsInitialState(),
  reducers: {
    newTeam(stateDraft, { payload }: PayloadAction<number | undefined>) {
      addTeam(
        stateDraft,
        getUserTeamInitialState({
          teamId: payload != null ? payload : stateDraft.ids.length + 1,
        })
      );
    },
    setCraftEssence(
      stateDraft,
      {
        payload: { teamId, slot, entry: craftEssence },
      }: PayloadAction<TeamMemberEntry<UserCraftEssence>>
    ) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;

      setItem(team.craftEssences, slot, craftEssence);
    },
    setServant(
      stateDraft,
      {
        payload: { teamId, slot, entry: servant },
      }: PayloadAction<TeamMemberEntry<UserServant>>
    ) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;

      setItem(team.servants, slot, servant);
    },
    updateServant(
      stateDraft,
      {
        payload: { teamId, slot, entry: servantUpdate },
      }: PayloadAction<TeamMemberEntry<[keyof UserServant, number]>>
    ) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;

      updateItem(team.servants, slot, servantUpdate);
    },
    updateServantStats(
      stateDraft,
      {
        payload: { teamId, slot, entry: servantUpdates },
      }: PayloadAction<TeamMemberEntry<[keyof UserServant, number][]>>
    ) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;

      for (let i = 0; i < servantUpdates.length; i++) {
        updateItem(team.servants, slot, servantUpdates[i]);
      }
    },
    removeMemberSlot(
      stateDraft,
      { payload: { teamId, entry: slot } }: PayloadAction<TeamEntry<MemberSlot>>
    ) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;
      removeItem(team.servants, slot);
      removeItem(team.craftEssences, slot);
    },
    setMysticCode(
      stateDraft,
      {
        payload: { teamId, entry: mysticCode },
      }: PayloadAction<TeamEntry<UserMysticCode>>
    ) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;

      team.mysticCode = mysticCode;
    },
    updateMysticCode(
      stateDraft,
      {
        payload: { teamId, entry: mysticCodeUpdate },
      }: PayloadAction<TeamEntry<[keyof UserMysticCode, number]>>
    ) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;
      const [key, value] = mysticCodeUpdate;
      team.mysticCode[key] = value;
    },
    startNewTurn(stateDraft, { payload: teamId }: PayloadAction<number>) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;
      const userBattleTurn = createUserBattleStep();
      team.commandScript.push(userBattleTurn);
    },
    addCommand(
      stateDraft,
      {
        payload: { teamId, step, entry: userCommand },
      }: PayloadAction<TeamBattleStep<UserCommand>>
    ) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;
      if (team.commandScript.length === 0) {
        team.commandScript.push(createUserBattleStep());
      }
      const target = step ?? team.commandScript.length - 1;
      team.commandScript[target]?.commands.push(userCommand);
    },
    addBattleCommand(
      stateDraft,
      {
        payload: { teamId, step, entry: userBattleCommand },
      }: PayloadAction<TeamBattleStep<UserBattleCommand>>
    ) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;
      if (team.commandScript.length === 0) {
        team.commandScript.push(createUserBattleStep());
      }
      const target = step ?? team.commandScript.length - 1;
      team.commandScript[target]?.battleCommands.push(userBattleCommand);
    },
  },
});

export const {
  reducer: teamsReducer,
  actions: {
    newTeam,
    setCraftEssence,
    setServant,
    updateServant,
    updateServantStats,
    setMysticCode,
    updateMysticCode,
    removeMemberSlot,
    startNewTurn,
    addCommand,
    addBattleCommand,
  },
} = teamSlice;

export { getTeamsInitialState, getTeamsSelectors };

function prepareTeamSelectors() {
  const { selectIds, ...selectors } = getTeamsSelectors(
    (state: TrismegistusState) => state.teams
  );
  return {
    selectIds: createSelector([selectIds], (ids) => {
      return ids.filter((id) => Number.isInteger(id)) as number[];
    }),
    ...selectors,
  };
}

export const {
  selectById: selectTeamById,
  selectIds: selectTeamIds,
  selectEntities: selectTeamMap,
  selectTotal: selectTotalTeams,
  selectAll: selectTeams,
} = prepareTeamSelectors();

export function selectTeamMysticCode(teamId: number) {
  return pipe(
    deferP0(selectTeamById)(teamId),
    coalesce((state: UserTeam) => state.mysticCode, createUserMysticCode({}))
  );
}

export const selectTeamMysticCodeWithDefaults = (
  teamId: number
): ((state: TrismegistusState) => UserMysticCode) => {
  return pipe(
    selectTeamMysticCode(teamId),
    ({ mysticCodeId, mysticCodeLevel }) => ({
      mysticCodeId,
      mysticCodeLevel: fallback(mysticCodeLevel, 10),
    })
  );
};
