import { z } from "zod";

export class BitBuffer {
  private static SIZE_PARAM_SCHEMA = z.number().int().positive();

  data: Uint8Array;
  remainingBits: number;
  lastByteIndex: number;

  constructor(array: Uint8Array);
  constructor(size: number);
  constructor(bits: number | Uint8Array) {
    this.data =
      bits instanceof Uint8Array
        ? bits
        : new Uint8Array(
            Math.ceil(BitBuffer.SIZE_PARAM_SCHEMA.parse(bits) / 8)
          );

    this.remainingBits = 8;
    this.lastByteIndex = 0;
  }

  buffer() {
    return this.data.buffer;
  }

  lastBitIndex() {
    return (this.lastByteIndex + 1) * 8 - this.remainingBits;
  }

  addUnsignedInt(value: number, bitLength: number) {
    if (bitLength <= 0 || bitLength > 32) {
      throw new RangeError("Bit length should be positive and less than 32");
    }

    const maxValue = this.bitmask(bitLength);
    value = Math.min(value, maxValue);

    let bitsToWrite = bitLength;
    this.growBufferIfNeeded(bitsToWrite);
    while (bitsToWrite > 0) {
      if (bitsToWrite >= this.remainingBits) {
        const maskOffset = bitsToWrite - this.remainingBits;
        const mask = this.bitmask(this.remainingBits) << maskOffset;
        this.data[this.lastByteIndex] |= (value & mask) >> maskOffset;
        bitsToWrite -= this.remainingBits;
        this.remainingBits = 8;
        this.lastByteIndex++;
      } else {
        const mask = this.bitmask(bitsToWrite);
        const bitOffset = this.remainingBits - bitsToWrite;
        this.data[this.lastByteIndex] |= (value & mask) << bitOffset;
        this.remainingBits -= bitsToWrite;
        bitsToWrite = 0;
      }
    }
  }

  getUnsignedInt(bitLength: number, offsetBits: number = 0): number {
    if (bitLength <= 0 || bitLength > 32) {
      throw new RangeError("Bit length should be positive and less than 32");
    }

    const byteIndex = Math.floor(offsetBits / 8);
    let bitOffset = offsetBits % 8;

    let value = 0;
    let shift = bitLength;
    for (let i = byteIndex; i < this.data.length && shift > 0; i++) {
      const byteValue = this.data[i];
      const bitsToRead = Math.min(8 - bitOffset, shift);
      const mask = this.bitmask(bitsToRead);
      const maskedValue = (byteValue >> (8 - bitOffset - bitsToRead)) & mask;
      value |= maskedValue << (shift - bitsToRead);
      shift -= bitsToRead;
      bitOffset = 0;
    }

    return value;
  }

  private growBufferIfNeeded(bitsToWrite: number) {
    const bitsAvailable = this.data.length * 8 - this.lastBitIndex();
    if (bitsToWrite > bitsAvailable) {
      const additionalBytesNeeded = Math.ceil(
        (bitsToWrite - bitsAvailable) / 8
      );
      const expandedBuffer = new Uint8Array(
        this.data.length + additionalBytesNeeded
      );
      expandedBuffer.set(this.data);
      this.data = expandedBuffer;
    }
  }

  private bitmask(width: number) {
    return width && -1 >>> (32 - width);
  }
}
