import { IconPlus } from "@tabler/icons";

import { usePartyServant } from "@/hook/usePartyServant";
import { useServantModal } from "@/hook/useServantModal";
import { SubMemberSlot } from "@/types";

export interface SubMemberViewProps {
  slot: SubMemberSlot;
}

export function SubMemberView({ slot }: SubMemberViewProps) {
  const servant = usePartyServant(slot);
  const { modalElement, openServantModal } = useServantModal(slot);
  return (
    <div>
      {servant != null ? (
        <img
          src={servant.extraAssets?.faces?.ascension?.[1] ?? ""}
          alt={servant.name}
          className="size-mini mx-2 border text-gray-300"
        />
      ) : (
        <button className="size-mini block" onClick={openServantModal}>
          <IconPlus />
        </button>
      )}
      {modalElement}
    </div>
  );
}
