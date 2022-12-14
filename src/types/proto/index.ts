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
import {
  MemberSlot,
  ProtoCraftEssence,
  ProtoServant,
  ProtoTrismegistusState,
} from "@/types/proto/trismegistus";

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
        servants: servants.ids.map((slot): ProtoServant => {
          return servants.entities[slot]!!;
        }),
        craftEssences: craftEssences.ids.map((slot): ProtoCraftEssence => {
          return craftEssences.entities[slot]!!;
        }),
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

    result = servants.reduce((acc, userServant) => {
      if (userServant.slot === MemberSlot.NONE) return acc;
      return teamsReducer(acc, setServant({ teamId, entry: userServant }));
    }, result);

    result = craftEssences.reduce((acc, next) => {
      const { slot, craftEssenceId, craftEssenceLevel, maxLimitBreak } = next;
      if (slot === MemberSlot.NONE) return acc;
      return teamsReducer(
        acc,
        setCraftEssence({
          teamId,
          entry: { slot, craftEssenceId, craftEssenceLevel, maxLimitBreak },
        })
      );
    }, result);
    return result;
  }, getTeamsInitialState());
}
