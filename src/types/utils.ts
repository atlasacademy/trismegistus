import {
  MemberSlot,
  UserCraftEssence,
  UserMysticCode,
  UserServant,
} from "@/types";

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export function nextMemberSlot(slot: MemberSlot) {
  const nextSlotNumber = slot + 1;
  const slotName = MemberSlot[nextSlotNumber] as keyof typeof MemberSlot;
  if (slotName == null) {
    return undefined;
  }
  return MemberSlot[slotName];
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
  slot,
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
}: AtLeast<UserServant, "slot">): UserServant {
  return {
    slot,
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
  slot,
  craftEssenceId,
  craftEssenceLevel,
}: AtLeast<UserCraftEssence, "slot">): UserCraftEssence {
  return {
    slot,
    craftEssenceId: craftEssenceId ?? 0,
    craftEssenceLevel: craftEssenceLevel ?? 0,
    maxLimitBreak: false,
  };
}
