import { EntityState } from "@reduxjs/toolkit";

import { base64ToBytes } from "@/helpers/base64";
import { getTeamsInitialState } from "@/store/slice/teamSlice";
import { deserializeProtoState } from "@/types/proto/deserializeProtoState";
import { ProtoTrismegistusState } from "@/types/proto/trismegistus";
import { InputTeam } from "@/types/userTeam";

export function deserializeProto(
  rawState: string | null
): EntityState<InputTeam> {
  if (rawState == null) return getTeamsInitialState();
  try {
    const bytes = base64ToBytes(rawState);
    const proto = ProtoTrismegistusState.decode(bytes);
    return deserializeProtoState(proto);
  } catch (e) {
    return getTeamsInitialState();
  }
}
