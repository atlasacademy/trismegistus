import { CraftEssence, Servant } from "@atlasacademy/api-connector";

import { MemberSlot, SkillActivation } from "@/types";
import { UserCraftEssence } from "@/types/userCraftEssence";
import { UserServant } from "@/types/userServant";

export interface BattleEngine {
  calculate(
    memberSlot: MemberSlot,
    userServant: UserServant,
    servant: Servant.Servant,
    userCraftEssence: UserCraftEssence | undefined,
    craftEssence: CraftEssence.CraftEssence | undefined,
    commands: SkillActivation[]
  ): BattleResult;
}

export interface StatRange {
  min: number;
  base: number;
  max: number;
}

export interface BattleResult {
  damage: StatRange;
}
