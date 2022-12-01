import { IconBook, IconPlus } from "@tabler/icons";
import { useCallback } from "react";

import { TeamView } from "@/component/TeamView";
import { useSerializedMainState } from "@/hook/useSerializedMainState";
import { useDispatch, useSelector } from "@/store";
import { newTeam, selectTeamIds } from "@/store/slice/teamSlice";

export function Trismegistus() {
  useSerializedMainState();
  const dispatch = useDispatch();
  const handleAdd = useCallback(() => dispatch(newTeam()), [dispatch]);
  const teamIds = useSelector(selectTeamIds);
  return (
    <div className="container m-auto text-center text-gray-800">
      <IconBook />
      {/* eslint-disable-next-line no-undef */}
      Trismegistus v{TRISMEGISTUS_VERSION}
      <section className="grow-0 overflow-x-scroll rounded-xl border bg-white p-2 shadow-md">
        {teamIds.map((teamId) => (
          <TeamView key={teamId} teamId={teamId} />
        ))}
        <button className="w-64" onClick={handleAdd}>
          <IconPlus />
        </button>
      </section>
    </div>
  );
}
