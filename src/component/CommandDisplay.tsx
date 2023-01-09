import { IconArrowRight } from "@tabler/icons";

import { selectServant } from "@/api/selectors";
import { ServantPortrait } from "@/component/ServantPortrait";
import { SkillButton } from "@/component/SkillButton";
import { useMemoSelector } from "@/store";
import { selectTeamCommandScript } from "@/store/entity/commandScript";
import { selectTeamServantBySlot } from "@/store/entity/servant";
import { MemberSlot, UserCommand } from "@/types";
import { isSkillNum } from "@/types/utils";

interface CommandItemDisplayProps {
  teamId: number;
  userCommand: UserCommand;
}

function CommandItemDisplay({
  teamId,
  userCommand: { source, target, type },
}: CommandItemDisplayProps) {
  const commandSource = useMemoSelector(selectTeamServantBySlot, [
    teamId,
    source,
  ]);
  const sourceServant = useMemoSelector(selectServant, [commandSource]);
  const commandTarget = useMemoSelector(selectTeamServantBySlot, [
    teamId,
    target,
  ]);
  const targetServant = useMemoSelector(selectServant, [commandTarget]);
  return (
    <div className="flex">
      {sourceServant != null ? (
        <>
          <ServantPortrait servant={sourceServant} className="h-12 w-12" />
          {isSkillNum(type) ? (
            <SkillButton skillNum={type} entity={sourceServant} disabled />
          ) : undefined}
        </>
      ) : undefined}

      {target !== MemberSlot.NONE ? (
        <>
          <IconArrowRight />
          {targetServant != null ? (
            <ServantPortrait servant={targetServant} className="h-12 w-12" />
          ) : undefined}
        </>
      ) : undefined}
    </div>
  );
}

export interface CommandDisplayProps {
  teamId: number;
}
export function CommandDisplay({ teamId }: CommandDisplayProps) {
  const script = useMemoSelector(selectTeamCommandScript, [teamId]);
  return (
    <section>
      {script.flatMap((battleStep, step) => {
        return battleStep.commands.map((userCommand, index) => (
          <CommandItemDisplay
            key={index + index * step}
            teamId={teamId}
            userCommand={userCommand}
          />
        ));
      })}
    </section>
  );
}
