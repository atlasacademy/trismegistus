import { ActionIcon } from "@/component/ActionIcon";
import { NPButton } from "@/component/NPButton";
import { useSelector } from "@/store";

export function ActionPlayer() {
  const actions = useSelector((state) => state.party.actions);
  return (
    <section className="mt-2 flex items-center rounded-sm border p-4 shadow-md">
      <div>
        Noble Phantasms
        <div>
          <NPButton slot={0} />
          <NPButton slot={1} />
          <NPButton slot={2} />
        </div>
      </div>
      <div>
        {actions.map((action, index) => {
          return <ActionIcon key={index} action={action} />;
        })}
      </div>
      <div>
        <button className="border">End Turn</button>
      </div>
    </section>
  );
}
