import { z } from "zod";

export abstract class BinaryType {
  baseSchema: z.ZodSchema;
  protected constructor(baseSchema: z.ZodSchema) {
    this.baseSchema = baseSchema;
  }
}
