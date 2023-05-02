import { z } from "zod";

import { BinarySchema } from "@/serialization/binaryTypes/binarySchema";
import { BinaryReadContext } from "@/serialization/binaryTypes/context";
import { BitBuffer } from "@/serialization/bitBuffer";

export class BinaryBoolean extends BinarySchema {
  private static readonly BASE_SCHEMA = z.boolean();
  constructor() {
    super();
  }

  read(bitBuffer: BitBuffer, context: BinaryReadContext): boolean {
    const value = bitBuffer.getUnsignedInt(1, context.offset);
    context.offset += 1;
    return value === 1;
  }

  write(bitBuffer: BitBuffer, data: unknown): void {
    const parse = BinaryBoolean.BASE_SCHEMA.safeParse(data);
    const value = parse.success && parse.data ? 1 : 0;
    bitBuffer.addUnsignedInt(value, 1);
  }
}
