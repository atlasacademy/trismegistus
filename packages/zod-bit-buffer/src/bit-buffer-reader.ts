import { BitBuffer } from "./bit-buffer";

export class BitBufferReader {
  offset: number;
  bitBuffer: BitBuffer;

  constructor(bitBuffer: BitBuffer, offset: number = 0) {
    this.bitBuffer = bitBuffer;
    this.offset = offset;
  }

  reset() {
    this.offset = 0;
  }
}
