# Deploy OpenPanel on Railway

Open-source analytics platform for web and mobile apps

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openpanel-1)

## About

Deploy OpenPanel with zero configuration.

OpenPanel is an open-source web and product analytics platform that combines the power of Mixpanel with the ease of Plausible, making it one of the best Google Analytics replacements.

OpenPanel is made up of several services working together, including an API, dashboard, worker, and multiple data stores.

Running this yourself normally means setting up PostgreSQL, ClickHouse, Redis, background workers, networking, and storage. This template handles all of that automatically.

All required services are provisioned and connected for you. No configuration is required. Just deploy and start sending events.

A Caddy reverse proxy is included so the dashboard and API are served from a single domain. This allows authentication and cookies to work correctly without needing custom domain setup.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| op-api | `lindesvard/openpanel-api:2.2` | Worker |
| op-worker | `lindesvard/openpanel-worker:2.2` | Worker |
| op-redis | `redis:8.2.1` | Database |
| op-proxy | `caddy:2-alpine` | Web service |
| op-clickhouse | `clickhouse/clickhouse-server:25.12` | Database |
| op-dashboard | `lindesvard/openpanel-dashboard:2.2` | Worker |
| op-postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | op-api | 3000 | - |
| `SELF_HOSTED` | op-api | true | - |
| `EMAIL_SENDER` | op-api | - | Email address to send notification emails as |
| `COOKIE_SECRET` | op-api | (secret) | - |
| `RESEND_API_KEY` | op-api | (secret) | API key for Resend, to send notification emails |
| `ALLOW_INVITATION` | op-api | true | Allow inviting other OpenPanel users to join |
| `ALLOW_REGISTRATION` | op-api | false | Allow new registrations after the first user is created |
| `SELF_HOSTED` | op-worker | true | - |
| `REDISPORT` | op-redis | 6379 | - |
| `REDISUSER` | op-redis | default | - |
| `REDISPASSWORD` | op-redis | (secret) | - |
| `REDIS_PASSWORD` | op-redis | (secret) | - |
| `PORT` | op-proxy | 8080 | - |
| `CADDYFILE` | op-proxy | :{$PORT} {
	handle_path /api/* {
		reverse_proxy {$API_URL}
	}
	reverse_proxy /* {$DASHBOARD_URL}
} | - |
| `PORT` | op-clickhouse | 8123 | - |
| `PUBLIC_PORT` | op-clickhouse | 443 | - |
| `CLICKHOUSE_DB` | op-clickhouse | openpanel | - |
| `CLICKHOUSE_USER` | op-clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | op-clickhouse | (secret) | - |
| `PORT` | op-dashboard | 3000 | - |
| `SELF_HOSTED` | op-dashboard | true | - |
| `POSTGRES_DB` | op-postgres | railway | - |
| `POSTGRES_USER` | op-postgres | (secret) | - |
| `POSTGRES_PASSWORD` | op-postgres | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `sh -c 'echo "$CADDYFILE" > /etc/caddy/Caddyfile && caddy run --config /etc/caddy/Caddyfile'`
- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/openpanel-1)
