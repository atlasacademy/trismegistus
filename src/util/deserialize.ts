import { decode } from "@msgpack/msgpack";

import { base64ToBytes } from "./base64";

export function deserializeState<T>(data: string) {
  try {
    const bytes = base64ToBytes(data);
    const state = decode(bytes);
    return state as T;
  } catch (error) {
    return null;
  }
}
