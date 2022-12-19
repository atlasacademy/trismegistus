import { useServantQuery } from "@/api";
import { selectEntitySkill } from "@/api/selectors";
import { FieldMemberSelection } from "@/component/selection/FieldMemberSelection";
import { SelectionTrigger } from "@/component/selection/SelectionTrigger";
import { useTeamContext } from "@/hook/useTeamContext";
import { selectTeamServantWithDefaults, useMemoSelector } from "@/store";
import { selectUserServantSkill } from "@/store/entity/servant";
import { SkillNum, TeamViewMode } from "@/types";
import { CommandType } from "@/types/proto/trismegistus";

interface SkillButtonProps {
  skillNum: SkillNum;
  servantId: number;
}
function SkillButton({ skillNum, servantId }: SkillButtonProps) {
  const { data: servant } = useServantQuery(servantId);
  if (servant == null) return <button disabled className="h-12 w-12" />;
  const skill = selectEntitySkill(servant, skillNum);
  if (skill == null) return <button disabled className="h-12 w-12" />;
  return (
    <FieldMemberSelection onMemberSelect={() => {}}>
      <img src={skill.icon} alt={skill.name} />
    </FieldMemberSelection>
  );
}

interface SkillDisplayProps {
  skillNum: SkillNum;
}
function SkillDisplay({ skillNum }: SkillDisplayProps) {
  const { teamId, slot, mode } = useTeamContext();
  const userServant = useMemoSelector(selectTeamServantWithDefaults, [
    teamId,
    slot,
  ]);
  const skillLevel = selectUserServantSkill(userServant, skillNum);
  if (mode === TeamViewMode.SCRIPT) {
    return (
      <SkillButton skillNum={skillNum} servantId={userServant.servantId} />
    );
  }
  return <>{skillLevel || "-"}</>;
}

export function SkillBar() {
  return (
    <div className="flex justify-between">
      <div className="w-full">Skills</div>
      <div className="flex w-full">
        <div className="w-1/3">
          <SkillDisplay skillNum={CommandType.SKILL_1} />
        </div>
        <div className="w-1/3">
          <SkillDisplay skillNum={CommandType.SKILL_2} />
        </div>
        <div className="w-1/3">
          <SkillDisplay skillNum={CommandType.SKILL_3} />
        </div>
      </div>
    </div>
  );
}
