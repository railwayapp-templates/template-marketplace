# Deploy Engram on Railway

Self-hosted MCP second brain: long-term memory for your AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/engram)

## About

Engram is a self-hosted MCP server and dashboard that gives Claude Code, Cursor, Hermes, and any Model Context Protocol agent shared, long-term memory — over a plain, git-backed folder of Markdown. Humans edit notes in a fast dashboard; agents read and write the same knowledge through one MCP endpoint.

Engram runs as a single container with a persistent volume mounted at `/data`, where it keeps app state and clones of your Markdown vault. It is not serverless — it holds a file watcher, an in-memory search + knowledge-graph index, and an optional git-sync loop, so it needs a long-running process and a disk. This template provisions the service and volume for you; you supply a handful of bootstrap variables (an auth secret, your public URL, an email allowlist, and Google OAuth credentials for dashboard login). Everything else — git sync, AI capture, GitHub connect, app name — is configured afterward in the in-app Settings page, with no redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| engram | [rwnalds/engram](https://github.com/rwnalds/engram) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `AUTH_SECRET` | (secret) | - |
| `AUTH_DISABLED` | - | Single-user local mode: no Google auth, MCP open. NEVER true in production. |
| `ALLOWED_EMAILS` | - | Comma-separated (test@gmail.com,another@gmail.com)) |
| `ENGRAM_DATA_DIR` | /data | - |
| `GITHUB_CLIENT_ID` | - | "Connect GitHub" repo flow (URL+token path needs no OAuth app) |
| `GIT_SYNC_ENABLED` | - | Overrides 'auto commit + push the active vault' default |
| `GITHUB_CLIENT_SECRET` | (secret) | OAuth app "Authorization callback URL": <APP_URL>/api/github/callback |
| `GOOGLE_CLIENT_SECRET` | (secret) | - |
| `NEXT_PUBLIC_APP_NAME` | - | Overrides display name (sidebar + browser tab) |

## Configuration

- **Volume:** `/data`

**Category:** AI/ML · **Languages:** TypeScript, CSS, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/engram)
