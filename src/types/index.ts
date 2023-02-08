import { Servant, Skill } from "@atlasacademy/api-connector";

import { CommandType, MemberSlot } from "@/types/proto/trismegistus";

export { MemberSlot };

export type SkillNum = Extract<
  CommandType,
  CommandType.SKILL_1 | CommandType.SKILL_2 | CommandType.SKILL_3
>;

export type FieldSlot = Extract<
  MemberSlot,
  MemberSlot.FIELD_1 | MemberSlot.FIELD_2 | MemberSlot.FIELD_3
>;

export type SubSlot = Extract<
  MemberSlot,
  MemberSlot.SUB_1 | MemberSlot.SUB_2 | MemberSlot.SUB_3
>;

export interface SkillInfo {
  owner: MemberSlot;
  skillNum: SkillNum;
}

export interface TeamEntry {
  teamId: string;
}

export interface Member {
  slot: MemberSlot;
}

export interface BattleEntry {
  step?: number;
}

export interface TeamMember extends TeamEntry, Member {}

export interface TeamBattleEntry extends TeamEntry, BattleEntry {}

export enum TeamViewMode {
  VIEW = "view",
  EDIT = "edit",
  SCRIPT = "script",
}

export interface TeamContextData extends TeamEntry {
  slot: MemberSlot;
  mode: TeamViewMode;
}

export interface SkillActivation {
  skill: [skill: Skill.Skill | undefined, level: number];
  source: MemberSlot;
  target?: MemberSlot;
}

export interface NoblePhantasmActivation {
  servant: Servant.Servant;
}
