import background from "@assets/background.png";

import { useMysticCodeQuery } from "@/api";
import { MysticCodeSelection } from "@/component/selection/MysticCodeSelection";
import { Spinner } from "@/component/Spinner";
import { useTeamContext } from "@/hook/useTeamContext";
import { useMemoSelector } from "@/store";
import { selectTeamMysticCode } from "@/store/slice/teamSlice";
import { TeamViewMode } from "@/types";

export function MysticCodeView() {
  const { teamId, mode } = useTeamContext();
  const userMysticCode = useMemoSelector(selectTeamMysticCode, [teamId]);
  const { mysticCodeId } = userMysticCode;
  const { data: mysticCode, isLoading } = useMysticCodeQuery(mysticCodeId);

  return (
    <section className="flex h-16 w-96 flex-nowrap overflow-hidden rounded-2xl border bg-gray-700 text-sm text-white">
      <img
        src={background}
        alt="Background"
        className="box-border h-36 w-full flex-none object-cover"
      />
      <section className="-ml-full flex w-full">
        {isLoading ? (
          <span className="flex h-full w-full items-center justify-center align-middle">
            <Spinner />
          </span>
        ) : mysticCode != null ? (
          <>
            <img
              src={mysticCode.extraAssets.item.male}
              alt={mysticCode.name}
              className="h-full"
            />
            <div className="flex h-full w-full items-end justify-end">
              <div className="bg-overlay mr-5 text-white">
                {"Lv: " + userMysticCode.mysticCodeLevel}
              </div>
            </div>
          </>
        ) : (
          <MysticCodeSelection className="h-full w-full">
            {mode === TeamViewMode.EDIT ? (
              <span className="mx-auto">Add Mystic Code</span>
            ) : undefined}
          </MysticCodeSelection>
        )}
      </section>
    </section>
  );
}
