import { MysticCode } from "@atlasacademy/api-connector";
import { IconChevronLeft } from "@tabler/icons";
import { useCallback } from "react";

import { useMysticCodeListQuery } from "@/api";
import { useSelectionModal } from "@/hook/useSelectionModal";
import { useDispatch } from "@/store";
import { setPartyMysticCode } from "@/store/partySlice";

function BasicMysticIcon({ name }: MysticCode.MysticCodeBasic) {
  return (
    <>
      <IconChevronLeft />
      {name}
    </>
  );
}

export function useMysticCodeModal() {
  const dispatch = useDispatch();

  const { data: mysticCodes = [] } = useMysticCodeListQuery();

  const onSelectMysticCode = useCallback(
    ({ id }: MysticCode.MysticCodeBasic) => {
      dispatch(setPartyMysticCode(id));
    },
    [dispatch]
  );

  const { openSelection, modalElement } = useSelectionModal({
    data: { items: mysticCodes, idSelector: ({ id }) => id },
    onSelect: onSelectMysticCode,
    ItemComponent: BasicMysticIcon,
  });

  return {
    openMysticCodeModal: openSelection,
    modalElement,
  };
}
