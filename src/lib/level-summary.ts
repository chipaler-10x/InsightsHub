import fs from "node:fs";
import path from "node:path";

export type LevelSummaryEntry = {
  attribute: string;
  level: string;
  timesShown: number;
  timesChosen: number;
  winRate: number;
};

export type AttributeGroup = {
  attribute: string;
  levels: LevelSummaryEntry[];
};

// Real data is local-only (gitignored) — see README for how to generate it
// from the source conjoint workbook. Falls back to generic example data
// so the app runs out of the box for anyone who clones the repo.
const REAL_DATA_PATH = path.join(
  process.cwd(),
  "src/data/conjoint-level-summary.json",
);
const EXAMPLE_DATA_PATH = path.join(
  process.cwd(),
  "src/data/conjoint-level-summary.example.json",
);

export function getLevelSummary(): {
  groups: AttributeGroup[];
  isExampleData: boolean;
} {
  const isExampleData = !fs.existsSync(REAL_DATA_PATH);
  const filePath = isExampleData ? EXAMPLE_DATA_PATH : REAL_DATA_PATH;
  const entries: LevelSummaryEntry[] = JSON.parse(
    fs.readFileSync(filePath, "utf-8"),
  );

  const byAttribute = new Map<string, LevelSummaryEntry[]>();
  for (const entry of entries) {
    const list = byAttribute.get(entry.attribute) ?? [];
    list.push(entry);
    byAttribute.set(entry.attribute, list);
  }

  const groups: AttributeGroup[] = Array.from(byAttribute.entries()).map(
    ([attribute, levels]) => ({
      attribute,
      levels: [...levels].sort((a, b) => b.winRate - a.winRate),
    }),
  );

  return { groups, isExampleData };
}
