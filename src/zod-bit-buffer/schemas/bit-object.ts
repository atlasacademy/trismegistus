import { z } from "zod";

import { BitBuffer } from "../bit-buffer";
import { BitBufferReader } from "../bit-buffer-reader";
import { BitSchema } from "./bit-schema";

export class BitObject extends BitSchema {
  private static readonly BASE_SCHEMA = z.record(z.any());
  readonly fields: [string, BitSchema][];
  private readonly headerBitLength: number;

  constructor(fields: [string, BitSchema][]) {
    super();
    this.fields = fields;
    this.headerBitLength = fields.length;
  }

  read(reader: BitBufferReader): Record<string, any> {
    const { bitBuffer, offset } = reader;
    const record: Record<string, any> = {};
    const flags = bitBuffer.getUnsignedInt(this.headerBitLength, offset);
    reader.offset += this.headerBitLength;
    const presentFields = BitSchema.bitsToBoolean(flags, this.headerBitLength);
    for (let i = 0; i < presentFields.length; i++) {
      const fieldPresent = presentFields[i];
      if (fieldPresent) {
        const [field, type] = this.fields[i];
        record[field] = type.read(reader);
      }
    }
    return record;
  }

  write(bitBuffer: BitBuffer, data: unknown): void {
    const parse = BitObject.BASE_SCHEMA.safeParse(data);
    if (!parse.success) {
      bitBuffer.addUnsignedInt(0, this.fields.length);
      return;
    }
    const { data: checkedData } = parse;
    const presentFields: boolean[] = [];

    for (let i = 0; i < this.fields.length; i++) {
      const [field] = this.fields[i];
      const fieldData = checkedData[field];
      presentFields.push(fieldData != null);
    }
    const value = BitSchema.booleanToBits(presentFields);
    bitBuffer.addUnsignedInt(value, this.headerBitLength);

    for (let i = 0; i < this.fields.length; i++) {
      const [field, type] = this.fields[i];
      const fieldData = checkedData[field];
      if (presentFields[i]) type.write(bitBuffer, fieldData);
    }
  }
}
