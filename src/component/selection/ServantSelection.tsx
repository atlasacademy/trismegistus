import { Servant } from "@atlasacademy/api-connector";
import { IconChevronLeft } from "@tabler/icons";
import { PropsWithChildren, useCallback } from "react";

import { useServantListQuery } from "@/api";
import {
  SelectionItemProps,
  SelectionTrigger,
} from "@/component/selection/SelectionTrigger";
import { useTeamContext } from "@/hook/useTeamContext";
import { useDispatch } from "@/store";
import { setServant } from "@/store/slice/teamSlice";
import { TeamViewMode } from "@/types";
import { createUserServant } from "@/types/utils";

export interface ServantSelectionProps extends PropsWithChildren {
  className?: string;
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
  children,
}: ServantSelectionProps) {
  const dispatch = useDispatch();
  const { teamId, slot, mode } = useTeamContext();

  const { data: servants = [] } = useServantListQuery();

  const onSelectServant = useCallback(
    ({ id: servantId }: Servant.ServantBasic) => {
      const entry = createUserServant({ slot, servantId });
      dispatch(setServant({ teamId, entry }));
    },
    [dispatch]
  );

  return (
    <SelectionTrigger
      items={servants}
      idSelector={({ id }) => id}
      onSelect={onSelectServant}
      SelectionItemComponent={ServantListItem}
      className={className}
      disabled={mode === TeamViewMode.VIEW}
    >
      {children}
    </SelectionTrigger>
  );
}
