import { describe, expect, it } from "vitest";

import { BitBuffer } from "../bit-buffer";
import { BitBufferReader } from "../bit-buffer-reader";
import { BitBoolean } from "./bit-boolean";

describe("BitBoolean", () => {
  it("should write to a single bit", () => {
    const binaryBoolean = new BitBoolean();
    const reader = new BitBufferReader(new BitBuffer(8));
    const { bitBuffer } = reader;

    binaryBoolean.write(bitBuffer, true);
    expect(bitBuffer.getUnsignedInt(1)).toBe(1);
    expect(binaryBoolean.read(reader)).toBe(true);

    binaryBoolean.write(bitBuffer, false);
    expect(bitBuffer.getUnsignedInt(1, 1)).toBe(0);
    expect(binaryBoolean.read(reader)).toBe(false);
    expect(reader.offset).toBe(2);

    binaryBoolean.write(bitBuffer, true);
    expect(bitBuffer.getUnsignedInt(1, 2)).toBe(1);
    expect(bitBuffer.getUnsignedInt(1, 1)).toBe(0);
    expect(binaryBoolean.read(reader)).toBe(true);

    expect(bitBuffer.getUnsignedInt(4).toString(2)).toBe("1010");
  });
});
