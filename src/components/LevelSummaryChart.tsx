"use client";

import { useState } from "react";
import type { LevelSummaryEntry } from "@/lib/level-summary";

function formatPct(n: number) {
  return `${Math.round(n * 100)}%`;
}

export function LevelSummaryChart({
  attribute,
  levels,
  scaleMax,
}: {
  attribute: string;
  levels: LevelSummaryEntry[];
  scaleMax: number;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="viz-root rounded-lg border border-black/10 dark:border-white/10 p-4">
      <h3 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 mb-3">
        {attribute}
      </h3>
      <div className="flex flex-col gap-3">
        {levels.map((entry) => {
          const widthPct = Math.max(1, (entry.winRate / scaleMax) * 100);
          const isHovered = hovered === entry.level;
          return (
            <div key={entry.level} className="relative">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="text-xs text-neutral-600 dark:text-neutral-400 leading-snug">
                  {entry.level}
                </span>
                <span className="text-xs tabular-nums text-neutral-900 dark:text-neutral-100 shrink-0">
                  {formatPct(entry.winRate)}
                </span>
              </div>
              <div
                className="h-2 rounded-r-[4px] outline-none focus-visible:ring-2 focus-visible:ring-[var(--chart-series-1)]"
                style={{
                  width: `${widthPct}%`,
                  backgroundColor: isHovered
                    ? "var(--chart-series-1-hover)"
                    : "var(--chart-series-1)",
                }}
                onMouseEnter={() => setHovered(entry.level)}
                onMouseLeave={() => setHovered((h) => (h === entry.level ? null : h))}
                onFocus={() => setHovered(entry.level)}
                onBlur={() => setHovered((h) => (h === entry.level ? null : h))}
                tabIndex={0}
                role="img"
                aria-label={`${entry.level}: ${formatPct(entry.winRate)} win rate, shown ${entry.timesShown} times, chosen ${entry.timesChosen} times`}
              />
              {isHovered && (
                <div className="absolute left-0 top-full z-10 mt-1 rounded bg-neutral-900 text-white text-xs px-2 py-1 shadow-lg dark:bg-neutral-100 dark:text-neutral-900 whitespace-nowrap">
                  Shown {entry.timesShown.toLocaleString()} · Chosen{" "}
                  {entry.timesChosen.toLocaleString()}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
