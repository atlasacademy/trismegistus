import { z } from "zod";

import { BinaryType } from "@/serialization/binaryTypes/binaryType";

export class BinaryInt extends BinaryType {
  start: number;
  end: number;

  constructor(baseSchema: z.ZodSchema, start: number, end: number) {
    super(baseSchema);
    this.start = start;
    this.end = end;
  }
}
