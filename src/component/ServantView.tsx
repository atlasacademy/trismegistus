import { Servant } from "@atlasacademy/api-connector";
import { IconChevronLeft, IconPlus } from "@tabler/icons";
import { useCallback, useMemo } from "react";

import { useLazyServantListQuery, useServantQuery } from "@/api";
import { useMainDispatch, useMainSelector } from "@/store";
import {
  createPartyServantSlotSelector,
  setPartySlot,
} from "@/store/PartyReducer";
import { PartySlot } from "@/types";

import { AttributeLabel } from "./AttributeLabel";
import { SkillBar } from "./SkillBar";
import { useSelectionModal } from "./useSelectionModal";

export interface ServantViewProps {
  mini?: boolean;
  slot: PartySlot;
}

function BasicServantIcon({ name }: Servant.ServantBasic) {
  return (
    <>
      <IconChevronLeft />
      {name}
    </>
  );
}

export function ServantView({ mini, slot }: ServantViewProps) {
  const dispatch = useMainDispatch();
  const partyServantSelector = useMemo(
    () => createPartyServantSlotSelector(slot),
    [slot]
  );
  const servantId = useMainSelector(partyServantSelector);

  const { data: servant } = useServantQuery(servantId);
  const [fetchServants, { data: servants }] = useLazyServantListQuery();
  const onSelectServant = useCallback(
    ({ id: servantId }: Servant.ServantBasic) => {
      dispatch(setPartySlot({ slot, servantId }));
    },
    [dispatch]
  );

  const { openSelection, modalElement } = useSelectionModal({
    data: { items: servants ?? [], idSelector: ({ id }) => id },
    onSelect: onSelectServant,
    ItemComponent: BasicServantIcon,
  });

  if (mini)
    return (
      <div>
        {servant != null ? (
          <img
            src={servant.extraAssets?.faces?.ascension?.[1] ?? ""}
            alt={servant.name}
            className="size-mini mx-2 border text-gray-300"
          />
        ) : (
          <button className="size-mini block" onClick={openSelection}>
            <IconPlus />
          </button>
        )}
        {modalElement}
      </div>
    );
  return (
    <div className="mx-2 inline-block flex-col items-center border px-2">
      <div className="text-lg">{servant?.name ?? "Select a servant"}</div>
      {servant != null ? (
        <>
          <img
            src={servant.extraAssets?.status?.ascension?.[1] ?? ""}
            alt={servant.name}
            className="size-normal flex items-center justify-center border text-gray-300"
          />
          <div className="size-normal-overlay flex items-end justify-between px-2">
            <AttributeLabel name="Lv" value={servant?.lvMax ?? ""} />
            <AttributeLabel name="NP" value={""} />
          </div>
        </>
      ) : (
        <button
          className="size-normal block"
          onClick={() => {
            fetchServants();
            openSelection();
          }}
        >
          <IconPlus />
        </button>
      )}
      <SkillBar skills={servant?.skills} />
      <div className="flex">
        <AttributeLabel
          name="ATK"
          value={servant?.atkGrowth?.[servant.lvMax] ?? ""}
        />
        <AttributeLabel name="Fou" value={""} />
      </div>
      {modalElement}
    </div>
  );
}
