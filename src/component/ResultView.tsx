import { useRef } from "react";

import { selectServant } from "@/api/selectors";
import { BattleEngine } from "@/battle";
import { createFgoCalcBattleEngine } from "@/battle/fgo-calc";
import { useMemoSelector, useSelector, useStore } from "@/store";
import { selectTeamCommandScript } from "@/store/entity/commandScript";
import { selectTeamServantBySlot } from "@/store/entity/servant";
import { MemberSlot, UserBattleCommand, UserCommand } from "@/types";
import { BattleCommandType } from "@/types/proto/trismegistus";

interface DamageRangeProps {
  teamId: number;
  battleEngine: BattleEngine;
  source: MemberSlot;
  commands: UserCommand[];
}

function DamageRange({
  teamId,
  battleEngine,
  source,
  commands,
}: DamageRangeProps) {
  const userServant = useMemoSelector(selectTeamServantBySlot, [
    teamId,
    source,
  ]);
  const servant = useSelector(selectServant(userServant));

  if (servant == null) return <></>;
  const {
    damage: [min, base, max],
  } = battleEngine.calculate(teamId, userServant, servant, commands);

  return (
    <div>
      <div className="w-32">
        <div className="w-full border">{base}</div>
        <div className="flex">
          <div className="w-1/2 border">{min}</div>
          <div className="w-1/2 border">{max}</div>
        </div>
      </div>
    </div>
  );
}

export interface ResultViewProps {
  teamId: number;
}

interface BattleStepResultProps {
  teamId: number;
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
  const store = useStore();
  const { current: battleEngine } = useRef<BattleEngine>(
    createFgoCalcBattleEngine(store)
  );
  const commandScript = useMemoSelector(selectTeamCommandScript, [teamId]);

  return (
    <section>
      {commandScript.map(({ commands, battleCommands }, index) => (
        <section key={index}>
          <BattleStepResult
            teamId={teamId}
            battleEngine={battleEngine}
            commands={commands}
            battleCommands={battleCommands}
          />
        </section>
      ))}
    </section>
  );
}
