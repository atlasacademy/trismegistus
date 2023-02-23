import { z } from "zod";

import { BattleCommandEnum, MemberSlotEnum, SkillNumEnum } from "@/types/enums";

export const UserSkillActivation = z.object({
  type: SkillNumEnum,
  source: MemberSlotEnum,
  target: MemberSlotEnum,
});
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserSkillActivation = z.infer<typeof UserSkillActivation>;

export const UserBattleCommand = z.object({
  type: BattleCommandEnum,
  source: MemberSlotEnum,
});
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserBattleCommand = z.infer<typeof UserBattleCommand>;

export const UserCommand = z.discriminatedUnion("type", [
  UserSkillActivation,
  UserBattleCommand,
]);
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserCommand = z.infer<typeof UserCommand>;

export const UserBattleStep = z.object({
  skills: z.array(UserSkillActivation).default([]),
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
