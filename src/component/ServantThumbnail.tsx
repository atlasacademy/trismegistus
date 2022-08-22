import { Servant } from "@atlasacademy/api-connector";

import { AttributeLabel } from "./AttributeLabel";
import { SkillBar } from "./SkillBar";

export interface ServantThumbnailProps {
  mini?: boolean;
  servant: Servant.Servant;
}

export function ServantThumbnail({
  mini,
  servant: { name, lvMax: level, skills, atkGrowth, ascensionImage },
}: ServantThumbnailProps) {
  if (mini)
    return (
      <div>
        <div className="size-mini mx-2 border text-gray-300" />
      </div>
    );
  return (
    <div className="mx-2 inline-block flex-col items-center border">
      <div className="text-lg">{name}</div>
      <div
        style={{ backgroundImage: `url(${ascensionImage[0]})` }}
        className="size-normal mx-2 flex items-end justify-between border text-gray-300"
      >
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
