import { MysticCode } from "@atlasacademy/api-connector";
import { IconChevronLeft, IconPlus } from "@tabler/icons";
import { useCallback } from "react";

import { useLazyMysticCodeListQuery, useMysticCodeQuery } from "@/api";
import { useMainDispatch, useMainSelector } from "@/store";
import { getPartyMysticCodeId, setPartyMysticCode } from "@/store/PartyReducer";

import { SkillBar } from "./SkillBar";
import { useSelectionModal } from "./useSelectionModal";

function BasicMysticIcon({ name }: MysticCode.MysticCodeBasic) {
  return (
    <>
      <IconChevronLeft />
      {name}
    </>
  );
}

export function MysticCodeView() {
  const dispatch = useMainDispatch();
  const mysticCodeId = useMainSelector(getPartyMysticCodeId);

  const { data: mysticCode } = useMysticCodeQuery(mysticCodeId);
  const [fetchMysticCodes, { data: mysticCodes }] =
    useLazyMysticCodeListQuery();
  const onSelectMysticCode = useCallback(
    ({ id }: MysticCode.MysticCodeBasic) => {
      dispatch(setPartyMysticCode(id));
    },
    [dispatch]
  );
  const { openSelection, modalElement } = useSelectionModal({
    data: { items: mysticCodes ?? [], idSelector: ({ id }) => id },
    onSelect: onSelectMysticCode,
    ItemComponent: BasicMysticIcon,
  });

  return (
    <section className="flex items-center">
      {mysticCode != null ? (
        <img
          src={mysticCode.extraAssets.item.male}
          alt={mysticCode.name}
          className="size-mini"
        />
      ) : (
        <button
          className="size-mini block"
          onClick={() => {
            fetchMysticCodes();
            openSelection();
          }}
        >
          <IconPlus />
        </button>
      )}
      <SkillBar skills={mysticCode?.skills} />
      {modalElement}
    </section>
  );
}
