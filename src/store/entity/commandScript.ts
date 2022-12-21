import { deferP0, pipe } from "ts-functional-pipe";

import { TrismegistusState } from "@/store";
import { selectTeamById } from "@/store/slice/teamSlice";
import { UserCommand, UserTeam } from "@/types";
import { coalesce } from "@/util/func";

export function selectCommandScript(team: UserTeam) {
  return team.commandScript;
}

export function getInitialCommandScriptState(): UserCommand[] {
  return [];
}

export function selectTeamCommandScript(
  teamId: number
): (state: TrismegistusState) => UserCommand[] {
  return pipe(
    deferP0(selectTeamById)(teamId),
    coalesce(selectCommandScript, [])
  );
}
