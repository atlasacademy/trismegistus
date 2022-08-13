import { Servant } from "@/types";

import { AttributeLabel } from "./AttributeLabel";
import { ServantPortrait } from "./ServantPortrait";
import { SkillButton } from "./SkillButton";

export interface ServantThumbnailProps extends Servant {
  mini?: boolean;
}

export function ServantThumbnail({
  mini,
  info: { name, skills, portraitUrl },
  level,
  attack,
  attackFou,
  noblePhantasmLevel,
}: ServantThumbnailProps) {
  if (mini)
    return (
      <div>
        <ServantPortrait mini={mini} url={portraitUrl} />
      </div>
    );
  return (
    <div className="mx-2 flex flex-col items-center border">
      <div className="text-lg">{name}</div>
      <ServantPortrait url={portraitUrl}>
        <AttributeLabel name="Lv" value={level} />
        <AttributeLabel name="NP" value={noblePhantasmLevel} />
      </ServantPortrait>
      <div className="flex">
        {skills.map((skill, index) => (
          <SkillButton key={index} skill={skill} />
        ))}
      </div>
      <div className="flex">
        <AttributeLabel name="ATK" value={attack} />
        <AttributeLabel name="Fou" value={attackFou} />
      </div>
    </div>
  );
}
