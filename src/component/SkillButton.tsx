import { Skill } from "@atlasacademy/api-connector";

export interface SkillButtonProps {
  skill?: Skill.Skill;
}

export function SkillButton({ skill }: SkillButtonProps) {
  return (
    <div className="mx-2 flex h-12 w-12 items-center justify-center border">
      {skill?.name}
    </div>
  );
}
