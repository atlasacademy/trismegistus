import { IconArrowRight } from "@tabler/icons-react";

import { createServantSelector } from "@/api/selectors";
import { ServantPortrait } from "@/component/ServantPortrait";
import { SkillButton } from "@/component/SkillButton";
import { useFactorySelector } from "@/hooks/useFactorySelector";
import { useSelector } from "@/store";
import { selectTeamCommandScript } from "@/store/selectors/commandScript";
import { createTeamUserServantSelector } from "@/store/selectors/servant";
import { MemberSlot, TeamEntry } from "@/types";
import { UserCommand } from "@/types/userCommandScript";
import { isSkillNum } from "@/types/utils";

interface CommandItemDisplayProps extends TeamEntry {
  userCommand: UserCommand;
}

function CommandItemDisplay({
  teamId,
  userCommand: { source, target, type },
}: CommandItemDisplayProps) {
  const commandSource = useFactorySelector(
    createTeamUserServantSelector,
    [true],
    teamId,
    source
  );
  const sourceServant = useFactorySelector(
    createServantSelector,
    [],
    commandSource.servantId
  );
  const commandTarget = useFactorySelector(
    createTeamUserServantSelector,
    [true],
    teamId,
    target
  );
  const targetServant = useFactorySelector(
    createServantSelector,
    [],
    commandTarget.servantId
  );
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

export interface CommandDisplayProps extends TeamEntry {}
export function CommandDisplay({ teamId }: CommandDisplayProps) {
  const script = useSelector((state) => selectTeamCommandScript(state, teamId));
  return (
    <section>
      {script.flatMap((battleStep, step) => {
        return (
          battleStep?.commands?.map((userCommand, index) => (
            <CommandItemDisplay
              key={index + index * step}
              teamId={teamId}
              userCommand={userCommand}
            />
          )) ?? []
        );
      })}
    </section>
  );
}
