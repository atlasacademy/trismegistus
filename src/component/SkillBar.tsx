import { Skill } from "@atlasacademy/api-connector";
import { useMemo } from "react";

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
  return skills.reduce((acc, nextSkill) => {
    if (nextSkill.num != null) {
      const current = acc[nextSkill.num];
      if (current != null) {
        if ((current?.priority ?? -1) < (nextSkill?.priority ?? -1)) {
          acc[nextSkill.num] = nextSkill;
        }
      } else {
        acc[nextSkill.num] = nextSkill;
      }
    }
    return acc;
  }, [] as Skill.Skill[]);
}

export function SkillBar({ skills }: SkillBarProps) {
  const organizedSkills = useMemo(() => organizeSkills(skills), [skills]);
  return (
    <div className="flex justify-center">
      {organizedSkills.map((skill, index) => (
        <SkillButton key={index} skill={skill} />
      ))}
    </div>
  );
}
