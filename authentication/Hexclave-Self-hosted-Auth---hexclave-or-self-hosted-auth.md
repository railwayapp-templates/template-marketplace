# Deploy Hexclave | Self-hosted Auth on Railway

Auth, teams, and analytics for your app, easily use for multiple products.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/hexclave-or-self-hosted-auth)

## About

Hexclave is an open-source "user infrastructure" platform: authentication, teams, and analytics for your app. This template runs Hexclave's official all-in-one server image (dashboard + API in one container) on Railway, alongside the Postgres and ClickHouse databases it needs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| hexclave-cron | `curlimages/curl:latest` | Worker |
| hexclave | `stackauth/server:ebe7877` | Worker |
| ClickHouse | `clickhouse/clickhouse-server:25.10` | Database |
| hexclave-proxy | `caddy:2-alpine` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Name of the database created on first boot. |
| `DATABASE_URL` | Postgres | - | Full Postgres connection string other services should use to connect. |
| `POSTGRES_USER` | Postgres | (secret) | Username for the default Postgres role. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password for the default Postgres role. Auto-generated — you shouldn't need to set this. |
| `API_URL` | hexclave-cron | - | Base URL of the hexclave service's API, reached over Railway's private network. |
| `CRON_SECRET` | hexclave-cron | (secret) | Shared secret used to authenticate this job's requests to hexclave's internal endpoints. |
| `PORT` | hexclave | 8101 | Port the dashboard process listens on inside the container. |
| `CRON_SECRET` | hexclave | (secret) | Shared secret hexclave-cron uses to call this service's internal maintenance endpoints. |
| `HEXCLAVE_SERVER_SECRET` | hexclave | (secret) | High-entropy secret used to encrypt sessions and derive internal keys. Keep it stable — changing it invalidates sessions. |
| `HEXCLAVE_TRUSTED_PROXY` | hexclave | generic | Tells hexclave it's behind Railway's reverse proxy so it can trust forwarded-for headers. |
| `HEXCLAVE_CLICKHOUSE_URL` | hexclave | - | URL of the ClickHouse service used for analytics data. |
| `HEXCLAVE_SKIP_SEED_SCRIPT` | hexclave | false | Skips re-running the seed script on boot. Leave false for your first deploy; set true after that first boot succeeds — see README, re-seeding on restart currently crashes this image. |
| `HEXCLAVE_EMAILABLE_API_KEY` | hexclave | (secret) | Email validation provider key. Defaults to disabling validation — set a real Emailable key to enable it. |
| `HEXCLAVE_CLICKHOUSE_DATABASE` | hexclave | - | ClickHouse database hexclave uses for analytics, must match ClickHouse's CLICKHOUSE_DB. |
| `NEXT_PUBLIC_HEXCLAVE_API_URL` | hexclave | - | Public URL for hexclave's API, automatically served through the hexclave-proxy service. |
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
| `CLICKHOUSE_DB` | ClickHouse | analytics | Name of the ClickHouse database Hexclave's analytics features use. |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | Admin username ClickHouse is initialized with. |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Admin password ClickHouse is initialized with. Auto-generated. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | ClickHouse | 1 | Enables SQL-driven user/role management, required so Hexclave's migrations can create its own ClickHouse users. |
| `PROXY_PORT` | hexclave-proxy | 8080 | Port this proxy listens on internally. Also the target port for its public domain — don't change one without the other. |
| `API_UPSTREAM` | hexclave-proxy | - | Internal address of the hexclave service's API port, reached over Railway's private network. |
| `DASHBOARD_UPSTREAM` | hexclave-proxy | - | Internal address of the hexclave service's dashboard port, reached over Railway's private network. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
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
- **Networking:** Public domain with automatic HTTPS

**Category:** Authentication

[View on Railway →](https://railway.com/deploy/hexclave-or-self-hosted-auth)
