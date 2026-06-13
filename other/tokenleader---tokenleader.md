# Deploy tokenleader on Railway

Self-hosted token-usage leaderboard for Claude Code, Codex CLI, and Cursor

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tokenleader)

## About

tokenleader is a self-hosted token-usage leaderboard for AI coding tools — Claude Code, Codex CLI, and Cursor. A tiny daemon on each teammate's Mac reports token counts (never message content) to your server; the dashboard shows who's burning the most tokens, what it costs, and which models everyone uses.

tokenleader is a single lightweight Bun + Hono server with an embedded SQLite database — no external database, queue, or cache to run. Deploying it means running one container with a persistent volume mounted at /data and a public HTTPS URL. This template handles all of it: it builds from the official Dockerfile, attaches the volume, exposes the dashboard, and health-checks /health. After deploying, open your URL, expand "Add a teammate," and each teammate runs one command on their Mac. Daemons authenticate with per-user secrets, auto-update through your server, and the database grows slowly — about 1 GB covers a team-year.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tokenleader | [anaralabs/tokenleader](https://github.com/anaralabs/tokenleader) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TOKENLEADER_GH_REPO` | (secret) | GitHub repo the server mirrors daemon releases from. Leave as-is to track upstream. |
| `TOKENLEADER_GH_TOKEN` | (secret) | Optional read-only GitHub token - only needed if the release mirror hits GitHub's anonymous rate limits. |
| `TOKENLEADER_TEAM_NAME` | (secret) | Team name shown in the dashboard header. |
| `TOKENLEADER_SERVER_URL` | (secret) | Public URL of this deployment, rendered into the install command teammates run. |
| `TOKENLEADER_ADMIN_TOKEN` | (secret) | Bearer token for destructive admin actions (clearing data). Never shared with teammates. |
| `TOKENLEADER_DASHBOARD_TOKEN` | (secret) | Viewer token for the dashboard - you'll be it on first visit. Remove this variable to make the dashboard public. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, Shell, CSS, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/tokenleader)
