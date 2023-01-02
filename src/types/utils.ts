import {
  MemberSlot,
  SkillNum,
  UserBattleStep,
  UserCraftEssence,
  UserMysticCode,
  UserServant,
} from "@/types";
import { CommandType } from "@/types/proto/trismegistus";

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export function nextMemberSlot(slot: MemberSlot) {
  const nextSlotNumber = slot + 1;
  const slotName = MemberSlot[nextSlotNumber] as keyof typeof MemberSlot;
  if (slotName == null) {
    return undefined;
  }
  return MemberSlot[slotName];
}

export function slotToIndex(slot: MemberSlot): number | undefined {
  if (slot === MemberSlot.NONE || slot === MemberSlot.UNRECOGNIZED) {
    return undefined;
  }
  return slot - 1;
}

export function indexToSlot(index: number): MemberSlot | undefined {
  if (index >= 0 && index <= 5) {
    return (index + 1) as MemberSlot;
  }
  return undefined;
}

export function isSkillNum(commandType: CommandType): commandType is SkillNum {
  return (
    commandType === CommandType.SKILL_1 ||
    commandType === CommandType.SKILL_2 ||
    commandType === CommandType.SKILL_3
  );
}

export function createUserMysticCode({
  mysticCodeId,
  mysticCodeLevel,
}: Partial<UserMysticCode>): UserMysticCode {
  return {
    mysticCodeId: mysticCodeId ?? 0,
    mysticCodeLevel: mysticCodeLevel ?? 0,
  };
}

export function createUserServant({
  servantId,
  level,
  fou,
  noblePhantasmLevel,
  skill1,
  skill2,
  skill3,
  append1,
  append2,
  append3,
}: Partial<UserServant> = {}): UserServant {
  return {
    servantId: servantId ?? 0,
    level: level ?? 0,
    fou: fou ?? 0,
    noblePhantasmLevel: noblePhantasmLevel ?? 0,
    skill1: skill1 ?? 0,
    skill2: skill2 ?? 0,
    skill3: skill3 ?? 0,
    append1: append1 ?? 0,
    append2: append2 ?? 0,
    append3: append3 ?? 0,
  };
}

export function createUserCraftEssence({
  craftEssenceId,
  craftEssenceLevel,
  maxLimitBreak,
}: Partial<UserCraftEssence> = {}): UserCraftEssence {
  return {
    craftEssenceId: craftEssenceId ?? 0,
    craftEssenceLevel: craftEssenceLevel ?? 0,
    maxLimitBreak: maxLimitBreak ?? false,
  };
}

export function createUserBattleStep({
  battleCommands,
  commands,
}: Partial<UserBattleStep> = {}) {
  return {
    commands: commands ?? [],
    battleCommands: battleCommands ?? [],
  };
}
