# 東京仙台 5日遊 Travel Planner

A mobile-friendly travel itinerary & expense tracker for a 5-day Tokyo–Sendai trip.

Built with **React** + **Vite** + **Tailwind CSS**.

## Features

- **Itinerary** — Day-by-day schedule with add / edit / delete
- **Expense Tracker** — Track spending in JPY & TWD, by payer
- **Restaurant Guide** — Curated Tabelog 3.5+ recommendations
- **Import / Export** — Share itinerary via file download or text code

## Development

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Deploy to GitHub Pages

This project is configured for automatic deployment via GitHub Actions.

### Setup (one-time)

1. Push this repo to GitHub (repo name: `tokyo-trip`)
2. Go to **Settings → Pages → Source** → select **GitHub Actions**
3. Push to `main` branch — the site deploys automatically

Your site will be live at: `https://<your-username>.github.io/tokyo-trip/`

### Manual deploy (alternative)

```bash
pnpm run deploy
```

> If your repo name is different from `tokyo-trip`, update the `base` field in `vite.config.js`.
