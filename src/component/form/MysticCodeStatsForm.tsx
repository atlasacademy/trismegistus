import { useDebounceCallback } from "@react-hook/debounce";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { ControlledSlider } from "@/component/form/ControlledSlider";
import { extractFieldsChanged } from "@/component/form/extractFieldsChanged";
import { useTeamContext } from "@/hook/useTeamContext";
import { useDispatch, useMemoSelector } from "@/store";
import {
  selectTeamMysticCode,
  updateMysticCode,
} from "@/store/slice/teamSlice";
import { UserMysticCode } from "@/types";

function useMysticCodeUpdate(teamId: number) {
  const dispatch = useDispatch();
  return useCallback(
    <K extends keyof UserMysticCode>(entry: [K, UserMysticCode[K]]) => {
      dispatch(updateMysticCode({ teamId, entry }));
    },
    [teamId, dispatch]
  );
}

export function MysticCodeStatsForm() {
  const { teamId } = useTeamContext();
  const userMysticCode = useMemoSelector(selectTeamMysticCode, [teamId]);

  const { control, handleSubmit, formState, reset } = useForm<UserMysticCode>({
    mode: "onBlur",
    defaultValues: userMysticCode,
  });

  const updateMysticCodeStats = useMysticCodeUpdate(teamId);

  const onSubmit = useDebounceCallback(
    handleSubmit((data, formEvent) => {
      formEvent?.preventDefault();
      const changes = extractFieldsChanged(formState, data);
      if (changes.length === 1) {
        const [change] = changes;
        updateMysticCodeStats(change);
      }
    }),
    250
  );

  useEffect(() => {
    reset(userMysticCode);
  }, [reset, userMysticCode]);

  return (
    <form className="space-y-2" onSubmit={onSubmit} onChange={onSubmit}>
      <ControlledSlider
        control={control}
        label="Level"
        property="mysticCodeLevel"
        min={0}
        max={10}
      />
      <input type="submit" hidden />
    </form>
  );
}
