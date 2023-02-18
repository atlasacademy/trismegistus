export function createBitBuffer(array: Uint8Array) {
  let remainingBits = 8;
  let lastByteIndex = 0;
  let lastByte = 0;

  return {
    array,

    addUnsignedInt(value: number, bitLength: number) {
      const maxBitLength = 32;
      bitLength = Math.min(bitLength, maxBitLength);

      const maxValue = (1 << bitLength) - 1;
      value = Math.min(value, maxValue);

      let bitsToWrite = bitLength;
      while (bitsToWrite > 0) {
        if (bitsToWrite >= remainingBits) {
          const mask = (1 << remainingBits) - 1;
          lastByte |= (value & mask) << (8 - remainingBits);
          value >>= remainingBits;
          array[lastByteIndex] = lastByte;
          lastByte = 0;
          remainingBits = 8;
          bitsToWrite -= remainingBits;
          lastByteIndex++;
        } else {
          const mask = (1 << bitsToWrite) - 1;
          lastByte |= (value & mask) << (8 - remainingBits);
          remainingBits -= bitsToWrite;
          bitsToWrite = 0;
          array[lastByteIndex] = lastByte;
        }
      }
    },

    getUnsignedInt(bitLength: number, offsetBits: number = 0): number {
      const maxBitLength = 32;
      bitLength = Math.min(bitLength, maxBitLength);

      const byteIndex = Math.floor(offsetBits / 8);
      let bitOffset = offsetBits % 8;

      let value = 0;
      let shift = 0;
      for (let i = byteIndex; i < array.length && shift < bitLength; i++) {
        const byteValue = array[i];
        const bitsToRead = Math.min(8 - bitOffset, bitLength - shift);
        const maskedValue = (byteValue >> bitOffset) & ((1 << bitsToRead) - 1);
        value |= maskedValue << shift;
        shift += bitsToRead;
        bitOffset = 0;
      }

      return value;
    },
  };
}
