import { IconBook } from "@tabler/icons";
import { Route, Routes } from "react-router";

import { BattleView } from "@/component/BattleView";

import { useSerializedState } from "./hook/useSerializedState";

export function Trismegistus() {
  useSerializedState();
  return (
    <div className="container m-auto text-center text-gray-800">
      <IconBook />
      {/* eslint-disable-next-line no-undef */}
      Trismegistus v{TRISMEGISTUS_VERSION}
      <Routes>
        <Route path="/*">
          <Route index element={<BattleView />} />
        </Route>
      </Routes>
    </div>
  );
}
