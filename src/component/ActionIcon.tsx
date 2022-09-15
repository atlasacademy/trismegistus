import { createPartyServantSelector } from "@/api/selectors";
import {
  BattleAction,
  isSkillAction,
  ServantSkillBattleAction,
} from "@/battle";
import { SkillButton } from "@/component/SkillButton";
import { useSelector } from "@/store";

interface SkillActionIconProps {
  action: ServantSkillBattleAction;
}

export function SkillActionIcon({
  action: { source, servantSkillNum },
}: SkillActionIconProps) {
  const servant = useSelector(createPartyServantSelector(source));
  return (
    <div className="flex items-end">
      <img
        className="size-mini"
        src={servant?.extraAssets.commands.ascension?.[1]}
        alt="icon"
      />
      <SkillButton disabled owner={source} skillNum={servantSkillNum} />
    </div>
  );
}

export interface ActionIconProps {
  action: BattleAction<any>;
}

export function ActionIcon({ action }: ActionIconProps) {
  if (isSkillAction(action)) {
    return <SkillActionIcon action={action} />;
  }
  return <></>;
}
