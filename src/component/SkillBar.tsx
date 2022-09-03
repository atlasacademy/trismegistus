import { Skill } from "@atlasacademy/api-connector";

import { SkillButton } from "./SkillButton";

export interface SkillBarProps {
  skills?: Skill.Skill[];
}

function organizeSkills(skills?: Skill.Skill[]): (Skill.Skill | undefined)[] {
  if (skills == null) {
    return [undefined, undefined, undefined];
  }
  if (skills.length === 3) {
    return skills;
  }
  const result = [[], [], []] as [Skill.Skill[], Skill.Skill[], Skill.Skill[]];
  for (let i = 0; i < skills.length; i++) {
    const skill = skills[i];
    if (skill.num != null) {
      result[skill.num - 1]?.push(skill);
    }
  }
  return result.map((skillP) => skillP[0]);
}

export function SkillBar({ skills }: SkillBarProps) {
  const setSkills = organizeSkills(skills);
  return (
    <div className="flex justify-center">
      {setSkills.map((skill, index) => (
        <SkillButton key={index} skill={skill} />
      ))}
    </div>
  );
}
