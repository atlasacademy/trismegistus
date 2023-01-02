import { Servant } from "@atlasacademy/api-connector";

import { UserCommand, UserServant } from "@/types";

export interface BattleEngine {
  calculate(
    teamId: number,
    userServant: UserServant,
    servant: Servant.Servant,
    commands: UserCommand[]
  ): BattleResult;
}

export type StatRange<T> = [min: T, base: T, max: T];

export interface BattleResult {
  damage: StatRange<number>;
}
