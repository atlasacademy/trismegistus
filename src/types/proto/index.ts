import { EntityState } from "@reduxjs/toolkit";

import { TrismegistusState } from "@/store";
import {
  addBattleCommand,
  addCommand,
  getTeamsInitialState,
  newTeam,
  selectTeams,
  setCraftEssence,
  setMysticCode,
  setServant,
  startNewTurn,
  teamsReducer,
} from "@/store/slice/teamSlice";
import { UserCraftEssence, UserServant, UserTeam } from "@/types";
import {
  ProtoBattleStep,
  ProtoMysticCode,
  ProtoTrismegistusState,
} from "@/types/proto/trismegistus";
import { indexToSlot } from "@/types/utils";

export function stateToProto(state: TrismegistusState): ProtoTrismegistusState {
  const teams = selectTeams(state);
  return { teams };
}

function addServants(
  servants: UserServant[],
  state: EntityState<UserTeam>,
  teamId: number
) {
  return servants.reduce((mainState, servant, currentIndex) => {
    const slot = indexToSlot(currentIndex);
    if (slot == null) return mainState;
    return teamsReducer(
      mainState,
      setServant({ teamId, slot, entry: servant })
    );
  }, state);
}

function addCraftEssences(
  craftEssences: UserCraftEssence[],
  state: EntityState<UserTeam>,
  teamId: number
) {
  return craftEssences.reduce((mainState, craftEssence, currentIndex) => {
    const slot = indexToSlot(currentIndex);
    if (slot == null) return mainState;
    return teamsReducer(
      mainState,
      setCraftEssence({ teamId, slot, entry: craftEssence })
    );
  }, state);
}

function addMysticCode(
  mysticCode: ProtoMysticCode | undefined,
  state: EntityState<UserTeam>,
  teamId: number
) {
  if (mysticCode == null) {
    return state;
  }
  return teamsReducer(state, setMysticCode({ teamId, entry: mysticCode }));
}

function addCommandScript(
  commandScript: ProtoBattleStep[],
  result: EntityState<UserTeam>,
  teamId: number
) {
  return commandScript.reduce((mainState, next) => {
    const { commands, battleCommands } = next;
    let newTurn = teamsReducer(mainState, startNewTurn(teamId));

    newTurn = commands.reduce((acc, command) => {
      return teamsReducer(acc, addCommand({ teamId, entry: command }));
    }, newTurn);

    newTurn = battleCommands.reduce((acc, battleCommand) => {
      return teamsReducer(
        acc,
        addBattleCommand({ teamId, entry: battleCommand })
      );
    }, newTurn);

    return newTurn;
  }, result);
}

export function protoToState({
  teams,
}: ProtoTrismegistusState): EntityState<UserTeam> {
  return Object.entries(teams).reduce((userTeams, [rawId, protoTeam]) => {
    const teamId = parseInt(rawId);
    if (!Number.isInteger(teamId)) return userTeams;

    const { mysticCode, servants, craftEssences, commandScript } = protoTeam;
    let result = teamsReducer(userTeams, newTeam(teamId));

    result = addMysticCode(mysticCode, result, teamId);
    result = addServants(servants, result, teamId);
    result = addCraftEssences(craftEssences, result, teamId);
    result = addCommandScript(commandScript, result, teamId);

    return result;
  }, getTeamsInitialState());
}
