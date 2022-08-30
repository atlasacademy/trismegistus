import { Servant } from "@atlasacademy/api-connector";

import { AttributeLabel } from "./AttributeLabel";
import { SkillBar } from "./SkillBar";

export interface ServantThumbnailProps {
  mini?: boolean;
  servant: Servant.Servant;
}

export function ServantThumbnail({
  mini,
  servant: { name, lvMax: level, skills, atkGrowth, extraAssets },
}: ServantThumbnailProps) {
  if (mini)
    return (
      <div>
        <img
          src={extraAssets?.faces?.ascension?.[1] ?? ""}
          alt={name}
          className="size-mini mx-2 border text-gray-300"
        />
      </div>
    );
  return (
    <div className="mx-2 inline-block flex-col items-center border px-2">
      <div className="text-lg">{name}</div>
      <img
        src={extraAssets?.status?.ascension?.[1] ?? ""}
        alt={name}
        className="size-normal flex items-center justify-center border text-gray-300"
      />
      <div className="size-normal-overlay flex items-end justify-between px-2">
        <AttributeLabel name="Lv" value={level} />
        <AttributeLabel name="NP" value={1} />
      </div>
      <SkillBar skills={skills} />
      <div className="flex">
        <AttributeLabel name="ATK" value={atkGrowth[level]} />
        <AttributeLabel name="Fou" value={1000} />
      </div>
    </div>
  );
}
