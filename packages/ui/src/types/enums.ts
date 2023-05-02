import { z } from "zod";

import type { EnumMapping } from "@/types/index";

export const MemberSlotEnum = z.enum([
  "Field1",
  "Field2",
  "Field3",
  "Sub1",
  "Sub2",
  "Sub3",
  "None",
]);
export const MemberSlot = MemberSlotEnum.enum;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type MemberSlot = z.infer<typeof MemberSlotEnum>;

export const MemberSlotMapping = Object.freeze<EnumMapping<MemberSlot>>({
  options: ["Field1", "Field2", "Field3", "Sub1", "Sub2", "Sub3", "None"],
  indexes: {
    Field1: 0,
    Field2: 1,
    Field3: 2,
    Sub1: 3,
    Sub2: 4,
    Sub3: 5,
    None: 6,
  },
});

export const SkillNumEnum = z.enum(["Skill1", "Skill2", "Skill3"]);
export const SkillNum = SkillNumEnum.enum;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type SkillNum = z.infer<typeof SkillNumEnum>;
export function skillNumToInt(skillNum: SkillNum): number {
  switch (skillNum) {
    case "Skill1":
      return 1;
    case "Skill2":
      return 2;
    case "Skill3":
      return 3;
  }
}
export const BattleCommandEnum = z.enum(["CommandCard", "NoblePhantasm"]);
export const BattleCommandType = BattleCommandEnum.enum;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type BattleCommandType = z.infer<typeof BattleCommandEnum>;
