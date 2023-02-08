import {
  Control,
  FieldPath,
  FieldValues,
  useController,
} from "react-hook-form";

import { SliderInput } from "@/component/primitives/SliderInput";

interface ControlledSliderProps<T extends FieldValues> {
  label: string;
  property: FieldPath<T>;
  control: Control<T>;
  min: number;
  max: number;
}

export function ControlledSlider<T extends FieldValues>({
  label,
  property,
  control,
  min,
  max,
}: ControlledSliderProps<T>) {
  const { field } = useController({
    control,
    name: property,
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
