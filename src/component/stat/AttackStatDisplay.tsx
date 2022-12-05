import * as Popover from "@radix-ui/react-popover";
import { IconInfoCircle } from "@tabler/icons";

import { useTeamContext } from "@/hook/useTeamContext";
import { useSelector } from "@/store";
import {
  selectTeamCraftEssenceAttackBySlot,
  selectTeamCraftEssenceWithDefaults,
} from "@/store/entity/craftEssence";
import { selectTeamServantAttackBySlot } from "@/store/entity/servant";
import { UserServant } from "@/types";

export interface AttackStatDisplayProps {
  userServant: UserServant;
}

export function AttackStatDisplay({ userServant }: AttackStatDisplayProps) {
  const { teamId, slot } = useTeamContext();

  const servantAttack = useSelector(selectTeamServantAttackBySlot(userServant));
  const userCraftEssence = useSelector(
    selectTeamCraftEssenceWithDefaults(teamId, slot)
  );

  const craftEssenceAttack = useSelector(
    selectTeamCraftEssenceAttackBySlot(userCraftEssence)
  );

  return (
    <>
      ATK: {servantAttack + userServant.fou + craftEssenceAttack}{" "}
      <Popover.Root>
        <Popover.Trigger>
          <IconInfoCircle size="1em" />
        </Popover.Trigger>
        <Popover.Anchor />
        <Popover.Portal>
          <Popover.Content className="rounded bg-white p-2 text-gray-800">
            <p>ATK: {servantAttack}</p>
            <p>Fou: {userServant.fou}</p>
            <p>CE: {craftEssenceAttack}</p>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </>
  );
}
