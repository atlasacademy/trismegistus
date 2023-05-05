import { createSelector } from "@reduxjs/toolkit";
import { connect } from "react-redux";

import {
  StatFormFields,
  StatsForm,
  StatsFormActions,
  StatsFormData,
} from "@/component/form/StatsForm";
import { useTeamContext } from "@/hooks/useTeamContext";
import { TrismegistusState } from "@/store";
import { createTeamUserServantSelector } from "@/store/selectors/servant";
import { updateServant } from "@/store/slice/teamReducer";
import { TeamContextData, TeamEntry } from "@/types";
import { MemberSlot } from "@/types/enums";
import { InputServant, UserServant } from "@/types/userServant";
import { extractFieldInfo } from "@/types/utils";

function createServantFormStatsFieldSelector(): (
  state: TrismegistusState,
  teamId: TeamEntry["teamId"],
  slot: MemberSlot
) => StatFormFields<InputServant> {
  return createSelector(
    [
      (_0: TrismegistusState, _1: TeamEntry["teamId"], _2: MemberSlot) => {
        return UserServant;
      },
    ],
    (schema) => {
      return Object.entries(schema.shape).reduce((acc, [key, nextSchema]) => {
        const next = extractFieldInfo(nextSchema);
        if (next != null) {
          acc[next.label] = [key as keyof InputServant, next.min, next.max];
        }
        return acc;
      }, {} as StatFormFields<InputServant>);
    }
  );
}

const Connected = connect(
  () => {
    const selectUserServant = createTeamUserServantSelector();
    const selectFields = createServantFormStatsFieldSelector();
    return (
      state: TrismegistusState,
      { teamId, slot }: TeamContextData
    ): StatsFormData<InputServant> => {
      return {
        state: selectUserServant(state, teamId, slot),
        fields: selectFields(state, teamId, slot),
      };
    };
  },
  (dispatch, { teamId, slot }): StatsFormActions<InputServant> => ({
    onSubmit(changes: Partial<InputServant>) {
      dispatch(updateServant({ slot, item: changes }, { teamId }));
    },
  })
)(StatsForm);

export function ServantStatsForm() {
  const { teamId, slot, mode } = useTeamContext();
  return <Connected teamId={teamId} slot={slot} mode={mode} />;
}
