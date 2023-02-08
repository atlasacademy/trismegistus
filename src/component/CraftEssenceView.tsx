import unknownCraftEssence from "@assets/equip_unknown_formation.png";
import craftEssencePlaceholder from "@assets/formation_blank_02.png";
import { CraftEssence } from "@atlasacademy/api-connector";

import { useCraftEssenceQuery } from "@/api";
import { CraftEssenceSelection } from "@/component/selection/CraftEssenceSelection";
import { Spinner } from "@/component/Spinner";
import { useFactorySelector } from "@/hooks/useFactorySelector";
import { useTeamContext } from "@/hooks/useTeamContext";
import { createTeamUserCraftEssenceSelector } from "@/store/selectors/craftEssence";
import { TeamViewMode } from "@/types";
import { UserCraftEssence } from "@/types/userCraftEssence";

interface CraftEssenceViewProps {
  userCraftEssence: UserCraftEssence;
  craftEssence: CraftEssence.CraftEssence;
}

function CraftEssenceView({
  userCraftEssence: { craftEssenceLevel },
  craftEssence,
}: CraftEssenceViewProps) {
  return (
    <section className="relative w-full">
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
  const userCraftEssence = useFactorySelector(
    createTeamUserCraftEssenceSelector,
    [true],
    teamId,
    slot
  );

  const { craftEssenceId } = userCraftEssence;
  const { data: craftEssence, isLoading } =
    useCraftEssenceQuery(craftEssenceId);
  return (
    <section className="flex h-10 w-full grow-0 overflow-hidden bg-gradient-to-t from-slate-900 via-slate-800 to-gray-900/80">
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
