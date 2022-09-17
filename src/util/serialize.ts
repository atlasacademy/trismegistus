import { encode } from "@msgpack/msgpack";

import { bytesToBase64 } from "./base64";

export function serializeState<T>(state: T) {
  const msgpack = encode(state);
  return bytesToBase64(msgpack);
}
