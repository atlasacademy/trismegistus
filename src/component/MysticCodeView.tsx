import background from "@assets/background.png";

import { useMysticCodeQuery } from "@/api";
import { MysticCodeStatsForm } from "@/component/form/MysticCodeStatsForm";
import { MysticCodeSelection } from "@/component/selection/MysticCodeSelection";
import { SkillButton } from "@/component/SkillButton";
import { Spinner } from "@/component/Spinner";
import { useFactorySelector } from "@/hooks/useFactorySelector";
import { useTeamContext } from "@/hooks/useTeamContext";
import { createTeamMysticCodeSelector } from "@/store/selectors/mysticCode";
import { TeamViewMode } from "@/types";
import { CommandType } from "@/types/proto/trismegistus";

export function MysticCodeView() {
  const { teamId, mode } = useTeamContext();
  const userMysticCode = useFactorySelector(
    createTeamMysticCodeSelector,
    [true],
    teamId
  );
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
              {mode === TeamViewMode.EDIT ? (
                <MysticCodeStatsForm />
              ) : (
                <>
                  {mode === TeamViewMode.SCRIPT ? (
                    <div className="bg-overlay w-full pt-1">
                      <SkillButton
                        skillNum={CommandType.SKILL_1}
                        entity={mysticCode}
                      />
                      <SkillButton
                        skillNum={CommandType.SKILL_2}
                        entity={mysticCode}
                      />
                      <SkillButton
                        skillNum={CommandType.SKILL_3}
                        entity={mysticCode}
                      />
                    </div>
                  ) : undefined}
                  <div className="bg-overlay mr-5 w-12 text-white">
                    {"Lv: " + userMysticCode.mysticCodeLevel}
                  </div>
                </>
              )}
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
