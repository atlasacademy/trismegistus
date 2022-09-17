import { useCallback } from "react";

import {
  createMysticCodeSkillSelector,
  createPartyServantSkillSelector,
} from "@/api/selectors";
import { useDispatch, useSelector } from "@/store";
import {
  activateMysticCodeSkill,
  activateServantSkill,
} from "@/store/partySlice";
import { ActionSource, SkillNum } from "@/types";

export interface SkillButtonProps {
  skillNum: SkillNum;
  owner?: ActionSource;
  disabled?: boolean;
}

function useSkillActivation(
  skillNum: SkillNum,
  owner: ActionSource | undefined
) {
  const dispatch = useDispatch();
  return useCallback(() => {
    if (owner == null) {
      return;
    }
    if (owner === "mysticCode") {
      dispatch(
        activateMysticCodeSkill({
          source: owner,
          mysticCodeSkillNum: skillNum,
        })
      );
    } else {
      dispatch(
        activateServantSkill({
          source: owner,
          servantSkillNum: skillNum,
        })
      );
    }
  }, [skillNum, owner]);
}

function useSkillSelector(skillNum: SkillNum, owner?: ActionSource) {
  if (owner == null) {
    return useSelector(() => undefined);
  } else if (owner === "mysticCode") {
    return useSelector(createMysticCodeSkillSelector(skillNum));
  } else {
    return useSelector(createPartyServantSkillSelector(owner, skillNum));
  }
}

export function SkillButton({ skillNum, owner, disabled }: SkillButtonProps) {
  const skillActivation = useSkillActivation(skillNum, owner);
  const skill = useSkillSelector(skillNum, owner);
  if (skill == null) return <button disabled className="h-12 w-12" />;
  const { name, icon } = skill;
  return (
    <button className="h-12 w-12" disabled={disabled} onClick={skillActivation}>
      <img src={icon} alt={name} />
    </button>
  );
}
