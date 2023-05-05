import { CraftEssence } from "@atlasacademy/api-connector";
import { IconChevronLeft } from "@tabler/icons-react";
import { PropsWithChildren, useCallback } from "react";

import { useCraftEssenceListQuery } from "@/api";
import {
  SelectionItemProps,
  SelectionTrigger,
} from "@/component/selection/SelectionTrigger";
import { useTeamContext } from "@/hooks/useTeamContext";
import { useDispatch } from "@/store";
import { setCraftEssence } from "@/store/slice/teamReducer";
import { TeamViewMode } from "@/types";

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
    ({ collectionNo: craftEssenceColNo }: CraftEssence.CraftEssenceBasic) => {
      dispatch(
        setCraftEssence({ slot, item: { craftEssenceColNo } }, { teamId })
      );
    },
    [dispatch, teamId, slot]
  );

  return (
    <SelectionTrigger
      items={ces}
      idSelector={({ collectionNo }) => collectionNo}
      onSelect={onSelectCraftEssence}
      SelectionItemComponent={CraftEssenceListItem}
      className={className}
      disabled={mode !== TeamViewMode.EDIT}
    >
      {children}
    </SelectionTrigger>
  );
}
