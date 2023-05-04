import { describe, expect, it } from "vitest";

import { BitBuffer } from "../bitBuffer";
import { BinaryInt } from "./binaryInt";
import { BinaryObject } from "./binaryObject";
import { BinarySchema } from "./binarySchema";
import { BinaryReadContext } from "./context";

describe("BinaryObject", () => {
  describe("Example1", () => {
    const Example1 = new BinaryObject([
      ["a", new BinaryInt(0, 4000)],
      ["b", new BinaryInt(0, 50)],
      ["c", new BinaryInt(0, 5)],
    ]);

    it("should only write present fields", function () {
      const context = new BinaryReadContext();
      const bitBuffer = new BitBuffer(128);

      Example1.write(bitBuffer, { a: 1000, c: 1 });
      const fields = bitBuffer.getUnsignedInt(3);
      const presentFields = BinarySchema.bitsToBoolean(
        fields,
        Example1.fields.length
      );
      expect(presentFields[0]).toBe(true);
      expect(presentFields[1]).toBe(false);
      expect(presentFields[2]).toBe(true);
      expect(bitBuffer.getUnsignedInt(12, 3)).toBe(1000);
      expect(bitBuffer.getUnsignedInt(3, 15)).toBe(1);

      const deserialized = Example1.read(bitBuffer, context);
      expect(deserialized["a"]).toBe(1000);
      expect(deserialized["b"]).toBe(undefined);
      expect(deserialized["c"]).toBe(1);
    });
    it("should only contain header when empty", () => {
      const context = new BinaryReadContext();
      const bitBuffer = new BitBuffer(128);

      Example1.write(bitBuffer, {});
      const fields = bitBuffer.getUnsignedInt(3);
      const presentFields = BinarySchema.bitsToBoolean(
        fields,
        Example1.fields.length
      );
      expect(presentFields[0]).toBe(false);
      expect(presentFields[1]).toBe(false);
      expect(presentFields[2]).toBe(false);
      expect(bitBuffer.lastBitIndex()).toBe(3);

      const deserialized = Example1.read(bitBuffer, context);
      expect(deserialized["a"]).toBe(undefined);
      expect(deserialized["b"]).toBe(undefined);
      expect(deserialized["c"]).toBe(undefined);
    });
  });
});
