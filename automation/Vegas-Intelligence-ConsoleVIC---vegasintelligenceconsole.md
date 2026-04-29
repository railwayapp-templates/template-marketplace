# Deploy Vegas Intelligence Console(VIC) on Railway

Sharp betting intelligence engine, line movement, and AI picks.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vegasintelligenceconsole)

## About

Vegas Intelligence Console (VIC) is a sharp betting intelligence engine that scrapes public betting percentages, tracks line movement, detects steam and reverse line movement, monitors injuries and weather, and generates high-confidence picks, all wrapped in a slick dark-green terminal aesthetic.

VIC is a Node.js/Express application that proxies and aggregates sports betting data from multiple public sources. To host it, you need a server environment with Node.js 20+, outbound internet access for API calls, and optionally a persistent volume to retain signal history, bet logs, and backtest data across redeploys. Railway handles all of this automatically: Nixpacks builds the app from your GitHub repo, the healthcheck endpoint ensures clean startups, and a single click adds persistent storage if you need it.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Vegas Intelligence Console(VIC) | [oddsifylabs/vic](https://github.com/oddsifylabs/vic) | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ODDS_API_KEY` | (secret) |
| `CLAUDE_API_KEY` | (secret) |
| `TELEGRAM_BOT_TOKEN` | (secret) |

## Configuration

- **Volume:** `/data`

**Category:** Automation · **Languages:** HTML, JavaScript, CSS, Shell, Batchfile, PowerShell, Procfile

[View on Railway →](https://railway.com/deploy/vegasintelligenceconsole)
