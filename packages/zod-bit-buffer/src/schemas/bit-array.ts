import { z } from "zod";

import { BitBuffer } from "../bit-buffer";
import { BitBufferReader } from "../bit-buffer-reader";
import { BitSchema } from "./bit-schema";

export class BitArray extends BitSchema {
  private static readonly BASE_SCHEMA = z.array(z.any()).min(1);

  readonly elementType: BitSchema;
  readonly maxLength: number;
  private readonly headerBitLength: number;
  constructor(elementType: BitSchema, maxLength: number) {
    super();
    this.elementType = elementType;
    this.maxLength = maxLength;
    this.headerBitLength = BitArray.getBitLength(0, maxLength);
  }

  read(reader: BitBufferReader): Array<any> {
    const { bitBuffer, offset } = reader;
    const result: any[] = [];
    const dataLength = bitBuffer.getUnsignedInt(this.headerBitLength, offset);
    reader.offset += this.headerBitLength;
    for (let i = 0; i < dataLength; i++) {
      result.push(this.elementType.read(reader));
    }
    return result;
  }

  write(bitBuffer: BitBuffer, data: unknown): void {
    const parse = BitArray.BASE_SCHEMA.safeParse(data);
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
