import {
  CraftEssence,
  Entity,
  MysticCode,
  Servant,
  Skill,
} from "@atlasacademy/api-connector";
import { createSelector } from "@reduxjs/toolkit";
import { QueryResultSelectorResult } from "@reduxjs/toolkit/dist/query/core/buildSelectors";
import { QueryArgFrom } from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import { QueryDefinition, SkipToken } from "@reduxjs/toolkit/query";

import { apiEndpoints } from "@/api/index";
import { TrismegistusState } from "@/store";
import { SkillNum } from "@/types";

type DefinitionQuerySelectorFn<
  Definition extends QueryDefinition<any, any, any, any, any>
> = (
  queryArg: QueryArgFrom<Definition> | SkipToken
) => (state: TrismegistusState) => QueryResultSelectorResult<Definition>;

function uncurrySelector<
  Definition extends QueryDefinition<any, any, any, any, any>
>(
  selectorFactory: DefinitionQuerySelectorFn<Definition>
): (
  state: TrismegistusState,
  queryArg: QueryArgFrom<Definition> | SkipToken
) => QueryResultSelectorResult<Definition>["data"] {
  const selector = createSelector(
    [(queryArg: QueryArgFrom<Definition> | SkipToken) => queryArg],
    (queryArg) => selectorFactory(queryArg)
  );

  return (state, queryArg) => {
    return selector(queryArg)(state)?.data;
  };
}

export function createServantSelector(): (
  state: TrismegistusState,
  servantId: number | undefined
) => Servant.Servant | undefined {
  return uncurrySelector(apiEndpoints.servant.select);
}

export function createCraftEssenceSelector(): (
  state: TrismegistusState,
  craftEssenceId: number | undefined
) => CraftEssence.CraftEssence | undefined {
  return uncurrySelector(apiEndpoints.craftEssence.select);
}

export function createMysticCodeSelector(): (
  state: TrismegistusState,
  mysticCodeId: number | undefined
) => MysticCode.MysticCode | undefined {
  return uncurrySelector(apiEndpoints.mysticCode.select);
}

export function selectEntitySkill(
  entity: Entity.Entity | { skills: Skill.Skill[] },
  skillNum: SkillNum
): Skill.Skill | undefined {
  const { skills } = entity;
  if (skills.length === 3) {
    return skills[skillNum - 1];
  }
  return skills.reduce<Skill.Skill | undefined>((result, next) => {
    if (
      next.num === skillNum &&
      (next.priority ?? 0) > (result?.priority ?? 0)
    ) {
      return next;
    }
    return result;
  }, undefined);
}

export function selectEntityAtk(
  { atkGrowth }: Entity.Entity,
  level: number
): number | undefined {
  return atkGrowth[level - 1];
}
