import {
  createPartyServantSelector,
  selectPartyMysticCode,
} from "@/api/selectors";
import {
  BattleAction,
  isMysticCodeSkillAction,
  isServantSkillAction,
  MysticCodeSkillBattleAction,
  ServantSkillBattleAction,
} from "@/battle";
import { SkillButton } from "@/component/SkillButton";
import { useSelector } from "@/store";

interface ServantSkillActionIconProps {
  action: ServantSkillBattleAction;
}

export function ServantSkillActionIcon({
  action: { source, servantSkillNum },
}: ServantSkillActionIconProps) {
  const servant = useSelector(createPartyServantSelector(source));
  return (
    <div className="flex flex-none items-end">
      <img
        className="size-mini"
        src={servant?.extraAssets.commands.ascension?.[1]}
        alt="icon"
      />
      <SkillButton disabled owner={source} skillNum={servantSkillNum} />
    </div>
  );
}

export interface MysticCodeSkillActionIconProps {
  action: MysticCodeSkillBattleAction;
}

export function MysticCodeSkillActionIcon({
  action: { source, mysticCodeSkillNum },
}: MysticCodeSkillActionIconProps) {
  const mysticCode = useSelector(selectPartyMysticCode);
  return (
    <div className="flex flex-none items-end">
      <img
        className="size-mini"
        src={mysticCode?.extraAssets.item.male}
        alt="icon"
      />
      <SkillButton disabled owner={source} skillNum={mysticCodeSkillNum} />
    </div>
  );
}

export interface ActionIconProps {
  action: BattleAction<any>;
}

export function ActionIcon({ action }: ActionIconProps) {
  if (isServantSkillAction(action)) {
    return <ServantSkillActionIcon action={action} />;
  } else if (isMysticCodeSkillAction(action)) {
    return <MysticCodeSkillActionIcon action={action} />;
  }
  return <></>;
}
