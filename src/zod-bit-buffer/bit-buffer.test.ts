import { describe, expect, it } from "vitest";

import { BitBuffer } from "./bit-buffer";

describe("BitBuffer tests", () => {
  it("should store the given values", () => {
    const bitBuffer = new BitBuffer(8);
    bitBuffer.addUnsignedInt(1, 4);
    bitBuffer.addUnsignedInt(1, 4);
    expect(bitBuffer.getUnsignedInt(4)).toBe(1);
    expect(bitBuffer.getUnsignedInt(4, 4)).toBe(1);
    expect(bitBuffer.getUnsignedInt(8), "00010001 is 17 in decimal").toBe(17);
  });
  it("should store and retrieve values with varying lengths", () => {
    const bitBuffer = new BitBuffer(12);
    bitBuffer.addUnsignedInt(15, 4);
    bitBuffer.addUnsignedInt(45, 6);
    expect(bitBuffer.getUnsignedInt(4)).toBe(15);
    expect(bitBuffer.getUnsignedInt(6, 4)).toBe(45);
  });
  it("should store be able to store up to 32 bit integers", () => {
    const bitBuffer = new BitBuffer(64);
    bitBuffer.addUnsignedInt(80088008, 32);
    bitBuffer.addUnsignedInt(70077007, 32);
    expect(bitBuffer.getUnsignedInt(32)).toBe(80088008);
    expect(bitBuffer.getUnsignedInt(32, 32)).toBe(70077007);

    expect(() => bitBuffer.addUnsignedInt(1, 33)).toThrow();
    expect(() => bitBuffer.getUnsignedInt(33)).toThrow();
  });
});
