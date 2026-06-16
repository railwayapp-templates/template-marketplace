# Deploy Latitude on Railway

Open-source AI Agent Monitoring Platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/latitude)

## About

Latitude is the open-source observability platform for AI agents and LLMs — "Sentry, but for agents." It groups failing traces into tracked issues, runs human-aligned evaluations, and makes every trace semantically searchable. Send OpenTelemetry traces from any model provider or framework and see what will break next before your users do.

This template deploys the complete Latitude stack: five application services (web UI, public API / MCP server, OTLP trace ingestion, background workers, and Temporal workflow workers), a one-shot database-migrations job, and all backing infrastructure — Postgres with pgvector, ClickHouse, two Redis instances (cache + durable queue), a Postgres-backed Temporal server, and a SeaweedFS object store. Everything runs from Latitude's published Docker images over Railway's private network. On the first deploy the services initialize the databases and Temporal schema and then settle. The encryption keys and infrastructure passwords are generated for you; you add an email transport and optional AI provider keys.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | `clickhouse/clickhouse-server:26.2` | Database |
| workflows | `latitudedata/workflows:latest` | Worker |
| temporal | `temporalio/auto-setup:1.27.2` | Worker |
| ingest | `latitudedata/ingest:latest` | Web service |
| web | `latitudedata/web:latest` | Web service |
| redis_bullmq | `redis:7` | Database |
| api | `latitudedata/api:latest` | Web service |
| seaweedfs | `chrislusf/seaweedfs:4.32` | Database |
| redis_cache | `redis:7` | Database |
| postgres | `pgvector/pgvector:pg16` | Database |
| workers | `latitudedata/workers:latest` | Worker |
| migrations | `latitudedata/migrations:latest` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `CLICKHOUSE_USER` | clickhouse | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `NODE_ENV` | workflows | production |
| `LAT_API_PORT` | workflows | 3001 |
| `LAT_WEB_PORT` | workflows | 3000 |
| `LAT_REDIS_PORT` | workflows | 6379 |
| `LAT_BULLMQ_PORT` | workflows | 6379 |
| `LAT_INGEST_PORT` | workflows | 3002 |
| `LAT_MAILGUN_REGION` | workflows | eu |
| `LAT_OPENAI_API_KEY` | workflows | (secret) |
| `LAT_STORAGE_DRIVER` | workflows | s3 |
| `LAT_VOYAGE_API_KEY` | workflows | (secret) |
| `LAT_CLICKHOUSE_USER` | workflows | (secret) |
| `LAT_MAILGUN_API_KEY` | workflows | (secret) |
| `LAT_STORAGE_S3_BUCKET` | workflows | latitude |
| `LAT_STORAGE_S3_REGION` | workflows | eu-central-1 |
| `LAT_AI_EMBEDDING_MODEL` | workflows | voyage-4-large |
| `LAT_AI_RERANKING_MODEL` | workflows | rerank-2.5 |
| `LAT_BETTER_AUTH_SECRET` | workflows | (secret) |
| `LAT_TEMPORAL_NAMESPACE` | workflows | default |
| `LAT_AI_GENERATION_MODEL` | workflows | gpt-5.5 |
| `LAT_CLICKHOUSE_PASSWORD` | workflows | (secret) |
| `LAT_TEMPORAL_TASK_QUEUE` | workflows | latitude-workflows |
| `LAT_AI_EMBEDDING_PROVIDER` | workflows | voyage |
| `LAT_AI_RERANKING_PROVIDER` | workflows | voyage |
| `LAT_AI_GENERATION_PROVIDER` | workflows | openai |
| `LAT_STORAGE_S3_ACCESS_KEY_ID` | workflows | latitude |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | workflows | false |
| `LAT_STORAGE_S3_FORCE_PATH_STYLE` | workflows | true |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | workflows | (secret) |
| `DB` | temporal | postgres12 |
| `DBNAME` | temporal | temporal |
| `DB_PORT` | temporal | 5432 |
| `POSTGRES_USER` | temporal | (secret) |
| `VISIBILITY_DBNAME` | temporal | temporal_visibility |
| `NUM_HISTORY_SHARDS` | temporal | 512 |
| `NODE_ENV` | ingest | production |
| `LAT_API_PORT` | ingest | 3001 |
| `LAT_WEB_PORT` | ingest | 3000 |
| `LAT_REDIS_PORT` | ingest | 6379 |
| `LAT_BULLMQ_PORT` | ingest | 6379 |
| `LAT_INGEST_PORT` | ingest | 3002 |
| `LAT_MAILGUN_REGION` | ingest | eu |
| `LAT_OPENAI_API_KEY` | ingest | (secret) |
| `LAT_STORAGE_DRIVER` | ingest | s3 |
| `LAT_VOYAGE_API_KEY` | ingest | (secret) |
| `LAT_CLICKHOUSE_USER` | ingest | (secret) |
| `LAT_MAILGUN_API_KEY` | ingest | (secret) |
| `LAT_STORAGE_S3_BUCKET` | ingest | latitude |
| `LAT_STORAGE_S3_REGION` | ingest | eu-central-1 |
| `LAT_AI_EMBEDDING_MODEL` | ingest | voyage-4-large |
| `LAT_AI_RERANKING_MODEL` | ingest | rerank-2.5 |
| `LAT_BETTER_AUTH_SECRET` | ingest | (secret) |
| `LAT_TEMPORAL_NAMESPACE` | ingest | default |
| `LAT_AI_GENERATION_MODEL` | ingest | gpt-5.5 |
| `LAT_CLICKHOUSE_PASSWORD` | ingest | (secret) |
| `LAT_TEMPORAL_TASK_QUEUE` | ingest | latitude-workflows |
| `LAT_AI_EMBEDDING_PROVIDER` | ingest | voyage |
| `LAT_AI_RERANKING_PROVIDER` | ingest | voyage |
| `LAT_AI_GENERATION_PROVIDER` | ingest | openai |
| `LAT_STORAGE_S3_ACCESS_KEY_ID` | ingest | latitude |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | ingest | false |
| `LAT_STORAGE_S3_FORCE_PATH_STYLE` | ingest | true |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | ingest | (secret) |
| `NODE_ENV` | web | production |
| `LAT_API_PORT` | web | 3001 |
| `LAT_WEB_PORT` | web | 3000 |
| `LAT_REDIS_PORT` | web | 6379 |
| `LAT_BULLMQ_PORT` | web | 6379 |
| `LAT_INGEST_PORT` | web | 3002 |
| `LAT_MAILGUN_REGION` | web | eu |
| `LAT_OPENAI_API_KEY` | web | (secret) |
| `LAT_STORAGE_DRIVER` | web | s3 |
| `LAT_VOYAGE_API_KEY` | web | (secret) |
| `LAT_CLICKHOUSE_USER` | web | (secret) |
| `LAT_MAILGUN_API_KEY` | web | (secret) |
| `LAT_STORAGE_S3_BUCKET` | web | latitude |
| `LAT_STORAGE_S3_REGION` | web | eu-central-1 |
| `LAT_AI_EMBEDDING_MODEL` | web | voyage-4-large |
| `LAT_AI_RERANKING_MODEL` | web | rerank-2.5 |
| `LAT_BETTER_AUTH_SECRET` | web | (secret) |
| `LAT_TEMPORAL_NAMESPACE` | web | default |
| `LAT_AI_GENERATION_MODEL` | web | gpt-5.5 |
| `LAT_CLICKHOUSE_PASSWORD` | web | (secret) |
| `LAT_TEMPORAL_TASK_QUEUE` | web | latitude-workflows |
| `LAT_AI_EMBEDDING_PROVIDER` | web | voyage |
| `LAT_AI_RERANKING_PROVIDER` | web | voyage |
| `LAT_AI_GENERATION_PROVIDER` | web | openai |
| `LAT_STORAGE_S3_ACCESS_KEY_ID` | web | latitude |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | web | false |
| `LAT_STORAGE_S3_FORCE_PATH_STYLE` | web | true |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | web | (secret) |
| `NODE_ENV` | api | production |
| `LAT_API_PORT` | api | 3001 |
| `LAT_WEB_PORT` | api | 3000 |
| `LAT_REDIS_PORT` | api | 6379 |
| `LAT_BULLMQ_PORT` | api | 6379 |
| `LAT_INGEST_PORT` | api | 3002 |
| `LAT_MAILGUN_REGION` | api | eu |
| `LAT_OPENAI_API_KEY` | api | (secret) |
| `LAT_STORAGE_DRIVER` | api | s3 |
| `LAT_VOYAGE_API_KEY` | api | (secret) |
| `LAT_CLICKHOUSE_USER` | api | (secret) |
| `LAT_MAILGUN_API_KEY` | api | (secret) |
| `LAT_STORAGE_S3_BUCKET` | api | latitude |
| `LAT_STORAGE_S3_REGION` | api | eu-central-1 |
| `LAT_AI_EMBEDDING_MODEL` | api | voyage-4-large |
| `LAT_AI_RERANKING_MODEL` | api | rerank-2.5 |
| `LAT_BETTER_AUTH_SECRET` | api | (secret) |
| `LAT_TEMPORAL_NAMESPACE` | api | default |
| `LAT_AI_GENERATION_MODEL` | api | gpt-5.5 |
| `LAT_CLICKHOUSE_PASSWORD` | api | (secret) |
| `LAT_TEMPORAL_TASK_QUEUE` | api | latitude-workflows |
| `LAT_AI_EMBEDDING_PROVIDER` | api | voyage |
| `LAT_AI_RERANKING_PROVIDER` | api | voyage |
| `LAT_AI_GENERATION_PROVIDER` | api | openai |
| `LAT_STORAGE_S3_ACCESS_KEY_ID` | api | latitude |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | api | false |
| `LAT_STORAGE_S3_FORCE_PATH_STYLE` | api | true |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | api | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `POSTGRES_RUNTIME_USER` | postgres | (secret) |
| `POSTGRES_RUNTIME_PASSWORD` | postgres | (secret) |
| `NODE_ENV` | workers | production |
| `LAT_API_PORT` | workers | 3001 |
| `LAT_WEB_PORT` | workers | 3000 |
| `LAT_REDIS_PORT` | workers | 6379 |
| `LAT_BULLMQ_PORT` | workers | 6379 |
| `LAT_INGEST_PORT` | workers | 3002 |
| `LAT_MAILGUN_REGION` | workers | eu |
| `LAT_OPENAI_API_KEY` | workers | (secret) |
| `LAT_STORAGE_DRIVER` | workers | s3 |
| `LAT_VOYAGE_API_KEY` | workers | (secret) |
| `LAT_CLICKHOUSE_USER` | workers | (secret) |
| `LAT_MAILGUN_API_KEY` | workers | (secret) |
| `LAT_STORAGE_S3_BUCKET` | workers | latitude |
| `LAT_STORAGE_S3_REGION` | workers | eu-central-1 |
| `LAT_AI_EMBEDDING_MODEL` | workers | voyage-4-large |
| `LAT_AI_RERANKING_MODEL` | workers | rerank-2.5 |
| `LAT_BETTER_AUTH_SECRET` | workers | (secret) |
| `LAT_TEMPORAL_NAMESPACE` | workers | default |
| `LAT_AI_GENERATION_MODEL` | workers | gpt-5.5 |
| `LAT_CLICKHOUSE_PASSWORD` | workers | (secret) |
| `LAT_TEMPORAL_TASK_QUEUE` | workers | latitude-workflows |
| `LAT_AI_EMBEDDING_PROVIDER` | workers | voyage |
| `LAT_AI_RERANKING_PROVIDER` | workers | voyage |
| `LAT_AI_GENERATION_PROVIDER` | workers | openai |
| `LAT_STORAGE_S3_ACCESS_KEY_ID` | workers | latitude |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | workers | false |
| `LAT_STORAGE_S3_FORCE_PATH_STYLE` | workers | true |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | workers | (secret) |
| `LAT_CLICKHOUSE_USER` | migrations | (secret) |
| `LAT_CLICKHOUSE_PASSWORD` | migrations | (secret) |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | migrations | false |

