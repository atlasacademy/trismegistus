import { describe, expect, it } from "vitest";

import { BitBuffer } from "../bitBuffer";
import { BinaryInt } from "./binaryInt";
import { BinaryReadContext } from "./context";

describe("BinaryInt", () => {
  it("should write the integer inside the range", () => {
    const bitBuffer = new BitBuffer(50);
    const binaryInt = new BinaryInt(-500, 500);
    const context = new BinaryReadContext();

    binaryInt.write(bitBuffer, -499);
    expect(bitBuffer.getUnsignedInt(10)).toBe(1);
    expect(binaryInt.read(bitBuffer, context)).toBe(-499);
    expect(context.offset).toBe(10);

    binaryInt.write(bitBuffer, 0);
    expect(bitBuffer.getUnsignedInt(10, 10)).toBe(500);
    expect(binaryInt.read(bitBuffer, context)).toBe(0);
    expect(context.offset).toBe(20);

    binaryInt.write(bitBuffer, 500);
    expect(bitBuffer.getUnsignedInt(10, 20)).toBe(1000);
    expect(binaryInt.read(bitBuffer, context)).toBe(500);
    expect(context.offset).toBe(30);

    binaryInt.write(bitBuffer, -510);
    expect(bitBuffer.getUnsignedInt(10, 30)).toBe(0);
    expect(binaryInt.read(bitBuffer, context)).toBe(-500);
    expect(context.offset).toBe(40);

    binaryInt.write(bitBuffer, 510);
    expect(bitBuffer.getUnsignedInt(10, 40)).toBe(1000);
    expect(binaryInt.read(bitBuffer, context)).toBe(500);
    expect(context.offset).toBe(50);
  });
});
