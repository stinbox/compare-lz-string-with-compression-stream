import { FC } from "react";
import { CompressionRatio } from "./CompressionRatio";

export const CompressedInfo: FC<{
  source: string;
}> = ({ source }) => {
  return (
    <div className="space-y-8 p-4">
      {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1, 1.1].map(
        (compressionRatio) => (
          <CompressionRatio percentage={compressionRatio * 100} />
        ),
      )}
    </div>
  );
};
