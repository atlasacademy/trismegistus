import { PropsWithChildren, useRef } from "react";

import { useServantQuery } from "@/api";
import {
  SelectionItemProps,
  SelectionTrigger,
} from "@/component/selection/SelectionTrigger";
import { ServantPortrait } from "@/component/ServantPortrait";
import { useTeamContext } from "@/hook/useTeamContext";
import { useMemoSelector } from "@/store";
import { selectTeamServantBySlot } from "@/store/entity/servant";
import { MemberSlot, TeamMember, TeamViewMode } from "@/types";

function FieldMemberListItem({
  item,
  onSelect,
}: SelectionItemProps<TeamMember>) {
  const { teamId, slot } = item;
  const { servantId } = useMemoSelector(selectTeamServantBySlot, [
    teamId,
    slot,
  ]);
  const { data: servant } = useServantQuery(servantId);

  return (
    <button
      onClick={onSelect}
      className={
        servant == null ? "block w-full text-center text-black" : "w-1/3"
      }
    >
      {servant == null ? "None" : <ServantPortrait servant={servant} />}
    </button>
  );
}

export interface FieldMemberSelectionProps extends PropsWithChildren {
  onMemberSelect(slot: TeamMember): void;
}

export function FieldMemberSelection({
  onMemberSelect,
  children,
}: FieldMemberSelectionProps) {
  const { teamId, mode } = useTeamContext();
  const fieldSlots = useRef([
    { teamId, slot: MemberSlot.FIELD_1 },
    { teamId, slot: MemberSlot.FIELD_2 },
    { teamId, slot: MemberSlot.FIELD_3 },
    { teamId, slot: MemberSlot.NONE },
  ]);
  return (
    <SelectionTrigger
      items={fieldSlots.current}
      idSelector={({ slot }) => slot}
      onSelect={onMemberSelect}
      SelectionItemComponent={FieldMemberListItem}
      disabled={mode !== TeamViewMode.SCRIPT}
    >
      {children}
    </SelectionTrigger>
  );
}
