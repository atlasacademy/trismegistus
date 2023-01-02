import artsMiniCard from "@assets/icon_commandcard_arts.png";
import busterMiniCard from "@assets/icon_commandcard_buster.png";
import quickMiniCard from "@assets/icon_commandcard_quick.png";
import noblePhantasmIcon from "@assets/img_notice_np.png";
import { Card, Servant } from "@atlasacademy/api-connector";
import classNames from "classnames";
import { useCallback } from "react";

import { SkillButton } from "@/component/SkillButton";
import { useTeamContext } from "@/hook/useTeamContext";
import { useDispatch } from "@/store";
import { addBattleCommand } from "@/store/slice/teamSlice";
import { BattleCommandType, CommandType } from "@/types/proto/trismegistus";

interface CardIconProps {
  card: Card;
}

function getCardImage(card: Card) {
  switch (card) {
    case Card.ARTS:
      return artsMiniCard;
    case Card.BUSTER:
      return busterMiniCard;
    case Card.QUICK:
      return quickMiniCard;
  }
}

function CardIcon({ card }: CardIconProps) {
  const cardImage = getCardImage(card);
  return <img className="w-5" src={cardImage} alt={card} />;
}

export interface CommandPortraitProps {
  servant: Servant.Servant;
  className?: string;
}

function CardBar({ servant }: CommandPortraitProps) {
  return (
    <>
      {servant.cards.map((card, index) => (
        <CardIcon key={index} card={card} />
      ))}
    </>
  );
}

function useNoblePhantasmActivation() {
  const { teamId, slot: source } = useTeamContext();
  const dispatch = useDispatch();
  return useCallback(() => {
    dispatch(
      addBattleCommand({
        teamId,
        entry: { type: BattleCommandType.NOBLE_PHANTASM, source },
      })
    );
  }, [dispatch, teamId, source]);
}

export function CommandEditor({ servant, className }: CommandPortraitProps) {
  const handleNoblePhantasm = useNoblePhantasmActivation();
  return (
    <section
      className={classNames(
        className,
        "flex h-full flex-col items-center justify-between space-y-1"
      )}
    >
      <div className="mt-4 flex">
        <button onClick={handleNoblePhantasm}>
          <img className="h-8" src={noblePhantasmIcon} alt="NoblePhantasm" />
        </button>
      </div>
      <div className="bg-overlay w-full pt-1">
        <SkillButton skillNum={CommandType.SKILL_1} servant={servant} />
        <SkillButton skillNum={CommandType.SKILL_2} servant={servant} />
        <SkillButton skillNum={CommandType.SKILL_3} servant={servant} />
      </div>
    </section>
  );
}