import { IconChevronRight } from "@tabler/icons";
import Modal from "react-modal";
import useSWR from "swr";

import { client } from "@/api";

export interface MysticCodeSelectProps {
  isOpen: boolean;
  onRequestClose(): void;
  onSelect(mysticCodeId: number): void;
}

export function MysticCodeSelect({
  isOpen,
  onSelect,
  onRequestClose,
}: MysticCodeSelectProps) {
  const { data } = useSWR("mysticCode", client.getMysticCodes);
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      {data?.map(({ id, name }) => (
        <button key={id} className="block" onClick={() => onSelect(id)}>
          <IconChevronRight />
          {name}
        </button>
      ))}
    </Modal>
  );
}
