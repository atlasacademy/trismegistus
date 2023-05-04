import { EnumMapping } from "@trismegistus/commons";
import { z, ZodEnum } from "zod";

import { BitBuffer } from "../bitBuffer";
import { BinarySchema } from "./binarySchema";
import { BinaryReadContext } from "./context";

export class BinaryEnum extends BinarySchema {
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
    this.bitLength = BinaryEnum.getBitLength(
      0,
      this.mappings.options.length - 1
    );
  }

  read(bitBuffer: BitBuffer, context: BinaryReadContext): string | undefined {
    const enumIndex = bitBuffer.getUnsignedInt(this.bitLength, context.offset);
    context.offset += this.bitLength;
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
