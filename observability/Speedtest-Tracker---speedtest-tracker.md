# Deploy Speedtest Tracker on Railway

Scheduled internet speed tests with history and alerts

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/speedtest-tracker)

## About

Speedtest Tracker (alexjustesen/speedtest-tracker) runs scheduled internet speed tests and keeps a history with alerts. This template deploys the linuxserver.io image pinned to 1.15.0 with a persistent volume, SQLite by default and an API health check.

Hosting Speedtest Tracker on Railway means running the linuxserver/speedtest-tracker container on port 80 with a volume mounted at /config for its data. The template sets a generated APP_KEY (a base64-prefixed 32-byte key), APP_URL from your public Railway domain, DB_CONNECTION=sqlite, PUID/PGID 1000, a test schedule of every six hours (0 */6 * * *), TZ and PORT=80. The health check path is /api/healthcheck. SQLite is the default; optionally add a Postgres plugin and set DB_CONNECTION=pgsql with DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME and DB_PASSWORD referencing the Postgres service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-templates | [prime3679/railway-templates](https://github.com/prime3679/railway-templates) (root: /speedtest-tracker) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | America/New_York | Timezone used for the speed test schedule and logs. |
| `PGID` | 1000 | Group ID the container runs as (PGID). |
| `PORT` | 80 | HTTP port the app listens on; must match the public networking port. |
| `PUID` | 1000 | User ID the container runs as (PUID). |
| `APP_KEY` | - | Application encryption key; must be a base64:-prefixed 32-byte key. Generated automatically. |
| `APP_URL` | - | Public URL of the app, derived from the Railway public domain. |
| `DB_CONNECTION` | sqlite | Database driver: sqlite by default, or pgsql with a Postgres service. |
| `SPEEDTEST_SCHEDULE` | 0 */6 * * * | Cron schedule for automatic speed tests (default every 6 hours). |

## Configuration

- **Healthcheck:** `/api/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Observability · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/speedtest-tracker)
