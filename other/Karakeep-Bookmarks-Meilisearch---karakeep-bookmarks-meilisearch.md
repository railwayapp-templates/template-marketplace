# Deploy Karakeep Bookmarks + Meilisearch on Railway

Karakeep AI bookmark manager with Meilisearch search and headless Chrome

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/karakeep-bookmarks-meilisearch)

## About

Karakeep (formerly Hoarder) is an open-source, self-hostable "bookmark everything" app. Save links, notes, images and PDFs from the web app, browser extension or mobile apps; a headless Chrome crawls and archives each page, Meilisearch makes the whole collection full-text searchable, and an optional LLM tags and summarizes everything automatically.

Hosting Karakeep means running three containers together: the Karakeep app (Next.js web app, background workers and a SQLite database on one persistent directory), Meilisearch for search, and a headless Chrome for crawling. This template uses the official images pinned to the current release (`ghcr.io/karakeep-app/karakeep:0.33.2`, `getmeili/meilisearch:v1.41.0`, `ghcr.io/karakeep-app/karakeep-chrome:151.0.7922.47-r1`), attaches a volume to Karakeep at `/data` and to Meilisearch at `/meili_data`, generates `NEXTAUTH_SECRET` and the Meilisearch master key, and wires the services together over Railway's private network. Meilisearch binds `[::]:7700` and the Chrome service exposes its DevTools port through a dual-stack listener so both are reachable over IPv6.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Chrome | `ghcr.io/karakeep-app/karakeep-chrome:151.0.7922.47-r1` | Worker |
| Meilisearch | `getmeili/meilisearch:v1.41.0` | Database |
| Karakeep | `ghcr.io/karakeep-app/karakeep:0.33.2` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Chrome | 9222 | DevTools port exposed to the private network (socat listener in the start command). Referenced by Karakeep as ${{Chrome.PORT}}. Chrome itself listens on 127.0.0.1:9223 behind it. |
| `PORT` | Meilisearch | 7700 | Meilisearch listen port. Must match MEILI_HTTP_ADDR so Railway's /health check and Karakeep's ${{Meilisearch.PORT}} reference hit the right port. |
| `MEILI_ENV` | Meilisearch | production | Production mode: master key required, web dashboard disabled. |
| `MEILI_HTTP_ADDR` | Meilisearch | [::]:7700 | Bind address. The image default 0.0.0.0:7700 is IPv4-only; [::] makes Meilisearch reachable over Railway's IPv6 private network. |
| `MEILI_MASTER_KEY` | Meilisearch | - | Master key protecting the Meilisearch API. Referenced by the Karakeep service. |
| `MEILI_NO_ANALYTICS` | Meilisearch | true | Disable Meilisearch telemetry (as in the upstream compose file). |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Meilisearch | true | Railway flag that makes Alpine/musl images resolve *.railway.internal names correctly. |
| `PORT` | Karakeep | 3000 | Karakeep listen port. Railway's healthcheck and edge proxy probe $PORT and the Next.js standalone server reads PORT, so keep it at 3000 (the domain target port). |
| `DATA_DIR` | Karakeep | /data | Persistent data directory (SQLite database + crawled assets). Do not change: the volume is mounted at /data. |
| `HOSTNAME` | Karakeep | 0.0.0.0 | Bind address for the Next.js standalone server. Docker sets HOSTNAME to the container id, which makes Next.js bind a single interface and fail Railway's healthcheck; 0.0.0.0 listens on all interfaces. |
| `MEILI_ADDR` | Karakeep | - | Private URL of the bundled Meilisearch service (full-text search). Unset it to run without search. |
| `NEXTAUTH_URL` | Karakeep | - | Public URL of this Karakeep instance, used for auth redirects and API links. Update it if you attach a custom domain. |
| `OPENAI_API_KEY` | Karakeep | (secret) | Optional. Enables AI auto-tagging, summaries and semantic search via OpenAI. Karakeep works without it. |
| `BROWSER_WEB_URL` | Karakeep | - | Private DevTools URL of the bundled headless Chrome service used for crawling, screenshots and archives. Karakeep resolves the hostname to an IP before connecting. Unset it to crawl with plain HTTP requests (no screenshots). |
| `DISABLE_SIGNUPS` | Karakeep | false | Leave false for the first deploy so you can register (the first account becomes admin). Then set to true to close public sign-ups; admins can still create users in Admin Settings. |
| `NEXTAUTH_SECRET` | Karakeep | (secret) | Random secret used to sign session JWTs. Generated once; changing it logs everyone out. |
| `OLLAMA_BASE_URL` | Karakeep | - | Optional. Base URL of an Ollama server to use instead of OpenAI for AI tagging (for example http://ollama.railway.internal:11434). Set INFERENCE_TEXT_MODEL to a model you have pulled. |
| `MEILI_MASTER_KEY` | Karakeep | - | Meilisearch master key, referenced from the Meilisearch service. |

## Configuration

- **Start command:** `sh -c 'socat TCP6-LISTEN:9222,fork,reuseaddr,ipv6only=0 TCP4:127.0.0.1:9223 & exec /headless-shell/headless-shell --no-sandbox --use-gl=angle --use-angle=swiftshader --remote-debugging-address=0.0.0.0 --remote-debugging-port=9223 --disable-gpu --disable-dev-shm-usage --hide-scrollbars --disable-blink-features=AutomationControlled --window-size=1440,900'`
- **Healthcheck:** `/health`
- **Volume:** `/meili_data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/karakeep-bookmarks-meilisearch)
