# Deploy Speedtest Tracker Regional Egress on Railway

Track Railway-region Internet performance with persistent test history.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/speedtest-tracker-regional-egress)

## About

Track Railway-region Internet performance with persistent test history.

Speedtest Tracker 1.15.0 records download/upload throughput, latency and historical trends in a persistent SQLite database. Tests originate from the Railway region where the app runs. The container scheduler is included, but automatic speed tests start disabled.

| Service | Access | Persistent storage |
| --- | --- | --- |
| core | Private | /config |
| speedtest-tracker | Public HTTPS | None |

Railway terminates public TLS. Keep volume-backed services at one replica. Database and core application ports are private; only the generated owner gateway is public.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| speedtest-tracker | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| core | `ghcr.io/linuxserver/speedtest-tracker:version-v1.15.0@sha256:9ebe34dd607e0b3eb8f303095d40790817e087c027cfe9224076ec8b43be5e8a` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | speedtest-tracker | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | speedtest-tracker | true | Owner auth for speedtest-tracker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OWNER_SCOPE` | speedtest-tracker | all | Owner scope for speedtest-tracker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | speedtest-tracker | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | speedtest-tracker | 80 | Upstream port for speedtest-tracker. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | speedtest-tracker | (secret) | Generated access password. Keep private and preserve with backups. |
| `TZ` | core | UTC | Tz for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PGID` | core | 1000 | Pgid for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PUID` | core | 1000 | Puid for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APP_ENV` | core | production | App env for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APP_KEY` | core | - | Generated 32-character Laravel encryption key. Preserve with the SQLite database; changing it invalidates encrypted application data. |
| `APP_URL` | core | - | App url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APP_DEBUG` | core | false | App debug for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DB_CONNECTION` | core | sqlite | Db connection for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PUBLIC_DASHBOARD` | core | false | Public dashboard for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SPEEDTEST_SCHEDULE` | core | - | Automatic speed tests are disabled initially. Tests measure Railway regional egress, not your home Internet, and can consume billable bandwidth. Set a cron schedule only after a manual test. |
| `PRUNE_RESULTS_OLDER_THAN` | core | 90 | Remove speed-test results older than 90 days using the upstream scheduler. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Observability · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/speedtest-tracker-regional-egress)
