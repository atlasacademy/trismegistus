import { z } from "zod";

import { BitBuffer } from "../bit-buffer";
import { BitBufferReader } from "../bit-buffer-reader";
import { BitSchema } from "./bit-schema";

export class BitBoolean extends BitSchema {
  private static readonly BASE_SCHEMA = z.boolean();
  constructor() {
    super();
  }

  read(reader: BitBufferReader): boolean {
    const { bitBuffer, offset } = reader;
    const value = bitBuffer.getUnsignedInt(1, offset);
    reader.offset += 1;
    return value === 1;
  }

  write(bitBuffer: BitBuffer, data: unknown): void {
    const parse = BitBoolean.BASE_SCHEMA.safeParse(data);
    const value = parse.success && parse.data ? 1 : 0;
    bitBuffer.addUnsignedInt(value, 1);
  }
}
