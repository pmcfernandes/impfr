import { cx } from "../../ui/cx.js";
import { useEffect, useRef, useState } from "react";

export function LineChart({ data = [], color = "#2563eb", valueFormatter = (value) => value, className }) {
  const height = 180;
  const containerRef = useRef(null);
  const [width, setWidth] = useState(360);
  const [isAnimated, setIsAnimated] = useState(false);
  const padding = 22;
  const values = data.map((item) => Number(item.value || 0));
  const minValue = Math.min(...values, 0);
  const maxValue = Math.max(...values, 1);
  const valueRange = maxValue - minValue || 1;
  const horizontalStep = data.length > 1 ? (width - padding * 2) / (data.length - 1) : 0;
  const points = data.map((item, index) => ({
    ...item,
    x: padding + horizontalStep * index,
    y: height - padding - ((Number(item.value || 0) - minValue) / valueRange) * (height - padding * 2),
  }));

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    function updateWidth() {
      setWidth((container.clientWidth / Math.max(container.clientHeight, 1)) * height);
    }

    updateWidth();
    const frame = requestAnimationFrame(() => setIsAnimated(true));
    const observer = new ResizeObserver(updateWidth);
    observer.observe(container);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div className={cx("h-56 w-full", className)} ref={containerRef}>
      <svg aria-label="Gráfico de linhas" className="size-full overflow-visible" role="img" viewBox={`0 0 ${width} ${height}`}>
        <line stroke="currentColor" strokeDasharray="3 4" strokeWidth="1" className="text-gray-200 dark:text-gray-800" x1={padding} x2={width - padding} y1={height - padding} y2={height - padding} />
        {points.length > 1 && <polyline className="transition-[stroke-dashoffset] duration-700 ease-out motion-reduce:transition-none" fill="none" pathLength="1" points={points.map((point) => `${point.x},${point.y}`).join(" ")} stroke={color} strokeDasharray="1" strokeDashoffset={isAnimated ? "0" : "1"} strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />}
        {points.map((point, index) => (
          <g key={point.name ?? index}>
            <circle className="cursor-pointer transition-opacity duration-500 ease-out hover:opacity-75 motion-reduce:transition-none dark:fill-gray-950" cx={point.x} cy={point.y} fill="white" opacity={isAnimated ? 1 : 0} r="5" stroke={color} strokeWidth="3" />
            <title>{point.name} - {valueFormatter(point.value)}</title>
            <text fill="currentColor" fontSize="10" textAnchor="middle" className="text-gray-500 dark:text-gray-400" x={point.x} y={height - 5}>{point.name}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}
