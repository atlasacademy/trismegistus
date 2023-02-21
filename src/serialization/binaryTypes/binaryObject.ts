import { z } from "zod";

import { BinaryType } from "@/serialization/binaryTypes/binaryType";

export class BinaryObject extends BinaryType {
  fields: [string, BinaryType][];
  constructor(baseSchema: z.ZodSchema, fields: [string, BinaryType][]) {
    super(baseSchema);
    this.fields = fields;
  }
}
