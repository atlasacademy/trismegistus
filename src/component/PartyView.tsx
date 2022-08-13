import produce from "immer";

import { Servant } from "@/types";

import { ServantThumbnail } from "./ServantThumbnail";

const BaseMockServant: Servant = {
  name: "",
  skills: [{ name: "1" }, { name: "2" }, { name: "3" }],
};
export function PartyView() {
  return (
    <section>
      Party
      <section className="flex border">
        <ServantThumbnail
          servant={produce(BaseMockServant, (draft) => {
            draft.name = "Lancelot";
          })}
        />
        <ServantThumbnail
          servant={produce(BaseMockServant, (draft) => {
            draft.name = "Nero Bride";
          })}
        />
        <ServantThumbnail
          servant={produce(BaseMockServant, (draft) => {
            draft.name = "Skadi";
          })}
        />
      </section>
      <section>
        <ServantThumbnail
          mini
          servant={produce(BaseMockServant, (draft) => {
            draft.name = "Skadi";
          })}
        />
      </section>
    </section>
  );
}
