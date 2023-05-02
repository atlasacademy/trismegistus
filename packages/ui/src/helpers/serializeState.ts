import { bytesToBase64 } from "@/helpers/base64";
import { TrismegistusBinaryState } from "@/helpers/binaryState";
import { BitBuffer } from "@/serialization/bitBuffer";
import { InputTeam } from "@/types/userTeam";

export function serializeState(userTeams: InputTeam[]): string {
  const bitBuffer = new BitBuffer(16);
  TrismegistusBinaryState.write(bitBuffer, userTeams);
  return bytesToBase64(new Uint8Array(bitBuffer.buffer()));
}
