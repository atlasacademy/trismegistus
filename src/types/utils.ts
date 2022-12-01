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
  skills,
  appends,
}: AtLeast<UserServant, "slot">): UserServant {
  return {
    slot,
    servantId: servantId ?? 0,
    level: level ?? 0,
    fou: fou ?? 0,
    noblePhantasmLevel: noblePhantasmLevel ?? 0,
    skills: skills ?? [0, 0, 0],
    appends: appends ?? [0, 0, 0],
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
  };
}
