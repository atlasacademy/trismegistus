import { describe, expect, it } from "vitest";

import { BitBuffer } from "../bitBuffer";
import { BinaryBoolean } from "./binaryBoolean";
import { BinaryReadContext } from "./context";

describe("BinaryBoolean", () => {
  it("should write to a single bit", () => {
    const bitBuffer = new BitBuffer(8);
    const binaryBoolean = new BinaryBoolean();
    const context = new BinaryReadContext();

    binaryBoolean.write(bitBuffer, true);
    expect(bitBuffer.getUnsignedInt(1)).toBe(1);
    expect(binaryBoolean.read(bitBuffer, context)).toBe(true);

    binaryBoolean.write(bitBuffer, false);
    expect(bitBuffer.getUnsignedInt(1, 1)).toBe(0);
    expect(binaryBoolean.read(bitBuffer, context)).toBe(false);
    expect(context.offset).toBe(2);

    binaryBoolean.write(bitBuffer, true);
    expect(bitBuffer.getUnsignedInt(1, 2)).toBe(1);
    expect(bitBuffer.getUnsignedInt(1, 1)).toBe(0);
    expect(binaryBoolean.read(bitBuffer, context)).toBe(true);

    expect(bitBuffer.getUnsignedInt(4).toString(2)).toBe("1010");
  });
});
