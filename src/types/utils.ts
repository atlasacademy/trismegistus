import { FieldValues } from "react-hook-form";
import { z } from "zod";

import { MemberSlot, SkillNum } from "@/types";
import { CommandType } from "@/types/proto/trismegistus";

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type FilterFields<T extends FieldValues, ToKeep> = {
  [K in keyof T]: T[K] extends ToKeep ? K : never;
}[keyof T];

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

export function rangedInt(min: number, max: number) {
  return z.number().int().min(min).max(max).default(min);
}

export function positiveInt() {
  return z.number().int().nonnegative().default(0);
}

export function extractFieldInfo(schema: z.ZodDefault<z.ZodNumber>):
  | {
      label: string;
      min: number;
      max: number;
    }
  | undefined {
  const label = schema.description;
  if (label == null) return;
  const { minValue, maxValue } = schema.removeDefault();
  if (minValue == null || maxValue == null) return;
  return { label, min: minValue, max: maxValue };
}
