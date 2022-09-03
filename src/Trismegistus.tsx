import { IconBook } from "@tabler/icons";
import { Route, Routes } from "react-router";

import { PartyView } from "./component/PartyView";
import { useSerializedState } from "./hook/useSerializedState";

export function Trismegistus() {
  useSerializedState();
  return (
    <div className="container m-auto text-center text-gray-800">
      <IconBook />
      Trismegistus
      <Routes>
        <Route path="/*">
          <Route index element={<PartyView />} />
        </Route>
      </Routes>
    </div>
  );
}
