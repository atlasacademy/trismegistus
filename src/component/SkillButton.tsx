import { Skill } from "@atlasacademy/api-connector";

export interface SkillButtonProps {
  skill?: Skill.Skill;
}

export function SkillButton({ skill }: SkillButtonProps) {
  return (
    <button
      disabled={skill == null}
      className="mx-2 flex h-12 w-12 items-center justify-center"
    >
      {skill && <img src={skill.icon} alt={skill.name} />}
    </button>
  );
}
