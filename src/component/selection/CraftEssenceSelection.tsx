import { CraftEssence } from "@atlasacademy/api-connector";
import { IconChevronLeft } from "@tabler/icons";
import { PropsWithChildren, useCallback } from "react";

import { useCraftEssenceListQuery } from "@/api";
import {
  SelectionItemProps,
  SelectionTrigger,
} from "@/component/selection/SelectionTrigger";
import { useTeamContext } from "@/hook/useTeamContext";
import { useDispatch } from "@/store";
import { setCraftEssence } from "@/store/slice/teamSlice";
import { TeamViewMode } from "@/types";
import { createUserCraftEssence } from "@/types/utils";

function CraftEssenceListItem({
  item: { name: craftEssenceName },
}: SelectionItemProps<CraftEssence.CraftEssenceBasic>) {
  return (
    <div className="text-gray-700">
      <IconChevronLeft />
      {craftEssenceName}
    </div>
  );
}

export interface CraftEssenceSelectionProps extends PropsWithChildren {
  className?: string;
}

export function CraftEssenceSelection({
  className,
  children,
}: CraftEssenceSelectionProps) {
  const dispatch = useDispatch();
  const { teamId, slot, mode } = useTeamContext();

  const { data: ces = [] } = useCraftEssenceListQuery();

  const onSelectCraftEssence = useCallback(
    ({ id: craftEssenceId }: CraftEssence.CraftEssenceBasic) => {
      const entry = createUserCraftEssence({ slot, craftEssenceId });
      dispatch(
        setCraftEssence({
          teamId,
          entry,
        })
      );
    },
    [dispatch]
  );

  return (
    <SelectionTrigger
      items={ces}
      idSelector={({ id }) => id}
      onSelect={onSelectCraftEssence}
      SelectionItemComponent={CraftEssenceListItem}
      className={className}
      disabled={mode === TeamViewMode.VIEW}
    >
      {children}
    </SelectionTrigger>
  );
}
