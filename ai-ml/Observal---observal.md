# Deploy Observal on Railway

Registry and insight engine for coding-agent Skills, MCP servers, Agents.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/observal)

## About

Observal is the open-source control plane and system of record for a team's internal AI components. It is a registry for Skills, MCP servers, and Agents with review and governance, plus an insight engine that captures coding-agent sessions from Claude Code, Cursor, Codex, Kiro, Antigravity, and Pi and turns them into usage, cost, and quality analytics. This template deploys the complete upstream stack at release 1.13.1: web UI, API, background worker, PostgreSQL, ClickHouse, and Redis.

Hosting Observal on Railway means six services wired over the private network, with one public domain on the web service. The API runs upstream's own image and its init script on every start, so schema and ClickHouse migrations apply themselves; the worker shares the image and runs the job queue; the web service serves the UI and proxies the API, the CLI, and telemetry traffic to the backend, resolving its address through Railway DNS so redeploys never break the link. Secrets, database credentials, and the passwords of the seeded demo accounts are generated at deploy time. Everything beyond infrastructure, from SSO to retention and eval models, is configured in Observal's admin UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| web | [RockinPaul/observal_railway_template](https://github.com/RockinPaul/observal_railway_template) | Web service |
| ClickHouse | [RockinPaul/observal_railway_template](https://github.com/RockinPaul/observal_railway_template) | Database |
| worker | [RockinPaul/observal_railway_template](https://github.com/RockinPaul/observal_railway_template) | Worker |
| api | [RockinPaul/observal_railway_template](https://github.com/RockinPaul/observal_railway_template) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | observal | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `PORT` | web | 3000 | - |
| `CLICKHOUSE_DB` | ClickHouse | observal | - |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | - |
| `LOG_LEVEL` | worker | INFO | - |
| `LOG_FORMAT` | worker | json | - |
| `SECRET_KEY` | worker | (secret) | - |
| `OBSERVAL_ROLE` | worker | worker | - |
| `PORT` | api | 8000 | - |
| `LOG_LEVEL` | api | INFO | - |
| `LOG_FORMAT` | api | json | - |
| `SECRET_KEY` | api | (secret) | Application encryption secret. Generated; changing it invalidates sessions. |
| `JWT_KEY_DIR` | api | /data/keys | - |
| `OBSERVAL_ROLE` | api | api | - |
| `DEMO_USER_EMAIL` | api | user@demo.example | - |
| `DEMO_ADMIN_EMAIL` | api | admin@demo.example | - |
| `DEMO_USER_PASSWORD` | api | (secret) | - |
| `SEED_DEMO_ACCOUNTS` | api | true | - |
| `DEMO_ADMIN_PASSWORD` | api | (secret) | - |
| `DEMO_REVIEWER_EMAIL` | api | reviewer@demo.example | - |
| `DEMO_REVIEWER_PASSWORD` | api | (secret) | - |
| `DEMO_SUPER_ADMIN_EMAIL` | api | super@demo.example | - |
| `DEMO_SUPER_ADMIN_PASSWORD` | api | (secret) | - |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/readyz`

**Category:** AI/ML · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/observal)
