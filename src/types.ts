import { BattleAction } from "./battle";

export type Party = {
  servants: [number?, number?, number?, number?, number?, number?];
  mysticCode?: number;
  actions: BattleAction<any>[];
};

export type SkillNum = 1 | 2 | 3;

export type FieldMemberSlot = 0 | 1 | 2;
export type SubMemberSlot = 3 | 4 | 5;
export type PartySlot = FieldMemberSlot | SubMemberSlot;
export type ActionSource = FieldMemberSlot | "mysticCode";
