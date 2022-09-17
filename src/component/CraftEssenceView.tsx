import { IconPlus } from "@tabler/icons";

import { useCraftEssenceModal } from "@/hook/useCraftEssenceModal";
import { usePartyCraftEssence } from "@/hook/usePartyCraftEssence";
import { PartyMemberSlot } from "@/types";

export interface CraftEssenceViewProps {
  slot: PartyMemberSlot;
}

export function CraftEssenceView({ slot }: CraftEssenceViewProps) {
  const craftEssence = usePartyCraftEssence(slot);
  const { openCraftEssenceModal, modalElement } = useCraftEssenceModal(slot);
  return (
    <div className="w-full">
      {craftEssence != null ? (
        <img
          src={craftEssence.extraAssets?.equipFace?.equip?.[craftEssence.id]}
          alt={craftEssence.name}
        />
      ) : (
        <button onClick={openCraftEssenceModal}>
          <IconPlus />
        </button>
      )}
      {modalElement}
    </div>
  );
}
