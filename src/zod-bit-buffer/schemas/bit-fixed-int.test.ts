import { describe, expect, it } from "vitest";

import { BitBuffer } from "../bit-buffer";
import { BitBufferReader } from "../bit-buffer-reader";
import { BitFixedInt } from "./bit-fixed-int";

describe("BitFixedInt", () => {
  it("should write the integer inside the range", () => {
    const binaryInt = new BitFixedInt(-500, 500);
    const reader = new BitBufferReader(new BitBuffer(50));
    const { bitBuffer } = reader;

    binaryInt.write(bitBuffer, -499);
    expect(bitBuffer.getUnsignedInt(10)).toBe(1);
    expect(binaryInt.read(reader)).toBe(-499);
    expect(reader.offset).toBe(10);

    binaryInt.write(bitBuffer, 0);
    expect(bitBuffer.getUnsignedInt(10, 10)).toBe(500);
    expect(binaryInt.read(reader)).toBe(0);
    expect(reader.offset).toBe(20);

    binaryInt.write(bitBuffer, 500);
    expect(bitBuffer.getUnsignedInt(10, 20)).toBe(1000);
    expect(binaryInt.read(reader)).toBe(500);
    expect(reader.offset).toBe(30);

    binaryInt.write(bitBuffer, -510);
    expect(bitBuffer.getUnsignedInt(10, 30)).toBe(0);
    expect(binaryInt.read(reader)).toBe(-500);
    expect(reader.offset).toBe(40);

    binaryInt.write(bitBuffer, 510);
    expect(bitBuffer.getUnsignedInt(10, 40)).toBe(1000);
    expect(binaryInt.read(reader)).toBe(500);
    expect(reader.offset).toBe(50);
  });
});
