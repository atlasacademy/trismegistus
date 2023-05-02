import { fail } from "assert";
import { describe, expect, it } from "vitest";
import { z } from "zod";

import { BinaryRegistry } from "@/serialization/binaryRegistry";
import {
  BinaryInt,
  BinaryObject,
  BinarySchema,
} from "@/serialization/binaryTypes";
import { generateBinaryType } from "@/serialization/generateBinaryType";
import { rangedInt } from "@/types/utils";

function intFieldTest(
  fieldName: string,
  min: number,
  max: number
): (arg: [string, BinarySchema]) => boolean {
  return ([field, fieldType]) => {
    return (
      fieldType instanceof BinaryInt &&
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
    const registry = new BinaryRegistry();
    registry.register(Example1, ["a", "b", "c", "d", "f", "e"]);
    const type = generateBinaryType(registry, Example1);
    if (type == null) fail("type should not be null");

    if (!(type instanceof BinaryObject)) fail("type should be object");
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
