import { useMysticCodeQuery } from "@/api";
import { useSelector } from "@/store";
import { selectPartyMysticCodeId } from "@/store/partySlice";

export function usePartyMysticCode() {
  const mysticCodeId = useSelector(selectPartyMysticCodeId);
  const { data: mysticCode } = useMysticCodeQuery(mysticCodeId);
  return mysticCode;
}
