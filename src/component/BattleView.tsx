import { CalcView } from "@/component/CalcView";
import { PartyView } from "@/component/PartyView";

import { ActionPlayer } from "./ActionPlayer";

export function BattleView() {
  return (
    <section className="flex">
      <div>
        <PartyView />
        <ActionPlayer />
        <CalcView />
      </div>
    </section>
  );
}
