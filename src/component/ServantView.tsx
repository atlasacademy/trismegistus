import { isFulfilled } from "@reduxjs/toolkit";
import { IconPlus } from "@tabler/icons";
import classnames from "classnames";
import { useCallback, useMemo, useState } from "react";

import { useMainDispatch, useMainSelector } from "@/store";
import {
  createPartyServantSlotSelector,
  setPartySlot,
} from "@/store/PartyReducer";
import { fetchServant } from "@/store/ServantReducer";
import { PartySlot } from "@/types";

import { ServantSelect } from "./ServantSelect";
import { ServantThumbnail } from "./ServantThumbnail";

export interface ServantViewProps {
  mini?: boolean;
  slot: PartySlot;
}

export function ServantView({ mini, slot }: ServantViewProps) {
  const dispatch = useMainDispatch();
  const slotSelector = useMemo(
    () => createPartyServantSlotSelector(slot),
    [slot]
  );
  const servant = useMainSelector(slotSelector);

  const [isSelecting, setSelecting] = useState(false);
  const openSelection = useCallback(() => setSelecting(true), [setSelecting]);
  const closeSelection = useCallback(() => setSelecting(false), [setSelecting]);

  if (servant != null) {
    return <ServantThumbnail mini={mini} servant={servant} />;
  }
  return (
    <>
      <button
        className={classnames(mini ? "size-mini" : "size-normal", "border")}
        onClick={openSelection}
      >
        <IconPlus />
      </button>
      <ServantSelect
        isOpen={isSelecting}
        onRequestClose={closeSelection}
        onSelect={(servantId) =>
          dispatch(fetchServant(servantId)).then((action) => {
            if (isFulfilled(action)) {
              dispatch(setPartySlot({ slot, servantId }));
              setSelecting(false);
            }
          })
        }
      />
    </>
  );
}
