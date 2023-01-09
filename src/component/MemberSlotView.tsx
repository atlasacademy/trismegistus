import background from "@assets/background.png";
import { Servant } from "@atlasacademy/api-connector";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import {
  IconChevronDown,
  IconPlus,
  IconReplace,
  IconTrash,
} from "@tabler/icons";
import { useCallback } from "react";

import { useServantQuery } from "@/api";
import { CommandEditor } from "@/component/CommandEditor";
import { CraftEssenceSlotView } from "@/component/CraftEssenceView";
import { ServantSelection } from "@/component/selection/ServantSelection";
import { ServantPortrait } from "@/component/ServantPortrait";
import { Spinner } from "@/component/Spinner";
import { AttackStatDisplay } from "@/component/stat/AttackStatDisplay";
import { StatsForm as ServantStatsForm } from "@/component/StatsForm";
import { StatTable } from "@/component/StatTable";
import { useTeamContext } from "@/hook/useTeamContext";
import { useDispatch, useMemoSelector } from "@/store";
import { selectTeamServantWithDefaults } from "@/store/entity/servant";
import {
  removeMemberSlot,
  setServant,
  updateServant,
} from "@/store/slice/teamSlice";
import { TeamViewMode, UserServant } from "@/types";
import { createUserServant } from "@/types/utils";

interface MemberViewProps {
  userServant: UserServant;
  servant: Servant.Servant;
}

function normalizeStats(userServant: UserServant): Record<string, number[]> {
  return {
    NP: [userServant.noblePhantasmLevel],
    Skills: [userServant.skill1, userServant.skill2, userServant.skill3],
    Appends: [userServant.append1, userServant.append2, userServant.append3],
  };
}

function MemberView({ userServant, servant }: MemberViewProps) {
  const { teamId, slot, mode } = useTeamContext();
  const dispatch = useDispatch();
  const handleClick = useCallback(() => {
    dispatch(removeMemberSlot({ teamId, entry: slot }));
  }, [teamId, slot, dispatch]);
  const handleSelection = useCallback(
    (selected: Servant.ServantBasic) => {
      dispatch(
        updateServant({ teamId, slot, entry: ["servantId", selected.id] })
      );
    },
    [teamId, slot, dispatch]
  );
  return (
    <AccordionItem value={`${slot}`} className="w-full">
      <section className="flex h-36 w-full">
        <ServantPortrait servant={servant} className="h-36 shrink-0">
          <section className="flex h-full flex-col items-end justify-between">
            <div className="bg-overlay w-14">Lv: {userServant.level}</div>
            <section className="w-full">
              <div className="bg-overlay px-1">
                <AttackStatDisplay userServant={userServant} />
              </div>
              <CraftEssenceSlotView />
            </section>
          </section>
        </ServantPortrait>
        <div className="flex h-full w-full flex-col items-end justify-between align-bottom">
          <div className="bg-overlay w-full font-bold">{servant.name}</div>
          {mode === TeamViewMode.EDIT ? (
            <div className="flex w-full items-center justify-between px-4">
              <button onClick={handleClick}>
                <IconTrash /> Remove
              </button>
              <ServantSelection onSelectServant={handleSelection}>
                <IconReplace /> Change
              </ServantSelection>
            </div>
          ) : undefined}
          {mode === TeamViewMode.SCRIPT ? (
            <CommandEditor className="w-full" servant={servant} />
          ) : undefined}
          {mode !== TeamViewMode.SCRIPT ? (
            <div className="bg-overlay w-full px-2 pb-1 text-center">
              <StatTable stats={normalizeStats(userServant)} />

              {mode === TeamViewMode.EDIT ? (
                <AccordionTrigger>
                  Edit Stats <IconChevronDown />
                </AccordionTrigger>
              ) : undefined}
            </div>
          ) : undefined}
        </div>
      </section>
      <AccordionContent>
        <ServantStatsForm />
      </AccordionContent>
    </AccordionItem>
  );
}

export function MemberSlotView() {
  const dispatch = useDispatch();
  const { teamId, slot, mode } = useTeamContext();
  const userServant = useMemoSelector(selectTeamServantWithDefaults, [
    teamId,
    slot,
  ]);
  const { servantId } = userServant;
  const { data: servant, isLoading } = useServantQuery(servantId);
  const addServant = useCallback(
    (selected: Servant.ServantBasic) => {
      const entry = createUserServant({ servantId: selected.id });
      dispatch(setServant({ teamId, slot, entry }));
    },
    [dispatch, teamId, slot]
  );

  return (
    <section className="flex w-96 flex-nowrap overflow-hidden rounded-3xl border bg-gray-700 text-sm text-white">
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
        ) : servant != null ? (
          <MemberView userServant={userServant} servant={servant} />
        ) : (
          <ServantSelection className="w-full" onSelectServant={addServant}>
            {mode === TeamViewMode.EDIT ? (
              <span className="mx-auto">
                Add Servant <IconPlus />
              </span>
            ) : undefined}
          </ServantSelection>
        )}
      </section>
    </section>
  );
}
