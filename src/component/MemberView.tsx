import { IconPlus } from "@tabler/icons";

import { CraftEssenceView } from "@/component/CraftEssenceView";
import { usePartyServant } from "@/hook/usePartyServant";
import { useServantModal } from "@/hook/useServantModal";
import { FieldMemberSlot } from "@/types";

import { AttributeLabel } from "./AttributeLabel";

export interface ServantViewProps {
  slot: FieldMemberSlot;
}

export function MemberView({ slot }: ServantViewProps) {
  const servant = usePartyServant(slot);
  const { modalElement, openServantModal } = useServantModal(slot);
  return (
    <div className="inline-block flex w-48 flex-col items-center justify-center align-middle">
      <div className="text-lg">{servant?.name ?? "Select a servant"}</div>
      <div className="relative h-96 grow-0">
        {servant != null ? (
          <img
            src={servant.extraAssets?.narrowFigure?.ascension?.[1] ?? ""}
            alt={servant.name}
            className="mx-auto h-96 rounded-3xl"
          />
        ) : (
          <button
            className="block h-96 w-32 rounded-3xl border"
            onClick={openServantModal}
          >
            <IconPlus />
          </button>
        )}
        {servant && (
          <div className="absolute bottom-0 w-full rounded-b-3xl bg-gray-900/80 text-white">
            <CraftEssenceView slot={slot} />
            <div className="mx-2 mb-1 text-left text-sm">
              <AttributeLabel name="Level" value={servant?.lvMax ?? ""} />
              <AttributeLabel
                name="ATK"
                value={servant?.atkGrowth?.[servant.lvMax] ?? ""}
              />
              <AttributeLabel name="Fou" value={""} />
              <AttributeLabel name="Skills" value={"10/10/10"} />
              <AttributeLabel name="Appends" value={"-/10/-"} />
            </div>
          </div>
        )}
      </div>
      {modalElement}
    </div>
  );
}
