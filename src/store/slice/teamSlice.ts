import {
  createEntityAdapter,
  createSelector,
  createSlice,
  nanoid,
  PayloadAction,
} from "@reduxjs/toolkit";
import produce from "immer";
import { z } from "zod";

import { TrismegistusState } from "@/store";
import {
  removeCraftEssence,
  removeServant,
  teamActionMatcher,
  teamReducer,
} from "@/store/slice/teamReducer";
import { TeamEntry, TeamMember } from "@/types";
import { InputTeam } from "@/types/userTeam";

const {
  getInitialState: getTeamsInitialState,
  getSelectors: getTeamsSelectors,
  addOne: addTeam,
} = createEntityAdapter<InputTeam>({
  selectId: ({ teamId }) => teamId,
});

const teamSlice = createSlice({
  name: "teams",
  initialState: getTeamsInitialState(),
  reducers: {
    newTeam(state, action: PayloadAction<TeamEntry["teamId"] | undefined>) {
      const team = produce(teamReducer(undefined, action), (draft) => {
        draft.teamId = action.payload ?? nanoid();
      });
      addTeam(state, team);
    },
    removeMember(state, action: PayloadAction<TeamMember>) {
      const {
        payload: { teamId, slot },
      } = action;
      const team = state.entities[teamId];
      if (team == null) return;
      state.entities[teamId] = teamReducer(
        state.entities[teamId],
        removeCraftEssence(slot, { teamId })
      );
      state.entities[teamId] = teamReducer(
        state.entities[teamId],
        removeServant(slot, { teamId })
      );
    },
  },
  extraReducers(builder) {
    builder.addMatcher(teamActionMatcher, (state, action) => {
      const {
        meta: { teamId },
      } = action;
      const team = state.entities[teamId];
      if (team == null) return;
      state.entities[teamId] = teamReducer(team, action);
    });
  },
});

export const {
  reducer: teamsReducer,
  actions: { newTeam, removeMember },
} = teamSlice;

export { getTeamsInitialState, getTeamsSelectors };

function prepareTeamSelectors() {
  const { selectIds, ...selectors } = getTeamsSelectors(
    (state: TrismegistusState) => state.teams
  );
  const stringCheck = z.string();
  return {
    selectIds: createSelector([selectIds], (ids) => {
      return ids.filter((id) => stringCheck.safeParse(id).success) as string[];
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
