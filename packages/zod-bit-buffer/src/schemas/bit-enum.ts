import { EnumMapping } from "@trismegistus/commons";
import { z, ZodEnum } from "zod";

import { BitBuffer } from "../bit-buffer";
import { BitBufferReader } from "../bit-buffer-reader";
import { BitSchema } from "./bit-schema";

export class BitEnum extends BitSchema {
  private static readonly BASE_SCHEMA = z.string();

  readonly mappings: EnumMapping;
  private readonly bitLength: number;
  private readonly schema: ZodEnum<any>;

  constructor(schema: z.ZodEnum<any>) {
    super();
    this.mappings = { indexes: {}, options: [] };
    const options = schema.options;
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const index = i + 1;
      this.mappings.indexes[option] = index;
      this.mappings.options[index] = option;
    }
    this.schema = schema;
    this.bitLength = BitEnum.getBitLength(0, this.mappings.options.length - 1);
  }

  read(reader: BitBufferReader): string | undefined {
    const { bitBuffer, offset } = reader;
    const enumIndex = bitBuffer.getUnsignedInt(this.bitLength, offset);
    reader.offset += this.bitLength;
    const enumValue = this.mappings.options[enumIndex];
    const parse = this.schema.safeParse(enumValue);
    return parse.success ? parse.data : undefined;
  }

  write(bitBuffer: BitBuffer, data: unknown): void {
    const parse = this.schema.safeParse(data);
    if (!parse.success) {
      bitBuffer.addUnsignedInt(0, this.bitLength);
      return;
    }
    const { data: checkedData } = parse;
    const index = this.mappings.indexes[checkedData];
    bitBuffer.addUnsignedInt(index, this.bitLength);
  }
}
