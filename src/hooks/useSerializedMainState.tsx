import { bytesToBase64 } from "@/helpers/base64";
import { useSerializedState } from "@/hooks/useSerializedState";
import { serializeState } from "@/types/proto/serializeState";
import { ProtoTrismegistusState } from "@/types/proto/trismegistus";

function teamCompsSerializer(state: ProtoTrismegistusState): string {
  try {
    const bytes = ProtoTrismegistusState.encode(state).finish();
    return bytesToBase64(bytes);
  } catch (e) {
    return "";
  }
}

export function useSerializedMainState() {
  useSerializedState({
    searchParam: "o",
    predicate(_, currentState, previousState) {
      return currentState.teams !== previousState.teams;
    },
    selector: serializeState,
    serializer: teamCompsSerializer,
  });
}
