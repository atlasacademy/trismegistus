import * as Popover from "@radix-ui/react-popover";
import { IconInfoCircle } from "@tabler/icons-react";
import { connect } from "react-redux";

import { useTeamContext } from "@/hooks/useTeamContext";
import { TrismegistusState } from "@/store";
import { createCraftEssenceAttackSelector } from "@/store/selectors/craftEssence";
import {
  createServantAttackSelector,
  createTeamUserServantSelector,
} from "@/store/selectors/servant";
import { TeamContextData } from "@/types";

interface Props {
  servantAttack: number;
  servantAttackFou: number;
  craftEssenceAttack: number;
}

function Component({
  servantAttack,
  servantAttackFou,
  craftEssenceAttack,
}: Props) {
  return (
    <>
      ATK: {servantAttack + servantAttackFou + craftEssenceAttack}{" "}
      <Popover.Root>
        <Popover.Trigger>
          <IconInfoCircle size="1em" />
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content className="rounded bg-white p-2 text-gray-800">
            <p>ATK: {servantAttack}</p>
            <p>Fou: {servantAttackFou}</p>
            <p>CE: {craftEssenceAttack}</p>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
}

const Connected = connect(() => {
  const selectUserServant = createTeamUserServantSelector(true);
  const selectServantAttack = createServantAttackSelector();
  const selectCraftEssenceAttack = createCraftEssenceAttackSelector();
  return (state: TrismegistusState, { teamId, slot }: TeamContextData) => {
    return {
      servantAttack: selectServantAttack(state, teamId, slot),
      servantAttackFou: selectUserServant(state, teamId, slot).fou,
      craftEssenceAttack: selectCraftEssenceAttack(state, teamId, slot),
    };
  };
})(Component);

export function AttackStatDisplay() {
  const { teamId, slot, mode } = useTeamContext();
  return <Connected teamId={teamId} slot={slot} mode={mode} />;
}
