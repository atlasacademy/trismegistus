import { Servant, Skill } from "@atlasacademy/api-connector";
import { pipe } from "ts-functional-pipe";

import { apiEndpoints } from "@/api/index";
import {
  SkillNum,
  UserCraftEssence,
  UserMysticCode,
  UserServant,
} from "@/types";

export function selectServant({ servantId }: UserServant) {
  return pipe(apiEndpoints.servant.select(servantId), ({ data }) => data);
}

export function selectCraftEssence({ craftEssenceId }: UserCraftEssence) {
  return pipe(
    apiEndpoints.craftEssence.select(craftEssenceId),
    ({ data }) => data
  );
}

export function selectMysticCode({ mysticCodeId }: UserMysticCode) {
  return pipe(apiEndpoints.mysticCode.select(mysticCodeId), ({ data }) => data);
}

export function selectServantSkill(
  servant: Servant.Servant,
  skillNum: SkillNum
) {
  return servant.skills.reduce<Skill.Skill | undefined>((result, next) => {
    if (
      next.num === skillNum &&
      (next.priority ?? 0) > (result?.priority ?? 0)
    ) {
      return next;
    }
    return result;
  }, undefined);
}
