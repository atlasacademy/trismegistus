import { z, ZodObject } from "zod";

import { BitArray } from "./schemas/bit-array";
import { BitBoolean } from "./schemas/bit-boolean";
import { BitEnum } from "./schemas/bit-enum";
import { BitFixedInt } from "./schemas/bit-fixed-int";
import { BitObject } from "./schemas/bit-object";
import { BitSchema } from "./schemas/bit-schema";

export interface SchemaFieldOrder {
  schema: z.ZodObject<Record<string, any>, any>;
  fields: string[];
}

export interface ZodSchemaParserFallbacks {
  arrayMaxLength: number;
  numberMin: number;
  numberMax: number;
}

const DEFAULT_FALLBACKS: ZodSchemaParserFallbacks = {
  arrayMaxLength: 255,
  numberMin: 0,
  numberMax: 4095,
};

/**
 * Parser that generates a {@link BitSchema} from a {@link z.ZodSchema}.
 * Currently, the implementation accepts the following types, within
 * the following conditions:
 *
 * - {@link z.ZodArray}: requires {@link z.ZodArray#max}, falls back to
 * {@link arrayMaxLengthFallback} if not defined.
 * - {@link z.ZodObject}: requires the object field order, which can be
 * registered {@link register()}, non-registered fields will be ignored.
 * - {@link z.ZodNumber}: requires {@link z.ZodNumber#min} (falls back to
 *  {@link numberMinFallback} if not defined) and {@link z.ZodNumber#max}
 *  (falls back to {@link numberMaxFallback} if not defined)
 * - {@link z.ZodBoolean}
 * - {@link z.ZodDefault} or {@link z.ZodOptional} with the above zod types.
 *
 * {@link z.ZodSchema}s that do not meet these criteria will be ignored.
 *
 * In addition, for {@link z.ZodObject} types, all fields are considered
 * nullable, despite the zod field definition.
 */
export class ZodSchemaParser {
  readonly arrayMaxLengthFallback: number;
  readonly numberMinFallback: number;
  readonly numberMaxFallback: number;
  private registry: SchemaFieldOrder[] = [];

  constructor({
    arrayMaxLength,
    numberMin,
    numberMax,
  }: ZodSchemaParserFallbacks = DEFAULT_FALLBACKS) {
    this.arrayMaxLengthFallback = arrayMaxLength;
    this.numberMinFallback = numberMin;
    this.numberMaxFallback = numberMax;
  }

  parse(zodSchema: z.ZodSchema): BitSchema | undefined {
    return this.generate(zodSchema);
  }

  private generate(schema: z.ZodSchema): BitSchema | undefined {
    const currentSchema =
      schema instanceof z.ZodDefault
        ? schema.removeDefault()
        : schema instanceof z.ZodOptional
        ? schema.unwrap()
        : schema;

    if (currentSchema instanceof z.ZodEnum) {
      return new BitEnum(currentSchema);
    }
    if (currentSchema instanceof z.ZodBoolean) {
      return new BitBoolean();
    }
    if (currentSchema instanceof z.ZodNumber) {
      const start = currentSchema.minValue ?? this.numberMinFallback;
      const end = currentSchema.maxValue ?? this.numberMaxFallback;

      if (start > end) return undefined;
      return new BitFixedInt(start, end);
    }
    if (currentSchema instanceof z.ZodArray) {
      const maxLength =
        currentSchema._def.maxLength?.value ?? this.arrayMaxLengthFallback;

      const elementType = this.generate(currentSchema.element);
      if (elementType == null) return;

      return new BitArray(elementType, maxLength);
    }
    if (currentSchema instanceof z.ZodObject) {
      const registeredFields = this.getRegisteredFields(currentSchema);
      const fields: BitObject["fields"] = [];
      for (let i = 0; i < registeredFields.length; i++) {
        const fieldName = registeredFields[i];
        const fieldSchema = currentSchema.shape[fieldName];
        if (fieldSchema == null) continue;
        const fieldType = this.generate(fieldSchema);
        if (fieldType == null) continue;
        fields.push([fieldName, fieldType]);
      }
      if (fields.length <= 0) return undefined;
      return new BitObject(fields);
    }
  }

  register<K extends string>(
    schema: z.ZodObject<Record<K, any>, any>,
    fieldOrder: K[]
  ): void {
    if (this.find(schema) != null) return;
    this.registry.push({ schema, fields: fieldOrder });
  }

  getRegisteredFields<K extends string>(
    schema: z.ZodObject<Record<K, any>, any>
  ): K[] {
    return (this.find(schema)?.fields ?? []) as K[];
  }

  private find<K extends string>(schema: ZodObject<Record<K, any>, any>) {
    return this.registry.find(
      ({ schema: registered }) => schema === registered
    );
  }
}
