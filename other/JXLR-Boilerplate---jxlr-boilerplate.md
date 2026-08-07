# Deploy JXLR Boilerplate on Railway

Turborepo Express Start Boilerplate

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jxlr-boilerplate)

## About

JXLR Boilerplate is a production-ready full-stack TypeScript monorepo. It ships an
Express API with type-safe Zod contracts shared with the frontend, React 19 with
TanStack Router and Query, PostgreSQL via Kysely, Redis-backed jobs, S3 object
storage, multi-organisation authentication, and a complete Grafana observability
stack — everything a new product needs on day one.

Hosting involves ten services wired together: the API and frontend, each built from
its own Dockerfile inside a shared pnpm monorepo; a Caddy reverse proxy that gives
both a single public domain; PostgreSQL, Redis and an S3-compatible bucket; and
Grafana, Loki, Prometheus and Tempo for logs, metrics and traces. Railway's
reference variables connect everything over private networking, so no credentials
are copied by hand. Database migrations run as a pre-deploy step and abort the
release if they fail, auth secrets are generated per deployment, and volumes
persist your database and observability data. Nothing requires configuration
before the first deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Caddy Proxy | [AxelVincent/caddy-reverse-proxy](https://github.com/AxelVincent/caddy-reverse-proxy) | Web service |
| Redis | `redis:8.2.1` | Database |
| Front | [AxelVincent/turbo-express-start-boilerplate](https://github.com/AxelVincent/turbo-express-start-boilerplate) (branch: master) | Worker |
| Loki | [AxelVincent/railway-grafana-stack-cost-efficient](https://github.com/AxelVincent/railway-grafana-stack-cost-efficient) (root: /loki) | Database |
| API | [AxelVincent/turbo-express-start-boilerplate](https://github.com/AxelVincent/turbo-express-start-boilerplate) (branch: master) | Worker |
| Grafana | [AxelVincent/railway-grafana-stack-cost-efficient](https://github.com/AxelVincent/railway-grafana-stack-cost-efficient) (root: /grafana) | Database |
| Prometheus | [AxelVincent/railway-grafana-stack-cost-efficient](https://github.com/AxelVincent/railway-grafana-stack-cost-efficient) (root: /prometheus) | Database |
| Tempo | [AxelVincent/railway-grafana-stack-cost-efficient](https://github.com/AxelVincent/railway-grafana-stack-cost-efficient) (root: /tempo) | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | Front | 3000 |
| `VERSION` | Loki | 3.4.2 |
| `LOKI_RETENTION_PERIOD` | Loki | 744h |
| `LOKI_RETENTION_ENABLED` | Loki | true |
| `PORT` | API | 3030 |
| `PGMAX` | API | 10 |
| `PGMIN` | API | 2 |
| `NODE_ENV` | API | production |
| `LOG_LEVEL` | API | info |
| `REDIS_USER` | API | (secret) |
| `CORS_ORIGIN` | API | * |
| `REDIS_PASSWORD` | API | (secret) |
| `METRICS_PASSWORD` | API | (secret) |
| `METRICS_USERNAME` | API | (secret) |
| `OTEL_SERVICE_NAME` | API | boilerplate-api |
| `BETTER_AUTH_SECRET` | API | (secret) |
| `INTERNAL_RPC_SECRET` | API | (secret) |
| `S3_SECRET_ACCESS_KEY` | API | (secret) |
| `GF_SECURITY_ADMIN_USER` | Grafana | (secret) |
| `GF_DEFAULT_INSTANCE_NAME` | Grafana | boilerplate |
| `GF_SECURITY_ADMIN_PASSWORD` | Grafana | (secret) |
| `VERSION` | Prometheus | v3.2.1 |
| `VERSION` | Tempo | 2.9.0 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/`
- **Volume:** `/loki`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/grafana/`
- **Volume:** `/prometheus`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Shell, Dockerfile, TypeScript, JavaScript, CSS

[View on Railway →](https://railway.com/deploy/jxlr-boilerplate)
