import { z } from "zod";

import { BinarySchema } from "@/serialization/binaryTypes/binarySchema";
import { BinaryReadContext } from "@/serialization/binaryTypes/context";
import { BitBuffer } from "@/serialization/bitBuffer";

export class BinaryObject extends BinarySchema {
  private static readonly BASE_SCHEMA = z.record(z.any());
  readonly fields: [string, BinarySchema][];
  private readonly headerBitLength: number;

  constructor(fields: [string, BinarySchema][]) {
    super();
    this.fields = fields;
    this.headerBitLength = fields.length;
  }

  read(bitBuffer: BitBuffer, context: BinaryReadContext): Record<string, any> {
    const record: Record<string, any> = {};
    const flags = bitBuffer.getUnsignedInt(
      this.headerBitLength,
      context.offset
    );
    context.offset += this.headerBitLength;
    const presentFields = BinarySchema.bitsToBoolean(
      flags,
      this.headerBitLength
    );
    for (let i = 0; i < presentFields.length; i++) {
      const fieldPresent = presentFields[i];
      if (fieldPresent) {
        const [field, type] = this.fields[i];
        record[field] = type.read(bitBuffer, context);
      }
    }
    return record;
  }

  write(bitBuffer: BitBuffer, data: unknown): void {
    const parse = BinaryObject.BASE_SCHEMA.safeParse(data);
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
    const value = BinarySchema.booleanToBits(presentFields);
    bitBuffer.addUnsignedInt(value, this.headerBitLength);

    for (let i = 0; i < this.fields.length; i++) {
      const [field, type] = this.fields[i];
      const fieldData = checkedData[field];
      if (presentFields[i]) type.write(bitBuffer, fieldData);
    }
  }
}
