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
      {
        slot,
        servantId,
        level,
        fou,
        noblePhantasmLevel,
        skill1,
        skill2,
        skill3,
        append1,
        append2,
        append3,
      },
      {
        noblePhantasmLevel: defaultNoblePhantasmLevel,
        fou: defaultFou,
        skill1: defaultSkill1,
        skill2: defaultSkill2,
        skill3: defaultSkill3,
        append1: defaultAppend1,
        append2: defaultAppend2,
        append3: defaultAppend3,
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
        skill1: fallback(skill1, defaultSkill1),
        skill2: fallback(skill2, defaultSkill2),
        skill3: fallback(skill3, defaultSkill3),
        append1: fallback(append1, defaultAppend1),
        append2: fallback(append2, defaultAppend2),
        append3: fallback(append3, defaultAppend3),
      };
    }
  );
}
