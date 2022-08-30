import { isFulfilled } from "@reduxjs/toolkit";
import { IconPlus } from "@tabler/icons";
import { useCallback, useState } from "react";

import { useMainDispatch, useMainSelector } from "@/store";
import { fetchMysticCode } from "@/store/MysticCodeReducer";
import { getPartyMysticCode, setPartyMysticCode } from "@/store/PartyReducer";

import { MysticCodeSelect } from "./MysticCodeSelect";
import { SkillBar } from "./SkillBar";

export function MysticCodeView() {
  const dispatch = useMainDispatch();

  const mysticCode = useMainSelector(getPartyMysticCode);

  const [isSelecting, setSelecting] = useState(false);
  const openSelection = useCallback(() => setSelecting(true), [setSelecting]);
  const closeSelection = useCallback(() => setSelecting(false), [setSelecting]);

  if (mysticCode != null) {
    return (
      <section className="flex items-center">
        <img
          src={mysticCode.extraAssets.item.male}
          alt={mysticCode.name}
          className="size-mini border"
        />
        <SkillBar skills={mysticCode.skills} />
      </section>
    );
  }
  return (
    <>
      <button className="size-mini block" onClick={openSelection}>
        <IconPlus />
      </button>
      <MysticCodeSelect
        isOpen={isSelecting}
        onRequestClose={closeSelection}
        onSelect={(id) => {
          dispatch(fetchMysticCode(id)).then((action) => {
            if (isFulfilled(action)) {
              dispatch(setPartyMysticCode(id));
              closeSelection();
            }
          });
        }}
      />
    </>
  );
}
