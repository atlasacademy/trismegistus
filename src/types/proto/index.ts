import { EntityState } from "@reduxjs/toolkit";

import { TrismegistusState } from "@/store";
import {
  getTeamsInitialState,
  newTeam,
  setCraftEssence,
  setMysticCode,
  setServant,
  teamsReducer,
} from "@/store/slice/teamSlice";
import { UserTeam } from "@/types";
import { ProtoTrismegistusState } from "@/types/proto/trismegistus";
import { indexToSlot } from "@/types/utils";

export function stateToProto(state: TrismegistusState): ProtoTrismegistusState {
  const {
    teams: { ids, entities },
  } = state;
  return ids.reduce<ProtoTrismegistusState>(
    (acc, rawId) => {
      if (!Number.isInteger(rawId)) return acc;
      const teamId = rawId as number;
      const { mysticCode, servants, craftEssences } = entities[teamId]!!;

      acc.teams[teamId] = {
        mysticCode,
        servants,
        craftEssences,
        commandScripts: [],
      };

      return acc;
    },
    { teams: {} }
  );
}

export function protoToState({
  teams,
}: ProtoTrismegistusState): EntityState<UserTeam> {
  return Object.entries(teams).reduce((userTeams, [rawId, protoTeam]) => {
    const teamId = parseInt(rawId);
    if (!Number.isInteger(teamId)) return userTeams;

    const { mysticCode, servants, craftEssences } = protoTeam;
    let result = teamsReducer(userTeams, newTeam(teamId));

    if (mysticCode != null) {
      result = teamsReducer(
        result,
        setMysticCode({ teamId, entry: mysticCode })
      );
    }

    result = servants.reduce((acc, userServant, currentIndex) => {
      const slot = indexToSlot(currentIndex);
      if (slot == null) return acc;
      return teamsReducer(
        acc,
        setServant({ teamId, slot, entry: userServant })
      );
    }, result);

    result = craftEssences.reduce((acc, next, currentIndex) => {
      const slot = indexToSlot(currentIndex);
      if (slot == null) return acc;
      const { craftEssenceId, craftEssenceLevel, maxLimitBreak } = next;
      return teamsReducer(
        acc,
        setCraftEssence({
          teamId,
          slot,
          entry: { craftEssenceId, craftEssenceLevel, maxLimitBreak },
        })
      );
    }, result);
    return result;
  }, getTeamsInitialState());
}
