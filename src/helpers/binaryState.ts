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
import { BitSchema, ZodSchemaParser } from "@/zod-bit-buffer";

function createStateBinaryType(): BitSchema | undefined {
  const parser = new ZodSchemaParser();
  parser.register(UserTeam, [
    "mysticCode",
    "servants",
    "craftEssences",
    "commandScript",
  ]);
  parser.register(UserMysticCode, ["mysticCodeId", "mysticCodeLevel"]);
  parser.register(UserServant, [
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
  parser.register(UserCraftEssence, [
    "craftEssenceColNo",
    "craftEssenceLevel",
    "craftEssenceMLB",
    "craftEssenceId",
  ]);
  parser.register(UserBattleStep, ["skills", "battleCommands"]);
  parser.register(UserSkillActivation, ["type", "source", "target"]);
  parser.register(UserBattleCommand, ["type", "source"]);
  return parser.parse(TrismegistusTeams);
}
export const TrismegistusTeams = z.array(UserTeam).max(128);
export const TrismegistusBinaryState = createStateBinaryType()!;
