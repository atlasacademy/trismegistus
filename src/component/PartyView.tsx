import { SubMemberView } from "@/component/SubMemberView";

import { MysticCodeView } from "./MysticCodeView";
import { ServantView } from "./ServantView";

export function PartyView() {
  return (
    <section className="flex grow-0 rounded-sm border p-4 shadow-md">
      <div className="flex flex-col items-end">
        <div className="flex">
          <ServantView slot={0} />
          <ServantView slot={1} />
          <ServantView slot={2} />
        </div>
        <div className="flex w-full justify-between">
          <MysticCodeView />
          <div className="flex">
            <SubMemberView slot={3} />
            <SubMemberView slot={4} />
            <SubMemberView slot={5} />
          </div>
        </div>
      </div>
    </section>
  );
}
