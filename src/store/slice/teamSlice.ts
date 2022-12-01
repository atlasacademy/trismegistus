import {
  createEntityAdapter,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { deferP0, pipe } from "ts-functional-pipe";

import { TrismegistusState } from "@/store";
import {
  craftEssencesAdapter,
  getInitialCraftEssencesState,
} from "@/store/entity/craftEssence";
import {
  getInitialServantsState,
  servantsAdapter,
} from "@/store/entity/servant";
import {
  TeamEntry,
  UserCraftEssence,
  UserMysticCode,
  UserServant,
  UserTeam,
} from "@/types";
import { AtLeast, createUserMysticCode } from "@/types/utils";
import { coalesce } from "@/util/func";

function getUserTeamInitialState({
  teamId,
  servants,
  craftEssences,
  mysticCode,
}: AtLeast<UserTeam, "teamId">): UserTeam {
  return {
    teamId,
    servants: servants ?? getInitialServantsState(),
    craftEssences: craftEssences ?? getInitialCraftEssencesState(),
    mysticCode: mysticCode ?? createUserMysticCode({}),
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
          teamId: payload ? payload : stateDraft.ids.length + 1,
        })
      );
    },
    setCraftEssence(
      stateDraft,
      {
        payload: { teamId, entry: craftEssence },
      }: PayloadAction<TeamEntry<UserCraftEssence>>
    ) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;

      team.craftEssences = craftEssencesAdapter.setOne(
        team.craftEssences,
        craftEssence
      );
    },
    setServant(
      stateDraft,
      {
        payload: { teamId, entry: servant },
      }: PayloadAction<TeamEntry<UserServant>>
    ) {
      const team = stateDraft.entities[teamId];
      if (team == null) return;

      team.servants = servantsAdapter.setOne(team.servants, servant);
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
  },
});

export const {
  reducer: teamsReducer,
  actions: { newTeam, setCraftEssence, setServant, setMysticCode },
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
