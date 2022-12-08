import background from "@assets/background.png";
import unknownFigure from "@assets/unknown-narrowfigure.png";
import { Servant } from "@atlasacademy/api-connector";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@radix-ui/react-accordion";
import { IconChevronDown, IconPlus } from "@tabler/icons";

import { useServantQuery } from "@/api";
import { CraftEssenceSlotView } from "@/component/CraftEssenceView";
import { SliderInput } from "@/component/primitives/SliderInput";
import { ServantSelection } from "@/component/selection/ServantSelection";
import { Spinner } from "@/component/Spinner";
import { AttackStatDisplay } from "@/component/stat/AttackStatDisplay";
import { useTeamContext } from "@/hook/useTeamContext";
import { useMemoSelector } from "@/store";
import { selectTeamServantWithDefaults } from "@/store/entity/servant";
import { TeamViewMode, UserServant } from "@/types";

interface MemberViewProps {
  userServant: UserServant;
  servant: Servant.Servant;
}

function StatsForm() {
  return (
    <form>
      <SliderInput label={"Level"} />
      <SliderInput label={"Fou "} />
      <SliderInput label={"NP "} />
      <SliderInput label={"Skill 1"} />
      <SliderInput label={"Skill 2"} />
      <SliderInput label={"Skill 3"} />
      <SliderInput label={"Append 1"} />
      <SliderInput label={"Append 2"} />
      <SliderInput label={"Append 3"} />
      <SliderInput label={"Craft Essence Level"} />
    </form>
  );
}

function MemberView({ userServant, servant }: MemberViewProps) {
  const { slot, level, noblePhantasmLevel, skills, appends } = userServant;
  return (
    <AccordionItem value={`${slot}`} className="w-full">
      <section className="flex h-36 w-full">
        <div className="relative h-36 shrink-0">
          <img
            src={servant.extraAssets.faces.ascension?.[1] ?? unknownFigure}
            alt={servant.name}
            className="object-cover"
          />

          <div className="bg-overlay absolute right-0 top-0 px-1">
            Lv: {level}
          </div>

          <div className="absolute bottom-0 w-full">
            <div className="bg-overlay px-1">
              <AttackStatDisplay userServant={userServant} />
            </div>
            <CraftEssenceSlotView />
          </div>
        </div>
        <div className="flex h-full w-full flex-col items-end justify-between align-bottom">
          <div className="bg-overlay w-full font-bold">{servant.name}</div>
          <div className="bg-overlay w-full px-2 pb-1 text-center">
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
            <AccordionTrigger>
              Edit Stats <IconChevronDown />
            </AccordionTrigger>
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
  const { teamId, slot, mode } = useTeamContext();
  const userServant = useMemoSelector(selectTeamServantWithDefaults, [
    teamId,
    slot,
  ]);
  const { servantId } = userServant;
  const { data: servant, isLoading } = useServantQuery(servantId);
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
          <ServantSelection className="w-full">
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
