import { IconArrowRight } from "@tabler/icons";

import { useMemoSelector } from "@/store";
import { selectTeamCommandScript } from "@/store/entity/commandScript";
import { MemberSlot, UserCommand } from "@/types";

interface CommandItemDisplayProps {
  userCommand: UserCommand;
}

function CommandItemDisplay({
  userCommand: { source, target, type },
}: CommandItemDisplayProps) {
  return (
    <span>
      {type}
      {source}
      {target !== MemberSlot.NONE ? (
        <>
          <IconArrowRight />
          {target}
        </>
      ) : undefined}
    </span>
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
            userCommand={userCommand}
          />
        ));
      })}
    </section>
  );
}
