import { createContext, useContext } from "react";

import { MemberSlot, TeamContextData, TeamViewMode } from "@/types";

export const TeamContext = createContext<TeamContextData>({
  teamId: "",
  slot: MemberSlot.NONE,
  mode: TeamViewMode.VIEW,
});

export function useTeamContext() {
  return useContext(TeamContext);
}
