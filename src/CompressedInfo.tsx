import { FC } from "react";

export const CompressedInfo: FC<{
  source: string;
}> = ({ source }) => {
  return <div>{source}</div>;
};
