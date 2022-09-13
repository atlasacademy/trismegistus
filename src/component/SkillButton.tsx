import { Skill } from "@atlasacademy/api-connector";
import { useCallback } from "react";

import { useDispatch } from "@/store";
import { activateSkill } from "@/store/PartyReducer";
import { ActionSource, SkillNum } from "@/types";

export interface SkillButtonProps {
  skillNum: SkillNum;
  owner?: ActionSource;
  skill?: Skill.Skill;
}

export function SkillButton({ skillNum, owner, skill }: SkillButtonProps) {
  const dispatch = useDispatch();
  const onClick = useCallback(() => {
    if (owner != null) {
      dispatch(
        activateSkill({
          type: "skill",
          source: owner,
          skillNum,
        })
      );
    }
  }, [skillNum, owner]);
  return (
    <button
      disabled={skill == null}
      className="mx-2 flex h-12 w-12 items-center justify-center"
      onClick={onClick}
    >
      {skill && <img src={skill.icon} alt={skill.name} />}
    </button>
  );
}
