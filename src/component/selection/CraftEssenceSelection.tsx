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
  item,
  onSelect,
}: SelectionItemProps<CraftEssence.CraftEssenceBasic>) {
  const { name: craftEssenceName } = item;
  return (
    <button className="block text-gray-700" onClick={onSelect}>
      <IconChevronLeft />
      {craftEssenceName}
    </button>
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
      const entry = createUserCraftEssence({ craftEssenceId });
      dispatch(
        setCraftEssence({
          teamId,
          slot,
          entry,
        })
      );
    },
    [dispatch, teamId, slot]
  );

  return (
    <SelectionTrigger
      items={ces}
      idSelector={({ id }) => id}
      onSelect={onSelectCraftEssence}
      SelectionItemComponent={CraftEssenceListItem}
      className={className}
      disabled={mode !== TeamViewMode.EDIT}
    >
      {children}
    </SelectionTrigger>
  );
}
