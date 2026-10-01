# Deploy SurfSense Self-Hosted Web on Railway

SurfSense NotebookLM alternative with local embeddings and signup gate

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/surfsense-self-hosted-web)

## About

SurfSense is a privacy-focused, open-source alternative to NotebookLM for individuals and teams. Upload PDFs, Office files and Markdown, capture web pages, connect Notion, Slack, Google Drive, Jira and more, then ask questions across everything with cited answers and turn your sources into reports, slide decks, podcasts and study material. You choose the model: OpenAI, Anthropic, OpenRouter, Azure, Ollama, LM Studio or any OpenAI-compatible endpoint.

Hosting SurfSense means running a Next.js web app, a FastAPI backend with Celery background workers, Rocicorp Zero for real-time sync, PostgreSQL with pgvector and logical replication, and Redis, all behind one reverse proxy. This template mirrors upstream's `docker/docker-compose.yml` as six Railway services, with images pinned to the immutable `git-a51f9a3` build. Only the Caddy gateway is public; it routes `/api/v1`, `/auth` and `/zero` over the private network exactly like upstream's Caddyfile. The API, Celery worker, Celery beat and migrations run together in one service (upstream's `SERVICE_ROLE=all`) because uploads are handed from the API to the worker as local files, and Railway volumes cannot be shared between services. Zero Cache waits for the migrations before it starts, the API binds a dual-stack socket, and Postgres runs with `wal_level=logical`.

**Signup is protected.** SurfSense lets anyone who reaches the URL register, and its own switch to turn that off also disables login. The gateway therefore asks for a generated signup password before anyone can open `/register` or create an account. Login and API tokens are unaffected.

**Plan requirement:** the API image is about 2.2 GB and loads PyTorch, Docling and a local embedding model, so use the Hobby plan or higher. The first deploy takes several minutes.

Upstream note: SurfSense's maintainers now recommend their desktop app for new users; the self-hosted web stack remains open source and community supported. SurfSense is Apache-2.0 except a BSL-1.1 scraper module, which may be used in production but not resold as a hosted service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| SurfSense | `caddy:2.11-alpine` | Web service |
| Redis | `redis:7.4.2-alpine` | Database |
| SurfSense Web | `ghcr.io/modsetter/surfsense-web:git-a51f9a3` | Worker |
| SurfSense API | `ghcr.io/modsetter/surfsense-backend:git-a51f9a3` | Database |
| Postgres | `pgvector/pgvector:pg17` | Database |
| Zero Cache | `rocicorp/zero:1.6.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | SurfSense | 8080 | Gateway listen port. Railway's healthcheck and edge proxy probe $PORT, so keep it equal to the domain target port. |
| `API_UPSTREAM` | SurfSense | - | Private host:port of the SurfSense API (FastAPI) service. |
| `WEB_UPSTREAM` | SurfSense | - | Private host:port of the SurfSense Web (Next.js) service. |
| `MAX_BODY_SIZE` | SurfSense | 1GB | Largest request body the gateway accepts (uploads). Keep it at or above MAX_FILE_SIZE_MB on the API. |
| `ZERO_UPSTREAM` | SurfSense | - | Private host:port of the Zero Cache (real-time sync) service. |
| `SIGNUP_PASSWORD` | SurfSense | (secret) | Password for the signup gate. Share it only with people who should get an account. Change it here any time; the gateway rereads it on restart. |
| `SIGNUP_USERNAME` | SurfSense | (secret) | Username for the signup gate. The browser asks for it when someone opens /register or submits the signup form. Login is not gated. |
| `REDIS_URL` | Redis | - | Private-network connection string used by the SurfSense API (broker, results, cache). |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password, passed to redis-server --requirepass by the start command. |
| `PORT` | SurfSense Web | 3000 | Next.js listen port. Railway's healthcheck probes $PORT. |
| `HOSTNAME` | SurfSense Web | :: | Bind address. :: is dual stack: the gateway and zero-cache call this service over the IPv6 private network, the healthcheck arrives over IPv4. |
| `AUTH_TYPE` | SurfSense Web | LOCAL | Login UI mode. LOCAL is email and password. Must match AUTH_TYPE on the API. |
| `ETL_SERVICE` | SurfSense Web | DOCLING | Document parser shown in the UI. Must match ETL_SERVICE on the API. |
| `DEPLOYMENT_MODE` | SurfSense Web | self-hosted | self-hosted shows every connector; must match the API. |
| `MAX_FILE_SIZE_MB` | SurfSense Web | 500 | Per-file upload cap checked in the browser before upload. Keep equal to the API value. |
| `ZERO_QUERY_API_KEY` | SurfSense Web | (secret) | Shared secret zero-cache sends to /api/zero/query. Requests without it get 403. |
| `SURFSENSE_BACKEND_INTERNAL_URL` | SurfSense Web | - | Server-side (RSC and route handler) URL of the SurfSense API over the private network. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | SurfSense Web | true | The image is Alpine (musl); lets it resolve *.railway.internal for server-side calls to the API. |
| `PORT` | SurfSense API | 8000 | API listen port. The start command binds a dual-stack socket on it; Railway's healthcheck probes $PORT/ready. |
| `AUTH_TYPE` | SurfSense API | LOCAL | LOCAL = email and password. GOOGLE needs GOOGLE_OAUTH_CLIENT_ID / SECRET. |
| `REDIS_URL` | SurfSense API | - | Redis for the app cache and rate limits. |
| `SECRET_KEY` | SurfSense API | (secret) | Signs session JWTs and reset tokens. Changing it logs everyone out. |
| `BACKEND_URL` | SurfSense API | - | Public backend origin used in OAuth redirect URIs (same origin as the gateway). |
| `ETL_SERVICE` | SurfSense API | DOCLING | Document parser. DOCLING runs locally with no API key; UNSTRUCTURED or LLAMACLOUD need keys. |
| `STT_SERVICE` | SurfSense API | local/base | Speech to text. local/base is Faster-Whisper on CPU; or openai/whisper-1. |
| `TTS_SERVICE` | SurfSense API | local/kokoro | Podcast voice. local/kokoro runs on CPU; or a LiteLLM provider such as openai/tts-1. |
| `DATABASE_URL` | SurfSense API | - | Postgres (pgvector) over the private network. Alembic migrations run on every boot. |
| `SERVICE_ROLE` | SurfSense API | all | Runs migrations, the FastAPI API, the Celery worker and Celery beat in this one container. Required on Railway: uploads are handed from the API to the worker as local temp files, so they must share a filesystem. |
| `REDIS_APP_URL` | SurfSense API | - | Redis used by the app itself. |
| `SURFSENSE_ENV` | SurfSense API | production | Deployment environment label (observability resource attribute). |
| `DEPLOYMENT_MODE` | SurfSense API | self-hosted | self-hosted enables every connector. |
| `EMBEDDING_MODEL` | SurfSense API | sentence-transformers/all-MiniLM-L6-v2 | Embedding model, baked into the image and run on CPU (no API key). Set once: changing it after indexing breaks vector dimensions. |
| `SANDBOX_ENABLED` | SurfSense API | FALSE | Code execution sandbox. Upstream's opensandbox-server needs the host Docker socket, which Railway does not provide. Set SANDBOX_PROVIDER=daytona plus DAYTONA_API_KEY to use Daytona instead. |
| `MAX_FILE_SIZE_MB` | SurfSense API | 500 | Per-file upload cap enforced by the API. |
| `CELERY_BROKER_URL` | SurfSense API | - | Celery broker. |
| `MIGRATION_TIMEOUT` | SurfSense API | 900 | Seconds allowed for alembic upgrade head on boot. |
| `NEXT_FRONTEND_URL` | SurfSense API | - | Public frontend origin (same origin as the gateway). |
| `CELERY_MAX_WORKERS` | SurfSense API | 2 | Max Celery worker processes. Each one loads the embedding and parsing models; raise it only with more RAM. |
| `CELERY_MIN_WORKERS` | SurfSense API | 1 | Min Celery worker processes kept warm. |
| `NOLOGIN_MODE_ENABLED` | SurfSense API | (secret) | Anonymous chat pages. Keep FALSE on a public URL. |
| `REGISTRATION_ENABLED` | SurfSense API | TRUE | Keep TRUE. In SurfSense FALSE also blocks login; signup is restricted by the gateway's SIGNUP_PASSWORD instead. |
| `SURFSENSE_PUBLIC_URL` | SurfSense API | - | Public origin of the gateway. Used for CSRF origin checks and redirects. |
| `CELERY_RESULT_BACKEND` | SurfSense API | - | Celery result backend. |
| `FILE_STORAGE_LOCAL_PATH` | SurfSense API | /data/object_store | Where uploaded originals and generated artifacts are stored. Lives on this service's volume. |
| `CELERY_TASK_DEFAULT_QUEUE` | SurfSense API | surfsense | Default Celery queue (as upstream). |
| `STRIPE_CREDIT_BUYING_ENABLED` | SurfSense API | FALSE | Stripe credit purchases (hosted SaaS feature). Keep FALSE. |
| `UNSTRUCTURED_HAS_PATCHED_LOOP` | SurfSense API | 1 | Set by upstream compose for the API process. |
| `POSTGRES_DB` | Postgres | surfsense | Database name. |
| `DATABASE_URL` | Postgres | - | Private-network connection string (IPv6, includes port). |
| `POSTGRES_USER` | Postgres | (secret) | Database superuser (zero-cache needs replication rights, which the superuser has). |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated database password. |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL via the TCP proxy (for psql / GUI clients). |
| `DATABASE_PRIVATE_URL` | Postgres | - | Same as DATABASE_URL. |
| `PORT` | Zero Cache | 4848 | Healthcheck port; equals ZERO_PORT. |
| `ZERO_PORT` | Zero Cache | 4848 | zero-cache listen port (binds :: dual stack). |
| `ZERO_CVR_DB` | Zero Cache | - | Postgres for client view records. |
| `ZERO_CHANGE_DB` | Zero Cache | - | Postgres for the change log. |
| `ZERO_QUERY_URL` | Zero Cache | - | SurfSense Web route that resolves Zero queries (private network). |
| `ZERO_AUTO_RESET` | Zero Cache | true | Lets zero-cache wipe and resync its replica if replication halts. |
| `ZERO_MUTATE_URL` | Zero Cache | - | Required by zero-cache when queries are app-authorized; SurfSense's route is a no-op. |
| `ZERO_UPSTREAM_DB` | Zero Cache | - | Postgres to replicate from (needs wal_level=logical, set on the Postgres service). |
| `ZERO_REPLICA_FILE` | Zero Cache | /data/zero.db | SQLite replica on this service's volume. |
| `ZERO_CVR_MAX_CONNS` | Zero Cache | 30 | CVR connection pool size. |
| `ZERO_QUERY_API_KEY` | Zero Cache | (secret) | Shared secret sent as X-Api-Key to the query route; SurfSense Web references it. |
| `SURFSENSE_READY_URL` | Zero Cache | - | The start command waits for this to return 200 (zero_publication exists) before starting zero-cache. |
| `ZERO_ADMIN_PASSWORD` | Zero Cache | (secret) | Admin password for zero-cache's /statz and /heapz (required in production mode). |
| `ZERO_APP_PUBLICATIONS` | Zero Cache | zero_publication | Publication created by SurfSense's migrations. Do not change. |
| `ZERO_NUM_SYNC_WORKERS` | Zero Cache | 4 | Sync workers. Keep at or below both MAX_CONNS values. |
| `ZERO_UPSTREAM_MAX_CONNS` | Zero Cache | 20 | Upstream connection pool size. |
| `ZERO_QUERY_FORWARD_COOKIES` | Zero Cache | true | Forward the browser session cookie to the query route so it can authorize the user. |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Zero Cache | true | The image is Alpine (musl); lets it resolve *.railway.internal. |
| `ZERO_AUTH_REVALIDATE_INTERVAL_SECONDS` | Zero Cache | 60 | How often open sockets re-check auth (as upstream). |
| `ZERO_AUTH_RETRANSFORM_INTERVAL_SECONDS` | Zero Cache | 60 | How often membership changes are re-applied (as upstream). |

## Configuration

- **Start command:** `sh -c 'echo IyEvYmluL3NoCiMgUmFpbHdheSBzdGFydCBjb21tYW5kIGZvciB0aGUgIlN1cmZTZW5zZSIgZ2F0ZXdheSBzZXJ2aWNlIChjYWRkeToyLjExLWFscGluZSkuCiMgVGhpcyBmaWxlIGlzIHRoZSBTT1VSQ0Ugb2YgdGhlIGJhc2U2NCBibG9iIGluIHNlcmlhbGl6ZWQtY29uZmlnLmpzb24gLT4KIyBzZXJ2aWNlcy4iU3VyZlNlbnNlIi5kZXBsb3kuc3RhcnRDb21tYW5kLiBBZnRlciBlZGl0aW5nLCByZWdlbmVyYXRlIHdpdGg6CiMgICBiYXNlNjQgPCBzdXJmc2Vuc2UtcmFpbHdheS9zdGFydC1nYXRld2F5LnNoIHwgdHIgLWQgJ1xuJwojIGFuZCBwYXN0ZSBpdCBiYWNrIGludG8gdGhlIHN0YXJ0Q29tbWFuZC4KIwojIFdoeSB0aGlzIGV4aXN0czoKIyAgMS4gVXBzdHJlYW0ncyBkb2NrZXIvcHJveHkvQ2FkZHlmaWxlIGlzIHRoZSBzaW5nbGUgcHVibGljIGVudHJ5IHBvaW50IGFuZAojICAgICByb3V0ZXMgYnkgcGF0aCB0byBmcm9udGVuZDozMDAwLCBiYWNrZW5kOjgwMDAgYW5kIHplcm8tY2FjaGU6NDg0OC4gT24KIyAgICAgUmFpbHdheSB0aG9zZSBhcmUgcHJpdmF0ZSBob3N0cywgc28gdGhlIENhZGR5ZmlsZSBpcyByZW5kZXJlZCBhdCBib290CiMgICAgIHdpdGggdGhlICoucmFpbHdheS5pbnRlcm5hbCB1cHN0cmVhbXMgZnJvbSB2YXJpYWJsZXMuCiMgIDIuIFNpZ251cCBnYXRlLiBTdXJmU2Vuc2UgaGFzIG9wZW4gc2VsZi1yZWdpc3RyYXRpb24sIGFuZCBpdHMgb3duCiMgICAgIFJFR0lTVFJBVElPTl9FTkFCTEVEPUZBTFNFIGFsc28gYmxvY2tzIExPR0lOIChhcHAvYXBwLnB5CiMgICAgIHJlZ2lzdHJhdGlvbl9hbGxvd2VkKCkpLCBzbyBpdCBjYW5ub3QgYmUgdXNlZCB0byBjbG9zZSBzaWdudXAuIFRoZQojICAgICBnYXRld2F5IGFza3MgZm9yIFNJR05VUF9VU0VSTkFNRSAvIFNJR05VUF9QQVNTV09SRCBiZWZvcmUgdGhlIC9yZWdpc3RlcgojICAgICBwYWdlIChmdWxsIHBhZ2UgbG9hZHMgb25seSkgYW5kIGJlZm9yZSBQT1NUIC9hdXRoL3JlZ2lzdGVyLiBFdmVyeXRoaW5nCiMgICAgIGVsc2UsIGluY2x1ZGluZyBsb2dpbiBhbmQgdGhlIEFQSSB1c2VkIGJ5IFBBVHMgLyBNQ1AgLyB0aGUgZXh0ZW5zaW9uLAojICAgICBzdGF5cyBvbiBTdXJmU2Vuc2UncyBvd24gYXV0aC4KIyAgMy4gQnJvd3NlcnMga2VlcCBzZW5kaW5nIHRoZSBjYWNoZWQgQmFzaWMgY3JlZGVudGlhbHMgdG8gZXZlcnkgcGF0aCBvbmNlCiMgICAgIHRoZSBnYXRlIHdhcyBwYXNzZWQuIFRoZXkgYXJlIHN0cmlwcGVkIGJlZm9yZSBwcm94eWluZywgc28gdGhlIGFwcCBvbmx5CiMgICAgIHNlZXMgaXRzIG93biBjb29raWVzLCBhbmQgaXRzIENTUkYgY2hlY2sgKHdoaWNoIGlzIHNraXBwZWQgZm9yIHJlcXVlc3RzCiMgICAgIHRoYXQgY2FycnkgYW4gQXV0aG9yaXphdGlvbiBoZWFkZXIpIHN0YXlzIGFjdGl2ZS4Kc2V0IC1lCjogIiR7UE9SVDo/UE9SVCBpcyByZXF1aXJlZH0iCjogIiR7U0lHTlVQX1VTRVJOQU1FOj9TSUdOVVBfVVNFUk5BTUUgaXMgcmVxdWlyZWR9Igo6ICIke1NJR05VUF9QQVNTV09SRDo/U0lHTlVQX1BBU1NXT1JEIGlzIHJlcXVpcmVkfSIKOiAiJHtXRUJfVVBTVFJFQU06P1dFQl9VUFNUUkVBTSBtdXN0IGJlIDxob3N0Pjo8cG9ydD4gb2YgdGhlIFN1cmZTZW5zZSBXZWIgc2VydmljZX0iCjogIiR7QVBJX1VQU1RSRUFNOj9BUElfVVBTVFJFQU0gbXVzdCBiZSA8aG9zdD46PHBvcnQ+IG9mIHRoZSBTdXJmU2Vuc2UgQVBJIHNlcnZpY2V9Igo6ICIke1pFUk9fVVBTVFJFQU06P1pFUk9fVVBTVFJFQU0gbXVzdCBiZSA8aG9zdD46PHBvcnQ+IG9mIHRoZSBaZXJvIENhY2hlIHNlcnZpY2V9IgpCT0RZPSIke01BWF9CT0RZX1NJWkU6LTFHQn0iCkhBU0g9IiQoY2FkZHkgaGFzaC1wYXNzd29yZCAtLXBsYWludGV4dCAiJFNJR05VUF9QQVNTV09SRCIpIgoKY2F0ID4gL2V0Yy9jYWRkeS9DYWRkeWZpbGUgPDxFT0YKewoJYXV0b19odHRwcyBvZmYKCWFkbWluIG9mZgoJc2VydmVycyB7CgkJdHJ1c3RlZF9wcm94aWVzIHN0YXRpYyAwLjAuMC4wLzAgOjovMAoJCWNsaWVudF9pcF9oZWFkZXJzIFgtRm9yd2FyZGVkLUZvciBYLVJlYWwtSVAKCX0KfQoKOiR7UE9SVH0gewoJcmVxdWVzdF9ib2R5IHsKCQltYXhfc2l6ZSAke0JPRFl9Cgl9CgoJQHNpZ251cF9wYWdlIHsKCQlwYXRoIC9yZWdpc3RlciAvcmVnaXN0ZXIvKgoJCW5vdCBoZWFkZXIgUlNDICoKCX0KCWJhc2ljX2F1dGggQHNpZ251cF9wYWdlIHsKCQkke1NJR05VUF9VU0VSTkFNRX0gJHtIQVNIfQoJfQoJQHNpZ251cF9hcGkgcGF0aCAvYXV0aC9yZWdpc3RlciAvYXV0aC9yZWdpc3Rlci8qCgliYXNpY19hdXRoIEBzaWdudXBfYXBpIHsKCQkke1NJR05VUF9VU0VSTkFNRX0gJHtIQVNIfQoJfQoKCUBiYXNpYyBoZWFkZXJfcmVnZXhwIEF1dGhvcml6YXRpb24gXkJhc2ljXHMKCXJlcXVlc3RfaGVhZGVyIEBiYXNpYyAtQXV0aG9yaXphdGlvbgoKCWhhbmRsZSAvZ2F0ZXdheS1oZWFsdGggewoJCXJlc3BvbmQgIm9rIiAyMDAKCX0KCWhhbmRsZSAvYXV0aC9jYWxsYmFjayogewoJCXJldmVyc2VfcHJveHkgJHtXRUJfVVBTVFJFQU19Cgl9CgloYW5kbGUgL2F1dGgvKiB7CgkJcmV2ZXJzZV9wcm94eSAke0FQSV9VUFNUUkVBTX0KCX0KCWhhbmRsZSAvdXNlcnMvKiB7CgkJcmV2ZXJzZV9wcm94eSAke0FQSV9VUFNUUkVBTX0KCX0KCWhhbmRsZSAvYXBpL3YxLyogewoJCXJldmVyc2VfcHJveHkgJHtBUElfVVBTVFJFQU19IHsKCQkJZmx1c2hfaW50ZXJ2YWwgLTEKCQl9Cgl9CgloYW5kbGUgL3plcm8vY29udGV4dCB7CgkJcmV2ZXJzZV9wcm94eSAke0FQSV9VUFNUUkVBTX0KCX0KCWhhbmRsZSAvemVyby8qIHsKCQlyZXZlcnNlX3Byb3h5ICR7WkVST19VUFNUUkVBTX0KCX0KCWhhbmRsZSB7CgkJcmV2ZXJzZV9wcm94eSAke1dFQl9VUFNUUkVBTX0KCX0KfQpFT0YKCmVjaG8gInN1cmZzZW5zZS1nYXRld2F5OiBsaXN0ZW5pbmcgb24gOiRQT1JUOyB3ZWI9JFdFQl9VUFNUUkVBTSBhcGk9JEFQSV9VUFNUUkVBTSB6ZXJvPSRaRVJPX1VQU1RSRUFNOyBzaWdudXAgZ2F0ZSBvbiAvcmVnaXN0ZXIgYW5kIC9hdXRoL3JlZ2lzdGVyIgpleGVjIGNhZGR5IHJ1biAtLWNvbmZpZyAvZXRjL2NhZGR5L0NhZGR5ZmlsZSAtLWFkYXB0ZXIgY2FkZHlmaWxlCg== | base64 -d > /tmp/railway-start.sh && exec sh /tmp/railway-start.sh'`
- **Healthcheck:** `/gateway-health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data --bind :: 0.0.0.0'`
- **Volume:** `/data`
- **Healthcheck:** `/robots.txt`
- **Start command:** `sh -c 'echo IyEvdXNyL2Jpbi9lbnYgcHl0aG9uMwoiIiJSYWlsd2F5IHN0YXJ0IGNvbW1hbmQgZm9yIHRoZSAiU3VyZlNlbnNlIEFQSSIgc2VydmljZQooZ2hjci5pby9tb2RzZXR0ZXIvc3VyZnNlbnNlLWJhY2tlbmQsIFNFUlZJQ0VfUk9MRT1hbGwpLgoKVGhpcyBmaWxlIGlzIHRoZSBTT1VSQ0Ugb2YgdGhlIGJhc2U2NCBibG9iIGluIHNlcmlhbGl6ZWQtY29uZmlnLmpzb24gLT4Kc2VydmljZXMuIlN1cmZTZW5zZSBBUEkiLmRlcGxveS5zdGFydENvbW1hbmQuIEFmdGVyIGVkaXRpbmcsIHJlZ2VuZXJhdGUgd2l0aDoKICBiYXNlNjQgPCBzdXJmc2Vuc2UtcmFpbHdheS9zdGFydC1hcGkucHkgfCB0ciAtZCAnXG4nCmFuZCBwYXN0ZSBpdCBiYWNrIGludG8gdGhlIHN0YXJ0Q29tbWFuZC4KCldoeTogdGhlIGdhdGV3YXkgYW5kIHRoZSBOZXh0LmpzIHNlcnZlciBjYWxsIHRoaXMgc2VydmljZSBvdmVyIFJhaWx3YXkncwpwcml2YXRlIG5ldHdvcmsgKElQdjYpLCB3aGlsZSBSYWlsd2F5J3MgaGVhbHRoY2hlY2sgYXJyaXZlcyBvdmVyIElQdjQuCnV2aWNvcm4gYmluZHMgb25lIGFkZHJlc3MgZmFtaWx5IGF0IGEgdGltZSAoVVZJQ09STl9IT1NUPTo6IGlzIElQdjYgb25seQp1bmRlciBhc3luY2lvKSwgc28gdGhpcyBjcmVhdGVzIG9uZSBkdWFsLXN0YWNrIGxpc3RlbmluZyBzb2NrZXQKKElQVjZfVjZPTkxZPTApIGFuZCBoYW5kcyBpdCB0byB1dmljb3JuIHRocm91Z2ggVVZJQ09STl9GRCwgd2hpY2gKYXBwL2NvbmZpZy91dmljb3JuLnB5IGFscmVhZHkgc3VwcG9ydHMuIFRoZW4gaXQgZXhlY3MgdGhlIGltYWdlJ3Mgb3duCmVudHJ5cG9pbnQgdW5jaGFuZ2VkLCBzbyBTRVJWSUNFX1JPTEU9YWxsIHN0aWxsIHJ1bnMgbWlncmF0aW9ucywgdGhlIEFQSSwKdGhlIENlbGVyeSB3b3JrZXIgYW5kIENlbGVyeSBiZWF0IGV4YWN0bHkgYXMgdXBzdHJlYW0gZG9lcy4KIiIiCmltcG9ydCBvcwppbXBvcnQgc29ja2V0Cgpwb3J0ID0gaW50KG9zLmVudmlyb24uZ2V0KCJQT1JUIiwgIjgwMDAiKSkKc29jayA9IHNvY2tldC5zb2NrZXQoc29ja2V0LkFGX0lORVQ2LCBzb2NrZXQuU09DS19TVFJFQU0pCnNvY2suc2V0c29ja29wdChzb2NrZXQuU09MX1NPQ0tFVCwgc29ja2V0LlNPX1JFVVNFQUREUiwgMSkKc29jay5zZXRzb2Nrb3B0KHNvY2tldC5JUFBST1RPX0lQVjYsIHNvY2tldC5JUFY2X1Y2T05MWSwgMCkKc29jay5iaW5kKCgiOjoiLCBwb3J0KSkKc29jay5saXN0ZW4oMjA0OCkKb3Muc2V0X2luaGVyaXRhYmxlKHNvY2suZmlsZW5vKCksIFRydWUpCm9zLmVudmlyb25bIlVWSUNPUk5fRkQiXSA9IHN0cihzb2NrLmZpbGVubygpKQpwcmludCgKICAgIGYic3VyZnNlbnNlLWFwaTogZHVhbC1zdGFjayBsaXN0ZW5lciBvbiBbOjpdOntwb3J0fSAoZmQge3NvY2suZmlsZW5vKCl9KSwgIgogICAgZiJTRVJWSUNFX1JPTEU9e29zLmVudmlyb24uZ2V0KCdTRVJWSUNFX1JPTEUnLCAnYWxsJyl9IiwKICAgIGZsdXNoPVRydWUsCikKZW50cnlwb2ludCA9ICIvYXBwL3NjcmlwdHMvZG9ja2VyL2VudHJ5cG9pbnQuc2giCm9zLmV4ZWN2KGVudHJ5cG9pbnQsIFtlbnRyeXBvaW50XSkK | base64 -d > /tmp/railway-start.py && exec python3 /tmp/railway-start.py'`
- **Healthcheck:** `/ready`
- **Start command:** `docker-entrypoint.sh postgres -c "listen_addresses=*" -c wal_level=logical -c max_replication_slots=10 -c max_wal_senders=10 -c max_connections=200 -c shared_buffers=256MB`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'echo IyEvYmluL3NoCiMgUmFpbHdheSBzdGFydCBjb21tYW5kIGZvciB0aGUgIlplcm8gQ2FjaGUiIHNlcnZpY2UgKHJvY2ljb3JwL3plcm86MS42LjAsIEFscGluZSwgcm9vdCkuCiMgVGhpcyBmaWxlIGlzIHRoZSBTT1VSQ0Ugb2YgdGhlIGJhc2U2NCBibG9iIGluIHNlcmlhbGl6ZWQtY29uZmlnLmpzb24gLT4KIyBzZXJ2aWNlcy4iWmVybyBDYWNoZSIuZGVwbG95LnN0YXJ0Q29tbWFuZC4gQWZ0ZXIgZWRpdGluZywgcmVnZW5lcmF0ZSB3aXRoOgojICAgYmFzZTY0IDwgc3VyZnNlbnNlLXJhaWx3YXkvc3RhcnQtemVyby1jYWNoZS5zaCB8IHRyIC1kICdcbicKIyBhbmQgcGFzdGUgaXQgYmFjayBpbnRvIHRoZSBzdGFydENvbW1hbmQuCiMKIyBXaHk6IHplcm8tY2FjaGUgcmVwbGljYXRlcyB0aGUgYHplcm9fcHVibGljYXRpb25gIHB1YmxpY2F0aW9uLCB3aGljaCB0aGUKIyBTdXJmU2Vuc2UgQVBJIGNyZWF0ZXMgaW4gaXRzIEFsZW1iaWMgbWlncmF0aW9ucy4gVXBzdHJlYW0gY29tcG9zZSBtYWtlcwojIHplcm8tY2FjaGUgd2FpdCBmb3IgdGhlIG9uZS1zaG90IGBtaWdyYXRpb25zYCBzZXJ2aWNlCiMgKGNvbmRpdGlvbjogc2VydmljZV9jb21wbGV0ZWRfc3VjY2Vzc2Z1bGx5KS4gUmFpbHdheSBzdGFydHMgZXZlcnkgc2VydmljZSBhdAojIG9uY2UsIGFuZCB1cHN0cmVhbSdzIGRvY3Mgc2F5IGEgemVyby1jYWNoZSB0aGF0IHN0YXJ0cyBiZWZvcmUgdGhlCiMgcHVibGljYXRpb24gZXhpc3RzIGNhbiBnZXQgc3R1Y2sgb24gIlVua25vd24gb3IgaW52YWxpZCBwdWJsaWNhdGlvbnMiIHdpdGggYQojIGhhbGYtYnVpbHQgcmVwbGljYSB0aGF0IGhhcyB0byBiZSB3aXBlZCBieSBoYW5kLiBTbyB3YWl0IHVudGlsIHRoZSBBUEkncwojIC9yZWFkeSBlbmRwb2ludCAoMjAwIG9ubHkgb25jZSB6ZXJvX3B1YmxpY2F0aW9uIGV4aXN0cykgYW5zd2VycywgdGhlbiBydW4KIyB0aGUgaW1hZ2UncyBvd24gY29tbWFuZC4gTm9kZSAyMiBpcyBpbiB0aGUgaW1hZ2UsIHNvIG5vIGV4dHJhIHRvb2xzIG5lZWRlZC4Kc2V0IC1lCjogIiR7U1VSRlNFTlNFX1JFQURZX1VSTDo/U1VSRlNFTlNFX1JFQURZX1VSTCBtdXN0IGJlIGh0dHA6Ly88U3VyZlNlbnNlIEFQSSBwcml2YXRlIGhvc3Q+OjgwMDAvcmVhZHl9IgppPTAKdW50aWwgbm9kZSAtZSAnZmV0Y2gocHJvY2Vzcy5lbnYuU1VSRlNFTlNFX1JFQURZX1VSTCx7c2lnbmFsOkFib3J0U2lnbmFsLnRpbWVvdXQoNTAwMCl9KS50aGVuKHI9PnByb2Nlc3MuZXhpdChyLm9rPzA6MSksKCk9PnByb2Nlc3MuZXhpdCgxKSknOyBkbwogIGk9JCgoaSsxKSkKICBlY2hvICJ6ZXJvLWNhY2hlOiB3YWl0aW5nIGZvciBTdXJmU2Vuc2UgQVBJIG1pZ3JhdGlvbnMgKHplcm9fcHVibGljYXRpb24pIGF0ICRTVVJGU0VOU0VfUkVBRFlfVVJMLCBhdHRlbXB0ICRpIgogIHNsZWVwIDUKZG9uZQplY2hvICJ6ZXJvLWNhY2hlOiB6ZXJvX3B1YmxpY2F0aW9uIHByZXNlbnQsIHN0YXJ0aW5nIHplcm8tY2FjaGUgb24gcG9ydCAke1pFUk9fUE9SVDotNDg0OH0iCmV4ZWMgbnB4IHplcm8tY2FjaGUK | base64 -d > /tmp/railway-start.sh && exec sh /tmp/railway-start.sh'`
- **Healthcheck:** `/keepalive`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/surfsense-self-hosted-web)
