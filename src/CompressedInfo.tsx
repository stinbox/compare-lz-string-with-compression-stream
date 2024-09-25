import { FC, useEffect, useMemo, useState } from "react";
import { CompressionRatio } from "./CompressionRatio";
import lzstring from "lz-string";
import * as withStream from "./compression";
import { toBase64 } from "./to-base64";

type CompressionResults = {
  lzstring: {
    base64: string;
    utf16: string;
    uint8Array: Uint8Array;
    encodeURIComponent: string;
  };
  compressionStream: {
    base64: string;
    utf16: string;
    uint8Array: Uint8Array;
    encodeURIComponent: string;
  };
};

export const CompressedInfo: FC<{
  source: string;
}> = ({ source }) => {
  const [compressionResults, setCompressionResults] =
    useState<CompressionResults | null>(null);

  const rawSourceBase64 = useMemo(() => toBase64(source), [source]);
  const rawSourceEncodedURIComponent = useMemo(
    () => encodeURIComponent(source),
    [source],
  );
  const rawSourceUint8Array = useMemo(
    () => new TextEncoder().encode(source),
    [source],
  );

  useEffect(() => {
    Promise.all([
      lzstring.compressToBase64(source),
      lzstring.compressToUTF16(source),
      lzstring.compressToUint8Array(source),
      lzstring.compressToEncodedURIComponent(source),
      withStream.compressToBase64(source),
      withStream.compressToUTF16(source),
      withStream.compressToUint8Array(source),
      withStream.compressToEncodedURIComponent(source),
    ]).then(
      ([
        lzstringBase64,
        lzstringUTF16,
        lzstringUint8Array,
        lzstringEncodedURIComponent,
        compressionStreamBase64,
        compressionStreamUTF16,
        compressionStreamUint8Array,
        compressionStreamEncodedURIComponent,
      ]) => {
        setCompressionResults({
          lzstring: {
            base64: lzstringBase64,
            utf16: lzstringUTF16,
            uint8Array: lzstringUint8Array,
            encodeURIComponent: lzstringEncodedURIComponent,
          },
          compressionStream: {
            base64: compressionStreamBase64,
            utf16: compressionStreamUTF16,
            uint8Array: compressionStreamUint8Array,
            encodeURIComponent: compressionStreamEncodedURIComponent,
          },
        });
      },
    );
  }, [source]);

  return (
    <div className="p-4">
      <h1 className="text-4xl font-black mb-8">Compression Ratio</h1>
      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-bold mb-4">Base64</h2>
          <div className="space-y-1">
            <h3 className="font-medium">with lz-string</h3>
            <CompressionRatio
              ratio={
                compressionResults
                  ? calculateStringCompressionRatio(
                      compressionResults.lzstring.base64,
                      rawSourceBase64,
                    )
                  : "nan"
              }
            />
            <h3 className="font-medium">with CompressionStream</h3>
            <CompressionRatio
              ratio={
                compressionResults
                  ? calculateStringCompressionRatio(
                      compressionResults.compressionStream.base64,
                      rawSourceBase64,
                    )
                  : "nan"
              }
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">UTF16</h2>
          <div className="space-y-1">
            <h3 className="font-medium">with lz-string</h3>
            <CompressionRatio
              ratio={
                compressionResults
                  ? calculateStringCompressionRatio(
                      compressionResults.lzstring.utf16,
                      source,
                    )
                  : "nan"
              }
            />
            <h3 className="font-medium">with CompressionStream</h3>
            <CompressionRatio
              ratio={
                compressionResults
                  ? calculateStringCompressionRatio(
                      compressionResults.compressionStream.utf16,
                      source,
                    )
                  : "nan"
              }
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">Uint8Array</h2>
          <div className="space-y-1">
            <h3 className="font-medium">with lz-string</h3>
            <CompressionRatio
              ratio={
                compressionResults
                  ? calculateUint8ArrayCompressionRatio(
                      compressionResults.lzstring.uint8Array,
                      rawSourceUint8Array,
                    )
                  : "nan"
              }
            />
            <h3 className="font-medium">with CompressionStream</h3>
            <CompressionRatio
              ratio={
                compressionResults
                  ? calculateUint8ArrayCompressionRatio(
                      compressionResults.compressionStream.uint8Array,
                      rawSourceUint8Array,
                    )
                  : "nan"
              }
            />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-4">encodeURIComponent</h2>
          <div className="space-y-1">
            <h3 className="font-medium">with lz-string</h3>
            <CompressionRatio
              ratio={
                compressionResults
                  ? calculateStringCompressionRatio(
                      compressionResults.lzstring.encodeURIComponent,
                      rawSourceEncodedURIComponent,
                    )
                  : "nan"
              }
            />
            <h3 className="font-medium">with CompressionStream</h3>
            <CompressionRatio
              ratio={
                compressionResults
                  ? calculateStringCompressionRatio(
                      compressionResults.compressionStream.encodeURIComponent,
                      rawSourceEncodedURIComponent,
                    )
                  : "nan"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const calculateStringCompressionRatio = (compressed: string, raw: string) => {
  return raw.length === 0 ? "nan" : compressed.length / raw.length;
};

const calculateUint8ArrayCompressionRatio = (
  compressed: Uint8Array,
  raw: Uint8Array,
) => {
  return raw.length === 0 ? "nan" : compressed.length / raw.length;
};
