@AGENTS.md

# InsightsHub

A team dashboard for primary and secondary research, pulling data from external sources.

## Stack (decided)

- **Next.js (App Router) + TypeScript** — one repo for UI and simple API routes.
- **Tailwind CSS** for styling.
- **Hosting: TBD** — team decided against Vercel (2026-09-29); no replacement chosen yet. Don't assume any specific host until this is updated.
- Data is pulled from external sources at runtime/build time (not hand-entered or stored locally) — likely via API routes acting as a thin proxy/aggregator.
- If a data source turns out to need heavy processing (ETL, scraping, ML) rather than a simple API call, revisit: a separate Python service may fit better than cramming that into Next.js API routes.

## Commands

```bash
npm install       # install dependencies
npm run dev       # local dev server, http://localhost:3000
npm run build     # production build
npm run lint      # eslint
```

## Workflow

- Branch off `main`: `feature/<name>` or `fix/<name>`.
- Commit, push, open a PR. Don't push directly to `main`.
- `npm run build` and `npm run lint` must pass before merge.

## Team notes for Claude

- This is a **team-shared repo**, not a personal scratch project — confirm before merging PRs, changing shared config (env vars, Vercel project settings), or touching anything other collaborators depend on.
- Keep this file current as the project takes shape. If something here goes stale, fix it in the same PR you noticed it in.
