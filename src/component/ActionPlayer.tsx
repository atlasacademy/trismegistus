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
        {actions.map((action, index) => (
          <div key={index}>{JSON.stringify(action)}</div>
        ))}
      </div>
    </section>
  );
}
