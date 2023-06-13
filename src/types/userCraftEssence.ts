import { CraftEssence } from "@atlasacademy/api-connector";
import { z } from "zod";

import { rangedInt } from "@/types/utils";

export const UserCraftEssence = z.object({
  craftEssenceColNo: rangedInt(0, 65535),
  craftEssenceLevel: rangedInt(1, 100),
  craftEssenceMLB: z.boolean().default(false),
  craftEssenceId: rangedInt(0, 4294967295),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserCraftEssence = z.output<typeof UserCraftEssence>;
export type InputCraftEssence = z.input<typeof UserCraftEssence>;

const ContextualCraftEssence = z
  .object({
    userCraftEssence: UserCraftEssence,
    maxLv: z.number().positive().optional(),
  })
  .refine(({ maxLv, userCraftEssence }) => {
    const { craftEssenceLevel } = userCraftEssence;
    if (maxLv == null || craftEssenceLevel == null) return true;
    return craftEssenceLevel > maxLv;
  });

export function createUserCraftEssence(
  input: InputCraftEssence = {},
  craftEssence?: CraftEssence.CraftEssence
): UserCraftEssence {
  return ContextualCraftEssence.parse({
    userCraftEssence: input,
    maxLv: craftEssence?.lvMax,
  }).userCraftEssence;
}
