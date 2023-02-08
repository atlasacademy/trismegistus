import { z } from "zod";

import {
  BattleCommandType,
  CommandType,
  MemberSlot,
} from "@/types/proto/trismegistus";

export const UserCommand = z.object({
  type: z.nativeEnum(CommandType),
  source: z.nativeEnum(MemberSlot),
  target: z.nativeEnum(MemberSlot),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserCommand = z.output<typeof UserCommand>;

export const UserBattleCommand = z.object({
  type: z.nativeEnum(BattleCommandType),
  source: z.nativeEnum(MemberSlot),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserBattleCommand = z.output<typeof UserBattleCommand>;

export const UserBattleStep = z.object({
  commands: z.array(UserCommand).default([]),
  battleCommands: z.array(UserBattleCommand).default([]),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserBattleStep = z.output<typeof UserBattleStep>;
export type InputBattleStep = z.input<typeof UserBattleStep>;

export const UserCommandScript = z.array(UserBattleStep);

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserCommandScript = z.output<typeof UserCommandScript>;
export type InputCommandScript = z.input<typeof UserCommandScript>;

export function createUserCommandScript(input: InputCommandScript = []) {
  return UserCommandScript.parse(input);
}

export function createUserBattleStep(input: InputBattleStep = {}) {
  return UserBattleStep.parse(input);
}
