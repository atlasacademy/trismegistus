import { BitBuffer } from "../bitBuffer";
import { BinaryReadContext } from "./context";

export abstract class BinarySchema {
  abstract read(bitBuffer: BitBuffer, context: BinaryReadContext): unknown;
  abstract write(bitBuffer: BitBuffer, data: unknown): void;

  protected static getBitLength(minValue: number, maxValue: number) {
    const ceil = maxValue - minValue;
    if (ceil === 0) return 1;
    return Math.ceil(Math.log(ceil + 1) / Math.log(2));
  }

  static bitsToBoolean(flagNumber: number, bitLength: number): boolean[] {
    let bits = flagNumber;
    const flags: boolean[] = [];

    for (let i = 0; i < bitLength; i++) {
      flags.unshift((bits & 1) === 1);
      bits >>= 1;
    }
    return flags;
  }

  static booleanToBits(flags: boolean[]): number {
    return flags.reduce((result, flag) => (result << 1) | (flag ? 1 : 0), 0);
  }
}
