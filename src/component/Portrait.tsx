import classNames from "classnames";
import { PropsWithChildren } from "react";

export interface PortraitProps extends PropsWithChildren {
  src: string;
  placeholderText: string;
  className?: string;
}

export const Portrait = ({
  src,
  placeholderText,
  className,
  children,
}: PortraitProps) => (
  <section className={classNames("relative", className)}>
    <img
      src={src}
      alt={placeholderText}
      className="h-full w-full object-cover object-[10%]"
    />
    <div className="absolute inset-0">{children}</div>
  </section>
);
