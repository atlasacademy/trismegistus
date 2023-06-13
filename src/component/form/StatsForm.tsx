import { useDebounceCallback } from "@react-hook/debounce";
import { useCallback, useEffect, useRef } from "react";
import {
  Control,
  FieldPath,
  FieldValues,
  FormState,
  useForm,
  useFormState,
} from "react-hook-form";

import { ControlledSlider } from "@/component/form/ControlledSlider";

export type StatFormFields<T extends FieldValues> = Record<
  string,
  [key: FieldPath<T>, min: number, max: number]
>;

export interface StatsFormData<T extends FieldValues> {
  state: T;
  fields: StatFormFields<T>;
}

export interface StatsFormActions<T extends FieldValues> {
  onSubmit(changes: Partial<T>): void;
}

export interface StatsFormProps<T extends FieldValues>
  extends StatsFormData<T>,
    StatsFormActions<T> {}

export function useChangedFieldsExtractor<T extends FieldValues>(
  control: Control<T>
): (data: T) => Partial<T> {
  const dirtyFieldsRef = useRef<FormState<T>["dirtyFields"]>();
  const { dirtyFields } = useFormState({ control });

  useEffect(() => {
    dirtyFieldsRef.current = dirtyFields;
  }, [dirtyFields]);

  return useCallback((data: T): Partial<T> => {
    return Object.entries(dirtyFieldsRef.current ?? {}).reduce(
      (acc, [key, dirty]) => {
        if (dirty) acc[key as keyof T] = data[key];
        return acc;
      },
      {} as Partial<T>
    );
  }, []);
}

export function StatsForm<T extends FieldValues>({
  state,
  fields,
  onSubmit,
}: StatsFormProps<T>) {
  const { control, handleSubmit, reset } = useForm<T>({
    mode: "onChange",
  });

  const extractChanged = useChangedFieldsExtractor(control);

  const onFormSubmit = useDebounceCallback(
    handleSubmit((data, formEvent) => {
      formEvent?.preventDefault();
      onSubmit(extractChanged(data));
    }),
    250
  );

  useEffect(() => {
    reset(state);
  }, [reset, state]);

  return (
    <form className="space-y-2" onSubmit={onFormSubmit} onChange={onFormSubmit}>
      {Object.entries(fields).map(([label, [field, min, max]]) => (
        <ControlledSlider
          key={label}
          label={label}
          control={control}
          property={field}
          min={min}
          max={max}
        />
      ))}

      <button type="submit" className="hidden">
        Save
      </button>
    </form>
  );
}
