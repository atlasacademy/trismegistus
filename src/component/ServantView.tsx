import { IconPlus } from "@tabler/icons";

import { usePartyServant } from "@/hook/usePartyServant";
import { useServantModal } from "@/hook/useServantModal";
import { FieldMemberSlot } from "@/types";

import { AttributeLabel } from "./AttributeLabel";
import { SkillBar } from "./SkillBar";

export interface ServantViewProps {
  slot: FieldMemberSlot;
}

export function ServantView({ slot }: ServantViewProps) {
  const servant = usePartyServant(slot);
  const { modalElement, openServantModal } = useServantModal(slot);
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
        <button className="size-normal block" onClick={openServantModal}>
          <IconPlus />
        </button>
      )}
      <SkillBar owner={slot} />
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
