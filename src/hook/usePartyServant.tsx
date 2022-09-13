import { useServantQuery } from "@/api";
import { useSelector } from "@/store";
import { createPartyServantIdSelector } from "@/store/partySlice";
import { PartySlot } from "@/types";

export function usePartyServant(slot: PartySlot) {
  const servantId = useSelector(createPartyServantIdSelector(slot));
  const { data: servant } = useServantQuery(servantId);
  return servant;
}
