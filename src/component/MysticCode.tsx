import { Skill } from "@/types";

import { SkillButton } from "./SkillButton";

export interface MysticCodeProps {
  name: string;
  icon: string;
  skills: [Skill, Skill, Skill];
}

export function MysticCode({ name, icon, skills }: MysticCodeProps) {
  return (
    <section className="flex items-center">
      <img src={icon} alt={name} className="h-16 w-16 border" />
      {skills.map((skill, index) => (
        <SkillButton key={index} skill={skill} />
      ))}
    </section>
  );
}
