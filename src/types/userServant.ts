import { Servant } from "@atlasacademy/api-connector";
import produce from "immer";
import { z } from "zod";

import { rangedInt } from "@/types/utils";

export const UserServant = z.object({
  servantColNo: rangedInt(0, 4095),
  servantLevel: rangedInt(1, 120).describe("Servant Level"),
  fou: rangedInt(0, 2000).describe("Attack Fou"),
  noblePhantasmLevel: rangedInt(1, 5).describe("Noble Phantasm"),
  skill1: rangedInt(1, 10).describe("Skill 1"),
  skill2: rangedInt(1, 10).describe("Skill 2"),
  skill3: rangedInt(1, 10).describe("Skill 3"),
  append1: rangedInt(0, 10).describe("Append 1"),
  append2: rangedInt(0, 10).describe("Append 2"),
  append3: rangedInt(0, 10).describe("Append 3"),
  servantId: rangedInt(0, 4294967295),
});

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type UserServant = z.output<typeof UserServant>;
export type InputServant = z.input<typeof UserServant>;
export interface UserServantDefaults extends Omit<InputServant, "servantId"> {}

export function createUserServant(
  input: InputServant = {},
  defaults?: UserServantDefaults,
  servant?: Servant.Servant
): UserServant {
  let userServant = input;
  if (servant != null) {
    userServant = produce(userServant, (draft) => {
      draft.servantLevel ??= servant.lvMax;
    });
  }
  if (defaults != null) {
    userServant = produce(userServant, (draft) => {
      draft.servantLevel ??= defaults.servantLevel;
      draft.fou ??= defaults.fou;
      draft.noblePhantasmLevel ??= defaults.noblePhantasmLevel;
      draft.skill1 ??= defaults.skill1;
      draft.skill2 ??= defaults.skill2;
      draft.skill3 ??= defaults.skill3;
      draft.append1 ??= defaults.append1;
      draft.append2 ??= defaults.append2;
      draft.append3 ??= defaults.append3;
    });
  }
  return UserServant.parse(userServant);
}
