import background from "@assets/background.png";

import { useMysticCodeQuery } from "@/api";
import { Portrait } from "@/component/Portrait";
import { MysticCodeSelection } from "@/component/selection/MysticCodeSelection";
import { Spinner } from "@/component/Spinner";
import { useTeamContext } from "@/hook/useTeamContext";
import { useSelector } from "@/store";
import { selectTeamMysticCode } from "@/store/slice/teamSlice";
import { TeamViewMode } from "@/types";

export function MysticCodeView() {
  const { teamId, mode } = useTeamContext();
  const userMysticCode = useSelector(selectTeamMysticCode(teamId));
  const { mysticCodeId } = userMysticCode;
  const { data: mysticCode, isLoading } = useMysticCodeQuery(mysticCodeId);

  return (
    <Portrait
      src={background}
      placeholderText={"Background"}
      className="h-96 w-36 grow-0 overflow-hidden rounded-3xl text-white"
    >
      {isLoading ? (
        <span className="flex h-full w-full items-center justify-center align-middle">
          <Spinner />
        </span>
      ) : mysticCode != null ? (
        <Portrait
          src={mysticCode.extraAssets.masterFigure.male}
          placeholderText={mysticCode.name}
          className="h-full"
        >
          <div className="flex h-full w-full items-end justify-end">
            <div className="bg-overlay mr-5 text-white">
              {"Lv: " + userMysticCode.mysticCodeLevel}
            </div>
          </div>
        </Portrait>
      ) : (
        <MysticCodeSelection className="h-full w-full">
          {mode === TeamViewMode.EDIT ? (
            <span className="mx-auto">Add Mystic Code</span>
          ) : undefined}
        </MysticCodeSelection>
      )}
    </Portrait>
  );
}
