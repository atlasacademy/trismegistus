import { describe, expect, it } from "vitest";

import { createBitBuffer } from "@/serialization/bitBuffer";

describe("BitBuffer tests", () => {
  it("should store the given values", () => {
    const uint8Array = new Uint8Array(8);
    const bitBuffer = createBitBuffer(uint8Array);
    bitBuffer.addUnsignedInt(1, 4);
    bitBuffer.addUnsignedInt(1, 4);
    expect(bitBuffer.getUnsignedInt(4)).toBe(1);
    expect(bitBuffer.getUnsignedInt(4, 4)).toBe(1);

    expect(bitBuffer.getUnsignedInt(8), "00010001 is 17 in decimal").toBe(17);
  });
});
