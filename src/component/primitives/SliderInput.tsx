import * as Slider from "@radix-ui/react-slider";

export interface SliderInputProps {
  label: string;
}

export function SliderInput({ label }: SliderInputProps) {
  return (
    <label htmlFor={label}>
      {label}
      <Slider.Root
        className="relative flex h-5 items-center"
        defaultValue={[50]}
        max={100}
        step={1}
        name={label}
        aria-label={label}
      >
        <Slider.Track className="relative h-1 w-full grow rounded-full bg-white">
          <Slider.Range className="absolute h-full rounded-full dark:bg-white" />
        </Slider.Track>
        <Slider.Thumb className="block h-3 w-3 rounded-full bg-white" />
      </Slider.Root>
    </label>
  );
}
