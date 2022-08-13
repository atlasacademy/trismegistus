import { Servant } from "@/types";

import { SkillButton } from "./SkillButton";

export interface ServantThumbnailProps {
  mini?: boolean;
  servant: Servant;
}

export function ServantThumbnail({
  servant: { name, skills },
}: ServantThumbnailProps) {
  return (
    <div className="m-2 flex flex-col items-center border">
      <div className="m-2 flex h-60 w-60 items-center justify-center border text-gray-300">
        picture
      </div>
      <div className="flex">
        {skills.map((skill, index) => (
          <SkillButton key={index} skill={skill} />
        ))}
      </div>
      <div className="flex">
        <div>Lv:</div>
        <div>NP:</div>
        <div>Fou:</div>
      </div>
      <div>{name}</div>
    </div>
  );
}
