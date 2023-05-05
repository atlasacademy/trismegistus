import { useRef } from "react";

import { BattleEngine } from "@/battle";
import { createFgoCalcBattleEngine } from "@/battle/fgo-calc";
import { DamageRange } from "@/component/DamageRange";
import { useSelector } from "@/store";
import { selectTeamCommandScript } from "@/store/selectors/commandScript";
import { TeamEntry } from "@/types";
import { BattleCommandType } from "@/types/enums";
import {
  UserBattleCommand,
  UserSkillActivation,
} from "@/types/userCommandScript";

export interface ResultViewProps extends TeamEntry {}

interface BattleStepResultProps extends TeamEntry {
  battleEngine: BattleEngine;
  battleCommands: UserBattleCommand[];
  skills: UserSkillActivation[];
}
function BattleStepResult({
  teamId,
  battleEngine,
  skills,
  battleCommands,
}: BattleStepResultProps) {
  return (
    <>
      {battleCommands
        .filter((command) => command.type === BattleCommandType.NoblePhantasm)
        .map((command, index) => (
          <DamageRange
            teamId={teamId}
            key={index}
            source={command.source}
            battleEngine={battleEngine}
            skills={skills}
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
      {commandScript.map(({ skills, battleCommands }, index) => (
        <section key={index}>
          <BattleStepResult
            teamId={teamId}
            battleEngine={battleEngine}
            skills={skills ?? []}
            battleCommands={battleCommands ?? []}
          />
        </section>
      ))}
    </section>
  );
}
