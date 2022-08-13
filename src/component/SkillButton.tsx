import { Skill } from "@/types";

export interface SkillButtonProps {
  skill: Skill;
}

export function SkillButton({ skill: { name } }: SkillButtonProps) {
  return (
    <div className="mx-2 flex h-12 w-12 items-center justify-center border">
      {name}
    </div>
  );
}
