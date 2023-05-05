import unknownFigure from "@assets/unknown-narrowfigure.png";
import { Servant } from "@atlasacademy/api-connector";
import classNames from "classnames";
import { PropsWithChildren } from "react";

export interface ServantPortraitProps extends PropsWithChildren {
  servant: Servant.Servant;
  className?: string;
}
export function ServantPortrait({
  servant,
  className,
  children,
}: ServantPortraitProps) {
  return (
    <div className={classNames("relative", className)}>
      <img
        src={servant.extraAssets.faces.ascension?.[1] ?? unknownFigure}
        alt={servant.name}
        className="object-cover"
      />

      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
