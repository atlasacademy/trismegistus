import { useDebounceCallback } from "@react-hook/debounce";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import { ControlledSlider } from "@/component/form/ControlledSlider";
import { extractFieldsChanged } from "@/component/form/extractFieldsChanged";
import { useTeamContext } from "@/hook/useTeamContext";
import { useDispatch, useMemoSelector } from "@/store";
import { selectTeamServantBySlot } from "@/store/entity/servant";
import { updateServantStats } from "@/store/slice/teamSlice";
import { MemberSlot, UserServant } from "@/types";

function useServantUpdate(teamId: number, slot: MemberSlot) {
  const dispatch = useDispatch();
  return useCallback(
    <K extends keyof UserServant>(entry: [K, UserServant[K]][]) => {
      dispatch(updateServantStats({ teamId, slot, entry }));
    },
    [teamId, slot, dispatch]
  );
}

export function StatsForm() {
  const { teamId, slot } = useTeamContext();
  const userServant = useMemoSelector(selectTeamServantBySlot, [teamId, slot]);

  const { control, handleSubmit, formState, reset } = useForm<UserServant>({
    mode: "onBlur",
    defaultValues: userServant,
  });

  const updateServant = useServantUpdate(teamId, slot);

  const onSubmit = useDebounceCallback(
    handleSubmit((data, formEvent) => {
      formEvent?.preventDefault();
      const changes = extractFieldsChanged(formState, data);
      updateServant(changes);
    }),
    250
  );

  useEffect(() => {
    reset(userServant);
  }, [reset, userServant]);

  return (
    <form className="space-y-2" onSubmit={onSubmit} onChange={onSubmit}>
      <ControlledSlider
        control={control}
        label="Level"
        property="level"
        min={1}
        max={120}
      />

      <ControlledSlider
        control={control}
        label="Fou"
        property="fou"
        min={0}
        max={2000}
      />
      <ControlledSlider
        control={control}
        label="NP"
        property="noblePhantasmLevel"
        min={1}
        max={5}
      />
      <ControlledSlider
        control={control}
        label="Skill 1"
        property="skill1"
        min={1}
        max={10}
      />
      <ControlledSlider
        control={control}
        label="Skill 2"
        property="skill2"
        min={1}
        max={10}
      />
      <ControlledSlider
        control={control}
        label="Skill 3"
        property="skill3"
        min={1}
        max={10}
      />
      <ControlledSlider
        control={control}
        label="Append 1"
        property="append1"
        min={0}
        max={10}
      />
      <ControlledSlider
        control={control}
        label="Append 2"
        property="append2"
        min={0}
        max={10}
      />
      <ControlledSlider
        control={control}
        label="Append 3"
        property="append3"
        min={0}
        max={10}
      />
      <button type="submit">Save</button>
    </form>
  );
}
