import { Servant } from "@atlasacademy/api-connector";
import { IconChevronLeft } from "@tabler/icons";
import { useCallback } from "react";

import { useServantListQuery } from "@/api";
import { useSelectionModal } from "@/hook/useSelectionModal";
import { useDispatch } from "@/store";
import { setPartyServant } from "@/store/partySlice";
import { PartyMemberSlot } from "@/types";

function ServantListItem({ name }: Servant.ServantBasic) {
  return (
    <>
      <IconChevronLeft />
      {name}
    </>
  );
}

export function useServantModal(slot: PartyMemberSlot) {
  const dispatch = useDispatch();

  const { data: servants = [] } = useServantListQuery();

  const onSelectServant = useCallback(
    ({ id: servantId }: Servant.ServantBasic) => {
      dispatch(setPartyServant({ slot, servantId }));
    },
    [dispatch]
  );

  const { openSelection, modalElement } = useSelectionModal({
    data: { items: servants, idSelector: ({ id }) => id },
    onSelect: onSelectServant,
    ItemComponent: ServantListItem,
  });

  return { modalElement, openServantModal: openSelection };
}
