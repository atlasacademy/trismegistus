import { serializeState } from "@/helpers/serializeState";
import { useSerializedState } from "@/hooks/useSerializedState";
import { selectTeams } from "@/store/slice/teamSlice";

export function useSerializedMainState() {
  useSerializedState({
    searchParam: "o",
    predicate(_, currentState, previousState) {
      return currentState.teams !== previousState.teams;
    },
    selector: selectTeams,
    serializer: serializeState,
  });
}
