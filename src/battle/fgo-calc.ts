import { calcSvt, CalcVals } from "fgo-calc";
import { funcToCalcStr } from "fgo-calc/dist/utils";
import { Store } from "redux";

import { BattleEngine, BattleResult } from "@/battle/index";
import { TrismegistusState } from "@/store";
import { selectCommandSkill } from "@/store/entity/commandScript";
import { UserCommand, UserServant } from "@/types";
import { CommandType } from "@/types/proto/trismegistus";

export function createFgoCalcBattleEngine(
  store: Store<TrismegistusState>
): BattleEngine {
  function userServantToCalcStr({
    level,
    fou,
    noblePhantasmLevel,
  }: UserServant): string {
    return `np${noblePhantasmLevel} lv${level} f${fou}`;
  }

  function commandsToCalcStr(teamId: number, commands: UserCommand[]): string {
    const state = store.getState();
    return commands.reduce((calcString, { type, source }) => {
      if (
        type === CommandType.NO_COMMAND ||
        type === CommandType.UNRECOGNIZED
      ) {
        return calcString;
      }
      const selector = selectCommandSkill(teamId, source, type);
      const [skill, skillLevel] = selector(state);

      return (
        skill?.functions.reduce((acc, nextFunc) => {
          return (
            acc +
            " " +
            Object.values(funcToCalcStr(nextFunc, skillLevel)).join(" ")
          );
        }, calcString) ?? calcString
      );
    }, "");
  }

  return {
    calculate(teamId, userServant, servant, commands): BattleResult {
      const servantStat = userServantToCalcStr(userServant);
      const modifiers = commandsToCalcStr(teamId, commands);
      const {
        damageFields: { damage, minrollDamage, maxrollDamage },
      } = calcSvt(servant, modifiers + " " + servantStat).vals as CalcVals;
      return { damage: [minrollDamage, damage, maxrollDamage] };
    },
  };
}
