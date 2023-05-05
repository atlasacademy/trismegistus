import { describe, expect, it } from "vitest";
import { z } from "zod";

import { BitBuffer } from "../bit-buffer";
import { BitBufferReader } from "../bit-buffer-reader";
import { BitEnum } from "./bit-enum";

describe("BitEnum", () => {
  it("should write the enum index", () => {
    const ExampleEnum = z.enum(["A", "B", "C"]);
    const binaryEnum = new BitEnum(ExampleEnum);
    const reader = new BitBufferReader(new BitBuffer(10));
    const { bitBuffer } = reader;

    binaryEnum.write(bitBuffer, "A");
    expect(bitBuffer.getUnsignedInt(2)).toBe(1);
    expect(binaryEnum.read(reader)).toBe("A");
    expect(reader.offset).toBe(2);

    binaryEnum.write(bitBuffer, "B");
    expect(bitBuffer.getUnsignedInt(2, 2)).toBe(2);
    expect(binaryEnum.read(reader)).toBe("B");
    expect(reader.offset).toBe(4);

    binaryEnum.write(bitBuffer, "C");
    expect(bitBuffer.getUnsignedInt(2, 4)).toBe(3);
    expect(binaryEnum.read(reader)).toBe("C");
    expect(reader.offset).toBe(6);

    binaryEnum.write(bitBuffer, "A");
    expect(binaryEnum.read(reader)).toBe("A");
    expect(reader.offset).toBe(8);

    binaryEnum.write(bitBuffer, "D");
    expect(bitBuffer.getUnsignedInt(2, 8)).toBe(0);
    expect(binaryEnum.read(reader)).toBe(undefined);
    expect(reader.offset).toBe(10);

    let actual = "";
    const letters = 4;
    reader.reset();
    for (let i = 0; i < letters; i++) {
      actual += binaryEnum.read(reader);
    }
    expect(actual).toBe("ABCA");
    expect(reader.offset).toBe(8);
    expect(binaryEnum.read(reader)).toBe(undefined);
  });
});
