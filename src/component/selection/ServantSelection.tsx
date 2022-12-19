import { Servant } from "@atlasacademy/api-connector";
import { IconChevronLeft } from "@tabler/icons";
import { PropsWithChildren } from "react";

import { useServantListQuery } from "@/api";
import {
  SelectionItemProps,
  SelectionTrigger,
} from "@/component/selection/SelectionTrigger";

export interface ServantSelectionProps extends PropsWithChildren {
  className?: string;
  onSelectServant(servant: Servant.ServantBasic): void;
}

function ServantListItem({
  item,
  onSelect,
}: SelectionItemProps<Servant.ServantBasic>) {
  const { name: servantName } = item;
  return (
    <button className="block" onClick={onSelect}>
      <IconChevronLeft />
      {servantName}
    </button>
  );
}

export function ServantSelection({
  className,
  onSelectServant,
  children,
}: ServantSelectionProps) {
  const { data: servants = [] } = useServantListQuery();
  return (
    <SelectionTrigger
      items={servants}
      idSelector={({ id }) => id}
      onSelect={onSelectServant}
      SelectionItemComponent={ServantListItem}
      className={className}
    >
      {children}
    </SelectionTrigger>
  );
}
