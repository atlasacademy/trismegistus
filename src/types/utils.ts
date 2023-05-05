import { FieldValues } from "react-hook-form";
import { z } from "zod";

import { MemberSlot, MemberSlotEnum } from "@/types/enums";

export type AtLeast<T, K extends keyof T> = Partial<T> & Pick<T, K>;

export type FilterFields<T extends FieldValues, ToKeep> = {
  [K in keyof T]: T[K] extends ToKeep ? K : never;
}[keyof T];

export function nextMemberSlot(slot: MemberSlot): MemberSlot | undefined {
  const slots = MemberSlotEnum.options;
  const index = slots.indexOf(slot);
  return slots[index + 1];
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
