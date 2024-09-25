export const CompressionRatio: React.FC<{
  percentage: number | "none";
}> = ({ percentage: _percentage }) => {
  const percentage =
    typeof _percentage === "number"
      ? Math.max(0, Math.round(_percentage))
      : "none";

  const ratioLevel =
    percentage === "none"
      ? "none"
      : percentage <= 50
      ? "safe"
      : percentage > 50 && percentage <= 80
      ? "warning"
      : "danger";

  return (
    <div>
      <div
        role="progressbar"
        aria-valuenow={percentage === "none" ? 0 : percentage}
        aria-valuemin={0}
        aria-valuemax={100}
        className={cx(
          "w-full h-3.5 rounded-full relative",
          {
            none: "bg-gray-200",
            safe: "bg-green-200",
            warning: "bg-yellow-200",
            danger: "bg-red-200",
          }[ratioLevel],
        )}
      >
        <div
          className={cx(
            "h-full rounded-full transition-all starting:w-0",
            {
              none: "bg-gray-500",
              safe: "bg-green-500",
              warning: "bg-yellow-500",
              danger: "bg-red-500",
            }[ratioLevel],
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span
        className={cx(
          "relative font-bold text-xs inline-block px-1 py-0.5 rounded border-2 -translate-x-1/2 mt-1",
          {
            none: "bg-gray-200 text-gray-600 border-gray-300",
            safe: "bg-green-100 text-green-800 border-green-300",
            warning: "bg-yellow-100 text-yellow-600 border-yellow-300",
            danger: "bg-red-100 text-red-600 border-red-300",
          }[ratioLevel],
        )}
        style={{
          left: `${percentage}%`,
        }}
      >
        {percentage}%
      </span>
    </div>
  );
};

const cx = (...classes: (string | false)[]) =>
  classes.filter(Boolean).join(" ");
