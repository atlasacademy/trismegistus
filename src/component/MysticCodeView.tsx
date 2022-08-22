import { MysticCode } from "@/types";

import { SkillButton } from "./SkillButton";

export interface MysticCodeProps extends MysticCode {}

export function MysticCodeView({
  name,
  portraitUrl: icon,
  skills,
}: MysticCodeProps) {
  return (
    <section className="flex items-center">
      <img src={icon} alt={name} className="h-16 w-16 border" />
      {skills.map((skill, index) => (
        <SkillButton key={index} skill={skill} />
      ))}
    </section>
  );
}
