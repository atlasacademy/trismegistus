import { Skill } from "@atlasacademy/api-connector";
import { useMemo } from "react";

import { ActionSource } from "@/types";

import { SkillButton } from "./SkillButton";

export interface SkillBarProps {
  owner?: ActionSource;
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
    const { num } = nextSkill;
    if (num != null) {
      const current = acc[num - 1];
      if (current != null) {
        if ((current?.priority ?? -1) < (nextSkill?.priority ?? -1)) {
          acc[num - 1] = nextSkill;
        }
      } else {
        acc[num - 1] = nextSkill;
      }
    }
    return acc;
  }, [] as Skill.Skill[]);
}

export function SkillBar({ owner, skills }: SkillBarProps) {
  const organizedSkills = useMemo(() => organizeSkills(skills), [skills]);
  return (
    <div className="flex justify-center">
      <SkillButton owner={owner} skillNum={1} skill={organizedSkills[0]} />
      <SkillButton owner={owner} skillNum={2} skill={organizedSkills[1]} />
      <SkillButton owner={owner} skillNum={3} skill={organizedSkills[2]} />
    </div>
  );
}
