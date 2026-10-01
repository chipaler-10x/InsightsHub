# InsightsHub

A team dashboard for primary and secondary research, pulling data from external sources.

Built with [Next.js](https://nextjs.org), TypeScript, and Tailwind CSS. See [CLAUDE.md](CLAUDE.md) for stack decisions and workflow conventions.

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result. Edit `src/app/page.tsx` — the page auto-updates as you edit.

## Data

The home page charts the Single Cell conjoint study's "Level summary" sheet (win rate per feature level). That data is **internal/confidential and not committed** — this repo is public, so `src/data/conjoint-level-summary.json` is gitignored. Without it, the app falls back to generic example data (`src/data/conjoint-level-summary.example.json`) so it still runs out of the box.

To see the real data locally:
1. Get `Conjoint__SC_Full_Data_v4_1_updated_1.xlsx` from the `20250915_SC Consumables Pricing Conjoint` Drive folder.
2. Read the **"Level summary"** sheet (columns: Attribute, Level, Times Shown, Times Chosen, Win Rate) — forward-fill the `Attribute` column, since it's only populated on each group's first row.
3. Export as JSON matching the shape in `conjoint-level-summary.example.json` (`attribute`, `level`, `timesShown`, `timesChosen`, `winRate`) and save it as `src/data/conjoint-level-summary.json`.

This is a stub — a proper integration (pulling live from Drive via a service account, rather than a manual export) is still to be built.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy

Deployed via [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) — see [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying) for details.
