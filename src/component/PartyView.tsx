import produce from "immer";

import { Servant } from "@/types";

import { MysticCode } from "./MysticCode";
import { ServantThumbnail } from "./ServantThumbnail";

const BaseMockServant: Servant = {
  info: {
    name: "",
    skills: [{ name: "1" }, { name: "2" }, { name: "3" }],
    portraitUrl: "",
  },
  level: 90,
  noblePhantasmLevel: 5,
  attack: 10000,
  attackFou: 1000,
};
export function PartyView() {
  return (
    <section className="flex">
      <div className="flex flex-col items-end">
        <div className="flex">
          <ServantThumbnail
            {...produce(BaseMockServant, (draft) => {
              draft.info.name = "Lancelot";
            })}
          />
          <ServantThumbnail
            {...produce(BaseMockServant, (draft) => {
              draft.info.name = "Nero Bride";
            })}
          />
          <ServantThumbnail
            {...produce(BaseMockServant, (draft) => {
              draft.info.name = "Skadi";
            })}
          />
        </div>
        <div className="flex w-full justify-between">
          <section className="border">
            <MysticCode
              name="Plugsuit"
              icon=""
              skills={[{ name: "1" }, { name: "2" }, { name: "3" }]}
            />
          </section>
          <div className="flex">
            <ServantThumbnail
              mini
              {...produce(BaseMockServant, (draft) => {
                draft.info.name = "Skadi";
              })}
            />
            <ServantThumbnail
              mini
              {...produce(BaseMockServant, (draft) => {
                draft.info.name = "Arash";
              })}
            />
            <ServantThumbnail
              mini
              {...produce(BaseMockServant, (draft) => {
                draft.info.name = "Gong";
              })}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
