import unknownFigure from "@assets/unknown-narrowfigure.png";
import { Servant } from "@atlasacademy/api-connector";
import { IconPlus } from "@tabler/icons";

import { useServantQuery } from "@/api";
import { CraftEssenceSlotView } from "@/component/CraftEssenceView";
import { Portrait } from "@/component/Portrait";
import { ServantSelection } from "@/component/selection/ServantSelection";
import { Spinner } from "@/component/Spinner";
import { AttackStatDisplay } from "@/component/stat/AttackStatDisplay";
import { useTeamContext } from "@/hook/useTeamContext";
import { selectTeamServantWithDefaults, useSelector } from "@/store";
import { TeamViewMode, UserServant } from "@/types";

interface MemberViewProps {
  userServant: UserServant;
  servant: Servant.Servant;
}

function MemberView({ userServant, servant }: MemberViewProps) {
  const { level, noblePhantasmLevel, skills, appends } = userServant;
  return (
    <Portrait
      src={servant.extraAssets.narrowFigure.ascension?.[1] ?? unknownFigure}
      placeholderText={servant.name}
    >
      <div className="flex h-full flex-col items-end justify-end align-bottom">
        <div className="w-full rounded-b-3xl text-sm text-white">
          <div className="flex justify-between whitespace-nowrap">
            <div className="bg-overlay rounded-tr px-1">Lv: {level}</div>
            <div className="bg-overlay rounded-tl px-1">
              <AttackStatDisplay userServant={userServant} />
            </div>
          </div>
          <CraftEssenceSlotView />
          <div className="bg-overlay w-full rounded-b-3xl px-2 pb-1 text-left">
            <div className="text-center">
              <div className="flex justify-between">
                <div className="w-full">NP</div>
                <div className="w-full">{noblePhantasmLevel}</div>
              </div>
              <div className="flex justify-between">
                <div className="w-full">Skills</div>
                <div className="flex w-full">
                  {skills.map((skill, index) => (
                    <div key={index} className="w-1/3">
                      {skill || "-"}
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex justify-between">
                <div className="w-full">Appends</div>
                <div className="flex w-full">
                  {appends.map((append, index) => (
                    <div key={index} className="w-1/3">
                      {append || "-"}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Portrait>
  );
}

export function MemberSlotView() {
  const { teamId, slot, mode } = useTeamContext();
  const userServant = useSelector(selectTeamServantWithDefaults(teamId, slot));
  const { servantId } = userServant;
  const { data: servant, isLoading } = useServantQuery(servantId);
  return (
    <section className="flex h-96 w-36 grow-0 overflow-hidden rounded-3xl border bg-gray-300 text-gray-700">
      {isLoading ? (
        <span className="flex h-full w-full items-center justify-center align-middle">
          <Spinner />
        </span>
      ) : servant != null ? (
        <MemberView userServant={userServant} servant={servant} />
      ) : (
        <ServantSelection className="w-full">
          {mode === TeamViewMode.EDIT ? (
            <span className="mx-auto">
              Add Servant <IconPlus />
            </span>
          ) : undefined}
        </ServantSelection>
      )}
    </section>
  );
}
