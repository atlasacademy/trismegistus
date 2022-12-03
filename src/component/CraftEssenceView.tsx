import unknownCraftEssence from "@assets/equip_unknown_formation.png";
import craftEssencePlaceholder from "@assets/formation_blank_02.png";
import { CraftEssence } from "@atlasacademy/api-connector";

import { useCraftEssenceQuery } from "@/api";
import { CraftEssenceSelection } from "@/component/selection/CraftEssenceSelection";
import { Spinner } from "@/component/Spinner";
import { useTeamContext } from "@/hook/useTeamContext";
import { useSelector } from "@/store";
import { selectTeamCraftEssenceBySlot } from "@/store/entity/craftEssence";
import { TeamViewMode, UserCraftEssence } from "@/types";

interface CraftEssenceViewProps {
  userCraftEssence: UserCraftEssence;
  craftEssence: CraftEssence.CraftEssence;
}

function CraftEssenceView({
  userCraftEssence: { craftEssenceLevel },
  craftEssence,
}: CraftEssenceViewProps) {
  return (
    <section className="relative">
      <img
        src={
          craftEssence.extraAssets.equipFace.equip?.[craftEssence.id] ??
          unknownCraftEssence
        }
        alt={craftEssence.name}
        className="h-full w-full object-cover object-center"
      />
      <div className="absolute bottom-0 right-0 flex justify-between text-white">
        <div className="bg-overlay rounded-tr px-1">
          Lv: {craftEssenceLevel}
        </div>
      </div>
    </section>
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
    <section className="flex h-10 w-full grow-0 overflow-hidden bg-gray-300">
      {isLoading ? (
        <span className="flex h-full w-full items-center justify-center align-middle">
          <Spinner />
        </span>
      ) : craftEssence != null ? (
        <CraftEssenceView
          userCraftEssence={userCraftEssence}
          craftEssence={craftEssence}
        />
      ) : (
        <CraftEssenceSelection className="h-full w-full">
          {mode === TeamViewMode.EDIT ? (
            <img
              src={craftEssencePlaceholder}
              alt="Add CraftEssence"
              className="h-full w-full object-cover object-center"
            />
          ) : undefined}
        </CraftEssenceSelection>
      )}
    </section>
  );
}
