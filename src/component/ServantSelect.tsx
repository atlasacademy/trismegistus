import { IconChevronRight } from "@tabler/icons";
import Modal from "react-modal";
import useSWR from "swr";

import { client } from "@/api";

export interface ServantSelectProps {
  isOpen: boolean;
  onRequestClose(): void;
  onSelect(servantId: number): void;
}

export function ServantSelect({
  isOpen,
  onSelect,
  onRequestClose,
}: ServantSelectProps) {
  const { data } = useSWR("key", client.getServantList);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      {data?.map((svt) => (
        <button key={svt.id} className="block" onClick={() => onSelect(svt.id)}>
          <IconChevronRight />
          {svt.name}
        </button>
      ))}
    </Modal>
  );
}
