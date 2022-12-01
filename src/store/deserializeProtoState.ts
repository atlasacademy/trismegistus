import { EntityState } from "@reduxjs/toolkit";

import { getTeamsInitialState } from "@/store/slice/teamSlice";
import { UserTeam } from "@/types";
import { protoToState } from "@/types/proto";
import { ProtoTrismegistusState } from "@/types/proto/trismegistus";
import { base64ToBytes } from "@/util/base64";

export function deserializeProtoState(
  rawState: string | null
): EntityState<UserTeam> {
  if (rawState == null) return getTeamsInitialState();
  try {
    const bytes = base64ToBytes(rawState);
    const proto = ProtoTrismegistusState.decode(bytes);
    return protoToState(proto);
  } catch (e) {
    return getTeamsInitialState();
  }
}
