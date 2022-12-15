import { useCallback, useEffect } from "react";
import { Control, FormState, useController, useForm } from "react-hook-form";

import { SliderInput } from "@/component/primitives/SliderInput";
import { useTeamContext } from "@/hook/useTeamContext";
import { useDispatch, useMemoSelector } from "@/store";
import { selectTeamServantBySlot } from "@/store/entity/servant";
import { updateServantStats } from "@/store/slice/teamSlice";
import { MemberSlot, UserServant } from "@/types";

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

function useServantUpdate(teamId: number, slot: MemberSlot) {
  const dispatch = useDispatch();
  return useCallback(
    <K extends keyof UserServant>(entry: [K, UserServant[K]][]) => {
      dispatch(updateServantStats({ teamId, slot, entry }));
    },
    [teamId, slot, dispatch]
  );
}

function extractFieldsChanged(
  { touchedFields }: FormState<UserServant>,
  data: UserServant
): [keyof UserServant, number][] {
  return Object.entries(touchedFields).reduce((acc, field) => {
    const key = field[0] as keyof UserServant;
    const touched = field[1];
    if (touched) {
      acc.push([key, data[key]]);
    }
    return acc;
  }, [] as [keyof UserServant, number][]);
}

export function StatsForm() {
  const { teamId, slot } = useTeamContext();
  const userServant = useMemoSelector(selectTeamServantBySlot, [teamId, slot]);

  const { control, handleSubmit, formState, reset } = useForm<UserServant>({
    mode: "onSubmit",
    defaultValues: userServant,
  });

  const updateServant = useServantUpdate(teamId, slot);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const onSubmit = handleSubmit((data, formEvent) => {
    formEvent?.preventDefault();
    console.log(formState.touchedFields);
    const changes = extractFieldsChanged(formState, data);
    updateServant(changes);
  });

  useEffect(() => {
    reset(userServant);
  }, [reset, userServant]);

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
