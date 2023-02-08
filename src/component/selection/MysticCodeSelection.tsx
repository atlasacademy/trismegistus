import { MysticCode } from "@atlasacademy/api-connector";
import { IconChevronLeft } from "@tabler/icons-react";
import { PropsWithChildren, useCallback } from "react";

import { useMysticCodeListQuery } from "@/api";
import {
  SelectionItemProps,
  SelectionTrigger,
} from "@/component/selection/SelectionTrigger";
import { useTeamContext } from "@/hooks/useTeamContext";
import { useDispatch } from "@/store";
import { updateMysticCode } from "@/store/slice/teamReducer";
import { TeamViewMode } from "@/types";
import { createUserMysticCode } from "@/types/userMysticCode";

function BasicMysticIcon({
  item: { name: mysticCodeName },
  onSelect,
}: SelectionItemProps<MysticCode.MysticCodeBasic>) {
  return (
    <button className="block" onClick={onSelect}>
      <IconChevronLeft />
      {mysticCodeName}
    </button>
  );
}

export interface MysticCodeSelectionProps extends PropsWithChildren {
  className?: string;
}

export function MysticCodeSelection({
  className,
  children,
}: MysticCodeSelectionProps) {
  const dispatch = useDispatch();
  const { teamId, mode } = useTeamContext();

  const { data: mysticCodes = [] } = useMysticCodeListQuery();

  const onSelectMysticCode = useCallback(
    ({ id: mysticCodeId }: MysticCode.MysticCodeBasic) => {
      const entry = createUserMysticCode({ mysticCodeId });
      dispatch(updateMysticCode(entry, { teamId }));
    },
    [teamId, dispatch]
  );

  return (
    <SelectionTrigger
      items={mysticCodes}
      idSelector={({ id }) => id}
      onSelect={onSelectMysticCode}
      SelectionItemComponent={BasicMysticIcon}
      className={className}
      disabled={mode === TeamViewMode.VIEW}
    >
      {children}
    </SelectionTrigger>
  );
}
