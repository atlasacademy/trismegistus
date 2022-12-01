import { EntityState } from "@reduxjs/toolkit";

import {
  CommandType,
  MemberSlot,
  ProtoCraftEssence,
  ProtoMysticCode,
  ProtoServant,
} from "@/types/proto/trismegistus";

export { MemberSlot };

type ProtoSkills = keyof Pick<ProtoServant, "skill1" | "skill2" | "skill3">;
type ProtoAppends = keyof Pick<ProtoServant, "append1" | "append2" | "append3">;

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

export interface UserServant
  extends Omit<ProtoServant, ProtoSkills | ProtoAppends | "slot"> {
  slot: MemberSlot;
  skills: number[];
  appends: number[];
}

export interface UserCraftEssence extends Omit<ProtoCraftEssence, "slot"> {
  slot: MemberSlot;
}

export interface UserMysticCode extends ProtoMysticCode {}

export type SlotMap<T> = Partial<Record<MemberSlot, T>>;

export interface TeamEntry<T> {
  teamId: number;
  entry: T;
}

export interface UserTeam {
  teamId: number;
  servants: EntityState<UserServant>;
  craftEssences: EntityState<UserCraftEssence>;
  mysticCode: UserMysticCode;
}

export enum TeamViewMode {
  VIEW = "view",
  EDIT = "edit",
  SCRIPT = "script",
}

export interface TeamContextData {
  teamId: number;
  slot: MemberSlot;
  mode: TeamViewMode;
}

export interface UserServantDefaults
  extends Omit<UserServant, "servantId" | "slot" | "level"> {}
