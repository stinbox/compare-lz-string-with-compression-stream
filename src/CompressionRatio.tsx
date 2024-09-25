export const CompressionRatio: React.FC<{
  ratio: number | "nan";
}> = ({ ratio }) => {
  const actualPercentage =
    typeof ratio === "number" ? Math.max(0, Math.round(ratio * 100)) : "nan";

  const percentageUpTo100 =
    actualPercentage === "nan" ? "nan" : Math.min(actualPercentage, 100);

  const ratioLevel =
    actualPercentage === "nan"
      ? "nan"
      : actualPercentage <= 50
      ? "safe"
      : actualPercentage > 50 && actualPercentage <= 80
      ? "warning"
      : "danger";

  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={actualPercentage === "nan" ? 0 : actualPercentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cx(
          "w-full h-3.5 rounded-full relative",
          {
            nan: "bg-gray-200",
            safe: "bg-green-200",
            warning: "bg-yellow-200",
            danger: "bg-red-200",
          }[ratioLevel],
        )}
      >
        <div
          className={cx(
            "h-full rounded-full transition-all",
            {
              nan: "bg-gray-500",
              safe: "bg-green-500",
              warning: "bg-yellow-500",
              danger: "bg-red-500",
            }[ratioLevel],
          )}
          style={{
            width: percentageUpTo100 === "nan" ? 0 : `${percentageUpTo100}%`,
          }}
        />
      </div>
      <span
        className={cx(
          "relative font-bold text-xs inline-block px-1 py-0.5 rounded border-2 mt-1",
          {
            nan: "bg-gray-200 text-gray-600 border-gray-300",
            safe: "bg-green-100 text-green-800 border-green-300",
            warning: "bg-yellow-100 text-yellow-600 border-yellow-300",
            danger: "bg-red-100 text-red-600 border-red-300",
          }[ratioLevel],
          actualPercentage !== "nan" && "-translate-x-1/2",
        )}
        style={{
          left: percentageUpTo100 === "nan" ? 0 : `${percentageUpTo100}%`,
        }}
      >
        {actualPercentage === "nan" ? "NaN" : `${actualPercentage}%`}
      </span>
    </div>
  );
};

const cx = (...classes: (string | false)[]) =>
  classes.filter(Boolean).join(" ");
