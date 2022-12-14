import { useCallback } from "react";
import { Control, useController, useForm } from "react-hook-form";

import { SliderInput } from "@/component/primitives/SliderInput";
import { useTeamContext } from "@/hook/useTeamContext";
import { useDispatch, useMemoSelector } from "@/store";
import { selectTeamServantBySlot } from "@/store/entity/servant";
import { updateServant } from "@/store/slice/teamSlice";
import { UserServant } from "@/types";

interface ControlledSliderProps {
  label: string;
  property: keyof UserServant;
  control: Control<UserServant>;
  min: number;
  max: number;
}

function ControlledSlider({
  label,
  property,
  control,
  min,
  max,
}: ControlledSliderProps) {
  const { field } = useController({
    name: property,
    control,
  });
  return (
    <SliderInput
      title={label}
      min={min}
      max={max}
      value={field.value}
      onChange={field.onChange}
      onBlur={field.onBlur}
    />
  );
}

function useServantUpdate(teamId: number) {
  const dispatch = useDispatch();
  return useCallback(
    (entry: Partial<UserServant>) => {
      dispatch(updateServant({ teamId, entry }));
    },
    [teamId, dispatch]
  );
}

export function StatsForm() {
  const { teamId, slot } = useTeamContext();
  const userServant = useMemoSelector(selectTeamServantBySlot, [teamId, slot]);

  const { control, handleSubmit } = useForm<UserServant>({
    mode: "onBlur",
    defaultValues: userServant,
  });
  const updateServantStat = useServantUpdate(teamId);
  const onSubmit = handleSubmit((data, formEvent) => {
    formEvent?.preventDefault();
    updateServantStat(data);
  });
  return (
    <form className="space-y-2" onSubmit={onSubmit} onBlur={onSubmit}>
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
