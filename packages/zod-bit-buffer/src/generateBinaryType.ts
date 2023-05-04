import { z } from "zod";

import { BinaryRegistry } from "./binaryRegistry";
import { BinaryArray } from "./binaryTypes/binaryArray";
import { BinaryBoolean } from "./binaryTypes/binaryBoolean";
import { BinaryEnum } from "./binaryTypes/binaryEnum";
import { BinaryInt } from "./binaryTypes/binaryInt";
import { BinaryObject } from "./binaryTypes/binaryObject";
import { BinarySchema } from "./binaryTypes/binarySchema";

/**
 * Accepts a Zod Schema and creates a {@link BinaryObject} from it.
 *
 * Currently, the implementation accepts the following types, within
 * the following conditions:
 *
 * - {@link z.ZodArray}: requires {@link z.ZodArray#max} (falls back to 255
 * if not defined).
 * - {@link z.ZodObject}: field order must be defined in the given
 * {@link BinaryRegistry}.
 * - {@link z.ZodNumber}: requires {@link z.ZodNumber#min} (falls back to 0
 * if not defined) and {@link z.ZodNumber#max} (falls back to 4095 if not defined)
 * - {@link z.ZodBoolean}
 * - {@link z.ZodDefault} or {@link z.ZodOptional} with the above zod types.
 *
 * {@link z.ZodSchema}s that do not meet these criteria will be ignored.
 *
 * In addition, for {@link z.ZodObject} types, all fields are considered
 * nullable, despite the zod field definition.
 *
 * @param registry a registry with the allowed {@link z.ZodObject}s
 * @param zodSchema the schema which will become a {@link BinarySchema}
 */
export function generateBinaryType(
  registry: BinaryRegistry,
  zodSchema: z.ZodSchema
): BinarySchema | undefined {
  const ARRAY_MAX_LENGTH_FALLBACK = 255;
  const NUMBER_MIN_FALLBACK = 0;
  const NUMBER_MAX_FALLBACK = 4095;
  return generate(zodSchema);
  function generate(schema: z.ZodSchema): BinarySchema | undefined {
    const currentSchema =
      schema instanceof z.ZodDefault
        ? schema.removeDefault()
        : schema instanceof z.ZodOptional
        ? schema.unwrap()
        : schema;

    if (currentSchema instanceof z.ZodEnum) {
      return new BinaryEnum(currentSchema);
    }
    if (currentSchema instanceof z.ZodBoolean) {
      return new BinaryBoolean();
    }
    if (currentSchema instanceof z.ZodNumber) {
      const start = currentSchema.minValue ?? NUMBER_MIN_FALLBACK;
      const end = currentSchema.maxValue ?? NUMBER_MAX_FALLBACK;

      if (start > end) return undefined;
      return new BinaryInt(start, end);
    }
    if (currentSchema instanceof z.ZodArray) {
      const maxLength =
        currentSchema._def.maxLength?.value ?? ARRAY_MAX_LENGTH_FALLBACK;

      const elementType = generate(currentSchema.element);
      if (elementType == null) return;

      return new BinaryArray(elementType, maxLength);
    }
    if (currentSchema instanceof z.ZodObject) {
      const registeredFields = registry.getRegisteredFields(currentSchema);
      const fields: BinaryObject["fields"] = [];
      for (let i = 0; i < registeredFields.length; i++) {
        const fieldName = registeredFields[i];
        const fieldSchema = currentSchema.shape[fieldName];
        if (fieldSchema == null) continue;
        const fieldType = generate(fieldSchema);
        if (fieldType == null) continue;
        fields.push([fieldName, fieldType]);
      }
      if (fields.length <= 0) return undefined;
      return new BinaryObject(fields);
    }
  }
}
