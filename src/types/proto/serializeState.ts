import { TrismegistusState } from "@/store";
import { ProtoTeam, ProtoTrismegistusState } from "@/types/proto/trismegistus";
import { createUserCommandScript } from "@/types/userCommandScript";
import { createUserCraftEssence } from "@/types/userCraftEssence";
import { createUserMysticCode } from "@/types/userMysticCode";
import { createUserServant } from "@/types/userServant";
import { InputTeam } from "@/types/userTeam";

function toProtoTeam({
  mysticCode,
  servants,
  craftEssences,
  commandScript,
}: InputTeam): ProtoTeam {
  return {
    mysticCode: createUserMysticCode(mysticCode),
    slots: servants.map((userServant, index) => {
      const userCraftEssence = craftEssences[index];
      return Object.assign(
        {},
        createUserServant(userServant),
        createUserCraftEssence(userCraftEssence)
      );
    }),
    commandScript: createUserCommandScript(commandScript),
  };
}

export function serializeState({
  teams,
}: TrismegistusState): ProtoTrismegistusState {
  return { teams: teams.ids.map((id) => teams.entities[id]!).map(toProtoTeam) };
}
