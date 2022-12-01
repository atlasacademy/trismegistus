import { MysticCode } from "@atlasacademy/api-connector";
import { IconChevronLeft } from "@tabler/icons";
import { PropsWithChildren, useCallback } from "react";

import { useMysticCodeListQuery } from "@/api";
import {
  SelectionItemProps,
  SelectionTrigger,
} from "@/component/selection/SelectionTrigger";
import { useTeamContext } from "@/hook/useTeamContext";
import { useDispatch } from "@/store";
import { setMysticCode } from "@/store/slice/teamSlice";
import { TeamViewMode } from "@/types";
import { createUserMysticCode } from "@/types/utils";

function BasicMysticIcon({
  item: { name: mysticCodeName },
}: SelectionItemProps<MysticCode.MysticCodeBasic>) {
  return (
    <>
      <IconChevronLeft />
      {mysticCodeName}
    </>
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
      dispatch(setMysticCode({ teamId, entry }));
    },
    [dispatch]
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
