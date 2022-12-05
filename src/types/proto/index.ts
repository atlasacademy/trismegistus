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
import { UserServant, UserTeam } from "@/types";
import {
  MemberSlot,
  ProtoCraftEssence,
  ProtoServant,
  ProtoTrismegistusState,
} from "@/types/proto/trismegistus";

function userToProtoServant({
  slot,
  servantId,
  level,
  fou,
  noblePhantasmLevel,
  skills,
  appends,
}: UserServant): ProtoServant {
  return {
    slot,
    servantId,
    level,
    fou,
    noblePhantasmLevel,
    skill1: skills[0],
    skill2: skills[1],
    skill3: skills[2],
    append1: appends[0],
    append2: appends[1],
    append3: appends[2],
  };
}

function protoToUserServant({
  slot,
  servantId,
  level,
  fou,
  noblePhantasmLevel,
  skill1,
  skill2,
  skill3,
  append1,
  append2,
  append3,
}: ProtoServant): UserServant | undefined {
  if (slot === MemberSlot.NONE) return undefined;
  return {
    slot,
    servantId,
    level,
    fou,
    noblePhantasmLevel,
    skills: [skill1, skill2, skill3],
    appends: [append1, append2, append3],
  };
}

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
          return userToProtoServant(servants.entities[slot]!!);
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

    result = servants.reduce((acc, next) => {
      const userServant = protoToUserServant(next);
      if (userServant == null) return acc;
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
