import produce from "immer";
import { z } from "zod";

import { positiveInt, rangedInt } from "@/types/utils";

export const UserMysticCode = z.object({
  mysticCodeId: positiveInt(),
  mysticCodeLevel: rangedInt(1, 10).describe("Mystic Code Level"),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserMysticCode = z.output<typeof UserMysticCode>;
export type InputMysticCode = z.input<typeof UserMysticCode>;
export type UserMysticCodeDefaults = Omit<InputMysticCode, "mysticCodeId">;

export function createUserMysticCode(
  input: InputMysticCode = {},
  defaults?: UserMysticCodeDefaults
): UserMysticCode {
  let userMysticCode = input;
  if (defaults != null) {
    userMysticCode = produce(userMysticCode, (draft) => {
      draft.mysticCodeLevel ??= defaults.mysticCodeLevel;
    });
  }
  return UserMysticCode.parse(userMysticCode);
}
