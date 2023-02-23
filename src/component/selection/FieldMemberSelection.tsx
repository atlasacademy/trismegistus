import { PropsWithChildren, useMemo } from "react";

import { useServantQuery } from "@/api";
import {
  SelectionItemProps,
  SelectionTrigger,
} from "@/component/selection/SelectionTrigger";
import { ServantPortrait } from "@/component/ServantPortrait";
import { useFactorySelector } from "@/hooks/useFactorySelector";
import { useTeamContext } from "@/hooks/useTeamContext";
import {
  createTeamUserServantSelector,
  createTeamUserServantSlotsSelector,
} from "@/store/selectors/servant";
import { TeamEntry, TeamMember, TeamViewMode } from "@/types";
import { MemberSlot } from "@/types/enums";

function FieldMemberListItem({
  item,
  onSelect,
}: SelectionItemProps<TeamMember>) {
  const { teamId, slot } = item;
  const { servantId } = useFactorySelector(
    createTeamUserServantSelector,
    [true],
    teamId,
    slot
  );
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

const allowedSlots = new Set<string>([
  MemberSlot.Field1,
  MemberSlot.Field2,
  MemberSlot.Field3,
  MemberSlot.None,
]);

function useFieldSlots(teamId: TeamEntry["teamId"]) {
  const slots = useFactorySelector(
    createTeamUserServantSlotsSelector,
    [],
    teamId
  );
  return useMemo(() => {
    return [...slots, MemberSlot.None]
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
