import { z } from "zod";

import { BitBuffer } from "../bit-buffer";
import { BitBufferReader } from "../bit-buffer-reader";
import { BitSchema } from "./bit-schema";

export class BitFixedInt extends BitSchema {
  private static readonly BASE_SCHEMA = z.number().int();
  readonly start: number;
  readonly end: number;
  private readonly bitLength: number;

  constructor(start: number, end: number) {
    super();
    this.start = start;
    this.end = end;
    this.bitLength = BitFixedInt.getBitLength(start, end);
  }

  read(reader: BitBufferReader): number {
    const { bitBuffer, offset } = reader;
    const value = bitBuffer.getUnsignedInt(this.bitLength, offset);
    reader.offset += this.bitLength;
    return Math.min(value + this.start, this.end);
  }

  write(bitBuffer: BitBuffer, data: unknown): void {
    const parse = BitFixedInt.BASE_SCHEMA.safeParse(data);
    if (!parse.success) {
      bitBuffer.addUnsignedInt(0, this.bitLength);
      return;
    }
    const { data: checkedData } = parse;
    const value =
      Math.min(Math.max(checkedData, this.start), this.end) - this.start;
    bitBuffer.addUnsignedInt(value, this.bitLength);
  }
}
