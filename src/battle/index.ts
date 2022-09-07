import { SkillNum, StartingMember } from "@/types";

export interface BattleAction<T extends string> {
  type: T;
  slot: StartingMember;
}

export interface SkillBattleAction extends BattleAction<"skill"> {
  skillNum: SkillNum;
}

export interface NPBattleAction extends BattleAction<"np"> {}

export interface BattleEngine {}
