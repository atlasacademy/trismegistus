import { z } from "zod";

import { BinaryRegistry } from "@/serialization/binaryRegistry";
import { BinarySchema } from "@/serialization/binaryTypes";
import { generateBinaryType } from "@/serialization/generateBinaryType";
import {
  UserBattleCommand,
  UserBattleStep,
  UserSkillActivation,
} from "@/types/userCommandScript";
import { UserCraftEssence } from "@/types/userCraftEssence";
import { UserMysticCode } from "@/types/userMysticCode";
import { UserServant } from "@/types/userServant";
import { UserTeam } from "@/types/userTeam";

function createStateBinaryType(): BinarySchema | undefined {
  const registry = new BinaryRegistry();
  registry.register(UserTeam, [
    "mysticCode",
    "servants",
    "craftEssences",
    "commandScript",
  ]);
  registry.register(UserMysticCode, ["mysticCodeId", "mysticCodeLevel"]);
  registry.register(UserServant, [
    "servantId",
    "servantLevel",
    "fou",
    "noblePhantasmLevel",
    "skill1",
    "skill2",
    "skill3",
    "append1",
    "append2",
    "append3",
  ]);
  registry.register(UserCraftEssence, [
    "craftEssenceId",
    "craftEssenceLevel",
    "craftEssenceMLB",
  ]);
  registry.register(UserBattleStep, ["skills", "battleCommands"]);
  registry.register(UserSkillActivation, ["type", "source", "target"]);
  registry.register(UserBattleCommand, ["type", "source"]);
  return generateBinaryType(registry, TrismegistusTeams);
}
export const TrismegistusTeams = z.array(UserTeam).max(128);
export const TrismegistusBinaryState = createStateBinaryType()!;