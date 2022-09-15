import { ActionSource } from "@/types";

import { SkillButton } from "./SkillButton";

export interface SkillBarProps {
  owner?: ActionSource;
}

export function SkillBar({ owner }: SkillBarProps) {
  return (
    <div className="flex justify-between px-4">
      <SkillButton owner={owner} skillNum={1} />
      <SkillButton owner={owner} skillNum={2} />
      <SkillButton owner={owner} skillNum={3} />
    </div>
  );
}
