# Deploy Dify Production on Railway

Open-source LLM app platform — workflows, agents, RAG. 10-service stack

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-production)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-production?utm_medium=integration&utm_source=button&utm_campaign=dify)

[Dify](https://dify.ai/) is an open-source LLM app development platform: build AI workflows, agents, and RAG pipelines visually, connect any model provider (OpenAI, Anthropic, local models), publish them as chatbots or APIs, and observe everything — a self-hosted alternative to hosted agent builders.

Dify 1.15 is a genuinely multi-service stack — API, celery workers, a Next.js console, an isolated code-execution sandbox behind an SSRF proxy, and a plugin daemon for marketplace plugins. This template decomposes it into 10 Railway services wired over private networking, replacing the stock nginx compose ingress with a small gateway that replicates its routing (`/console/api`, `/api`, `/v1`, `/files` → API; `/e/` → plugin daemon; everything else → web). PostgreSQL runs the pgvector image and serves triple duty — main database, vector store (`VECTOR_STORE=pgvector`, so no separate Weaviate), and the plugin daemon's database — while user files go to a **Railway bucket over S3**. Every service binds IPv6 explicitly, since Railway private networking is IPv6-only (the footgun that breaks most naive multi-service templates). First boot runs migrations in about a minute; then open your gateway domain and create the admin account (first signup owns the instance).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| api | [nomideusz/dify-railway](https://github.com/nomideusz/dify-railway) (root: /api) | Worker |
| gateway | [nomideusz/dify-railway](https://github.com/nomideusz/dify-railway) (root: /gateway) | Web service |
| postgres | [nomideusz/dify-railway](https://github.com/nomideusz/dify-railway) (root: /postgres) | Database |
| sandbox | [nomideusz/dify-railway](https://github.com/nomideusz/dify-railway) (root: /sandbox) | Worker |
| ssrf-proxy | [nomideusz/dify-railway](https://github.com/nomideusz/dify-railway) (root: /ssrf-proxy) | Worker |
| worker-beat | [nomideusz/dify-railway](https://github.com/nomideusz/dify-railway) (root: /worker-beat) | Worker |
| plugin-daemon | [nomideusz/dify-railway](https://github.com/nomideusz/dify-railway) (root: /plugin-daemon) | Database |
| worker | [nomideusz/dify-railway](https://github.com/nomideusz/dify-railway) (root: /worker) | Worker |
| redis | [nomideusz/dify-railway](https://github.com/nomideusz/dify-railway) (root: /redis) | Worker |
| web | [nomideusz/dify-railway](https://github.com/nomideusz/dify-railway) (root: /web) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | api | 5001 | API listen port for Railway's healthcheck. Must stay 5001. |
| `DB_HOST` | api | - | Postgres private hostname. Wired automatically — don't change. |
| `FILES_URL` | api | - | Private API URL the plugin daemon fetches files from. Wired automatically — don't change. |
| `S3_REGION` | api | - | Bundled Railway bucket region. Wired automatically — don't change. |
| `REDIS_HOST` | api | - | Redis private hostname. Wired automatically — don't change. |
| `SECRET_KEY` | api | (secret) | Signs sessions and tokens. Must match on api, worker and worker-beat (they reference this value). |
| `APP_API_URL` | api | - | Public gateway URL. Wired automatically — don't change. |
| `APP_WEB_URL` | api | - | Public gateway URL. Wired automatically — don't change. |
| `DB_PASSWORD` | api | (secret) | Postgres password, shared from the postgres service. Wired automatically — don't change. |
| `S3_ENDPOINT` | api | - | Bundled Railway bucket endpoint. Wired automatically — don't change. |
| `PGVECTOR_HOST` | api | - | Vector store host — same Postgres instance. Wired automatically — don't change. |
| `S3_ACCESS_KEY` | api | - | Bundled Railway bucket access key. Wired automatically — don't change. |
| `S3_SECRET_KEY` | api | (secret) | Bundled Railway bucket secret key. Wired automatically — don't change. |
| `REDIS_PASSWORD` | api | (secret) | Redis password, shared from the redis service. Wired automatically — don't change. |
| `S3_BUCKET_NAME` | api | - | Bundled Railway bucket name. Wired automatically — don't change. |
| `CONSOLE_API_URL` | api | - | Public gateway URL. Wired automatically — don't change. |
| `CONSOLE_WEB_URL` | api | - | Public gateway URL. Wired automatically — don't change. |
| `SERVICE_API_URL` | api | - | Public gateway URL. Wired automatically — don't change. |
| `CELERY_BROKER_URL` | api | - | Celery broker (Redis DB 1). Wired automatically — don't change. |
| `PGVECTOR_PASSWORD` | api | (secret) | Vector store password — same as the main database. Wired automatically — don't change. |
| `PLUGIN_DAEMON_KEY` | api | - | Shared key for the plugin daemon. Referenced by the plugin-daemon service. |
| `PLUGIN_DAEMON_URL` | api | - | Private URL of the plugin daemon. Wired automatically — don't change. |
| `SSRF_PROXY_HTTP_URL` | api | - | Egress proxy for sandboxed code (SSRF protection). Wired automatically — don't change. |
| `SSRF_PROXY_HTTPS_URL` | api | - | Egress proxy for sandboxed code (SSRF protection). Wired automatically — don't change. |
| `CODE_EXECUTION_API_KEY` | api | (secret) | Sandbox auth key, shared from the sandbox service. Wired automatically — don't change. |
| `CODE_EXECUTION_ENDPOINT` | api | - | Private URL of the code-execution sandbox. Wired automatically — don't change. |
| `INNER_API_KEY_FOR_PLUGIN` | api | (secret) | Inner API key the plugin daemon uses to call back into the Dify API. |
| `API_HOST` | gateway | - | Gateway upstream: the Dify API. Wired automatically — don't change. |
| `WEB_HOST` | gateway | - | Gateway upstream: the web console. Wired automatically — don't change. |
| `PLUGIN_DAEMON_HOST` | gateway | - | Gateway upstream: the plugin daemon. Wired automatically — don't change. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Auto-generated database password. |
| `PORT` | sandbox | 8194 | Sandbox port for Railway's healthcheck. Must stay 8194. |
| `API_KEY` | sandbox | (secret) | Auth key between the Dify API and the code-execution sandbox. |
| `HTTP_PROXY` | sandbox | - | Egress proxy for sandboxed code (SSRF protection). Wired automatically — don't change. |
| `HTTPS_PROXY` | sandbox | - | Egress proxy for sandboxed code (SSRF protection). Wired automatically — don't change. |
| `DB_HOST` | worker-beat | - | Postgres private hostname. Wired automatically — don't change. |
| `FILES_URL` | worker-beat | - | Private API URL the plugin daemon fetches files from. Wired automatically — don't change. |
| `S3_REGION` | worker-beat | - | Bundled Railway bucket region. Wired automatically — don't change. |
| `REDIS_HOST` | worker-beat | - | Redis private hostname. Wired automatically — don't change. |
| `SECRET_KEY` | worker-beat | (secret) | Session-signing key, shared from the api service. Wired automatically — don't change. |
| `APP_API_URL` | worker-beat | - | Public gateway URL. Wired automatically — don't change. |
| `APP_WEB_URL` | worker-beat | - | Public gateway URL. Wired automatically — don't change. |
| `DB_PASSWORD` | worker-beat | (secret) | Postgres password, shared from the postgres service. Wired automatically — don't change. |
| `S3_ENDPOINT` | worker-beat | - | Bundled Railway bucket endpoint. Wired automatically — don't change. |
| `PGVECTOR_HOST` | worker-beat | - | Vector store host — same Postgres instance. Wired automatically — don't change. |
| `S3_ACCESS_KEY` | worker-beat | - | Bundled Railway bucket access key. Wired automatically — don't change. |
| `S3_SECRET_KEY` | worker-beat | (secret) | Bundled Railway bucket secret key. Wired automatically — don't change. |
| `REDIS_PASSWORD` | worker-beat | (secret) | Redis password, shared from the redis service. Wired automatically — don't change. |
| `S3_BUCKET_NAME` | worker-beat | - | Bundled Railway bucket name. Wired automatically — don't change. |
| `CONSOLE_API_URL` | worker-beat | - | Public gateway URL. Wired automatically — don't change. |
| `CONSOLE_WEB_URL` | worker-beat | - | Public gateway URL. Wired automatically — don't change. |
| `SERVICE_API_URL` | worker-beat | - | Public gateway URL. Wired automatically — don't change. |
| `CELERY_BROKER_URL` | worker-beat | - | Celery broker (Redis DB 1). Wired automatically — don't change. |
| `PGVECTOR_PASSWORD` | worker-beat | (secret) | Vector store password — same as the main database. Wired automatically — don't change. |
| `PLUGIN_DAEMON_KEY` | worker-beat | - | Shared key for the plugin daemon. Referenced by the plugin-daemon service. |
| `PLUGIN_DAEMON_URL` | worker-beat | - | Private URL of the plugin daemon. Wired automatically — don't change. |
| `SSRF_PROXY_HTTP_URL` | worker-beat | - | Egress proxy for sandboxed code (SSRF protection). Wired automatically — don't change. |
| `SSRF_PROXY_HTTPS_URL` | worker-beat | - | Egress proxy for sandboxed code (SSRF protection). Wired automatically — don't change. |
| `CODE_EXECUTION_API_KEY` | worker-beat | (secret) | Sandbox auth key, shared from the sandbox service. Wired automatically — don't change. |
| `CODE_EXECUTION_ENDPOINT` | worker-beat | - | Private URL of the code-execution sandbox. Wired automatically — don't change. |
| `INNER_API_KEY_FOR_PLUGIN` | worker-beat | (secret) | Inner API key the plugin daemon uses to call back into the Dify API. |
| `DB_HOST` | plugin-daemon | - | Postgres private hostname. Wired automatically — don't change. |
| `REDIS_HOST` | plugin-daemon | - | Redis private hostname. Wired automatically — don't change. |
| `SERVER_KEY` | plugin-daemon | - | Plugin daemon key, shared from the api service. Wired automatically — don't change. |
| `DB_PASSWORD` | plugin-daemon | (secret) | Postgres password, shared from the postgres service. Wired automatically — don't change. |
| `REDIS_PASSWORD` | plugin-daemon | (secret) | Redis password, shared from the redis service. Wired automatically — don't change. |
| `DIFY_INNER_API_KEY` | plugin-daemon | (secret) | Inner API key, shared from the api service. Wired automatically — don't change. |
| `DIFY_INNER_API_URL` | plugin-daemon | - | Private URL of the Dify API. Wired automatically — don't change. |
| `DB_HOST` | worker | - | Postgres private hostname. Wired automatically — don't change. |
| `FILES_URL` | worker | - | Private API URL the plugin daemon fetches files from. Wired automatically — don't change. |
| `S3_REGION` | worker | - | Bundled Railway bucket region. Wired automatically — don't change. |
| `REDIS_HOST` | worker | - | Redis private hostname. Wired automatically — don't change. |
| `SECRET_KEY` | worker | (secret) | Session-signing key, shared from the api service. Wired automatically — don't change. |
| `APP_API_URL` | worker | - | Public gateway URL. Wired automatically — don't change. |
| `APP_WEB_URL` | worker | - | Public gateway URL. Wired automatically — don't change. |
| `DB_PASSWORD` | worker | (secret) | Postgres password, shared from the postgres service. Wired automatically — don't change. |
| `S3_ENDPOINT` | worker | - | Bundled Railway bucket endpoint. Wired automatically — don't change. |
| `PGVECTOR_HOST` | worker | - | Vector store host — same Postgres instance. Wired automatically — don't change. |
| `S3_ACCESS_KEY` | worker | - | Bundled Railway bucket access key. Wired automatically — don't change. |
| `S3_SECRET_KEY` | worker | (secret) | Bundled Railway bucket secret key. Wired automatically — don't change. |
| `REDIS_PASSWORD` | worker | (secret) | Redis password, shared from the redis service. Wired automatically — don't change. |
| `S3_BUCKET_NAME` | worker | - | Bundled Railway bucket name. Wired automatically — don't change. |
| `CONSOLE_API_URL` | worker | - | Public gateway URL. Wired automatically — don't change. |
| `CONSOLE_WEB_URL` | worker | - | Public gateway URL. Wired automatically — don't change. |
| `SERVICE_API_URL` | worker | - | Public gateway URL. Wired automatically — don't change. |
| `CELERY_BROKER_URL` | worker | - | Celery broker (Redis DB 1). Wired automatically — don't change. |
| `PGVECTOR_PASSWORD` | worker | (secret) | Vector store password — same as the main database. Wired automatically — don't change. |
| `PLUGIN_DAEMON_KEY` | worker | - | Shared key for the plugin daemon. Referenced by the plugin-daemon service. |
| `PLUGIN_DAEMON_URL` | worker | - | Private URL of the plugin daemon. Wired automatically — don't change. |
| `SSRF_PROXY_HTTP_URL` | worker | - | Egress proxy for sandboxed code (SSRF protection). Wired automatically — don't change. |
| `SSRF_PROXY_HTTPS_URL` | worker | - | Egress proxy for sandboxed code (SSRF protection). Wired automatically — don't change. |
| `CODE_EXECUTION_API_KEY` | worker | (secret) | Sandbox auth key, shared from the sandbox service. Wired automatically — don't change. |
| `CODE_EXECUTION_ENDPOINT` | worker | - | Private URL of the code-execution sandbox. Wired automatically — don't change. |
| `INNER_API_KEY_FOR_PLUGIN` | worker | (secret) | Inner API key the plugin daemon uses to call back into the Dify API. |
| `REDIS_PASSWORD` | redis | (secret) | Auto-generated Redis password. |
| `PORT` | web | 3000 | Web console port. Must stay 3000 — the gateway targets web:3000. |
| `APP_API_URL` | web | - | Public gateway URL. Wired automatically — don't change. |
| `CONSOLE_API_URL` | web | - | Public gateway URL. Wired automatically — don't change. |

## Configuration

- **Healthcheck:** `/health`
- **Healthcheck:** `/gateway-health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/app/storage`

**Category:** AI/ML · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/dify-production)
