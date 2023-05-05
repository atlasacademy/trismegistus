import { fail } from "assert";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import { BitFixedInt } from "./schemas/bit-fixed-int";
import { BitObject } from "./schemas/bit-object";
import { BitSchema } from "./schemas/bit-schema";
import { ZodSchemaParser } from "./zod-schema-parser";

export function rangedInt(min: number, max: number) {
  return z.number().int().min(min).max(max).default(min);
}

function intFieldTest(
  fieldName: string,
  min: number,
  max: number
): (arg: [string, BitSchema]) => boolean {
  return ([field, fieldType]) => {
    return (
      fieldType instanceof BitFixedInt &&
      field === fieldName &&
      fieldType.start === min &&
      fieldType.end === max
    );
  };
}
describe("generateBinaryTypes", () => {
  describe("Example1", () => {
    const Example1 = z.object({
      a: z.number().int(),
      b: rangedInt(1, 2000),
      c: rangedInt(1, 10),
      d: rangedInt(1, 10),
      f: rangedInt(0, 10),
      e: rangedInt(0, 10),
    });
    const parser = new ZodSchemaParser();
    parser.register(Example1, ["a", "b", "c", "d", "f", "e"]);
    const type = parser.parse(Example1);
    if (type == null) fail("type should not be null");

    if (!(type instanceof BitObject)) fail("type should be object");
    it("should have all fields defined in the field order", () => {
      const { fields } = type;
      expect(fields.length).toBe(6);
      expect(fields[0]).toSatisfy(intFieldTest("a", 0, 4095));
      expect(fields[1]).toSatisfy(intFieldTest("b", 1, 2000));
      expect(fields[2]).toSatisfy(intFieldTest("c", 1, 10));
      expect(fields[3]).toSatisfy(intFieldTest("d", 1, 10));
      expect(fields[4]).toSatisfy(intFieldTest("f", 0, 10));
      expect(fields[5]).toSatisfy(intFieldTest("e", 0, 10));
      expect(fields[5]).not.toSatisfy(intFieldTest("f", 11, 11));
    });
  });
});
