import { ActionSource, FieldMemberSlot, SkillNum } from "@/types";

export interface BattleAction<T extends ActionSource> {
  source: T;
}

export interface ServantSkillBattleAction
  extends BattleAction<FieldMemberSlot> {
  servantSkillNum: SkillNum;
}

export interface MysticCodeSkillBattleAction
  extends BattleAction<"mysticCode"> {
  mysticCodeSkillNum: SkillNum;
}

export function isSkillAction(
  battleAction: BattleAction<any>
): battleAction is ServantSkillBattleAction {
  return battleAction.source in [0, 1, 2] && "servantSkillNum" in battleAction;
}

export interface NPBattleAction extends BattleAction<FieldMemberSlot> {}

export interface BattleEngine {}
