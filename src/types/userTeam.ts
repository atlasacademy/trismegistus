import { z } from "zod";

import { UserCommandScript } from "@/types/userCommandScript";
import { UserCraftEssence } from "@/types/userCraftEssence";
import { UserMysticCode } from "@/types/userMysticCode";
import { UserServant } from "@/types/userServant";

export const UserTeam = z.object({
  teamId: z.string(),
  mysticCode: UserMysticCode,
  servants: z.array(UserServant),
  craftEssences: z.array(UserCraftEssence),
  commandScript: UserCommandScript,
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserTeam = z.output<typeof UserTeam>;
export type InputTeam = z.input<typeof UserTeam>;

export function createUserTeam(input: InputTeam): UserTeam {
  return UserTeam.parse(input);
}
