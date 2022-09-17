import { useServantQuery } from "@/api";
import { useSelector } from "@/store";
import { createPartyServantIdSelector } from "@/store/partySlice";
import { PartyMemberSlot } from "@/types";

export function usePartyServant(slot: PartyMemberSlot) {
  const servantId = useSelector(createPartyServantIdSelector(slot));
  const { data: servant } = useServantQuery(servantId);
  return servant;
}
