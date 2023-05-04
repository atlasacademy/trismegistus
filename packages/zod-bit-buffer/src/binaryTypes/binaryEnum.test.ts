import { describe, expect, it } from "vitest";
import { z } from "zod";

import { BinaryEnum } from "@/serialization/binaryTypes/binaryEnum";
import { BinaryReadContext } from "@/serialization/binaryTypes/context";
import { BitBuffer } from "@/serialization/bitBuffer";

describe("BinaryEnum", () => {
  it("should write the enum index", () => {
    const ExampleEnum = z.enum(["A", "B", "C"]);
    const bitBuffer = new BitBuffer(10);
    const binaryEnum = new BinaryEnum(ExampleEnum);
    const context = new BinaryReadContext();

    binaryEnum.write(bitBuffer, "A");
    expect(bitBuffer.getUnsignedInt(2)).toBe(1);
    expect(binaryEnum.read(bitBuffer, context)).toBe("A");
    expect(context.offset).toBe(2);

    binaryEnum.write(bitBuffer, "B");
    expect(bitBuffer.getUnsignedInt(2, 2)).toBe(2);
    expect(binaryEnum.read(bitBuffer, context)).toBe("B");
    expect(context.offset).toBe(4);

    binaryEnum.write(bitBuffer, "C");
    expect(bitBuffer.getUnsignedInt(2, 4)).toBe(3);
    expect(binaryEnum.read(bitBuffer, context)).toBe("C");
    expect(context.offset).toBe(6);

    binaryEnum.write(bitBuffer, "A");
    expect(binaryEnum.read(bitBuffer, context)).toBe("A");
    expect(context.offset).toBe(8);

    binaryEnum.write(bitBuffer, "D");
    expect(bitBuffer.getUnsignedInt(2, 8)).toBe(0);
    expect(binaryEnum.read(bitBuffer, context)).toBe(undefined);
    expect(context.offset).toBe(10);

    let actual = "";
    const letters = 4;
    context.reset();
    for (let i = 0; i < letters; i++) {
      actual += binaryEnum.read(bitBuffer, context);
    }
    expect(actual).toBe("ABCA");
    expect(context.offset).toBe(8);
    expect(binaryEnum.read(bitBuffer, context)).toBe(undefined);
  });
});
