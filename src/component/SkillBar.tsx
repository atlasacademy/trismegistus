import { Skill } from "@atlasacademy/api-connector";

import { SkillButton } from "./SkillButton";

export interface SkillBarProps {
  skills: Skill.Skill[];
}

function sortSkills(skills: Skill.Skill[]) {
  const result = [[], [], []] as [Skill.Skill[], Skill.Skill[], Skill.Skill[]];
  for (let i = 0; i < skills.length; i++) {
    const skill = skills[i];
    if (skill.num != null) {
      result[skill.num - 1]?.push(skill);
    }
  }
  return result;
}

export function SkillBar({ skills }: SkillBarProps) {
  const sortedSkills = sortSkills(skills);
  return (
    <div className="flex">
      {sortedSkills.map((skill, index) => (
        <SkillButton key={index} skill={skill[0]} />
      ))}
    </div>
  );
}
