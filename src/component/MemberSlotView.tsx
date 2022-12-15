import background from "@assets/background.png";
import unknownFigure from "@assets/unknown-narrowfigure.png";
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
import { CraftEssenceSlotView } from "@/component/CraftEssenceView";
import { ServantSelection } from "@/component/selection/ServantSelection";
import { Spinner } from "@/component/Spinner";
import { AttackStatDisplay } from "@/component/stat/AttackStatDisplay";
import { StatsForm } from "@/component/StatsForm";
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

function ServantPortrait({ userServant, servant }: MemberViewProps) {
  return (
    <div className="relative h-36 shrink-0">
      <img
        src={servant.extraAssets.faces.ascension?.[1] ?? unknownFigure}
        alt={servant.name}
        className="object-cover"
      />

      <div className="bg-overlay absolute right-0 top-0 px-1">
        Lv: {userServant.level}
      </div>

      <div className="absolute bottom-0 w-full">
        <div className="bg-overlay px-1">
          <AttackStatDisplay userServant={userServant} />
        </div>
        <CraftEssenceSlotView />
      </div>
    </div>
  );
}

function NPStat({ noblePhantasmLevel }: { noblePhantasmLevel: number }) {
  return (
    <div className="flex justify-between">
      <div className="w-full">NP</div>
      <div className="w-full">{noblePhantasmLevel}</div>
    </div>
  );
}

function SkillBar({
  userServant: { skill1, skill2, skill3 },
}: {
  userServant: UserServant;
}) {
  return (
    <div className="flex justify-between">
      <div className="w-full">Skills</div>
      <div className="flex w-full">
        <div className="w-1/3">{skill1 || "-"}</div>
        <div className="w-1/3">{skill2 || "-"}</div>
        <div className="w-1/3">{skill3 || "-"}</div>
      </div>
    </div>
  );
}

function AppendBar({
  userServant: { append1, append2, append3 },
}: {
  userServant: UserServant;
}) {
  return (
    <div className="flex justify-between">
      <div className="w-full">Appends</div>
      <div className="flex w-full">
        <div className="w-1/3">{append1 || "-"}</div>
        <div className="w-1/3">{append2 || "-"}</div>
        <div className="w-1/3">{append3 || "-"}</div>
      </div>
    </div>
  );
}

function MemberView({ userServant, servant }: MemberViewProps) {
  const { teamId, slot, mode } = useTeamContext();
  const { noblePhantasmLevel } = userServant;
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
        <ServantPortrait servant={servant} userServant={userServant} />
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
          <div className="bg-overlay w-full px-2 pb-1 text-center">
            <NPStat noblePhantasmLevel={noblePhantasmLevel} />
            <SkillBar userServant={userServant} />
            <AppendBar userServant={userServant} />
            {mode === TeamViewMode.EDIT ? (
              <AccordionTrigger>
                Edit Stats <IconChevronDown />
              </AccordionTrigger>
            ) : undefined}
          </div>
        </div>
      </section>
      <AccordionContent>
        <StatsForm />
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
