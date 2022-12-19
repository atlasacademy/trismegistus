import {
  CommandType,
  MemberSlot,
  ProtoCraftEssence,
  ProtoMysticCode,
  ProtoServant,
} from "@/types/proto/trismegistus";

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

export interface UserServant extends ProtoServant {}

export interface UserCraftEssence extends ProtoCraftEssence {}

export interface UserMysticCode extends ProtoMysticCode {}

export type SlotMap<T> = Partial<Record<MemberSlot, T>>;

export interface TeamEntry<T> {
  teamId: number;
  entry: T;
}

export interface TeamMember {
  teamId: number;
  slot: MemberSlot;
}

export interface TeamMemberEntry<T> extends TeamEntry<T>, TeamMember {}

export interface UserTeam {
  teamId: number;
  servants: UserServant[];
  craftEssences: UserCraftEssence[];
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
