import { z } from "zod";

import { BitBuffer } from "../bitBuffer";
import { BinarySchema } from "./binarySchema";
import { BinaryReadContext } from "./context";

export class BinaryInt extends BinarySchema {
  private static readonly BASE_SCHEMA = z.number().int();
  readonly start: number;
  readonly end: number;
  private readonly bitLength: number;

  constructor(start: number, end: number) {
    super();
    this.start = start;
    this.end = end;
    this.bitLength = BinaryInt.getBitLength(start, end);
  }

  read(bitBuffer: BitBuffer, context: BinaryReadContext): number {
    const value = bitBuffer.getUnsignedInt(this.bitLength, context.offset);
    context.offset += this.bitLength;
    return Math.min(value + this.start, this.end);
  }

  write(bitBuffer: BitBuffer, data: unknown): void {
    const parse = BinaryInt.BASE_SCHEMA.safeParse(data);
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
