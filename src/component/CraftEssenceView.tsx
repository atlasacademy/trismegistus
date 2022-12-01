import craftEssencePlaceholder from "@assets/unknown-ce.png";
import { CraftEssence } from "@atlasacademy/api-connector";

import { useCraftEssenceQuery } from "@/api";
import { Portrait } from "@/component/Portrait";
import { CraftEssenceSelection } from "@/component/selection/CraftEssenceSelection";
import { Spinner } from "@/component/Spinner";
import { useTeamContext } from "@/hook/useTeamContext";
import { useSelector } from "@/store";
import {
  selectTeamCraftEssenceAttackBySlot,
  selectTeamCraftEssenceBySlot,
} from "@/store/entity/craftEssence";
import { TeamViewMode, UserCraftEssence } from "@/types";

interface CraftEssenceViewProps {
  teamId: number;
  userCraftEssence: UserCraftEssence;
  craftEssence: CraftEssence.CraftEssence;
}

function CraftEssenceView({
  teamId,
  userCraftEssence: { slot, craftEssenceLevel },
  craftEssence,
}: CraftEssenceViewProps) {
  const craftEssenceAttack = useSelector(
    selectTeamCraftEssenceAttackBySlot(teamId, slot)
  );
  return (
    <Portrait
      src={
        craftEssence.extraAssets.equipFace.equip?.[craftEssence.id] ??
        craftEssencePlaceholder
      }
      placeholderText={craftEssence.name}
    >
      <div className="flex justify-between">
        <div className="bg-overlay rounded-tr px-1">
          Lv: {craftEssenceLevel}
        </div>
        <div className="bg-overlay rounded-tl px-1">
          ATK : {craftEssenceAttack}
        </div>
      </div>
    </Portrait>
  );
}

export function CraftEssenceSlotView() {
  const { teamId, slot, mode } = useTeamContext();
  const userCraftEssence = useSelector(
    selectTeamCraftEssenceBySlot(teamId, slot)
  );
  const { craftEssenceId } = userCraftEssence;
  const { data: craftEssence, isLoading } =
    useCraftEssenceQuery(craftEssenceId);
  return (
    <section className="bg-overlay flex h-16 w-full grow-0 overflow-hidden">
      {isLoading ? (
        <span className="flex h-full w-full items-center justify-center align-middle">
          <Spinner />
        </span>
      ) : craftEssence != null ? (
        <CraftEssenceView
          teamId={teamId}
          userCraftEssence={userCraftEssence}
          craftEssence={craftEssence}
        />
      ) : (
        <CraftEssenceSelection className="w-full">
          {mode === TeamViewMode.EDIT ? (
            <span className="mx-auto">Add CraftEssence</span>
          ) : undefined}
        </CraftEssenceSelection>
      )}
    </section>
  );
}
