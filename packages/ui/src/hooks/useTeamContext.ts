import { createContext, useContext } from "react";

import { TeamContextData, TeamViewMode } from "@/types";
import { MemberSlot } from "@/types/enums";

export const TeamContext = createContext<TeamContextData>({
  teamId: "",
  slot: MemberSlot.None,
  mode: TeamViewMode.VIEW,
});

export function useTeamContext() {
  return useContext(TeamContext);
}
