import { BattleAction } from "@/battle";

export interface ActionIconProps {
  action: BattleAction<any>;
}

export function ActionIcon({ action }: ActionIconProps) {
  return <div>{JSON.stringify(action)}</div>;
}
