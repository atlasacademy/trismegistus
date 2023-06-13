import { describe, expect, it } from "vitest";

import { BitBuffer } from "../bit-buffer";
import { BitBufferReader } from "../bit-buffer-reader";
import { BitFixedInt } from "./bit-fixed-int";
import { BitObject } from "./bit-object";
import { BitSchema } from "./bit-schema";
describe("BitObject", () => {
  describe("Example1", () => {
    const Example1 = new BitObject([
      ["a", new BitFixedInt(0, 4000)],
      ["b", new BitFixedInt(0, 50)],
      ["c", new BitFixedInt(0, 5)],
    ]);

    it("should only write present fields", function () {
      const reader = new BitBufferReader(new BitBuffer(128));
      const { bitBuffer } = reader;

      Example1.write(bitBuffer, { a: 1000, c: 1 });
      const fields = bitBuffer.getUnsignedInt(3);
      const presentFields = BitSchema.bitsToBoolean(
        fields,
        Example1.fields.length
      );
      expect(presentFields[0]).toBe(true);
      expect(presentFields[1]).toBe(false);
      expect(presentFields[2]).toBe(true);
      expect(bitBuffer.getUnsignedInt(12, 3)).toBe(1000);
      expect(bitBuffer.getUnsignedInt(3, 15)).toBe(1);

      const deserialized = Example1.read(reader);
      expect(deserialized["a"]).toBe(1000);
      expect(deserialized["b"]).toBe(undefined);
      expect(deserialized["c"]).toBe(1);
    });
    it("should only contain header when empty", () => {
      const reader = new BitBufferReader(new BitBuffer(128));
      const { bitBuffer } = reader;

      Example1.write(bitBuffer, {});
      const fields = bitBuffer.getUnsignedInt(3);
      const presentFields = BitSchema.bitsToBoolean(
        fields,
        Example1.fields.length
      );
      expect(presentFields[0]).toBe(false);
      expect(presentFields[1]).toBe(false);
      expect(presentFields[2]).toBe(false);
      expect(bitBuffer.lastBitIndex()).toBe(3);

      const deserialized = Example1.read(reader);
      expect(deserialized["a"]).toBe(undefined);
      expect(deserialized["b"]).toBe(undefined);
      expect(deserialized["c"]).toBe(undefined);
    });
  });
});