## Configuration

- **Start command:** `sh -c "mkdir -p /etc/clickhouse-server/config.d && printf '<clickhouse><listen_host>::</listen_host></clickhouse>' > /etc/clickhouse-server/config.d/listen.xml && exec /entrypoint.sh"`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `sh -c 'ip=$(getent hosts "$RAILWAY_PRIVATE_DOMAIN" | head -n1 | tr -s " " | cut -d" " -f1); export BIND_ON_IP="$ip"; exec /etc/temporal/entrypoint.sh autosetup'`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `redis-server --protected-mode no --maxmemory-policy noeviction --appendonly yes`
- **Volume:** `/data`
- **Start command:** `sh -c '( until echo "s3.bucket.list" | weed shell >/dev/null 2>&1; do sleep 1; done; echo "s3.bucket.create -name latitude" | weed shell ) & exec weed server -dir=/data -s3 -s3.port=8333 -ip.bind=::'`
- **Start command:** `redis-server --protected-mode no`
- **Start command:** `sh -c 'printf "CREATE USER %s WITH PASSWORD '\''%s'\''; GRANT CONNECT ON DATABASE %s TO %s;" "$POSTGRES_RUNTIME_USER" "$POSTGRES_RUNTIME_PASSWORD" "$POSTGRES_DB" "$POSTGRES_RUNTIME_USER" > /docker-entrypoint-initdb.d/10-latitude-runtime-user.sql && exec docker-entrypoint.sh postgres -c wal_level=logical'`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/latitude)
