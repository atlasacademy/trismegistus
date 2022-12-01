import { Servant } from "@atlasacademy/api-connector";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import { deferP0, pipe } from "ts-functional-pipe";

import { selectServant } from "@/api/selectors";
import { TrismegistusState } from "@/store";
import { currySlotSelectors } from "@/store/currySlotSelectors";
import { selectServantDefaults } from "@/store/slice/userSlice";
import { MemberSlot, UserServant, UserTeam } from "@/types";
import { createUserServant } from "@/types/utils";
import { fallback } from "@/util";
import { coalesce } from "@/util/func";

export function selectServants(team: UserTeam) {
  return team.servants;
}

export const {
  getInitialState: getInitialServantsState,
  getSelectors: getServantsSelectors,
  ...servantsAdapter
} = createEntityAdapter<UserServant>({
  selectId: ({ slot }) => slot,
});

export const selectServantAttack = (
  { atkGrowth }: Servant.Servant,
  { level }: UserServant
) => atkGrowth[level - 1] ?? 0;

export const {
  selectById: selectTeamServantBySlot,
  selectIds: selectTeamServantSlots,
  selectAll: selectTeamServants,
  selectTotal: selectTotalTeamServants,
} = currySlotSelectors(getServantsSelectors(selectServants), (slot) => {
  return createUserServant({ slot });
});

export const selectTeamServantAttackBySlot = (userServant: UserServant) => {
  return pipe(
    selectServant(userServant),
    coalesce(deferP0(selectServantAttack)(userServant), 0)
  );
};

export function selectTeamServantWithDefaults(
  teamId: number,
  memberSlot: MemberSlot
): (state: TrismegistusState) => UserServant {
  const userServantSelector = selectTeamServantBySlot(teamId, memberSlot);
  return createSelector(
    [
      userServantSelector,
      selectServantDefaults,
      (state) => {
        const userServant = userServantSelector(state);
        return selectServant(userServant)(state);
      },
    ],
    (
      { slot, servantId, level, fou, noblePhantasmLevel, skills, appends },
      {
        noblePhantasmLevel: defaultNoblePhantasmLevel,
        fou: defaultFou,
        skills: defaultSkills,
        appends: defaultAppends,
      },
      servant
    ) => {
      return {
        slot,
        servantId,
        level: fallback(level, servant?.lvMax ?? 0),
        fou: fallback(fou, defaultFou),
        noblePhantasmLevel: fallback(
          noblePhantasmLevel,
          defaultNoblePhantasmLevel
        ),
        skills: [
          fallback(skills[0], defaultSkills[0]),
          fallback(skills[1], defaultSkills[1]),
          fallback(skills[2], defaultSkills[2]),
        ],
        appends: [
          fallback(appends[0], defaultAppends[0]),
          fallback(appends[1], defaultAppends[1]),
          fallback(appends[2], defaultAppends[2]),
        ],
      };
    }
  );
}
