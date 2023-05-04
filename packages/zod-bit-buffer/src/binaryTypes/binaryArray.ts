import { z } from "zod";

import { BitBuffer } from "../bitBuffer";
import { BinarySchema } from "./binarySchema";
import { BinaryReadContext } from "./context";

export class BinaryArray extends BinarySchema {
  private static readonly BASE_SCHEMA = z.array(z.any()).min(1);

  readonly elementType: BinarySchema;
  readonly maxLength: number;
  private readonly headerBitLength: number;
  constructor(elementType: BinarySchema, maxLength: number) {
    super();
    this.elementType = elementType;
    this.maxLength = maxLength;
    this.headerBitLength = BinaryArray.getBitLength(0, maxLength);
  }

  read(bitBuffer: BitBuffer, context: BinaryReadContext): Array<any> {
    const result: any[] = [];
    const dataLength = bitBuffer.getUnsignedInt(
      this.headerBitLength,
      context.offset
    );
    context.offset += this.headerBitLength;
    for (let i = 0; i < dataLength; i++) {
      result.push(this.elementType.read(bitBuffer, context));
    }
    return result;
  }

  write(bitBuffer: BitBuffer, data: unknown): void {
    const parse = BinaryArray.BASE_SCHEMA.safeParse(data);
    if (!parse.success) {
      bitBuffer.addUnsignedInt(0, this.headerBitLength);
      return;
    }
    const { data: checkedData } = parse;
    const value = Math.min(checkedData.length, this.maxLength);
    bitBuffer.addUnsignedInt(value, this.headerBitLength);
    for (let i = 0; i < value; i++) {
      this.elementType.write(bitBuffer, checkedData[i]);
    }
  }
}
