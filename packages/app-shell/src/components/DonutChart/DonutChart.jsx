import { cx } from "../../ui/cx.js";
import { useEffect, useState } from "react";

const colors = ["#2563eb", "#059669", "#d97706", "#e11d48", "#7c3aed"];

export function DonutChart({ data = [], label = "Total", valueFormatter = (value) => value, className }) {
  const [isAnimated, setIsAnimated] = useState(false);
  const total = data.reduce((sum, item) => sum + Number(item.value || 0), 0);
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsAnimated(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={cx("relative inline-flex size-44 items-center justify-center", className)}>
      <svg aria-label={`${label}: ${valueFormatter(total)}`} className="size-full -rotate-90" role="img" viewBox="0 0 140 140">
        <circle cx="70" cy="70" fill="none" r={radius} stroke="currentColor" strokeWidth="16" className="text-gray-100 dark:text-gray-800" />
        {total > 0 && data.map((item, index) => {
          const value = Number(item.value || 0);
          const segment = (value / total) * circumference;
          const segmentOffset = offset;
          offset += segment;

          return (
            <circle
              cx="70"
              cy="70"
              fill="none"
              key={item.name ?? index}
              r={radius}
              stroke={item.color ?? colors[index % colors.length]}
              strokeDasharray={isAnimated ? `${segment} ${circumference - segment}` : `0 ${circumference}`}
              strokeDashoffset={isAnimated ? -segmentOffset : 0}
              strokeWidth="16"
              className="cursor-pointer transition-[stroke-dasharray,stroke-dashoffset,opacity] duration-700 ease-out hover:opacity-75 motion-reduce:transition-none"
            >
              <title>{item.name} - {valueFormatter(item.value)}</title>
            </circle>
          );
        })}
      </svg>
      <div className="absolute text-center">
        <p className="text-2xl font-semibold tracking-tight text-gray-950 dark:text-gray-50">{valueFormatter(total)}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}
