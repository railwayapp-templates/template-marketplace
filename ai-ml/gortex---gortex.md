# Deploy gortex on Railway

Code-intelligence MCP server for AI agents, with web UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gortex)

## About

gortex is the open-source code-intelligence engine for AI coding agents. It parses repositories with tree-sitter into a graph of symbols, calls, usages, and contracts, and serves precise answers over MCP, so an agent reads the ten lines it needs instead of the whole file and spends up to fifty times fewer tokens. This template runs gortex 0.64.1 as a hosted daemon with a persistent volume, plus the upstream web UI behind a password.

Hosting gortex on Railway means one daemon service and one optional UI service. The daemon runs the pinned upstream release binary, clones the repositories you list in a variable into its volume, indexes them, keeps them synced with git, and serves MCP Streamable HTTP at `/mcp` and a JSON API at `/v1/*`, both protected by a bearer token generated at deploy time. The UI service builds gortex's web app and puts Caddy in front of it: people sign in with a username and password, and Caddy forwards API calls to the daemon over Railway's private network with the token added server-side, so the token never reaches a browser. There is no database and no LLM key; the graph lives in an embedded SQLite store on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| web | [RockinPaul/gortex_railway_template](https://github.com/RockinPaul/gortex_railway_template) | Web service |
| gortex | [RockinPaul/gortex_railway_template](https://github.com/RockinPaul/gortex_railway_template) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | web | 8080 | Port Caddy listens on in front of the UI. |
| `WEB_USER` | web | (secret) | Username for the web UI sign-in. |
| `WEB_PASSWORD` | web | (secret) | Password for the web UI sign-in. Generated on deploy. |
| `GORTEX_DAEMON_HTTP_TOKEN` | web | (secret) | - |
| `PORT` | gortex | 7411 | Port the daemon listens on for the public domain and the private network. |
| `GIT_TOKEN` | gortex | (secret) | Read token for private https repositories, for example a GitHub fine-grained token. Passed to git through a credential helper, never stored in URLs. |
| `GORTEX_REPOS` | gortex | https://github.com/zzet/gortex | Comma-separated git URLs to clone, track and index, or name=url pairs. Private repos need GIT_TOKEN. Replace the default with your repositories. |
| `GORTEX_TOOLS` | gortex | readonly | MCP tool preset the daemon publishes. readonly excludes tools that write files; other presets: core, full, nav, localization. |
| `GORTEX_SYNC_INTERVAL` | gortex | 300 | Seconds between git pull rounds for the tracked repos. 0 disables syncing. |
| `GORTEX_DAEMON_MEMLIMIT` | gortex | - | Soft memory cap for the daemon, for example 4GiB. Leave empty for no cap; indexing memory scales with repository size. |
| `GORTEX_DAEMON_HTTP_TOKEN` | gortex | (secret) | Bearer token for /mcp and /v1/*, read natively by gortex. Generated on deploy; keep it private and change it to rotate. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/gortex)
