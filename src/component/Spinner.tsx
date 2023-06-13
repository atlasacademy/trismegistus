import { IconHexagon } from "@tabler/icons-react";
import classNames from "classnames";

export interface SpinnerProps {
  className?: string;
}

export function Spinner({ className }: SpinnerProps) {
  return (
    <IconHexagon
      className={classNames("animate-spin stroke-gray-800", className)}
    />
  );
}
