import { expect, describe, it } from "vitest";
import {
  compressToBase64,
  compressToEncodedURIComponent,
  compressToUTF16,
  compressToUint8Array,
  decompressFromBase64,
  decompressFromEncodedURIComponent,
  decompressFromUTF16,
  decompressFromUint8Array,
} from "./compression";
import { toBase64 } from "./to-base64";

const data = `const data =
  \`Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
あのイーハトーヴォのすきとおった風、夏でも底に冷たさをもつ青いそら、うつくしい森で飾られたモリーオ市、郊外のぎらぎらひかる草の波。
🧑‍🧑‍🧒‍🧒\`;`;

describe("compression", () => {
  it("base64", async () => {
    const compressed = await compressToBase64(data);
    const decompressed = await decompressFromBase64(compressed);

    const dataBase64 = toBase64(data);

    console.log({
      beforeSize: dataBase64.length,
      afterSize: compressed.length,
      efficiency: (compressed.length / dataBase64.length) * 100,
    });
    expect(compressed.length).lessThan(dataBase64.length);

    expect(decompressed).toBe(data);
  });

  it("UTF16", async () => {
    const compressed = await compressToUTF16(data);
    const decompressed = await decompressFromUTF16(compressed);

    const dataUTF16 = new TextEncoder()
      .encode(data)
      .reduce((acc, c) => acc + String.fromCharCode(c), "");

    console.log({
      beforeSize: dataUTF16.length,
      afterSize: compressed.length,
      efficiency: (compressed.length / dataUTF16.length) * 100,
    });
    expect(compressed.length).lessThan(dataUTF16.length);

    expect(decompressed).toBe(data);
  });

  it("Uint8Array", async () => {
    const compressed = await compressToUint8Array(data);
    const decompressed = await decompressFromUint8Array(compressed);

    const dataUint8Array = new TextEncoder().encode(data);

    console.log({
      beforeSize: dataUint8Array.length,
      afterSize: compressed.length,
      efficiency: (compressed.length / dataUint8Array.length) * 100,
    });
    expect(compressed.length).lessThan(dataUint8Array.length);

    expect(decompressed).toBe(data);
  });

  it("encodeURIComponent", async () => {
    const compressed = await compressToEncodedURIComponent(data);
    const decompressed = await decompressFromEncodedURIComponent(compressed);

    const dataEncodedURIComponent = encodeURIComponent(data);

    console.log({
      beforeSize: dataEncodedURIComponent.length,
      afterSize: compressed.length,
      efficiency: (compressed.length / dataEncodedURIComponent.length) * 100,
    });
    expect(compressed.length).lessThan(dataEncodedURIComponent.length);

    expect(decompressed).toBe(data);
  });
});
