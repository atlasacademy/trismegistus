import { SubMemberView } from "@/component/SubMemberView";

import { MemberView } from "./MemberView";
import { MysticCodeView } from "./MysticCodeView";

export function PartyView() {
  return (
    <section className="flex grow-0 rounded-sm border bg-white p-4 shadow-md">
      <div className="flex flex-col items-end">
        <div className="flex">
          <MemberView slot={0} />
          <MemberView slot={1} />
          <MemberView slot={2} />
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
