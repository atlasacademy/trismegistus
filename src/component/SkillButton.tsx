import { Entity, Skill } from "@atlasacademy/api-connector";
import { useCallback } from "react";

import { selectEntitySkill } from "@/api/selectors";
import { FieldMemberSelection } from "@/component/selection/FieldMemberSelection";
import { useTeamContext } from "@/hooks/useTeamContext";
import { useDispatch } from "@/store";
import { addCommand } from "@/store/slice/teamReducer";
import { MemberSlot, SkillNum, TeamMember } from "@/types";

export interface SkillButtonProps {
  skillNum: SkillNum;
  entity: Entity.Entity | { skills: Skill.Skill[] };
  disabled?: boolean;
}

function useSkillActivation(
  skillNum: SkillNum,
  source: MemberSlot
): (teamMember: TeamMember) => void {
  const dispatch = useDispatch();
  return useCallback(
    ({ teamId, slot: target }) => {
      dispatch(
        addCommand(
          {
            item: { type: skillNum, source, target },
          },
          { teamId }
        )
      );
    },
    [skillNum, source, dispatch]
  );
}

export function SkillButton({ skillNum, entity, disabled }: SkillButtonProps) {
  const { slot: source } = useTeamContext();
  const skill = selectEntitySkill(entity, skillNum);
  const skillActivation = useSkillActivation(skillNum, source);
  if (skill == null) return <button disabled className="h-12 w-12" />;
  return (
    <FieldMemberSelection onMemberSelect={skillActivation} disabled={disabled}>
      <img className="h-12 w-12" src={skill.icon} alt={skill.name} />
    </FieldMemberSelection>
  );
}
