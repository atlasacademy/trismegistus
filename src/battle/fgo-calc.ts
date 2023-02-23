import { Func } from "@atlasacademy/api-connector";
import { calcSvt, CalcVals } from "fgo-calc";
import { funcToCalcStr } from "fgo-calc/dist/utils";

import { BattleEngine, BattleResult } from "@/battle/index";
import { SkillActivation } from "@/types";
import { MemberSlot } from "@/types/enums";
import { UserServant } from "@/types/userServant";

export function createFgoCalcBattleEngine(): BattleEngine {
  function userServantToCalcStr({
    servantLevel,
    fou,
    noblePhantasmLevel,
  }: UserServant): string {
    return `np${noblePhantasmLevel} lv${servantLevel} f${fou}`;
  }

  function commandsToCalcStr(
    currentSlot: MemberSlot,
    commands: SkillActivation[]
  ): string {
    return commands.reduce((calcString, { skill, source, target }) => {
      const [sourceSkill, skillLevel] = skill;
      return (
        sourceSkill?.functions.reduce((skillCalcStr, nextFunc) => {
          const effects = funcToCalcStr(nextFunc, skillLevel);
          return Object.entries(effects).reduce(
            (funcToStr, [targetType, nextStr]) => {
              const type = targetType as Func.FuncTargetType;
              if (source in getTeamMembers(source, type, target)) {
                return funcToStr + " " + nextStr;
              }
              return funcToStr;
            },
            skillCalcStr
          );
        }, calcString) ?? calcString
      );
    }, "");
  }

  return {
    calculate(
      slot,
      userServant,
      servant,
      userCraftEssence,
      craftEssence,
      skills
    ): BattleResult {
      const servantStat = userServantToCalcStr(userServant);
      const modifiers = commandsToCalcStr(slot, skills);
      const {
        damageFields: { damage, minrollDamage, maxrollDamage },
      } = calcSvt(servant, modifiers + " " + servantStat).vals as CalcVals;
      return {
        damage: { min: minrollDamage, base: damage, max: maxrollDamage },
      };
    },
  };
}

function getTeamMembers(
  source: MemberSlot,
  targetType: Func.FuncTargetType,
  target: MemberSlot = MemberSlot.None
): MemberSlot[] {
  if (targetType === Func.FuncTargetType.PT_ALL) {
    return [MemberSlot.Field1, MemberSlot.Field2, MemberSlot.Field3];
  }
  if (targetType === Func.FuncTargetType.SELF) {
    return [source];
  }
  if (targetType === Func.FuncTargetType.PT_OTHER) {
    return [MemberSlot.Field1, MemberSlot.Field2, MemberSlot.Field3].filter(
      (fieldSlot) => fieldSlot !== source
    );
  }
  if (targetType === Func.FuncTargetType.PT_ONE) {
    return [target];
  }
  if (targetType === Func.FuncTargetType.PT_ONE_OTHER) {
    return [MemberSlot.Field1, MemberSlot.Field2, MemberSlot.Field3].filter(
      (fieldSlot) => fieldSlot !== target
    );
  }
  if (targetType === Func.FuncTargetType.PT_FULL) {
    return [
      MemberSlot.Field1,
      MemberSlot.Field2,
      MemberSlot.Field3,
      MemberSlot.Sub1,
      MemberSlot.Sub2,
      MemberSlot.Sub3,
    ];
  }
  if (targetType === Func.FuncTargetType.PT_OTHER_FULL) {
    return [
      MemberSlot.Field1,
      MemberSlot.Field2,
      MemberSlot.Field3,
      MemberSlot.Sub1,
      MemberSlot.Sub2,
      MemberSlot.Sub3,
    ].filter((slot) => slot !== target);
  }

  // TODO: handle other FuncTargetTypes
  return [];
}
