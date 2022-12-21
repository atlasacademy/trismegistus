import { Servant } from "@atlasacademy/api-connector";
import { useCallback } from "react";

import { selectEntitySkill } from "@/api/selectors";
import { FieldMemberSelection } from "@/component/selection/FieldMemberSelection";
import { useTeamContext } from "@/hook/useTeamContext";
import { useDispatch } from "@/store";
import { addCommand } from "@/store/slice/teamSlice";
import { MemberSlot, SkillNum, TeamMember } from "@/types";

export interface SkillButtonProps {
  skillNum: SkillNum;
  servant: Servant.Servant;
}

function useSkillActivation(
  skillNum: SkillNum,
  source: MemberSlot
): (teamMember: TeamMember) => void {
  const dispatch = useDispatch();
  return useCallback(
    ({ teamId, slot: target }) => {
      dispatch(
        addCommand({
          teamId,
          entry: { type: skillNum, source, target, wave: 1 },
        })
      );
    },
    [skillNum, source, dispatch]
  );
}

export function SkillButton({ skillNum, servant }: SkillButtonProps) {
  const { slot: source } = useTeamContext();
  const skill = selectEntitySkill(servant, skillNum);
  const skillActivation = useSkillActivation(skillNum, source);
  if (skill == null) return <button disabled className="h-12 w-12" />;
  return (
    <FieldMemberSelection onMemberSelect={skillActivation}>
      <img className="h-12 w-12" src={skill.icon} alt={skill.name} />
    </FieldMemberSelection>
  );
}
