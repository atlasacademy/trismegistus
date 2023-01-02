import {
  CraftEssence,
  Entity,
  MysticCode,
  Servant,
  Skill,
} from "@atlasacademy/api-connector";
import { pipe } from "ts-functional-pipe";

import { apiEndpoints } from "@/api/index";
import { TrismegistusState } from "@/store";
import {
  SkillNum,
  UserCraftEssence,
  UserMysticCode,
  UserServant,
} from "@/types";

export function selectServant({
  servantId,
}: UserServant): (state: TrismegistusState) => Servant.Servant | undefined {
  return pipe(apiEndpoints.servant.select(servantId), ({ data }) => data);
}

export function selectCraftEssence({
  craftEssenceId,
}: UserCraftEssence): (
  state: TrismegistusState
) => CraftEssence.CraftEssence | undefined {
  return pipe(
    apiEndpoints.craftEssence.select(craftEssenceId),
    ({ data }) => data
  );
}

export function selectMysticCode({
  mysticCodeId,
}: UserMysticCode): (
  state: TrismegistusState
) => MysticCode.MysticCode | undefined {
  return pipe(apiEndpoints.mysticCode.select(mysticCodeId), ({ data }) => data);
}

export function selectEntitySkill(
  entity: Entity.Entity,
  skillNum: SkillNum
): Skill.Skill | undefined {
  return entity.skills.reduce<Skill.Skill | undefined>((result, next) => {
    if (
      next.num === skillNum &&
      (next.priority ?? 0) > (result?.priority ?? 0)
    ) {
      return next;
    }
    return result;
  }, undefined);
}
