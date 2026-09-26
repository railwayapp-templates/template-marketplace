# Deploy Uptrace on Railway

Uptrace 2.0: OpenTelemetry APM for traces, logs and metrics on ClickHouse.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/uptrace-1)

## About

Uptrace is an OpenTelemetry-native APM for distributed tracing, logs and metrics. It stores telemetry in ClickHouse, groups spans and logs automatically, and offers dashboards, alerts and a query language, so it works as a self-hosted alternative to Datadog, New Relic or a Grafana tracing stack.

This template runs `uptrace/uptrace:2.0.3`, the latest stable release, with ClickHouse for telemetry, Railway PostgreSQL for metadata and Railway Redis as a cache. The config file is written at startup from variables, and the admin user, an organisation, a project and its ingest token are seeded on first boot. Apps send OpenTelemetry data over OTLP/HTTP to the public domain with the `uptrace-dsn` header; requests with a wrong token are refused. gRPC ingest stays on the private network. ClickHouse data is on a volume, so telemetry survives redeploys. Plan on 2 GB of memory or more; ClickHouse is the main consumer.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | `clickhouse/clickhouse-server:26.3.33.24` | Database |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| uptrace | `uptrace/uptrace:2.0.3` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `CLICKHOUSE_DB` | clickhouse | uptrace |
| `CLICKHOUSE_USER` | clickhouse | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 0 |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `PORT` | uptrace | 8080 |
| `CH_USER` | uptrace | (secret) |
| `CH_PASSWORD` | uptrace | (secret) |
| `REDISPASSWORD` | uptrace | (secret) |
| `UPTRACE_CONFIG` | uptrace | service:
  env: hosted
  secret: ${UPTRACE_SECRET}

site:
  url: https://${RAILWAY_PUBLIC_DOMAIN}
  ingest_url: https://${RAILWAY_PUBLIC_DOMAIN}

listen:
  http:
    addr: '[::]:${PORT:8080}'
  grpc:
    addr: '[::]:4317'

seed_data:
  update: false
  delete: false
  users:
    - key: admin
      name: Admin
      email: ${UPTRACE_ADMIN_EMAIL}
      password: ${UPTRACE_ADMIN_PASSWORD}
      email_confirmed: true
  orgs:
    - key: org1
      name: My Org
  org_users:
    - key: org_admin
      org_key: org1
      user_key: admin
      role: owner
  projects:
    - key: project1
      name: My Project
      org_key: org1
  project_tokens:
    - key: project1_token
      project_key: project1
      token: ${UPTRACE_PROJECT_TOKEN}
  project_users:
    - key: project1_admin
      project_key: project1
      org_user_key: org_admin
      perm_level: admin

ch_cluster:
  cluster: uptrace1
  replicated: false
  distributed: false
  shards:
    - replicas:
        - addr: ${CH_HOST}:9000
          database: ${CH_DATABASE}
          user: ${CH_USER}
          password: ${CH_PASSWORD}
          dial_timeout: 3s
          write_timeout: 5s
          max_retries: 3
          max_execution_time: 15s

pg:
  addr: ${PGHOST}:${PGPORT}
  user: ${PGUSER}
  password: ${PGPASSWORD}
  database: ${PGDATABASE}

redis_cache:
  addrs:
    1: ${REDISHOST}:${REDISPORT}
  username: ${REDISUSER}
  password: ${REDISPASSWORD}
  db: 0

mailer:
  smtp:
    enabled: false

self_monitoring:
  dsn: http://${UPTRACE_PROJECT_TOKEN}@localhost:${PORT:8080}?grpc=4317

logging:
  level: INFO |
| `UPTRACE_SECRET` | uptrace | (secret) |
| `UPTRACE_ADMIN_EMAIL` | uptrace | admin@example.com |
| `UPTRACE_PROJECT_TOKEN` | uptrace | (secret) |
| `UPTRACE_ADMIN_PASSWORD` | uptrace | (secret) |

## Configuration

- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'mkdir -p /etc/uptrace; printf "%s\n" "$UPTRACE_CONFIG" > /etc/uptrace/config.yml; exec /uptrace --config=/etc/uptrace/config.yml serve'`
- **Healthcheck:** `/api/v1/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability

[View on Railway →](https://railway.com/deploy/uptrace-1)
