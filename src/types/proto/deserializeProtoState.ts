import { EntityState, nanoid } from "@reduxjs/toolkit";

import {
  addBattleCommand,
  addCommand,
  setCraftEssence,
  setServant,
  startNewTurn,
  updateMysticCode,
} from "@/store/slice/teamReducer";
import {
  getTeamsInitialState,
  newTeam,
  teamsReducer,
} from "@/store/slice/teamSlice";
import { TeamEntry } from "@/types";
import {
  ProtoBattleStep,
  ProtoMysticCode,
  ProtoTeamSlot,
  ProtoTrismegistusState,
} from "@/types/proto/trismegistus";
import { UserCraftEssence } from "@/types/userCraftEssence";
import { InputTeam } from "@/types/userTeam";
import { indexToSlot } from "@/types/utils";

function addServants(
  servants: ProtoTeamSlot[],
  state: EntityState<InputTeam>,
  entry: TeamEntry
): EntityState<InputTeam> {
  return servants.reduce((mainState, servant, currentIndex) => {
    const slot = indexToSlot(currentIndex);
    if (slot == null) return mainState;
    return teamsReducer(mainState, setServant({ slot, item: servant }, entry));
  }, state);
}

function addCraftEssences(
  craftEssences: UserCraftEssence[],
  state: EntityState<InputTeam>,
  entry: TeamEntry
): EntityState<InputTeam> {
  return craftEssences.reduce((mainState, craftEssence, currentIndex) => {
    const slot = indexToSlot(currentIndex);
    if (slot == null) return mainState;
    return teamsReducer(
      mainState,
      setCraftEssence({ slot, item: craftEssence }, entry)
    );
  }, state);
}

function addMysticCode(
  mysticCode: ProtoMysticCode | undefined,
  state: EntityState<InputTeam>,
  entry: TeamEntry
): EntityState<InputTeam> {
  if (mysticCode == null) {
    return state;
  }
  return teamsReducer(state, updateMysticCode(mysticCode, entry));
}

function addCommandScript(
  commandScript: ProtoBattleStep[],
  result: EntityState<InputTeam>,
  entry: TeamEntry
) {
  return commandScript.reduce((mainState, next) => {
    const { commands, battleCommands } = next;
    let newTurn = teamsReducer(mainState, startNewTurn(undefined, entry));

    newTurn = commands.reduce((acc, command) => {
      return teamsReducer(acc, addCommand({ item: command }, entry));
    }, newTurn);

    newTurn = battleCommands.reduce((acc, battleCommand) => {
      return teamsReducer(
        acc,
        addBattleCommand({ item: battleCommand }, entry)
      );
    }, newTurn);

    return newTurn;
  }, result);
}

export function deserializeProtoState({
  teams,
}: ProtoTrismegistusState): EntityState<InputTeam> {
  return teams.reduce((userTeams, protoTeam) => {
    const { mysticCode, slots, commandScript } = protoTeam;
    const teamId = nanoid();
    const entry: TeamEntry = { teamId };
    let result = teamsReducer(userTeams, newTeam(teamId));

    result = addMysticCode(mysticCode, result, entry);
    result = addServants(slots, result, entry);
    result = addCraftEssences(slots, result, entry);
    result = addCommandScript(commandScript, result, entry);

    return result;
  }, getTeamsInitialState());
}
