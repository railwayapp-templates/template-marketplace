# Deploy Engram on Railway

Git-backed markdown memory for AI agents that knows what's still true

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/engram)

## About

Engram is a self-hosted MCP server and dashboard that gives Claude Code, Cursor, and any Model Context Protocol agent shared long-term memory over a plain, git-backed folder of markdown. Unlike a vector store, it tracks whether a fact is *still true* — retire a price or a contract term and search stops surfacing it, and tells the agent what it skipped and why.

Engram runs as a single Docker container with a persistent volume. It is **not** serverless — it holds a mounted volume, a file watcher, and an in-memory search index that a serverless function cannot keep alive. This template deploys the dashboard plus the HTTP MCP endpoint from a pinned, multi-arch image.

Setup is one volume mounted at `/data` and five environment variables that bootstrap auth and tell the app where state lives. Everything else — git sync, commit author, the optional Curator agent, GitHub OAuth — is configured in the dashboard Settings page with no redeploy. Vault repositories are connected through the UI rather than baked into the deployment, so you can add, switch, or remove them at any time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rwnalds/engram:latest | `ghcr.io/rwnalds/engram:latest` | Database |

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

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/engram)
