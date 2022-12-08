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
    <section className="h-96 w-36 grow-0 overflow-hidden rounded-3xl text-white">
      {isLoading ? (
        <span className="flex h-full w-full items-center justify-center align-middle">
          <Spinner />
        </span>
      ) : mysticCode != null ? (
        <>
          <img
            src={mysticCode.extraAssets.masterFigure.male}
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
  );
}
