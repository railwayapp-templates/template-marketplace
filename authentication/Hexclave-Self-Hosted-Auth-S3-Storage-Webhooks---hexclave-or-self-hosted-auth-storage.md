# Deploy Hexclave — Self-Hosted Auth, S3 Storage & Webhooks on Railway

Self-hosted auth, teams, analytics, and file uploads with built-in S3.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hexclave-or-self-hosted-auth-storage)

## About

Hexclave is a self-hosted authentication and user-management platform (the `stackauth/server` image) — authentication, teams, RBAC, and analytics — an open, self-hosted alternative to hosted auth providers. This template runs the whole stack on Railway with **batteries included**: object storage (MinIO) and webhooks (self-hosted Svix) run in the same project, so there are no external service accounts to wire up for the core features. Everything is pre-configured and links together on the first deploy.

Hosting Hexclave means running its backend + dashboard server alongside the supporting infrastructure it depends on: a Postgres database, a ClickHouse analytics store, a reverse proxy, a cron worker for background jobs, S3-compatible object storage, and a Svix webhooks engine. This template provisions and connects all of it for you, exposing the dashboard on a single generated domain, with every secret generated per-deploy. You only bring your own SMTP, Freestyle, and AI keys when you want those optional features.

The template also pre-sets `STACK_DISABLE_PLAN_LIMITS=true` on the hexclave service. Hexclave's paid-plan quota enforcement (analytics-event caps, session-replay limits, email quotas, seat checks) is backed by its cloud-only **Bulldozer** metering service, which is not part of the self-hosted image. This flag is hexclave's built-in switch to skip those checks *before* the Bulldozer lookup — without it, opening the **Analytics** pages fails with a `500` from the quota gate. Leave it enabled when self-hosting.

