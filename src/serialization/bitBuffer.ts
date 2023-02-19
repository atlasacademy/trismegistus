export function createBitBuffer(size: number) {
  if (size <= 0) throw new Error("Size should be greater than 0");
  const data = new Uint8Array(Math.ceil(size / 8));
  let remainingBits = 8;
  let lastByteIndex = 0;

  return {
    buffer: () => data.buffer,
    addUnsignedInt(value: number, bitLength: number) {
      if (bitLength <= 0 || bitLength > 32) {
        throw new RangeError("Bit length should be positive and less than 32");
      }

      const maxValue = bitmask(bitLength);
      value = Math.min(value, maxValue);

      let bitsToWrite = bitLength;
      while (bitsToWrite > 0) {
        if (bitsToWrite >= remainingBits) {
          const maskOffset = bitsToWrite - remainingBits;
          const mask = bitmask(remainingBits) << maskOffset;
          data[lastByteIndex] |= (value & mask) >> maskOffset;
          bitsToWrite -= remainingBits;
          remainingBits = 8;
          lastByteIndex++;
        } else {
          const mask = bitmask(bitsToWrite);
          const bitOffset = remainingBits - bitsToWrite;
          data[lastByteIndex] |= (value & mask) << bitOffset;
          remainingBits -= bitsToWrite;
          bitsToWrite = 0;
        }
      }
    },

    getUnsignedInt(bitLength: number, offsetBits: number = 0): number {
      if (bitLength <= 0 || bitLength > 32) {
        throw new RangeError("Bit length should be positive and less than 32");
      }

      const byteIndex = Math.floor(offsetBits / 8);
      let bitOffset = offsetBits % 8;

      let value = 0;
      let shift = bitLength;
      for (let i = byteIndex; i < data.length && shift > 0; i++) {
        const byteValue = data[i];
        const bitsToRead = Math.min(8 - bitOffset, shift);
        const mask = bitmask(bitsToRead);
        const maskedValue = (byteValue >> (8 - bitOffset - bitsToRead)) & mask;
        value |= maskedValue << (shift - bitsToRead);
        shift -= bitsToRead;
        bitOffset = 0;
      }

      return value;
    },
  };
  function bitmask(width: number) {
    return width && -1 >>> (32 - width);
  }
}
