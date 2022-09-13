import { apiEndpoints } from "@/api/index";
import { TrismegistusState } from "@/store";
import {
  createPartyServantIdSelector,
  selectPartyMysticCodeId,
} from "@/store/partySlice";
import { PartySlot } from "@/types";

export function createPartyServantSelector(slot: PartySlot) {
  const servantIdSelector = createPartyServantIdSelector(slot);
  return (state: TrismegistusState) => {
    const servantId = servantIdSelector(state);
    const endpoint = apiEndpoints.servant.select(servantId)(state);
    return endpoint.data;
  };
}

export function selectPartyMysticCode(state: TrismegistusState) {
  const mysticCodeId = selectPartyMysticCodeId(state);
  return apiEndpoints.mysticCode.select(mysticCodeId)(state).data;
}
