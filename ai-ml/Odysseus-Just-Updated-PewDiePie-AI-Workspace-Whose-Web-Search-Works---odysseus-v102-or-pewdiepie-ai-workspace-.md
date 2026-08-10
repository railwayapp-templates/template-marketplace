# Deploy Odysseus | (Just Updated) PewDiePie AI Workspace Whose Web Search Works on Railway

Deploy this application on Railway.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/odysseus-v102-or-pewdiepie-ai-workspace-)

## About

Odysseus is the open-source, self-hosted AI workspace from PewDiePie's
`archdaemon` project — multi-provider chat, an agent system with tools,
persistent memory and skills, Deep Research, side-by-side model comparison,
document editing, RAG over your own uploads, notes, tasks, email and calendar,
in one mobile-friendly app. You bring your own model through any
OpenAI-compatible API, and every conversation stays on infrastructure you
control.

This template deploys Odysseus v1.0.2 from the **official upstream image**,
with a SearXNG that actually answers the app's search calls.

Odysseus is not a single container. The web app needs a vector store for its
memory and RAG (ChromaDB), a metasearch engine for web search and Deep Research
(SearXNG), and a push server for reminders and agent notifications (ntfy). This
template wires all four over Railway's private network, gives the app, the
vector store and the push cache persistent volumes, exposes only the
authenticated web UI publicly, and seeds the admin account from a generated
password before the first request is ever served.

Two things are done differently here, and both are measurable:

- **The official image, pinned by digest.** Every other Odysseus listing on
  Railway either builds the app from a personal fork on your build minutes or
  runs an unofficial rebuild. The most-deployed one advertises an August update
  while its fork's last commit is 2026-06-09 — **892 upstream commits** behind,
  including roughly ten `fix(security)` commits (webhook SSRF and DNS-rebinding
  guards, sensitive-file deny-list matching, session-owner scoping). The
  wrapper image here is `FROM` the upstream image, pinned by digest, and adds
  only the three Railway-specific fixes described below.
- **Web search that returns results instead of 403.** Odysseus queries SearXNG
  with `format=json`. The stock SearXNG image ships `search.formats: [html]`
  only, so an unmodified SearXNG answers **HTTP 403** to every web search and
  Deep Research call while its own container stays perfectly healthy. The
  SearXNG image here installs the settings file upstream Odysseus ships for
  exactly that reason. Verified on the live deploy: a search through the app
  returns ranked results.

The other Railway fixes in the wrapper image:

- **The listener follows Railway's injected `$PORT`.** Upstream's command
  hardcodes `--port 7000`. Railway's HTTP healthcheck dials the injected port,
  not the domain's target port, so a fixed listener means a healthchecked
  service never goes healthy.
- **A real healthcheck.** Every other Odysseus listing publishes no
  healthcheck path at all, so a half-broken boot still reports SUCCESS. This
  one probes `/api/health`, which upstream leaves outside the auth middleware.
- **`@playwright/mcp` is warmed into the npx cache at build time.** Upstream
  installs it over the network on first start; on Railway that cache lives on
  the ephemeral layer, so the download repeats on every deploy and the
  Built-in: Browser MCP server is missing until it finishes.
- **ntfy stays private.** It is reachable only over Railway's private network.
  An ntfy server with a public domain and no auth lets anyone who finds the URL
  read and publish to your notification topics.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ntfy | `binwiederhier/ntfy:v2.15.0` | Database |
| odysseus | `ghcr.io/bon5co/odysseus-railway:latest` | Web service |
| searxng | `ghcr.io/bon5co/odysseus-railway-searxng:latest` | Worker |
| chroma | `chromadb/chroma:1.0.21` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `ODYSSEUS_ADMIN_PASSWORD` | odysseus | (secret) |
| `SEARXNG_SECRET` | searxng | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'exec ntfy serve --cache-file /var/cache/ntfy/cache.db --base-url "$NTFY_BASE_URL" --listen-http :8080'`
- **Volume:** `/var/cache/ntfy`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/data`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/odysseus-v102-or-pewdiepie-ai-workspace-)
