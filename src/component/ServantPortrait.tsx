import { PropsWithChildren } from "react";

export interface ServantPortraitProps extends PropsWithChildren {
  mini?: boolean;
  url: string;
}
export function ServantPortrait({ mini, url, children }: ServantPortraitProps) {
  if (mini) return <div className="mx-2 h-16 w-16 border text-gray-300" />;
  return (
    <div
      style={{ backgroundImage: `url(${url})` }}
      className="mx-2 flex h-52 w-52 items-end justify-between border text-gray-300"
    >
      {children}
    </div>
  );
}
