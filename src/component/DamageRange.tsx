import { connect } from "react-redux";

import {
  createCraftEssenceSelector,
  createServantSelector,
} from "@/api/selectors";
import { BattleEngine, BattleResult } from "@/battle";
import { TrismegistusState } from "@/store";
import { createSkillActivationSelector } from "@/store/selectors/commandScript";
import { createTeamUserCraftEssenceSelector } from "@/store/selectors/craftEssence";
import { createTeamUserServantSelector } from "@/store/selectors/servant";
import { MemberSlot, TeamEntry } from "@/types";
import { UserCommand } from "@/types/userCommandScript";

interface DamageRangeProps extends TeamEntry {
  battleEngine: BattleEngine;
  source: MemberSlot;
  commands: UserCommand[];
}

function Component({ damage }: Partial<BattleResult>) {
  if (damage == null) return <></>;
  const { min, base, max } = damage;
  return (
    <div>
      <div className="w-32">
        <div className="w-full border">{base}</div>
        <div className="flex">
          <div className="w-1/2 border">{min}</div>
          <div className="w-1/2 border">{max}</div>
        </div>
      </div>
    </div>
  );
}

export const DamageRange = connect(() => {
  const selectUserServant = createTeamUserServantSelector(true);
  const selectUserCraftEssence = createTeamUserCraftEssenceSelector(true);
  const selectServant = createServantSelector();
  const selectCraftEssence = createCraftEssenceSelector();
  const selectSkillActivation = createSkillActivationSelector();

  return (
    state: TrismegistusState,
    { teamId, battleEngine, source, commands }: DamageRangeProps
  ): Partial<BattleResult> => {
    const userServant = selectUserServant(state, teamId, source);
    const servant = selectServant(state, userServant.servantId);
    const userCraftEssence = selectUserCraftEssence(state, teamId, source);
    const craftEssence = selectCraftEssence(
      state,
      userCraftEssence.craftEssenceId
    );
    const skillActivations = commands.map((command) =>
      selectSkillActivation(state, teamId, command)
    );

    if (servant == null) return {};
    return battleEngine.calculate(
      source,
      userServant,
      servant,
      userCraftEssence,
      craftEssence,
      skillActivations
    );
  };
})(Component);
