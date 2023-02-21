import { z } from "zod";

import { BinaryType } from "@/serialization/binaryTypes/binaryType";

export class BinaryArray extends BinaryType {
  elementType: BinaryType;
  maxLength: number;
  constructor(
    baseSchema: z.ZodSchema,
    elementType: BinaryType,
    maxLength: number
  ) {
    super(baseSchema);
    this.elementType = elementType;
    this.maxLength = maxLength;
  }
}
