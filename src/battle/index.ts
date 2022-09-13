import { ActionSource, SkillNum } from "@/types";

export interface BattleAction<T extends string> {
  type: T;
  source: ActionSource;
}

export interface SkillBattleAction extends BattleAction<"skill"> {
  skillNum: SkillNum;
}

export function isSkillAction(
  battleAction: BattleAction<any>
): battleAction is SkillBattleAction {
  return battleAction.type === "skill" && "skillNum" in battleAction;
}

export interface NPBattleAction extends BattleAction<"np"> {}

export interface BattleEngine {}
