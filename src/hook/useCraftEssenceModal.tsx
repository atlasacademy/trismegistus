import { CraftEssence } from "@atlasacademy/api-connector";
import { IconChevronLeft } from "@tabler/icons";
import { useCallback } from "react";

import { useCraftEssenceListQuery } from "@/api";
import { useSelectionModal } from "@/hook/useSelectionModal";
import { useDispatch } from "@/store";
import { setPartyCraftEssence } from "@/store/partySlice";
import { PartyMemberSlot } from "@/types";

function CraftEssenceListItem({ name }: CraftEssence.CraftEssenceBasic) {
  return (
    <div className="text-gray-700">
      <IconChevronLeft />
      {name}
    </div>
  );
}

export function useCraftEssenceModal(slot: PartyMemberSlot) {
  const dispatch = useDispatch();

  const { data: ces = [] } = useCraftEssenceListQuery();

  const onSelectCraftEssence = useCallback(
    ({ id: craftEssenceId }: CraftEssence.CraftEssenceBasic) => {
      dispatch(setPartyCraftEssence({ slot, craftEssenceId }));
    },
    [dispatch]
  );

  const { openSelection: openCraftEssenceModal, modalElement } =
    useSelectionModal({
      data: { items: ces, idSelector: ({ id }) => id },
      onSelect: onSelectCraftEssence,
      ItemComponent: CraftEssenceListItem,
    });

  return { modalElement, openCraftEssenceModal };
}
