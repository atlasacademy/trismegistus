import { IconPlus } from "@tabler/icons";

import { useMysticCodeModal } from "@/hook/useMysticCodeModal";
import { usePartyMysticCode } from "@/hook/usePartyMysticCode";

import { SkillBar } from "./SkillBar";

export function MysticCodeView() {
  const mysticCode = usePartyMysticCode();
  const { openMysticCodeModal, modalElement } = useMysticCodeModal();

  return (
    <section className="flex items-center">
      {mysticCode != null ? (
        <img
          src={mysticCode.extraAssets.item.male}
          alt={mysticCode.name}
          className="size-mini"
        />
      ) : (
        <button className="size-mini block" onClick={openMysticCodeModal}>
          <IconPlus />
        </button>
      )}
      <SkillBar skills={mysticCode?.skills} />
      {modalElement}
    </section>
  );
}
