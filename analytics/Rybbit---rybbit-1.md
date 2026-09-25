# Deploy Rybbit on Railway

Rybbit 2.9 privacy-friendly web analytics on ClickHouse, a GA alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rybbit-1)

## About

Rybbit is an open-source, privacy-friendly web and product analytics platform and a modern alternative to Google Analytics. A tiny script records pageviews, custom events, errors and web vitals without cookies, and dashboards show traffic, funnels, goals, journeys, retention, user profiles, session replay and real-time visitors.

This template deploys Rybbit v2.9.0 as six services: the web client, the backend, ClickHouse for events, Railway Postgres, Railway Redis and a Caddy router that serves the client and API on one domain. On the very first start the backend creates the admin from environment variables, while public sign-up stays disabled. ClickHouse memory and threads are capped for Railway, and its system logs are off. The backend is built from a small wrapper repository because the large upstream image stalls when pulled at deploy time. ClickHouse is capped at 2 GB, so plan for about 3 GB across all services.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gateway | `caddy:2.11.4-alpine` | Web service |
| clickhouse | `clickhouse/clickhouse-server:26.3.17.4` | Database |
| Redis | `redis:8.2` | Database |
| client | `ghcr.io/rybbit-io/rybbit-client:v2.9.0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| backend | [aalfath/rybbit-railway-template](https://github.com/aalfath/rybbit-railway-template) | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | gateway | 8080 |
| `CADDYFILE` | gateway | {
	admin off
	auto_https off
	servers {
		trusted_proxies static private_ranges 100.64.0.0/10
	}
}

:{$PORT} {
	encode zstd gzip
	request_body {
		max_size 10MB
	}

	handle /gateway_health {
		respond ok 200
	}
	handle /api/* {
		reverse_proxy {$RYBBIT_BACKEND}
	}
	handle /.well-known/oauth-* {
		reverse_proxy {$RYBBIT_BACKEND}
	}
	handle /.well-known/openid-configuration* {
		reverse_proxy {$RYBBIT_BACKEND}
	}
	handle {
		reverse_proxy {$RYBBIT_CLIENT}
	}
} |
| `PORT` | clickhouse | 8123 |
| `CLICKHOUSE_DB` | clickhouse | analytics |
| `CLICKHOUSE_USER` | clickhouse | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `CLICKHOUSE_MAX_THREADS` | clickhouse | 4 |
| `CLICKHOUSE_MAX_MEMORY_BYTES` | clickhouse | 2147483648 |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | client | 3002 |
| `HOSTNAME` | client | :: |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | backend | 3001 |
| `NODE_ENV` | backend | production |
| `POSTGRES_USER` | backend | (secret) |
| `DISABLE_SIGNUP` | backend | true |
| `REDIS_PASSWORD` | backend | (secret) |
| `CLUSTER_WORKERS` | backend | 2 |
| `DISABLE_TELEMETRY` | backend | true |
| `POSTGRES_PASSWORD` | backend | (secret) |
| `BETTER_AUTH_SECRET` | backend | (secret) |
| `RYBBIT_ADMIN_EMAIL` | backend | admin@example.com |
| `CLICKHOUSE_PASSWORD` | backend | (secret) |
| `RYBBIT_ADMIN_PASSWORD` | backend | (secret) |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$CADDYFILE" > /tmp/Caddyfile && exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/gateway_health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'D=/etc/clickhouse-server; printf "<clickhouse><max_server_memory_usage>%s</max_server_memory_usage><concurrent_threads_soft_limit_num>%s</concurrent_threads_soft_limit_num><logger><level>warning</level><console>true</console></logger><query_thread_log remove=\"remove\"/><query_log remove=\"remove\"/><query_views_log remove=\"remove\"/><query_metric_log remove=\"remove\"/><error_log remove=\"remove\"/><opentelemetry_span_log remove=\"remove\"/><text_log remove=\"remove\"/><trace_log remove=\"remove\"/><metric_log remove=\"remove\"/><asynchronous_metric_log remove=\"remove\"/><session_log remove=\"remove\"/><part_log remove=\"remove\"/><latency_log remove=\"remove\"/><processors_profile_log remove=\"remove\"/></clickhouse>\n" "$CLICKHOUSE_MAX_MEMORY_BYTES" "$CLICKHOUSE_MAX_THREADS" > $D/config.d/railway.xml && printf "<clickhouse><profiles><default><enable_json_type>1</enable_json_type><async_insert>1</async_insert><wait_for_async_insert>1</wait_for_async_insert><log_queries>0</log_queries><max_threads>%s</max_threads></default></profiles></clickhouse>\n" "$CLICKHOUSE_MAX_THREADS" > $D/users.d/railway.xml && exec /entrypoint.sh'`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/health`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rybbit-1)
