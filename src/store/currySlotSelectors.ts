import { EntitySelectors } from "@reduxjs/toolkit/src/entities/models";
import { deferP0, pipe } from "ts-functional-pipe";

import { selectTeamById } from "@/store/slice/teamSlice";
import { MemberSlot, UserTeam } from "@/types";
import { coalesce, mayBeNull } from "@/util/func";

export function currySlotSelectors<T>(
  {
    selectById,
    selectIds,
    selectAll,
    selectTotal,
  }: EntitySelectors<T, UserTeam>,
  factory: (slot: MemberSlot) => T
) {
  return {
    selectById(teamId: number, slot: MemberSlot) {
      return pipe(
        deferP0(selectTeamById)(teamId),
        mayBeNull(deferP0(selectById)(slot)),
        (selected) => selected ?? factory(slot)
      );
    },
    selectIds(teamId: number) {
      return pipe(
        deferP0(selectTeamById)(teamId),
        coalesce((team) => selectIds(team) as MemberSlot[], [])
      );
    },
    selectAll(teamId: number) {
      return pipe(deferP0(selectTeamById)(teamId), coalesce(selectAll, []));
    },
    selectTotal(teamId: number) {
      return pipe(deferP0(selectTeamById)(teamId), coalesce(selectTotal, 0));
    },
  };
}
