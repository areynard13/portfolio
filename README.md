# Portfolio

My personal portfolio: an interactive single-page site presenting my education, experience, projects, skills and live GitHub stats.

**Live:** [adrien-reynard.ch](https://adrien-reynard.ch)

## Tech stack

- **[React 19](https://react.dev)** + **[Vite](https://vite.dev)**
- **[Tailwind CSS 4](https://tailwindcss.com)**, plus per-section CSS
- **[React Bits](https://reactbits.dev)**-style animated components (`DotField`, `TechText`, `SpotlightCard`, `GlassIcons`, …)
- **[GSAP](https://gsap.com)**, **[Motion](https://motion.dev)** and **[Matter.js](https://brm.io/matter-js/)** for animations and physics
- **[Bun](https://bun.sh)** as package manager and script runner
- **GitHub Actions** + **GitHub Pages** for deployment

## Project structure

```
src/
├── components/   # Reusable animated UI components
├── data/         # Site content (projects, experience, skills, contact, …)
├── hooks/        # Custom hooks (scroll reveal)
├── lib/          # Helpers (GitHub stats loader)
└── sections/     # Page sections: Hero, Education, Experience, Projects, Skills, Stats, Contact
scripts/
└── fetch-github-stats.mjs   # Fetches GitHub stats at build time
```

Most content changes only require editing the files in `src/data/`.

## Getting started

**Prerequisites:** [Bun](https://bun.sh) installed.

```bash
# Install dependencies
bun install

# Configure your GitHub token (see below)
cp .env.example .env

# Fetch GitHub stats into public/github-stats.json
bun run stats

# Start the dev server
bun run dev
```

### Available scripts

| Command           | Description                                       |
| ----------------- | ------------------------------------------------- |
| `bun run dev`     | Start the Vite dev server                         |
| `bun run stats`   | Fetch GitHub stats into `public/github-stats.json` |
| `bun run build`   | Build the site for production into `dist/`        |
| `bun run preview` | Preview the production build locally              |
| `bun run lint`    | Run ESLint                                        |

## GitHub stats

The **Stats** section shows contributions, pull requests, followers and following.

The data is fetched from the GitHub GraphQL API **at build time** by `scripts/fetch-github-stats.mjs` and written to `public/github-stats.json`, so no token ever reaches the browser. The site then simply loads that JSON file.

The script needs a `GH_STATS_TOKEN` environment variable. A [fine-grained personal access token](https://github.com/settings/personal-access-tokens) with no repository permissions is enough (public data only).

- **Locally:** set it in `.env`.
- **In CI:** stored as the `MY_GITHUB_PAT` repository secret.

## Deployment

The site is deployed to GitHub Pages by [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), which runs:

- on every push to `main`,
- manually (`workflow_dispatch`),
- on a schedule, **twice a day at 00:00 and 12:00 Swiss time**, to refresh the GitHub stats.

GitHub cron schedules are in UTC and ignore daylight saving time, so the workflow is triggered at both the winter (CET) and summer (CEST) UTC times, and a small `schedule-gate` job only lets through the runs that fall on 00h or 12h in `Europe/Zurich`.

## License

Released under the [GNU General Public License v3.0](LICENSE).
