import * as Dialog from "@radix-ui/react-dialog";
import { IconX } from "@tabler/icons";
import React, {
  ComponentType,
  PropsWithChildren,
  useCallback,
  useState,
} from "react";

export interface SelectionTriggerProps<T> extends PropsWithChildren {
  items: T[];
  idSelector: (item: T) => string | number;
  SelectionItemComponent: ComponentType<SelectionItemProps<T>>;
  onSelect?: (item: T) => void;
  className?: string;
  disabled?: boolean;
}

export interface SelectionItemProps<T> {
  item: T;
}

export function SelectionTrigger<T>({
  items,
  idSelector,
  onSelect,
  SelectionItemComponent,
  className,
  disabled,
  children,
}: SelectionTriggerProps<T>) {
  const [isSelecting, setSelecting] = useState(false);
  const closeSelection = useCallback(() => setSelecting(false), [setSelecting]);
  const select = useCallback(
    (item: T) => () => {
      onSelect?.(item);
      closeSelection();
    },
    [onSelect, closeSelection]
  );
  return (
    <Dialog.Root open={!disabled && isSelecting} onOpenChange={setSelecting}>
      <Dialog.Trigger disabled={disabled} className={className}>
        {children}
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/10" />
        <Dialog.Content className="fixed left-1/2 top-1/2 h-64 w-96 -translate-x-1/2 -translate-y-1/2 overflow-scroll rounded bg-white">
          <Dialog.Close className="absolute top-1 right-1" aria-label="Close">
            <IconX />
          </Dialog.Close>
          {items?.map((item) => (
            <button
              key={idSelector(item)}
              className="block"
              onClick={select(item)}
            >
              <SelectionItemComponent item={item} />
            </button>
          ))}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
