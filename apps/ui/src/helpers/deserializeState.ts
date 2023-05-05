import { EntityState, nanoid } from "@reduxjs/toolkit";
import { BitBuffer, BitBufferReader } from "@trismegistus/zod-bit-buffer";

import { base64ToBytes } from "@/helpers/base64";
import {
  TrismegistusBinaryState,
  TrismegistusTeams,
} from "@/helpers/binaryState";
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
import { MemberSlotMapping } from "@/types/enums";
import { InputBattleStep } from "@/types/userCommandScript";
import { InputCraftEssence } from "@/types/userCraftEssence";
import { InputMysticCode } from "@/types/userMysticCode";
import { InputServant } from "@/types/userServant";
import { InputTeam } from "@/types/userTeam";

function addServants(
  servants: InputServant[],
  state: EntityState<InputTeam>,
  entry: TeamEntry
): EntityState<InputTeam> {
  return servants.reduce((mainState, servant, currentIndex) => {
    const slot = MemberSlotMapping.options[currentIndex];
    if (slot == null) return mainState;
    return teamsReducer(mainState, setServant({ slot, item: servant }, entry));
  }, state);
}

function addCraftEssences(
  craftEssences: InputCraftEssence[],
  state: EntityState<InputTeam>,
  entry: TeamEntry
): EntityState<InputTeam> {
  return craftEssences.reduce((mainState, craftEssence, currentIndex) => {
    const slot = MemberSlotMapping.options[currentIndex];
    if (slot == null) return mainState;
    return teamsReducer(
      mainState,
      setCraftEssence({ slot, item: craftEssence }, entry)
    );
  }, state);
}

function addMysticCode(
  mysticCode: InputMysticCode | undefined,
  state: EntityState<InputTeam>,
  entry: TeamEntry
): EntityState<InputTeam> {
  if (mysticCode == null) {
    return state;
  }
  return teamsReducer(state, updateMysticCode(mysticCode, entry));
}

function addCommandScript(
  commandScript: InputBattleStep[],
  result: EntityState<InputTeam>,
  entry: TeamEntry
) {
  return commandScript.reduce((mainState, next) => {
    const { skills, battleCommands } = next;
    let newTurn = teamsReducer(mainState, startNewTurn(undefined, entry));

    newTurn =
      skills?.reduce((acc, command) => {
        return teamsReducer(acc, addCommand({ item: command }, entry));
      }, newTurn) ?? newTurn;

    newTurn =
      battleCommands?.reduce((acc, battleCommand) => {
        return teamsReducer(
          acc,
          addBattleCommand({ item: battleCommand }, entry)
        );
      }, newTurn) ?? newTurn;

    return newTurn;
  }, result);
}
export function deserializeState(rawState: string): EntityState<InputTeam> {
  const uint8Array = base64ToBytes(rawState);
  const bitBuffer = new BitBuffer(uint8Array);

  const teams = TrismegistusBinaryState.read(new BitBufferReader(bitBuffer));
  TrismegistusTeams.parse(teams);

  return (teams as InputTeam[]).reduce((userTeams, protoTeam) => {
    const { mysticCode, servants, craftEssences, commandScript } = protoTeam;
    const teamId = nanoid();
    const entry: TeamEntry = { teamId };
    let result = teamsReducer(userTeams, newTeam(teamId));

    result = addMysticCode(mysticCode, result, entry);
    result = addServants(servants, result, entry);
    result = addCraftEssences(craftEssences, result, entry);
    result = addCommandScript(commandScript, result, entry);

    return result;
  }, getTeamsInitialState());
}
