import { BattleAction } from "./battle";

export type Party = {
  servants: [number?, number?, number?, number?, number?, number?];
  mysticCode?: number;
  actions: BattleAction<any>[];
};

export type SkillNum = 1 | 2 | 3;

export type FieldMember = 0 | 1 | 2;
export type SubMember = 3 | 4 | 5;
export type PartySlot = FieldMember | SubMember;
export type ActionSource = FieldMember | "mysticCode";
