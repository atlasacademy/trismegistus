import React, { useContext } from "react";

import { MemberSlot, TeamContextData, TeamViewMode } from "@/types";

export const TeamContext = React.createContext<TeamContextData>({
  teamId: -1,
  slot: MemberSlot.NONE,
  mode: TeamViewMode.VIEW,
});

export function useTeamContext() {
  return useContext(TeamContext);
}
