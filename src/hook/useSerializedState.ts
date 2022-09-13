import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { listeners, useDispatch } from "@/store";
import { resetParty, selectParty, setParty } from "@/store/partySlice";
import { setupSerializerListener } from "@/store/setupSerializerListener";
import { Party } from "@/types";
import { deserializeState } from "@/util/deserialize";
import { serializeState } from "@/util/serialize";

const SEARCH_PARAM = "o";

export function useSerializedState() {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const serializedState = searchParams.get(SEARCH_PARAM) ?? "";
  useEffect(() => {
    const state = deserializeState<Party>(serializedState);
    if (state != null) {
      dispatch(setParty(state));
    } else {
      setSearchParams("");
      dispatch(resetParty());
    }
  }, [serializedState]);
  useEffect(() => {
    return setupSerializerListener({
      selector: selectParty,
      serializer: serializeState,
      listeners: listeners,
      onComplete(state) {
        setSearchParams(`?${SEARCH_PARAM}=${state}`);
      },
    });
  });
}
