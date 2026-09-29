import { cx } from "../../ui/cx.js";
import { useEffect, useState } from "react";

const colors = ["bg-blue-500", "bg-emerald-500", "bg-amber-500", "bg-rose-500", "bg-violet-500"];

function colorProps(color, index) {
  const isClassName = color?.startsWith("bg-");
  return {
    className: isClassName ? color : colors[index % colors.length],
    style: color && !isClassName ? { backgroundColor: color } : undefined,
  };
}

export function BarChart({ data = [], orientation = "vertical", valueFormatter = (value) => value, className }) {
  const [isAnimated, setIsAnimated] = useState(false);
  const maxValue = Math.max(...data.map((item) => Number(item.value || 0)), 1);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  if (orientation === "horizontal") {
    return (
      <div aria-label="Gráfico de barras horizontal" className={cx("space-y-4", className)} role="img">
        {data.map((item, index) => {
          const percentage = (Number(item.value || 0) / maxValue) * 100;
          const barColor = colorProps(item.color, index);

          return (
            <div className="grid grid-cols-[minmax(0,8rem)_1fr_auto] items-center gap-3" key={item.name ?? index}>
              <span className="truncate text-sm text-gray-600 dark:text-gray-300">{item.name}</span>
              <div className="h-3 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                <div className={cx("h-full cursor-pointer rounded-full transition-[width,opacity] duration-700 ease-out hover:opacity-75 motion-reduce:transition-none", barColor.className)} style={{ ...barColor.style, width: `${isAnimated ? percentage : 0}%` }} title={`${item.name} - ${valueFormatter(item.value)}`} />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{valueFormatter(item.value)}</span>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div aria-label="Gráfico de barras vertical" className={cx("flex h-56 items-end gap-3", className)} role="img">
      {data.map((item, index) => {
        const percentage = (Number(item.value || 0) / maxValue) * 100;
        const barColor = colorProps(item.color, index);

        return (
          <div className="flex h-full min-w-0 flex-1 flex-col justify-end gap-2" key={item.name ?? index}>
            <span className="text-center text-xs font-medium text-gray-500 dark:text-gray-400">{valueFormatter(item.value)}</span>
            <div className="flex flex-1 items-end rounded-t bg-gray-100 dark:bg-gray-800">
              <div className={cx("w-full cursor-pointer rounded-t transition-[height,opacity] duration-700 ease-out hover:opacity-75 motion-reduce:transition-none", barColor.className)} style={{ ...barColor.style, height: `${isAnimated ? percentage : 0}%` }} title={`${item.name} - ${valueFormatter(item.value)}`} />
            </div>
            <span className="truncate text-center text-xs text-gray-500 dark:text-gray-400">{item.name}</span>
          </div>
        );
      })}
    </div>
  );
}
