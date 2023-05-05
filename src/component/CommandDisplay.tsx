import { IconArrowRight } from "@tabler/icons-react";

import { createServantSelector } from "@/api/selectors";
import { ServantPortrait } from "@/component/ServantPortrait";
import { SkillButton } from "@/component/SkillButton";
import { useFactorySelector } from "@/hooks/useFactorySelector";
import { useSelector } from "@/store";
import { selectTeamCommandScript } from "@/store/selectors/commandScript";
import { createTeamUserServantSelector } from "@/store/selectors/servant";
import { TeamEntry } from "@/types";
import { MemberSlot } from "@/types/enums";
import { UserSkillActivation } from "@/types/userCommandScript";

interface CommandItemDisplayProps extends TeamEntry {
  userSkillActivation: UserSkillActivation;
}

function CommandItemDisplay({
  teamId,
  userSkillActivation: { source, target, type },
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
    commandSource.servantColNo
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
    commandTarget.servantColNo
  );
  return (
    <div className="flex">
      {sourceServant != null ? (
        <>
          <ServantPortrait servant={sourceServant} className="h-12 w-12" />
          <SkillButton skillNum={type} entity={sourceServant} disabled />
        </>
      ) : undefined}

      {target !== MemberSlot.None ? (
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
          battleStep?.skills?.map((userSkillActivation, index) => (
            <CommandItemDisplay
              key={index + index * step}
              teamId={teamId}
              userSkillActivation={userSkillActivation}
            />
          )) ?? []
        );
      })}
    </section>
  );
}
