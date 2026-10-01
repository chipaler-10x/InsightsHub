import { getLevelSummary } from "@/lib/level-summary";
import { LevelSummaryChart } from "@/components/LevelSummaryChart";

export default function Home() {
  const { groups, isExampleData } = getLevelSummary();
  const maxWinRate = Math.max(
    ...groups.flatMap((g) => g.levels.map((l) => l.winRate)),
  );
  const scaleMax = Math.max(0.05, Math.ceil(maxWinRate * 20) / 20);

  return (
    <main className="min-h-screen px-6 py-10 max-w-5xl mx-auto w-full">
      <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100 mb-1">
        InsightsHub
      </h1>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
        Single Cell conjoint study — win rate by feature level (share of times
        a level was shown that led to it being chosen). Scale: 0–
        {Math.round(scaleMax * 100)}% for every chart below.
      </p>

      {isExampleData && (
        <div className="mb-6 rounded border border-amber-400/50 bg-amber-50 dark:bg-amber-950/30 px-4 py-2 text-sm text-amber-900 dark:text-amber-200">
          Showing example data —{" "}
          <code>src/data/conjoint-level-summary.json</code> isn&apos;t present
          locally. See the README for how to generate it from the source
          workbook.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map((g) => (
          <LevelSummaryChart
            key={g.attribute}
            attribute={g.attribute}
            levels={g.levels}
            scaleMax={scaleMax}
          />
        ))}
      </div>
    </main>
  );
}