| Service | Image | Purpose |
| --- | --- | --- |
| **hexclave** | `stackauth/server` | The app — auth/teams backend + dashboard |
| **hexclave-proxy** | Caddy | Reverse proxy — serves the whole app on one public domain |
| **hexclave-cron** | `stackauth/server` | Scheduled background jobs |
| **Postgres** | `postgres` | Primary database |
| **ClickHouse** | `clickhouse` | Analytics event store |
| **MinIO** + **minio-init** | `minio/minio` | S3-compatible object storage |
| **svix-db** + **svix-server** | `svix/svix-server` | Self-hosted Svix webhooks engine |

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minio-init | `minio/mc:latest` | Database |
| svix-db | `postgres:16` | Database |
| MinIO | `minio/minio:latest` | Database |
| svix-server | `svix/svix-server` | Web service |
| hexclave-cron | `curlimages/curl:latest` | Worker |
| hexclave | `stackauth/server:ebe7877` | Worker |
| hexclave-proxy | `caddy:2-alpine` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| ClickHouse | `clickhouse/clickhouse-server:25.10` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PUBLIC_BUCKET` | minio-init | hexclave-public | Name of the public bucket for browser-readable uploads like profile pictures. |
| `MINIO_ENDPOINT` | minio-init | - | Internal address of the MinIO service, used to create buckets over Railway's private network. |
| `PRIVATE_BUCKET` | minio-init | hexclave-private | Name of the private bucket for session recordings and deployment source. |
| `MINIO_ROOT_USER` | minio-init | (secret) | MinIO root access key, referenced from the MinIO service. |
| `MINIO_ROOT_PASSWORD` | minio-init | (secret) | MinIO root secret key, referenced from the MinIO service. |
| `POSTGRES_DB` | svix-db | svix | - |
| `POSTGRES_USER` | svix-db | (secret) | - |
| `POSTGRES_PASSWORD` | svix-db | (secret) | - |
| `PORT` | MinIO | 9000 | Port MinIO's S3 API listens on. Set so Railway's healthcheck targets the right port; keep it aligned with the public domain's target port (9000). |
| `MINIO_ROOT_USER` | MinIO | (secret) | Root access key for MinIO. Auto-generated — used as the S3 access key by the hexclave service. |
| `MINIO_SITE_REGION` | MinIO | us-east-1 | Region MinIO reports; must match the S3 region the hexclave service signs requests with. |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Root secret key for MinIO. Auto-generated — used as the S3 secret key by the hexclave service. Do not share. |
| `PORT` | svix-server | 8071 | - |
| `WAIT_FOR` | svix-server | true | - |
| `SVIX_REDIS_DSN` | svix-server | redis://localhost:6379 | - |
| `SVIX_CACHE_TYPE` | svix-server | memory | - |
| `SVIX_JWT_SECRET` | svix-server | (secret) | - |
| `SVIX_QUEUE_TYPE` | svix-server | memory | - |
| `SVIX_LISTEN_ADDRESS` | svix-server | 0.0.0.0:8071 | - |
| `API_URL` | hexclave-cron | - | Base URL of the hexclave service's API, reached over Railway's private network. |
| `CRON_SECRET` | hexclave-cron | (secret) | Shared secret used to authenticate this job's requests to hexclave's internal endpoints. |
| `PORT` | hexclave | 8101 | Port the dashboard process listens on inside the container. |
| `CRON_SECRET` | hexclave | (secret) | Shared secret hexclave-cron uses to call this service's internal maintenance endpoints. |
| `HEXCLAVE_S3_BUCKET` | hexclave | hexclave-public | Public bucket name; must match minio-init's PUBLIC_BUCKET. |
| `HEXCLAVE_S3_REGION` | hexclave | us-east-1 | S3 region hexclave signs storage requests with; must match MinIO's MINIO_SITE_REGION. |
| `STACK_SVIX_API_KEY` | hexclave | (secret) | - |
| `HEXCLAVE_S3_ENDPOINT` | hexclave | - | S3 API endpoint. Uses MinIO's public domain because hexclave hands the browser presigned upload/download URLs bound to this host. |
| `HEXCLAVE_SERVER_SECRET` | hexclave | (secret) | High-entropy secret used to encrypt sessions and derive internal keys. Keep it stable — changing it invalidates sessions. |
| `HEXCLAVE_TRUSTED_PROXY` | hexclave | generic | Tells hexclave it's behind Railway's reverse proxy so it can trust forwarded-for headers. |
| `HEXCLAVE_CLICKHOUSE_URL` | hexclave | - | URL of the ClickHouse service used for analytics data. |
| `HEXCLAVE_S3_ACCESS_KEY_ID` | hexclave | - | S3 access key, referenced from the MinIO service. |
| `HEXCLAVE_SKIP_SEED_SCRIPT` | hexclave | false | IMPORTANT: after your FIRST successful deploy, set this to true. On its second run the image's seed script crashes the whole container (an upstream bug), so the app will crash-loop on the first restart/redeploy until you set this to true. This is the ONLY variable that fixes that crash — it is NOT the same as the HEXCLAVE_SEED_INTERNAL_* variables. Leave false for the very first deploy so the admin account and database get seeded. |
| `STACK_DISABLE_PLAN_LIMITS` | hexclave | true | - |
| `HEXCLAVE_EMAILABLE_API_KEY` | hexclave | (secret) | Email validation provider key. Defaults to disabling validation — set a real Emailable key to enable it. |
| `HEXCLAVE_S3_PRIVATE_BUCKET` | hexclave | hexclave-private | Private bucket name for session recordings and deployment source; must match minio-init's PRIVATE_BUCKET. |
| `HEXCLAVE_S3_PUBLIC_ENDPOINT` | hexclave | - | Base URL for direct public-bucket object links (e.g. profile pictures). Points at the public bucket on MinIO's public domain. |
| `HEXCLAVE_CLICKHOUSE_DATABASE` | hexclave | - | ClickHouse database hexclave uses for analytics, must match ClickHouse's CLICKHOUSE_DB. |
| `NEXT_PUBLIC_HEXCLAVE_API_URL` | hexclave | - | Public URL for hexclave's API, automatically served through the hexclave-proxy service. |
| `HEXCLAVE_S3_SECRET_ACCESS_KEY` | hexclave | (secret) | S3 secret key, referenced from the MinIO service. |
| `HEXCLAVE_CLICKHOUSE_ADMIN_USER` | hexclave | (secret) | ClickHouse admin username, matches ClickHouse's CLICKHOUSE_USER. |
| `HEXCLAVE_EXTERNAL_DB_SYNC_DIRECT` | hexclave | true | Runs external DB sync inline instead of queuing through Upstash QStash, which this template doesn't configure. Leave true unless you set up QStash yourself. |
| `HEXCLAVE_CLICKHOUSE_ADMIN_PASSWORD` | hexclave | (secret) | ClickHouse admin password, matches ClickHouse's CLICKHOUSE_PASSWORD. |
| `NEXT_PUBLIC_HEXCLAVE_DASHBOARD_URL` | hexclave | - | Public URL for the hexclave dashboard, automatically served through the hexclave-proxy service. |
| `HEXCLAVE_DATABASE_CONNECTION_STRING` | hexclave | - | Postgres connection string hexclave uses for its own data. |
| `HEXCLAVE_CLICKHOUSE_EXTERNAL_PASSWORD` | hexclave | (secret) | Password for the limited external ClickHouse user hexclave creates for analytics queries. |
| `HEXCLAVE_SEED_INTERNAL_PROJECT_USER_EMAIL` | hexclave | - | Email for the admin account seeded on first boot — this is what you'll sign in to the dashboard with. |
| `HEXCLAVE_SEED_INTERNAL_PROJECT_USER_PASSWORD` | hexclave | (secret) | Password for the seeded admin account. Auto-generated — find it in this service's Variables tab after deploy. |
| `HEXCLAVE_SEED_INTERNAL_PROJECT_SIGN_UP_ENABLED` | hexclave | false | Whether new users can sign themselves up to the internal dashboard project. Leave false and use the seeded admin account instead. |
| `HEXCLAVE_SEED_INTERNAL_PROJECT_USER_INTERNAL_ACCESS` | hexclave | true | Grants the seeded admin user access to hexclave's own internal dashboard project. |
| `PROXY_PORT` | hexclave-proxy | 8080 | Port this proxy listens on internally. Also the target port for its public domain — don't change one without the other. |
| `API_UPSTREAM` | hexclave-proxy | - | Internal address of the hexclave service's API port, reached over Railway's private network. |
| `DASHBOARD_UPSTREAM` | hexclave-proxy | - | Internal address of the hexclave service's dashboard port, reached over Railway's private network. |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first boot. |
| `DATABASE_URL` | Postgres | - | Full Postgres connection string other services should use to connect. |
| `POSTGRES_USER` | Postgres | (secret) | Username for the default Postgres role. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for the default Postgres role. Auto-generated — you shouldn't need to set this. |
| `CLICKHOUSE_DB` | ClickHouse | analytics | Name of the ClickHouse database Hexclave's analytics features use. |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | Admin username ClickHouse is initialized with. |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Admin password ClickHouse is initialized with. Auto-generated. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Enables SQL-driven user/role management, required so Hexclave's migrations can create its own ClickHouse users. |

## Configuration

- **Start command:** `sh -c 'until mc alias set local "$MINIO_ENDPOINT" "$MINIO_ROOT_USER" "$MINIO_ROOT_PASSWORD" >/dev/null 2>&1; do echo "waiting for minio..."; sleep 2; done; mc mb --ignore-existing local/"$PUBLIC_BUCKET"; mc mb --ignore-existing local/"$PRIVATE_BUCKET"; mc anonymous set download local/"$PUBLIC_BUCKET"; echo "buckets ready"'`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `minio server /data --console-address ":9001"`
- **Healthcheck:** `/minio/health/live`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `sh -c 'for p in email-queue-step external-db-sync/sequencer external-db-sync/poller; do (curl -fsS -m 290 -o /dev/null -w "$p -> %{http_code} in %{time_total}s\n" -H "Authorization: Bearer $CRON_SECRET" "$API_URL/api/latest/internal/$p" || echo "$p FAILED") & done; wait'`
- **Start command:** `sh -c 'cat > /etc/caddy/Caddyfile <<EOF
:$PROXY_PORT {
 handle /caddy-health {
 respond "ok" 200
 }
 handle /api/* {
 reverse_proxy $API_UPSTREAM
 }
 handle {
 reverse_proxy $DASHBOARD_UPSTREAM
 }
 handle_errors {
 respond "Hexclave is still starting up — first boot takes a few minutes. Refresh this page shortly." 503
 }
}
EOF
exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/caddy-health`

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/hexclave-or-self-hosted-auth-storage)
