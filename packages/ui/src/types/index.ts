import { Servant, Skill } from "@atlasacademy/api-connector";

import { MemberSlot } from "@/types/enums";

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

