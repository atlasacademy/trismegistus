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
import { createTeamMysticCodeSelector } from "@/store/selectors/mysticCode";
import { updateMysticCode } from "@/store/slice/teamReducer";
import { TeamContextData } from "@/types";
import { InputMysticCode, UserMysticCode } from "@/types/userMysticCode";
import { extractFieldInfo } from "@/types/utils";

function createMysticCodeFormFieldsSelector(): (
  state: TrismegistusState
) => StatFormFields<InputMysticCode> {
  return createSelector(
    [(_: TrismegistusState) => UserMysticCode],
    (schema) => {
      const levelField = extractFieldInfo(schema.shape.mysticCodeLevel);
      if (levelField == null) return {};
      return {
        [levelField.label]: ["mysticCodeLevel", levelField.min, levelField.max],
      };
    }
  );
}

const Connected = connect(
  () => {
    const selectMysticCode = createTeamMysticCodeSelector();
    const selectFields = createMysticCodeFormFieldsSelector();
    return (
      state: TrismegistusState,
      { teamId }: TeamContextData
    ): StatsFormData<InputMysticCode> => {
      return {
        state: selectMysticCode(state, teamId),
        fields: selectFields(state),
      };
    };
  },
  (dispatch, { teamId }): StatsFormActions<InputMysticCode> => ({
    onSubmit(changes: Partial<InputMysticCode>) {
      dispatch(updateMysticCode(changes, { teamId }));
    },
  })
)(StatsForm);

export function MysticCodeStatsForm() {
  const { teamId, slot, mode } = useTeamContext();
  return <Connected teamId={teamId} slot={slot} mode={mode} />;
}
