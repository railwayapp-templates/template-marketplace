# Deploy Uptime on Railway

Monitor uptime, logs, alerts & status pages in one platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptime)

## About

OneUptime is an open-source observability platform that brings uptime monitoring, incident management, status pages, on-call scheduling, logging, metrics, distributed tracing, error tracking, and application performance monitoring (APM) together in one application. Instead of managing multiple SaaS products, teams can self-host OneUptime to monitor infrastructure, respond to incidents, collect telemetry, and communicate system health from a centralized dashboard.

This Railway template deploys a complete OneUptime stack using multiple containerized services. The deployment includes the OneUptime App, NGINX Ingress, Monitoring Probe, AI Agent, PostgreSQL, Redis, and ClickHouse. Railway automatically provisions each service, connects them over a private network, generates secure internal DNS, manages secrets through Variables, provides HTTPS via Railway Domains, and supports persistent storage using Railway Volumes.

PostgreSQL stores application and configuration data, Redis powers caching and background workers, and ClickHouse stores observability data such as logs, traces, metrics, and telemetry. Railway manages service networking and health checks, making it easy to deploy, update, and scale the entire observability platform without managing infrastructure manually. After deployment, simply generate a Railway domain for the Ingress service and create the first administrator account.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| app | `oneuptime/app:11.5.10` | Worker |
| clickhouse | `clickhouse/clickhouse-server:25.7` | Database |
| probe | `oneuptime/probe:11.5.10` | Worker |
| ingress | `oneuptime/nginx:11.5.10` | Web service |
| ai-agent | `oneuptime/ai-agent:11.5.10` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `HOST` | app | - | Public URL used by OneUptime. |
| `PORT` | app | 3002 | Port used by the OneUptime app. |
| `APP_PORT` | app | 3002 | Internal port used by the app. |
| `NODE_ENV` | app | production | Enables production Node.js behavior. |
| `REDIS_DB` | app | 0 | Redis database number. |
| `REDIS_HOST` | app | - | Private hostname of the Redis service. |
| `REDIS_PORT` | app | 6379 | Internal Redis port. |
| `ENVIRONMENT` | app | production | OneUptime runtime environment. |
| `DATABASE_HOST` | app | - | Private hostname of PostgreSQL. |
| `DATABASE_NAME` | app | - | PostgreSQL database name. |
| `DATABASE_PORT` | app | 5432 | Internal PostgreSQL port. |
| `HTTP_PROTOCOL` | app | https | Protocol used by the public URL. |
| `REDIS_PASSWORD` | app | (secret) | Password from the Redis service. |
| `REDIS_USERNAME` | app | (secret) | Username used for Redis. |
| `BILLING_ENABLED` | app | false | Disables OneUptime billing features. |
| `CAPTCHA_ENABLED` | app | false | Disables CAPTCHA by default. |
| `CLICKHOUSE_HOST` | app | - | Private hostname of ClickHouse. |
| `CLICKHOUSE_PORT` | app | 8123 | Internal ClickHouse HTTP port. |
| `CLICKHOUSE_USER` | app | (secret) | ClickHouse username. |
| `ONEUPTIME_SECRET` | app | (secret) | Secret shared with OneUptime services. |
| `DATABASE_PASSWORD` | app | (secret) | Password from the PostgreSQL service. |
| `DATABASE_USERNAME` | app | (secret) | Username from the PostgreSQL service. |
| `DISABLE_TELEMETRY` | app | true | Disables OneUptime telemetry. |
| `ENCRYPTION_SECRET` | app | (secret) | Secret used to encrypt stored data. |
| `REGISTER_PROBE_KEY` | app | - | Secret used to register the bundled probe. |
| `CLICKHOUSE_DATABASE` | app | oneuptime | ClickHouse database name. |
| `CLICKHOUSE_PASSWORD` | app | (secret) | Password from the ClickHouse service. |
| `SERVER_APP_HOSTNAME` | app | - | Private hostname of the app service. |
| `IS_ENTERPRISE_EDITION` | app | false | Runs the community edition. |
| `DATABASE_CONNECTION_TIMEOUT_MS` | app | 30000 | Database connection timeout in milliseconds. |
| `PORT` | clickhouse | 8123 | Internal ClickHouse HTTP port. |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Username used by OneUptime. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Generated ClickHouse password. |
| `ONEUPTIME_CLICKHOUSE_CONFIG_B64` | clickhouse | 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 | Encoded ClickHouse configuration for OneUptime. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 | Enables authenticated user management. |
| `PORT` | probe | 3874 | Port used by the bundled probe. |
| `NODE_ENV` | probe | production | Enables production Node.js behavior. |
| `PROBE_KEY` | probe | - | Generated key for this probe. |
| `PROBE_NAME` | probe | Railway Probe | Name shown in the OneUptime dashboard. |
| `ONEUPTIME_URL` | probe | - | Private URL of the OneUptime app. |
| `DISABLE_TELEMETRY` | probe | true | Disables OneUptime telemetry. |
| `PROBE_DESCRIPTION` | probe | Bundled Railway monitoring probe. | Description shown in the OneUptime dashboard. |
| `REGISTER_PROBE_KEY` | probe | - | Secret shared with the app for registration. |
| `PROBE_SNMP_TRAP_RECEIVER_ENABLED` | probe | false | Disables the unsupported UDP trap receiver. |
| `HOST` | ingress | - | Public URL used by the OneUptime gateway. |
| `PORT` | ingress | 7851 | Port used by the gateway. |
| `APP_PORT` | ingress | 3002 | Internal port of the app service. |
| `NODE_ENV` | ingress | production | Enables production Node.js behavior. |
| `HOME_PORT` | ingress | 3002 | Internal port of the home service. |
| `ENVIRONMENT` | ingress | production | OneUptime runtime environment. |
| `DATABASE_HOST` | ingress | - | Private hostname of PostgreSQL. |
| `DATABASE_NAME` | ingress | - | PostgreSQL database name. |
| `DATABASE_PORT` | ingress | 5432 | Internal PostgreSQL port. |
| `HTTP_PROTOCOL` | ingress | https | Protocol used by the public URL. |
| `BILLING_ENABLED` | ingress | false | Disables OneUptime billing features. |
| `DATABASE_PASSWORD` | ingress | (secret) | Password from the PostgreSQL service. |
| `DATABASE_USERNAME` | ingress | (secret) | Username from the PostgreSQL service. |
| `DISABLE_TELEMETRY` | ingress | true | Disables OneUptime telemetry. |
| `SERVER_APP_HOSTNAME` | ingress | - | Private hostname of the app service. |
| `SERVER_HOME_HOSTNAME` | ingress | - | Private hostname of the home service. |
| `RUN_DATABASE_MIGRATIONS_ON_BOOT` | ingress | false | Keeps database migrations in the app service. |
| `PORT` | ai-agent | 3875 | Port used by the bundled AI agent. |
| `NODE_ENV` | ai-agent | production | Enables production Node.js behavior. |
| `AI_AGENT_KEY` | ai-agent | - | Generated key for this AI agent. |
| `AI_AGENT_NAME` | ai-agent | Railway AI Agent | Name shown in the OneUptime dashboard. |
| `ONEUPTIME_URL` | ai-agent | - | Private URL of the OneUptime app. |
| `ONEUPTIME_SECRET` | ai-agent | (secret) | Secret shared with the OneUptime app. |
| `DISABLE_TELEMETRY` | ai-agent | true | Disables OneUptime telemetry. |
| `AI_AGENT_DESCRIPTION` | ai-agent | Bundled Railway AI agent. | Description shown in the OneUptime dashboard. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/status/ready`
- **Start command:** `sh -c 'printf "%s" "$ONEUPTIME_CLICKHOUSE_CONFIG_B64" | base64 -d | tar -xz -C / && exec /entrypoint.sh'`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `bash -c "until curl -fsS \"http://${SERVER_APP_HOSTNAME}:${APP_PORT}/status/ready\" >/dev/null; do sleep 2; done && export NGINX_LISTEN_ADDRESS=\"${NGINX_LISTEN_ADDRESS:-}\" NGINX_LISTEN_OPTIONS=\"${NGINX_LISTEN_OPTIONS:-}\" PROVISION_SSL=\"${PROVISION_SSL:-}\" && cp run.sh /tmp/run-railway.sh && sed -i '/^NGINX_RESOLVER=/a [[ \"$NGINX_RESOLVER\" == *:* ]] && NGINX_RESOLVER=\"[$NGINX_RESOLVER]\"' /tmp/run-railway.sh && chmod +x /tmp/run-railway.sh && exec /tmp/run-railway.sh"`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/uptime)
