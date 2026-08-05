# Deploy OpenPanel — Self-Hosted Product Analytics on Railway

Self-host OpenPanel — product & web analytics with mobile SDKs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openpanel-product-analytics)

## About

OpenPanel is an open-source analytics platform that combines the depth of Mixpanel with the privacy of Plausible — product analytics for web *and* mobile apps, self-hosted so your event data stays yours. Track funnels, retention, user profiles, and custom events with mobile SDKs (React Native, iOS, Android), a JavaScript tracker, and a full event API — all cookieless, so there's no consent banner. This template deploys the full stack — dashboard, event API, worker, PostgreSQL, ClickHouse, and Redis — wired behind a single domain, so login and tracking work on the first deploy.
---

OpenPanel is a serious analytics stack, and one configuration detail decides whether login works at all — this template handles it.

**The dashboard and API must share one domain, or auth breaks.** OpenPanel serves the dashboard and event API through a single Caddy reverse proxy, and `DASHBOARD_URL` and `API_URL` must both point at that one domain. Authentication cookies are tied to the domain — if the dashboard and API are on different hosts, login silently fails and events won't associate correctly. This template wires the single-domain Caddy setup, so auth works immediately.

**ClickHouse stores the events; Postgres holds the metadata.** OpenPanel splits storage: ClickHouse handles high-volume event data, PostgreSQL holds transactional metadata (users, projects, dashboards), and Redis buffers incoming events before they're flushed to ClickHouse in batches. Wiring these together correctly is the work this template does for you.

**Cookieless by design — no consent banner.** OpenPanel tracks without cookies, so it's privacy-compliant out of the box and needs no consent banner, counting every visitor accurately without the friction of Google Analytics.

**Set `COOKIE_SECRET`, lock registration, add email.** `COOKIE_SECRET` is a random 32-character value that signs sessions — set it and keep it stable. Set `ALLOW_REGISTRATION=false` after creating your account, `ALLOW_INVITATION=true` to invite your team, and `RESEND_API_KEY` (or `SMTP_*`) to enable invitations and password resets — without it, those emails only log to the console.

**Mobile and web SDKs, one backend.** OpenPanel's real edge is tracking both web and native mobile apps into one platform — React Native, iOS, Android, a JS tracker, and zero-JS `data-track` HTML attributes all feed the same event API. Point your apps at your Railway domain and start sending events.

Typical cost: **~$15–25/month** on Railway across the services, more under heavy event volume. OpenPanel is open source (AGPL-3.0) and free — versus Mixpanel's per-event pricing.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| op-proxy | `caddy:2-alpine` | Worker |
| op-api | `lindesvard/openpanel-api:2.2` | Worker |
| op-dashboard | `lindesvard/openpanel-dashboard:2.2` | Worker |
| op-worker | `lindesvard/openpanel-worker:2.2` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2.1` | Database |
| op-clickhouse | `clickhouse/clickhouse-server:25.12` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | op-proxy | 8080 | - |
| `CADDYFILE` | op-proxy | :{$PORT} {	handle_path /api/* {		reverse_proxy {$API_URL} {			header_up openpanel-client-ip {http.request.header.X-Real-Ip}			header_up x-client-ip {http.request.header.X-Real-Ip}		}	}	reverse_proxy /* {$DASHBOARD_URL}} | - |
| `PORT` | op-api | 3000 | - |
| `SELF_HOSTED` | op-api | true | - |
| `EMAIL_SENDER` | op-api | - | Email address to send notification emails as |
| `COOKIE_SECRET` | op-api | (secret) | - |
| `RESEND_API_KEY` | op-api | (secret) | API key for Resend, to send notification emails |
| `ALLOW_INVITATION` | op-api | true | - |
| `ALLOW_REGISTRATION` | op-api | false | - |
| `PORT` | op-dashboard | 3000 | - |
| `SELF_HOSTED` | op-dashboard | true | - |
| `SELF_HOSTED` | op-worker | true | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | op-clickhouse | 8123 | - |
| `PUBLIC_PORT` | op-clickhouse | 443 | - |
| `CLICKHOUSE_DB` | op-clickhouse | openpanel | - |
| `CLICKHOUSE_USER` | op-clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | op-clickhouse | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/clickhouse`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/openpanel-product-analytics)
