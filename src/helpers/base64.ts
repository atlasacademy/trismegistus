/**
 * Code from https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727?permalink_comment_id=4247884#gistcomment-4247884
 */
/*
MIT License

Copyright (c) 2020 Egor Nepomnyaschih

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

/**
 * URL safe Base64 alphabet, as described in {@link https://www.rfc-editor.org/rfc/rfc4648#section-5 }
 */
const base64abc =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";

const base64codes = (() => {
  const l = 256;
  const base64bytes = new Uint8Array(l);
  for (let i = 0; i < l; ++i) {
    base64bytes[i] = 255; // invalid character
  }
  for (let index = 0; index < base64abc.length; index++) {
    const char = base64abc[index];
    base64bytes[char.charCodeAt(0)] = index;
  }
  base64bytes["=".charCodeAt(0)] = 0; // ignored anyway, so we just need to prevent an error
  return base64bytes;
})();

function getBase64Code(charCode: number) {
  if (charCode >= base64codes.length) {
    throw new Error("Unable to parse base64 string (code beyond length).");
  }
  const code = base64codes[charCode]!;
  if (code === 255) {
    throw new Error("Unable to parse base64 string (invalid code).");
  }
  return code;
}

export function bytesToBase64(bytes: Uint8Array, padding: boolean = true) {
  let result = "",
    i,
    l = bytes.length;
  for (i = 2; i < l; i += 3) {
    result += base64abc[bytes[i - 2]! >> 2];
    result += base64abc[((bytes[i - 2]! & 0x03) << 4) | (bytes[i - 1]! >> 4)];
    result += base64abc[((bytes[i - 1]! & 0x0f) << 2) | (bytes[i]! >> 6)];
    result += base64abc[bytes[i]! & 0x3f];
  }
  if (i === l + 1) {
    // 1 octet yet to write
    result += base64abc[bytes[i - 2]! >> 2];
    result += base64abc[(bytes[i - 2]! & 0x03) << 4];
    if (padding) result += "==";
  }
  if (i === l) {
    // 2 octets yet to write
    result += base64abc[bytes[i - 2]! >> 2];
    result += base64abc[((bytes[i - 2]! & 0x03) << 4) | (bytes[i - 1]! >> 4)];
    result += base64abc[(bytes[i - 1]! & 0x0f) << 2];
    if (padding) result += "=";
  }
  return result;
}

export function base64ToBytes(str: string) {
  if (str.length % 4 !== 0) {
    throw new Error("Unable to parse base64 string (invalid length).");
  }
  const index = str.indexOf("=");
  if (index !== -1 && index < str.length - 2) {
    throw new Error("Unable to parse base64 string (octets).");
  }
  let missingOctets = str.endsWith("==") ? 2 : str.endsWith("=") ? 1 : 0,
    n = str.length,
    result = new Uint8Array(3 * (n / 4)),
    buffer;
  for (let i = 0, j = 0; i < n; i += 4, j += 3) {
    buffer =
      (getBase64Code(str.charCodeAt(i)) << 18) |
      (getBase64Code(str.charCodeAt(i + 1)) << 12) |
      (getBase64Code(str.charCodeAt(i + 2)) << 6) |
      getBase64Code(str.charCodeAt(i + 3));
    result[j] = buffer >> 16;
    result[j + 1] = (buffer >> 8) & 0xff;
    result[j + 2] = buffer & 0xff;
  }
  return result.subarray(0, result.length - missingOctets);
}

export function base64encode(str: string, encoder = new TextEncoder()) {
  return bytesToBase64(encoder.encode(str));
}

export function base64decode(str: string, decoder = new TextDecoder()) {
  return decoder.decode(base64ToBytes(str));
}
