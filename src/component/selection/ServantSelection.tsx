import { Servant } from "@atlasacademy/api-connector";
import { IconChevronLeft } from "@tabler/icons";
import { PropsWithChildren } from "react";

import { useServantListQuery } from "@/api";
import {
  SelectionItemProps,
  SelectionTrigger,
} from "@/component/selection/SelectionTrigger";
import { useTeamContext } from "@/hook/useTeamContext";
import { TeamViewMode } from "@/types";

export interface ServantSelectionProps extends PropsWithChildren {
  className?: string;
  onSelectServant(servant: Servant.ServantBasic): void;
}

function ServantListItem({
  item: { name: servantName },
}: SelectionItemProps<Servant.ServantBasic>) {
  return (
    <>
      <IconChevronLeft />
      {servantName}
    </>
  );
}

export function ServantSelection({
  className,
  onSelectServant,
  children,
}: ServantSelectionProps) {
  const { mode } = useTeamContext();
  const { data: servants = [] } = useServantListQuery();

  return (
    <SelectionTrigger
      items={servants}
      idSelector={({ id }) => id}
      onSelect={onSelectServant}
      SelectionItemComponent={ServantListItem}
      className={className}
      disabled={mode !== TeamViewMode.EDIT}
    >
      {children}
    </SelectionTrigger>
  );
}
