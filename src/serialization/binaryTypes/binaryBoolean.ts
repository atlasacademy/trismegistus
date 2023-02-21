import { z } from "zod";

import { BinaryType } from "@/serialization/binaryTypes/binaryType";

export class BinaryBoolean extends BinaryType {
  constructor(baseSchema: z.ZodSchema) {
    super(baseSchema);
  }
}
