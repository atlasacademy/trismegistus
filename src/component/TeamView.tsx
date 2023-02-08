import { Root as AccordionRoot } from "@radix-ui/react-accordion";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import { IconAdjustmentsHorizontal, IconPlayerPlay } from "@tabler/icons-react";
import { useCallback, useMemo, useState } from "react";

import { CommandDisplay } from "@/component/CommandDisplay";
import { MemberSlotView } from "@/component/MemberSlotView";
import { MysticCodeView } from "@/component/MysticCodeView";
import { ResultView } from "@/component/ResultView";
import { useFactorySelector } from "@/hooks/useFactorySelector";
import { TeamContext } from "@/hooks/useTeamContext";
import { createTeamUserServantSlotsSelector } from "@/store/selectors/servant";
import { MemberSlot, TeamContextData, TeamEntry, TeamViewMode } from "@/types";
import { nextMemberSlot } from "@/types/utils";

function useSlotData(
  teamId: string,
  slots: MemberSlot[],
  mode: TeamViewMode
): TeamContextData[] {
  return useMemo(() => {
    const next =
      slots.length > 0
        ? nextMemberSlot(slots[slots.length - 1])
        : MemberSlot.FIELD_1;

    return [
      { teamId, slot: MemberSlot.NONE, mode },
      ...(next != null && mode === TeamViewMode.EDIT
        ? [...slots, next]
        : mode === TeamViewMode.SCRIPT
        ? slots.slice(0, 3)
        : slots
      ).map((slot) => ({ teamId, mode, slot })),
    ];
  }, [teamId, slots, mode]);
}

export interface TeamCompViewProps extends TeamEntry {}

export function TeamView({ teamId }: TeamCompViewProps) {
  const slots = useFactorySelector(
    createTeamUserServantSlotsSelector,
    [],
    teamId
  );
  const [mode, setMode] = useState<TeamViewMode>(
    slots.length > 0 ? TeamViewMode.VIEW : TeamViewMode.EDIT
  );
  const [mysticCode, ...member] = useSlotData(teamId, slots, mode);

  const handleModeChange = useCallback(
    (value: string) => {
      setMode(value !== "" ? (value as TeamViewMode) : TeamViewMode.VIEW);
    },
    [setMode]
  );

  return (
    <section className="flex flex-col items-start">
      <ToggleGroup.Root
        type="single"
        value={mode}
        onValueChange={handleModeChange}
      >
        <ToggleGroup.Item
          value={TeamViewMode.EDIT}
          className="radix-state-on:text-primary-700"
        >
          <IconAdjustmentsHorizontal /> Edit Team
        </ToggleGroup.Item>
        <ToggleGroup.Item
          value={TeamViewMode.SCRIPT}
          className="radix-state-on:text-primary-700"
        >
          <IconPlayerPlay /> Battle Script
        </ToggleGroup.Item>
      </ToggleGroup.Root>
      <AccordionRoot type="single" className="flex flex-col" collapsible>
        <TeamContext.Provider value={mysticCode}>
          <MysticCodeView />
        </TeamContext.Provider>
        {member.map((contextData) => (
          <TeamContext.Provider key={contextData.slot} value={contextData}>
            <MemberSlotView />
          </TeamContext.Provider>
        ))}
      </AccordionRoot>
      {mode === TeamViewMode.SCRIPT ? (
        <CommandDisplay teamId={teamId} />
      ) : undefined}
      <ResultView teamId={teamId} />
    </section>
  );
}
