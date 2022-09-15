import { ActionIcon } from "@/component/ActionIcon";
import { useSelector } from "@/store";
import { selectParty } from "@/store/partySlice";

export function ActionPlayer() {
  const { actions } = useSelector(selectParty);
  return (
    <section className="flex w-[40em] flex-none items-center overflow-x-scroll rounded-sm border p-4 shadow-md">
      {actions.map((action, index) => {
        return <ActionIcon key={index} action={action} />;
      })}
    </section>
  );
}
