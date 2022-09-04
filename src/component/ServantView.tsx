import { Servant } from "@atlasacademy/api-connector";
import { IconChevronLeft, IconPlus } from "@tabler/icons";
import { useCallback, useMemo } from "react";

import { useLazyServantListQuery, useServantQuery } from "@/api";
import { useSelectionModal } from "@/hook/useSelectionModal";
import { useDispatch, useSelector } from "@/store";
import {
  createPartyServantSlotSelector,
  setPartyServant,
} from "@/store/PartyReducer";
import { PartySlot } from "@/types";

import { AttributeLabel } from "./AttributeLabel";
import { SkillBar } from "./SkillBar";

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
  const dispatch = useDispatch();
  const partyServantSelector = useMemo(
    () => createPartyServantSlotSelector(slot),
    [slot]
  );
  const servantId = useSelector(partyServantSelector);

  const { data: servant } = useServantQuery(servantId);
  const [fetchServants, { data: servants }] = useLazyServantListQuery();
  const onSelectServant = useCallback(
    ({ id: servantId }: Servant.ServantBasic) => {
      dispatch(setPartyServant({ slot, servantId }));
    },
    [dispatch]
  );

  const { openSelection, modalElement } = useSelectionModal({
    data: { items: servants ?? [], idSelector: ({ id }) => id },
    onSelect: onSelectServant,
    ItemComponent: BasicServantIcon,
  });

  const openModal = useCallback(() => {
    fetchServants();
    openSelection();
  }, [fetchServants, openSelection]);

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
          <button className="size-mini block" onClick={openModal}>
            <IconPlus />
          </button>
        )}
        {modalElement}
      </div>
    );
  return (
    <div className="mx-2 inline-block flex-col items-center justify-center px-2">
      <div className="text-lg">{servant?.name ?? "Select a servant"}</div>
      {servant != null ? (
        <>
          <img
            src={servant.extraAssets?.status?.ascension?.[1] ?? ""}
            alt={servant.name}
            className="size-normal flex items-center justify-center text-gray-300"
          />
          <div className="size-normal-overlay flex items-end justify-between px-2">
            <AttributeLabel name="Lv" value={servant?.lvMax ?? ""} />
            <AttributeLabel name="NP" value={""} />
          </div>
        </>
      ) : (
        <button className="size-normal block" onClick={openModal}>
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
