import { z } from "zod";

import type { EnumMapping } from "@/types/index";

export const MemberSlotEnum = z.enum([
  "None",
  "Field1",
  "Field2",
  "Field3",
  "Sub1",
  "Sub2",
  "Sub3",
]);
export const MemberSlot = MemberSlotEnum.enum;
// eslint-disable-next-line @typescript-eslint/no-redeclare
export type MemberSlot = z.infer<typeof MemberSlotEnum>;

export const MemberSlotMapping = Object.freeze<EnumMapping<MemberSlot>>({
  options: ["None", "Field1", "Field2", "Field3", "Sub1", "Sub2", "Sub3"],
  indexes: {
    None: 0,
    Field1: 1,
    Field2: 2,
    Field3: 3,
    Sub1: 4,
    Sub2: 5,
    Sub3: 6,
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
