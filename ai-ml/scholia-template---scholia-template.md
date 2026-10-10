# Deploy scholia-template on Railway

Self-hosted second brain for Claude and AI agents, over MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/scholia-template)

## About

scholia is a self-hosted second brain for AI agents. Claude (on claude.ai, mobile or Claude Code) saves distilled notes from your conversations — decisions, data with sources, positions, open questions — and searches them before answering in new ones, citing the note it used.

This template runs two services: Postgres with pgvector, and the scholia MCP server, built from [github.com/daniel-bernardino747/scholia-mcp](https://github.com/daniel-bernardino747/scholia-mcp). claude.ai connects to it as a custom connector and logs in with GitHub; only the GitHub accounts you list get in.

Before deploying, get an embedding API key from [Voyage AI](https://dashboard.voyageai.com) or OpenAI.

1. Deploy. Fill the GitHub fields with placeholders for now; the server will refuse to start and say which variable is missing.
2. Copy the service's public URL. Create a GitHub OAuth App at github.com/settings/applications/new with that URL as homepage and `/auth/callback` as Redirect URI.
3. Set `GITHUB_CLIENT_ID`, `GITHUB_CLIENT_SECRET` and `ALLOWED_GITHUB_USERS` (your numeric GitHub ID) and redeploy.
4. In claude.ai → Settings → Connectors, add a custom connector with `/mcp`, and paste the [preference instructions](https://github.com/daniel-bernardino747/scholia-mcp/tree/main/instructions) into your profile.

Turn on Backups for the pgvector service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pgvector | `pgvector/pgvector:pg18` | Database |
| scholia-mcp | [daniel-bernardino747/scholia-mcp](https://github.com/daniel-bernardino747/scholia-mcp) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | pgvector | - | Database name. Default railway. |
| `DATABASE_URL` | pgvector | - | Public connection URL (e.g. for running reindex from your machine). |
| `POSTGRES_USER` | pgvector | (secret) | Database superuser name. |
| `PGHOST_PRIVATE` | pgvector | - | Private network host, used by the scholia server. |
| `PGPORT_PRIVATE` | pgvector | - | Private network port, used by the scholia server. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Database password, generated on deploy. Do not change. |
| `DATABASE_URL_PRIVATE` | pgvector | - | Private connection URL, used by the scholia server. |
| `BASE_URL` | scholia-mcp | - | Public URL of this service, used for OAuth callbacks. Leave as is. |
| `AUTH_MODE` | scholia-mcp | github | github (OAuth, needed for claude.ai) or bearer (one shared token). |
| `DATABASE_URL` | scholia-mcp | - | Postgres with pgvector, over the private network. Leave as is. |
| `VOYAGE_API_KEY` | scholia-mcp | (secret) | Required when EMBEDDING_PROVIDER=voyage. |
| `GITHUB_CLIENT_ID` | scholia-mcp | - | From a GitHub OAuth App whose Redirect URI is <this service's URL>/auth/callback. |
| `ALLOWED_GITHUB_USERS` | scholia-mcp | - | Your numeric GitHub ID (https://api.github.com/users/<login> → id). Comma-separate several. |
| `GITHUB_CLIENT_SECRET` | scholia-mcp | (secret) | From the same OAuth App. |

## Configuration

- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/scholia-template)
