import { ComponentType, useCallback, useState } from "react";
import Modal from "react-modal";

export interface UseSelectionModalOptions<T> {
  data: { items: T[]; idSelector: (item: T) => string | number };
  onSelect?: (item: T) => void;
  ItemComponent: ComponentType<T>;
}

export function useSelectionModal<T>({
  data: { items, idSelector },
  onSelect,
  ItemComponent,
}: UseSelectionModalOptions<T>) {
  const [isSelecting, setSelecting] = useState(false);
  const openSelection = useCallback(() => setSelecting(true), [setSelecting]);
  const closeSelection = useCallback(() => setSelecting(false), [setSelecting]);
  const select = useCallback(
    (item: T) => () => {
      onSelect?.(item);
      closeSelection();
    },
    [onSelect, closeSelection]
  );
  const modalElement = (
    <Modal
      isOpen={isSelecting}
      onRequestClose={closeSelection}
      shouldCloseOnEsc
      shouldCloseOnOverlayClick
    >
      {items?.map((item) => (
        <button key={idSelector(item)} className="block" onClick={select(item)}>
          <ItemComponent {...item} />
        </button>
      ))}
    </Modal>
  );
  return { isSelecting, openSelection, closeSelection, modalElement };
}
