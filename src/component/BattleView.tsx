import { PartyView } from "@/component/PartyView";

import { ActionPlayer } from "./ActionPlayer";

export function BattleView() {
  return (
    <section className="flex">
      <PartyView />
      <ActionPlayer />
    </section>
  );
}
