import { PropsWithChildren, useMemo } from "react";

import { useServantQuery } from "@/api";
import {
  SelectionItemProps,
  SelectionTrigger,
} from "@/component/selection/SelectionTrigger";
import { ServantPortrait } from "@/component/ServantPortrait";
import { useTeamContext } from "@/hook/useTeamContext";
import { useMemoSelector } from "@/store";
import {
  selectTeamServantBySlot,
  selectTeamServantSlots,
} from "@/store/entity/servant";
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
      {servant == null ? "No Target" : <ServantPortrait servant={servant} />}
    </button>
  );
}

export interface FieldMemberSelectionProps extends PropsWithChildren {
  onMemberSelect(slot: TeamMember): void;
  className?: string;
  disabled?: boolean;
}

const allowedSlots = new Set([
  MemberSlot.FIELD_1,
  MemberSlot.FIELD_2,
  MemberSlot.FIELD_3,
  MemberSlot.NONE,
]);
function useFieldSlots(teamId: number) {
  const slots = useMemoSelector(selectTeamServantSlots, [teamId]);
  return useMemo(() => {
    return [...slots, MemberSlot.NONE]
      .filter((slot) => allowedSlots.has(slot))
      .map((slot) => ({ teamId, slot }));
  }, [teamId, slots]);
}

export function FieldMemberSelection({
  onMemberSelect,
  className,
  disabled,
  children,
}: FieldMemberSelectionProps) {
  const { teamId, mode } = useTeamContext();
  const fieldSlots = useFieldSlots(teamId);
  return (
    <SelectionTrigger
      items={fieldSlots}
      idSelector={({ slot }) => slot}
      onSelect={onMemberSelect}
      SelectionItemComponent={FieldMemberListItem}
      disabled={disabled || mode !== TeamViewMode.SCRIPT}
      className={className}
    >
      {children}
    </SelectionTrigger>
  );
}
