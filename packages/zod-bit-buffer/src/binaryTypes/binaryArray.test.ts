import { describe, expect, it } from "vitest";

import { BitBuffer } from "../bitBuffer";
import { BinaryArray } from "./binaryArray";
import { BinaryInt } from "./binaryInt";
import { BinaryReadContext } from "./context";

describe("BinaryArray", () => {
  const Example1 = new BinaryArray(new BinaryInt(0, 255), 5);

  it("should only write up to max length", () => {
    const context = new BinaryReadContext();
    const bitBuffer = new BitBuffer(128);

    Example1.write(bitBuffer, [10, 20, 30, 40, 50, 60, 70, 80]);
    expect(bitBuffer.getUnsignedInt(3)).toBe(5);
    expect(bitBuffer.getUnsignedInt(8, 3)).toBe(10);
    expect(bitBuffer.getUnsignedInt(8, 11)).toBe(20);
    expect(bitBuffer.getUnsignedInt(8, 19)).toBe(30);
    expect(bitBuffer.getUnsignedInt(8, 27)).toBe(40);
    expect(bitBuffer.getUnsignedInt(8, 35)).toBe(50);
    expect(bitBuffer.getUnsignedInt(8, 42)).toBe(0);
    expect(bitBuffer.getUnsignedInt(8, 50)).toBe(0);
    expect(bitBuffer.getUnsignedInt(8, 58)).toBe(0);
    expect(bitBuffer.getUnsignedInt(8, 66)).toBe(0);

    const result = Example1.read(bitBuffer, context);
    expect(result.length).toBe(5);
    expect(result[0]).toBe(10);
    expect(result[1]).toBe(20);
    expect(result[2]).toBe(30);
    expect(result[3]).toBe(40);
    expect(result[4]).toBe(50);
  });
});
