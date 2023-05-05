import { z, ZodObject } from "zod";

interface Item {
  schema: z.ZodObject<Record<string, any>, any>;
  fields: string[];
}
/**
 * Javascript does not guarantee field order for objects, so
 * this class serves a whitelist for allowing registered
 * schemas with an explicit field ordering.
 */
export class BinaryRegistry {
  private registry: Item[] = [];

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
