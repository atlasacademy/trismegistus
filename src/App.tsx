import { IconBook } from "@tabler/icons";

import { PartyView } from "./component/PartyView";

export function App() {
  return (
    <div className="container m-auto text-center text-gray-800">
      <IconBook />
      Trismegistus
      <section>
        <PartyView />
      </section>
    </div>
  );
}
