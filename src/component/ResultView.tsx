import { useRef } from "react";

import { BattleEngine } from "@/battle";
import { createFgoCalcBattleEngine } from "@/battle/fgo-calc";
import { DamageRange } from "@/component/DamageRange";
import { useSelector } from "@/store";
import { selectTeamCommandScript } from "@/store/slice/commandScriptSlice";
import { TeamEntry } from "@/types";
import { BattleCommandType } from "@/types/proto/trismegistus";
import { UserBattleCommand, UserCommand } from "@/types/userCommandScript";

export interface ResultViewProps extends TeamEntry {}

interface BattleStepResultProps extends TeamEntry {
  battleEngine: BattleEngine;
  battleCommands: UserBattleCommand[];
  commands: UserCommand[];
}
function BattleStepResult({
  teamId,
  battleEngine,
  commands,
  battleCommands,
}: BattleStepResultProps) {
  return (
    <>
      {battleCommands
        .filter((command) => command.type === BattleCommandType.NOBLE_PHANTASM)
        .map((command, index) => (
          <DamageRange
            teamId={teamId}
            key={index}
            source={command.source}
            battleEngine={battleEngine}
            commands={commands}
          />
        ))}
    </>
  );
}

export function ResultView({ teamId }: ResultViewProps) {
  const { current: battleEngine } = useRef<BattleEngine>(
    createFgoCalcBattleEngine()
  );
  const commandScript = useSelector((state) =>
    selectTeamCommandScript(state, teamId)
  );

  return (
    <section>
      {commandScript.map(({ commands, battleCommands }, index) => (
        <section key={index}>
          <BattleStepResult
            teamId={teamId}
            battleEngine={battleEngine}
            commands={commands ?? []}
            battleCommands={battleCommands ?? []}
          />
        </section>
      ))}
    </section>
  );
}
