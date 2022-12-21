import * as Slider from "@radix-ui/react-slider";
import classNames from "classnames";
import type { ChangeEvent } from "react";
import { useCallback, useMemo, useRef } from "react";

export interface SliderInputProps {
  title: string;
  value: number;
  min: number;
  max: number;
  onChange(newValue: number): void;
  onBlur(): void;
}

export function SliderInput({
  title,
  value,
  min,
  max,
  onChange,
  onBlur,
}: SliderInputProps) {
  const values = useMemo(() => [value], [value]);
  const onChangeChecked = useCallback(
    (sliderValue: number) => {
      if (
        Number.isInteger(sliderValue) &&
        sliderValue >= min &&
        sliderValue <= max
      ) {
        onChange(sliderValue);
      }
    },
    [onChange, min, max]
  );

  const inputChangeHandler = useCallback(
    ({ target: { value: rawValue } }: ChangeEvent<HTMLInputElement>) => {
      if (rawValue === "") {
        onChange(0);
        return;
      }
      onChangeChecked(parseInt(rawValue));
    },
    [onChange, onChangeChecked]
  );

  const sliderChangeHandler = useCallback(
    ([sliderValue]: number[]) => {
      onChangeChecked(sliderValue);
    },
    [onChangeChecked]
  );

  const sliderRef = useRef<HTMLSpanElement>(null);
  const sliderCommitHandler = useCallback(() => {
    sliderRef?.current?.blur();
  }, [sliderRef]);

  return (
    <section className="items-left mx-2 block rounded bg-gray-600 py-1 px-2">
      <div className="flex w-48 items-center rounded bg-gray-700 px-2.5">
        <label htmlFor={title} className="shrink-0">
          {title}
        </label>
        <input
          id={title}
          className={classNames(
            "block w-full appearance-none rounded-lg bg-transparent py-1 px-2.5 text-sm",
            "focus:outline-none focus:ring-0"
          )}
          placeholder=" "
          type="number"
          pattern="[0-9]*"
          inputMode="numeric"
          value={String(value)}
          onChange={inputChangeHandler}
          onBlur={onBlur}
        />
      </div>
      <Slider.Root
        className="relative inline flex h-5 w-full items-center"
        min={min}
        max={max}
        step={1}
        name={title}
        value={values}
        onBlur={onBlur}
        onValueChange={sliderChangeHandler}
        onValueCommit={sliderCommitHandler}
        aria-label={title}
      >
        <Slider.Track className="relative h-1 w-full grow rounded-full bg-white">
          <Slider.Range className="absolute h-full rounded-full dark:bg-white" />
        </Slider.Track>
        <Slider.Thumb
          ref={sliderRef}
          className="block h-3 w-3 rounded-full bg-white"
        />
      </Slider.Root>
    </section>
  );
}
