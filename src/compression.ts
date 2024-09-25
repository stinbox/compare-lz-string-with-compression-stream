const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

export async function compressToBase64(input: string): Promise<string> {
  const compression = new CompressionStream("deflate");
  const writer = compression.writable.getWriter();
  await writer.write(textEncoder.encode(input));
  await writer.close();
  const compressed = await new Response(compression.readable).arrayBuffer();
  return btoa(
    new Uint8Array(compressed).reduce(
      (acc, c) => acc + String.fromCharCode(c),
      "",
    ),
  );
}

export async function decompressFromBase64(input: string): Promise<string> {
  const compressedBytes = Uint8Array.from(atob(input), (c) => c.charCodeAt(0));

  const decompression = new DecompressionStream("deflate");
  const writer = decompression.writable.getWriter();
  await writer.write(compressedBytes);
  await writer.close();
  const decompressed = await new Response(decompression.readable).arrayBuffer();
  return textDecoder.decode(decompressed);
}

export async function compressToUTF16(input: string): Promise<string> {
  const compression = new CompressionStream("deflate");
  const writer = compression.writable.getWriter();
  await writer.write(textEncoder.encode(input));
  await writer.close();
  const compressed = await new Response(compression.readable).arrayBuffer();
  const compressedBytes = new Uint16Array(compressed);
  return String.fromCharCode(...compressedBytes);
}

export async function decompressFromUTF16(input: string): Promise<string> {
  const compressedUint16Array = new Uint16Array(
    input.split("").map((c) => c.charCodeAt(0)),
  );
  const compressedBytes = new Uint8Array(compressedUint16Array.buffer);

  const decompression = new DecompressionStream("deflate");
  const writer = decompression.writable.getWriter();
  await writer.write(compressedBytes);
  await writer.close();
  const decompressed = await new Response(decompression.readable).arrayBuffer();
  return textDecoder.decode(decompressed);
}

export async function compressToUint8Array(input: string): Promise<Uint8Array> {
  const compression = new CompressionStream("deflate");
  const writer = compression.writable.getWriter();
  await writer.write(textEncoder.encode(input));
  await writer.close();
  const compressed = await new Response(compression.readable).arrayBuffer();
  return new Uint8Array(compressed);
}

export async function decompressFromUint8Array(
  input: Uint8Array,
): Promise<string> {
  const decompression = new DecompressionStream("deflate");
  const writer = decompression.writable.getWriter();
  await writer.write(input);
  await writer.close();
  const decompressed = await new Response(decompression.readable).arrayBuffer();
  return textDecoder.decode(decompressed);
}

export async function compressToEncodedURIComponent(
  input: string,
): Promise<string> {
  const withBase64 = await compressToBase64(input);
  return withBase64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function decompressFromEncodedURIComponent(
  input: string,
): Promise<string> {
  let base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return decompressFromBase64(base64);
}
