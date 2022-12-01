import { useSerializedState } from "@/hook/useSerializedState";
import { stateToProto } from "@/types/proto";
import { ProtoTrismegistusState } from "@/types/proto/trismegistus";
import { bytesToBase64 } from "@/util/base64";

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
    selector: stateToProto,
    serializer: teamCompsSerializer,
  });
}
