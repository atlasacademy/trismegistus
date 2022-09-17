import { useCraftEssenceQuery } from "@/api";
import { useSelector } from "@/store";
import { createPartyCraftEssenceIdSelector } from "@/store/partySlice";
import { PartyMemberSlot } from "@/types";

export function usePartyCraftEssence(slot: PartyMemberSlot) {
  const craftEssenceId = useSelector(createPartyCraftEssenceIdSelector(slot));
  const { data: craftEssence } = useCraftEssenceQuery(craftEssenceId);
  return craftEssence;
}
