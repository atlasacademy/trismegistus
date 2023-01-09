import { FormState } from "react-hook-form";

export function extractFieldsChanged<T extends Record<string, any>>(
  { touchedFields }: FormState<T>,
  data: T
): [keyof T, number][] {
  return Object.entries(touchedFields).reduce((acc, field) => {
    const key = field[0] as keyof T;
    const touched = field[1];
    if (touched) {
      acc.push([key, data[key]]);
    }
    return acc;
  }, [] as [keyof T, number][]);
}
