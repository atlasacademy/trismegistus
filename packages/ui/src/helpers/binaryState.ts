import {
  BinaryRegistry,
  BinarySchema,
  generateBinaryType,
} from "@trismegistus/zod-bit-buffer";
import { z } from "zod";

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
    "servantColNo",
    "servantLevel",
    "fou",
    "noblePhantasmLevel",
    "skill1",
    "skill2",
    "skill3",
    "append1",
    "append2",
    "append3",
    "servantId",
  ]);
  registry.register(UserCraftEssence, [
    "craftEssenceColNo",
    "craftEssenceLevel",
    "craftEssenceMLB",
    "craftEssenceId",
  ]);
  registry.register(UserBattleStep, ["skills", "battleCommands"]);
  registry.register(UserSkillActivation, ["type", "source", "target"]);
  registry.register(UserBattleCommand, ["type", "source"]);
  return generateBinaryType(registry, TrismegistusTeams);
}
export const TrismegistusTeams = z.array(UserTeam).max(128);
export const TrismegistusBinaryState = createStateBinaryType()!;
