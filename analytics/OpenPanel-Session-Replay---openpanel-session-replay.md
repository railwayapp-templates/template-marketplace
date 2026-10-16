# Deploy OpenPanel Session Replay on Railway

Product analytics with rrweb session replay

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openpanel-session-replay)

## About

OpenPanel Session Replay is the same OpenPanel 2.3.0 Railway stack (api, dashboard, worker, Caddy, Postgres, Redis, ClickHouse) with the overview aimed at opt-in rrweb session replay plus funnels, retention, cohorts, and profiles. Digest-pinned lindesvard/openpanel-* images, API_HOST=:: for Railway private IPv6, one public domain, zero deploy-time config.

Seven services: op-proxy (caddy:2-alpine, only public service, :8080; Caddyfile from env; /api/* to api, rest to dashboard), op-api / op-dashboard / op-worker (2.3.0 digests), op-postgres 17, op-redis 8.2.1, op-clickhouse 25.12. Replay is off until you enable it per project in the SDK (`sessionReplay: { enabled: true }`). The main tracker stays lean; `op1-replay.js` loads asynchronously only when recording. Recordings are structured rrweb data, not video, with client-side masking before upload.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| op-clickhouse | `clickhouse/clickhouse-server:25.12@sha256:8a790dd3468db22b1d4e7b18a176f378ff5ff6053b9c48dd4ea1fa71a24c5ba6` | Database |
| op-redis | `redis:8.2.1@sha256:5fa2edb1e408fa8235e6db8fab01d1afaaae96c9403ba67b70feceb8661e8621` | Database |
| op-worker | `lindesvard/openpanel-worker:2.3.0@sha256:b22e247fb6980b820c1a954d0e3d2fe88b3edf40a58aa53329467af239538e80` | Worker |
| op-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |
| op-dashboard | `lindesvard/openpanel-dashboard:2.3.0@sha256:b773cf864454a0ec89b2a133b48bf06202880ed650a75cc2f1f5c87aaed1cffa` | Worker |
| op-proxy | `caddy:2-alpine@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |
| op-api | `lindesvard/openpanel-api:2.3.0@sha256:cee4855cd715a7248c5c49090fe93a28ffc505541de20cb238d8884a6bcb9223` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOST` | op-clickhouse | - | Private hostname of the ClickHouse service. |
| `PORT` | op-clickhouse | 8123 | ClickHouse HTTP port (8123). |
| `DATABASE_URL` | op-clickhouse | - | HTTP connection URL used by the apps as CLICKHOUSE_URL. |
| `CLICKHOUSE_DB` | op-clickhouse | openpanel | Database for events (openpanel). |
| `CLICKHOUSE_USER` | op-clickhouse | (secret) | ClickHouse user (clickhouse). |
| `DATABASE_BASE_URL` | op-clickhouse | - | ClickHouse HTTP base URL with credentials, without the database name. |
| `CLICKHOUSE_PASSWORD` | op-clickhouse | (secret) | ClickHouse password, generated per deploy. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | op-clickhouse | 1 | Enables SQL-driven access management for the default ClickHouse user (1). |
| `PORT` | op-redis | 6379 | Redis port (6379). |
| `REDISHOST` | op-redis | - | Private hostname of the Redis service. |
| `REDISPORT` | op-redis | 6379 | Redis port (6379). |
| `REDISUSER` | op-redis | default | Redis username (default). |
| `REDIS_URL` | op-redis | - | Exported Redis connection URL. |
| `REDISPASSWORD` | op-redis | (secret) | Redis password; references REDIS_PASSWORD. |
| `REDIS_PASSWORD` | op-redis | (secret) | Redis password, generated per deploy. |
| `PORT` | op-worker | 3000 | HTTP port for this service (3000). |
| `API_URL` | op-worker | - | Public API URL: op-proxy domain plus /api. |
| `API_HOST` | op-worker | :: | Listen on :: so Railway IPv6 private networking works. |
| `REDIS_URL` | op-worker | - | Redis URL with password on op-redis private domain. |
| `SELF_HOSTED` | op-worker | true | Enables self-hosted mode (true). |
| `DATABASE_URL` | op-worker | - | Postgres connection string from op-postgres. |
| `EMAIL_SENDER` | op-worker | - | Optional From address for outgoing emails. |
| `COOKIE_SECRET` | op-worker | (secret) | Signs session cookies; generated on op-api and shared. |
| `DASHBOARD_URL` | op-worker | - | Public dashboard URL on the op-proxy domain. |
| `CLICKHOUSE_URL` | op-worker | - | ClickHouse HTTP URL for the openpanel database. |
| `OPENAI_API_KEY` | op-worker | (secret) | Optional OpenAI key for in-app AI chat. |
| `RESEND_API_KEY` | op-worker | (secret) | Optional Resend key for invite and reset emails. |
| `ALLOW_INVITATION` | op-worker | true | Allow inviting teammates by email. |
| `ANTHROPIC_API_KEY` | op-worker | (secret) | Optional Anthropic key for in-app AI chat. |
| `ALLOW_REGISTRATION` | op-worker | true | Allow sign-up; closes after the first user. |
| `DATABASE_URL_DIRECT` | op-worker | - | Direct Postgres URL used for migrations. |
| `POSTGRES_DB` | op-postgres | railway | Database created on first boot (railway). |
| `DATABASE_URL` | op-postgres | - | Private connection string used by the apps. |
| `POSTGRES_USER` | op-postgres | (secret) | Postgres superuser (postgres). |
| `POSTGRES_PASSWORD` | op-postgres | (secret) | Postgres password, generated per deploy. |
| `PORT` | op-dashboard | 3000 | HTTP port for this service (3000). |
| `API_URL` | op-dashboard | - | Public API URL: op-proxy domain plus /api. |
| `REDIS_URL` | op-dashboard | - | Redis URL with password on op-redis private domain. |
| `API_URL_SSR` | op-dashboard | - | Private API URL the dashboard uses server-side. |
| `SELF_HOSTED` | op-dashboard | true | Enables self-hosted mode (true). |
| `DATABASE_URL` | op-dashboard | - | Postgres connection string from op-postgres. |
| `COOKIE_SECRET` | op-dashboard | (secret) | Signs session cookies; generated on op-api and shared. |
| `DASHBOARD_URL` | op-dashboard | - | Public dashboard URL on the op-proxy domain. |
| `CLICKHOUSE_URL` | op-dashboard | - | ClickHouse HTTP URL for the openpanel database. |
| `ALLOW_INVITATION` | op-dashboard | true | Allow inviting teammates by email. |
| `ALLOW_REGISTRATION` | op-dashboard | true | Allow sign-up; closes after the first user. |
| `DATABASE_URL_DIRECT` | op-dashboard | - | Direct Postgres URL used for migrations. |
| `CUSTOM_COOKIE_DOMAIN` | op-dashboard | - | Cookie domain; the op-proxy public domain. |
| `PORT` | op-proxy | 8080 | Caddy listen port and public target port (8080). |
| `API_URL` | op-proxy | - | Internal op-api upstream for /api/* requests. |
| `CADDYFILE` | op-proxy | :{$PORT} {
	handle_path /api/* {
		reverse_proxy {$API_URL} {
			header_up openpanel-client-ip {http.request.header.X-Real-Ip}
			header_up x-client-ip {http.request.header.X-Real-Ip}
		}
	}
	reverse_proxy {$DASHBOARD_URL}
} | Caddy config written to disk at start; routes and client IP headers. |
| `DASHBOARD_URL` | op-proxy | - | Internal op-dashboard upstream for all other requests. |
| `PORT` | op-api | 3000 | HTTP port for this service (3000). |
| `API_URL` | op-api | - | Public API URL: op-proxy domain plus /api. |
| `API_HOST` | op-api | :: | Listen on :: so Railway IPv6 private networking works. |
| `REDIS_URL` | op-api | - | Redis URL with password on op-redis private domain. |
| `SELF_HOSTED` | op-api | true | Enables self-hosted mode (true). |
| `DATABASE_URL` | op-api | - | Postgres connection string from op-postgres. |
| `EMAIL_SENDER` | op-api | - | Optional From address for outgoing emails. |
| `COOKIE_SECRET` | op-api | (secret) | Signs session cookies; generated on op-api and shared. |
| `DASHBOARD_URL` | op-api | - | Public dashboard URL on the op-proxy domain. |
| `CLICKHOUSE_URL` | op-api | - | ClickHouse HTTP URL for the openpanel database. |
| `OPENAI_API_KEY` | op-api | (secret) | Optional OpenAI key for in-app AI chat. |
| `RESEND_API_KEY` | op-api | (secret) | Optional Resend key for invite and reset emails. |
| `ALLOW_INVITATION` | op-api | true | Allow inviting teammates by email. |
| `ANTHROPIC_API_KEY` | op-api | (secret) | Optional Anthropic key for in-app AI chat. |
| `ALLOW_REGISTRATION` | op-api | true | Allow sign-up; closes after the first user. |
| `DATABASE_URL_DIRECT` | op-api | - | Direct Postgres URL used for migrations. |
| `CUSTOM_COOKIE_DOMAIN` | op-api | - | Cookie domain; the op-proxy public domain. |

## Configuration

- **Start command:** `sh -c 'mkdir -p /etc/clickhouse-server/config.d && printf "%s\n" "<clickhouse><listen_host>::</listen_host><listen_host>0.0.0.0</listen_host><trace_log remove=\"remove\"/><text_log remove=\"remove\"/><metric_log remove=\"remove\"/><asynchronous_metric_log remove=\"remove\"/><processors_profile_log remove=\"remove\"/><query_metric_log remove=\"remove\"/><query_thread_log remove=\"remove\"/><query_views_log remove=\"remove\"/><asynchronous_insert_log remove=\"remove\"/><opentelemetry_span_log remove=\"remove\"/><background_schedule_pool_log remove=\"remove\"/></clickhouse>" > /etc/clickhouse-server/config.d/railway-listen.xml && exec /entrypoint.sh'`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "rm -rf ${RAILWAY_VOLUME_MOUNT_PATH}/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass ${REDIS_PASSWORD} --bind '* -::*' --protected-mode no --port ${PORT:-6379} --save 60 1 --dir ${RAILWAY_VOLUME_MOUNT_PATH}"`
- **Volume:** `/data`
- **Healthcheck:** `/healthcheck`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/healthcheck`
- **Start command:** `sh -c "echo \"$CADDYFILE\" > /etc/caddy/Caddyfile; echo START_OK PORT=$PORT; cat /etc/caddy/Caddyfile; exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c "echo Running migrations...; CI=true pnpm -r run migrate:deploy; exec pnpm start"`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/openpanel-session-replay)
