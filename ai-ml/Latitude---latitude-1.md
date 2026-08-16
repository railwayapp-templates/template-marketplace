# Deploy Latitude on Railway

Self-hosted AI agent observability with OTLP, evals, and MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/latitude-1)

## About

Deploy Latitude `v0.3.80`, an open-source observability platform for AI agents and LLM applications. Capture OpenTelemetry traces, inspect sessions and tool calls, evaluate output quality, and use the API or MCP server from a complete Railway-hosted stack.

This template deploys the six matching Latitude `0.3.80` application images: the web UI, public API and MCP server, OTLP ingest, BullMQ workers, Temporal workflow workers, and a one-shot migrations job. PostgreSQL with pgvector, ClickHouse, Redis, Temporal, and a Railway object-storage bucket provide the backing infrastructure.

The `web`, `api`, and `ingest` services each own a Railway HTTPS domain. PostgreSQL, ClickHouse, Redis, and Temporal remain private. Secrets and infrastructure passwords are generated per deployment and wired through service references.

A working email transport is required for magic-link sign-in. Configure authenticated SMTP (including SendGrid SMTP) or Mailgun on the `web` service, redeploy the application services, then open the `web` domain, register, follow the emailed link, and create the first organization.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| migrations | `latitudedata/migrations:0.3.80@sha256:f5ab51ccc9c8afa359e781ec3f4ae412598e174347f73f48fd123c0faf6f6ab1` | Worker |
| api | `latitudedata/api:0.3.80@sha256:b6c4571d75cb1176e4ae556cdde9c7f65cd42a50d72073fd900fabe71f6982e3` | Web service |
| clickhouse | [monotykamary/railway-template-latitude](https://github.com/monotykamary/railway-template-latitude) (branch: main) (root: /clickhouse) | Database |
| web | `latitudedata/web:0.3.80@sha256:8df32d3808513d8e990f178493d1e5116f8241083503ab75b50bd7d6cec22d40` | Web service |
| ingest | `latitudedata/ingest:0.3.80@sha256:47acfeda795b98ef10896479215279de8c03bc2b9ae17266371bff589c50bf68` | Web service |
| workflows | `latitudedata/workflows:0.3.80@sha256:0bceea0ed1aa4e6692dd9bacf5ee936cffc9b921a2739e44bca5461a233c320c` | Worker |
| redis | `redis:7.4.7-alpine@sha256:02f2cc4882f8bf87c79a220ac958f58c700bdec0dfb9b9ea61b62fb0e8f1bfcf` | Database |
| postgres | [monotykamary/railway-template-latitude](https://github.com/monotykamary/railway-template-latitude) (branch: main) (root: /postgres) | Database |
| workers | `latitudedata/workers:0.3.80@sha256:4251219eddd37c4552e45039d8187765911c3cb7eefbd16113e02c50f4c381b1` | Worker |
| temporal | `temporalio/auto-setup:1.27.2@sha256:b44cbfeb43dbeae42db113b44fb8414c3452f05643b3d6b1592f955277d73526` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `NODE_ENV` | migrations | production | Run Latitude in production mode. |
| `LAT_PG_POOL_MAX` | migrations | 5 | Maximum PostgreSQL connections per Latitude process. |
| `LAT_DATABASE_URL` | migrations | - | RLS-bound PostgreSQL runtime connection. |
| `LAT_CLICKHOUSE_DB` | migrations | - | ClickHouse database reference. |
| `LAT_CLICKHOUSE_URL` | migrations | - | Private ClickHouse HTTP endpoint. |
| `LAT_CLICKHOUSE_USER` | migrations | (secret) | ClickHouse user reference. |
| `LAT_ADMIN_DATABASE_URL` | migrations | - | PostgreSQL administrator connection used by migrations. |
| `LAT_BETTER_AUTH_SECRET` | migrations | (secret) | Generated 32-byte hexadecimal authentication secret. |
| `LAT_PG_IDLE_TIMEOUT_MS` | migrations | 30000 | Idle PostgreSQL connection timeout in milliseconds. |
| `LAT_CLICKHOUSE_PASSWORD` | migrations | (secret) | ClickHouse password reference. |
| `LAT_MASTER_ENCRYPTION_KEY` | migrations | - | Generated 32-byte hexadecimal master encryption key. |
| `LAT_PG_CONNECT_TIMEOUT_MS` | migrations | 10000 | PostgreSQL connection timeout in milliseconds. |
| `LAT_CLICKHOUSE_MIGRATION_URL` | migrations | - | Private ClickHouse native endpoint used by migrations. |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | migrations | false | Use the single-node ClickHouse migration set. |
| `LAT_REDACTION_PSEUDONYM_SECRET` | migrations | (secret) | Generated 32-byte hexadecimal pseudonym HMAC secret. |
| `PORT` | api | 3001 | Internal api listener used by Railway health checks. |
| `NODE_ENV` | api | production | Run Latitude in production mode. |
| `LAT_API_URL` | api | - | Canonical public API and MCP URL. |
| `LAT_WEB_URL` | api | - | Canonical Latitude web URL. |
| `LAT_API_PORT` | api | 3001 | Latitude API listener port. |
| `LAT_SMTP_FROM` | api | - | Shared from the web service: Sender address for Latitude email. |
| `LAT_SMTP_HOST` | api | - | Shared from the web service: SMTP server hostname required for production magic-link email. |
| `LAT_SMTP_PASS` | api | - | Shared from the web service: SMTP password required when using SMTP. |
| `LAT_SMTP_PORT` | api | - | Shared from the web service: SMTP server port, commonly 587. |
| `LAT_SMTP_USER` | api | (secret) | Shared from the web service: SMTP username required when using SMTP. |
| `LAT_INGEST_URL` | api | - | Canonical public OTLP ingest URL. |
| `LAT_REDIS_HOST` | api | - | Private Redis cache hostname. |
| `LAT_REDIS_PORT` | api | 6379 | Private Redis cache port. |
| `LAT_BULLMQ_HOST` | api | - | Private Redis BullMQ hostname. |
| `LAT_BULLMQ_PORT` | api | 6379 | Private Redis BullMQ port. |
| `LAT_PG_POOL_MAX` | api | 5 | Maximum PostgreSQL connections per Latitude process. |
| `LAT_DATABASE_URL` | api | - | RLS-bound PostgreSQL runtime connection. |
| `LAT_MAILGUN_FROM` | api | - | Shared from the web service: Optional Mailgun sender address. |
| `LAT_CLICKHOUSE_DB` | api | - | ClickHouse database reference. |
| `LAT_CLICKHOUSE_URL` | api | - | Private ClickHouse HTTP endpoint. |
| `LAT_GOOGLE_API_KEY` | api | (secret) | Shared from the web service: Optional Google AI key for configured features. |
| `LAT_MAILGUN_DOMAIN` | api | - | Shared from the web service: Optional Mailgun sending domain. |
| `LAT_MAILGUN_REGION` | api | - | Shared from the web service: Optional Mailgun region such as us or eu. |
| `LAT_OPENAI_API_KEY` | api | (secret) | Shared from the web service: Optional OpenAI key for configured AI features. |
| `LAT_STORAGE_DRIVER` | api | s3 | Use shared S3-compatible object storage. |
| `LAT_VOYAGE_API_KEY` | api | (secret) | Shared from the web service: Optional Voyage key for embeddings and reranking. |
| `LAT_CLICKHOUSE_USER` | api | (secret) | ClickHouse user reference. |
| `LAT_MAILGUN_API_KEY` | api | (secret) | Shared from the web service: Optional Mailgun API key. |
| `LAT_TRUSTED_ORIGINS` | api | - | Trusted web origin for sign-in. |
| `LAT_TEMPORAL_ADDRESS` | api | - | Private Temporal frontend address. |
| `LAT_ANTHROPIC_API_KEY` | api | (secret) | Shared from the web service: Optional Anthropic key for configured generation features. |
| `LAT_STORAGE_S3_BUCKET` | api | - | Railway bucket name. |
| `LAT_STORAGE_S3_REGION` | api | - | Railway bucket signing region. |
| `LAT_ADMIN_DATABASE_URL` | api | - | PostgreSQL administrator connection used by migrations. |
| `LAT_BETTER_AUTH_SECRET` | api | (secret) | Shared Better Auth signing secret. |
| `LAT_PG_IDLE_TIMEOUT_MS` | api | 30000 | Idle PostgreSQL connection timeout in milliseconds. |
| `LAT_TEMPORAL_NAMESPACE` | api | default | Temporal namespace created by auto-setup. |
| `LAT_CLICKHOUSE_PASSWORD` | api | (secret) | ClickHouse password reference. |
| `LAT_STORAGE_S3_ENDPOINT` | api | - | Railway bucket S3 endpoint. |
| `LAT_TEMPORAL_TASK_QUEUE` | api | latitude-workflows | Temporal task queue shared with workflow workers. |
| `LAT_CORS_ALLOWED_ORIGINS` | api | - | Browser origin allowed to call the API. |
| `LAT_MASTER_ENCRYPTION_KEY` | api | - | Shared key for encrypted provider and integration credentials. |
| `LAT_OSS_TELEMETRY_ENABLED` | api | false | Disable optional anonymous deployment telemetry by default. |
| `LAT_PG_CONNECT_TIMEOUT_MS` | api | 10000 | PostgreSQL connection timeout in milliseconds. |
| `LAT_CLICKHOUSE_MIGRATION_URL` | api | - | Private ClickHouse native endpoint used by migrations. |
| `LAT_STORAGE_S3_ACCESS_KEY_ID` | api | - | Railway bucket access-key reference. |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | api | false | Use the single-node ClickHouse migration set. |
| `LAT_REDACTION_PSEUDONYM_SECRET` | api | (secret) | Stable HMAC secret for optional identity pseudonymization. |
| `LAT_STORAGE_S3_FORCE_PATH_STYLE` | api | true | Use path-style requests required by the Railway S3 endpoint. |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | api | (secret) | Railway bucket secret-key reference. |
| `LAT_TEMPORAL_MAX_CONCURRENT_ACTIVITY_TASKS` | api | 2 | Bound workflow activity concurrency for Railway resources. |
| `PORT` | clickhouse | 8123 | ClickHouse HTTP listener used by Railway health checks. |
| `CLICKHOUSE_DB` | clickhouse | latitude | Latitude ClickHouse database. |
| `CLICKHOUSE_USER` | clickhouse | (secret) | Latitude ClickHouse user. |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | Generated ClickHouse password. |
| `CLICKHOUSE_DEFAULT_ACCESS_MANAGEMENT` | clickhouse | 1 | Enable SQL-driven access management. |
| `PORT` | web | 3000 | Internal web listener used by Railway health checks. |
| `NODE_ENV` | web | production | Run Latitude in production mode. |
| `LAT_API_URL` | web | - | Canonical public API and MCP URL. |
| `LAT_WEB_URL` | web | - | Canonical Latitude web URL. |
| `LAT_WEB_PORT` | web | 3000 | Latitude web listener port. |
| `LAT_SMTP_FROM` | web | - | Sender address for Latitude email. |
| `LAT_SMTP_HOST` | web | - | SMTP server hostname required for production magic-link email. |
| `LAT_SMTP_PASS` | web | - | SMTP password required when using SMTP. |
| `LAT_SMTP_PORT` | web | - | SMTP server port, commonly 587. |
| `LAT_SMTP_USER` | web | (secret) | SMTP username required when using SMTP. |
| `LAT_INGEST_URL` | web | - | Canonical public OTLP ingest URL. |
| `LAT_REDIS_HOST` | web | - | Private Redis cache hostname. |
| `LAT_REDIS_PORT` | web | 6379 | Private Redis cache port. |
| `LAT_BULLMQ_HOST` | web | - | Private Redis BullMQ hostname. |
| `LAT_BULLMQ_PORT` | web | 6379 | Private Redis BullMQ port. |
| `LAT_PG_POOL_MAX` | web | 5 | Maximum PostgreSQL connections per Latitude process. |
| `LAT_DATABASE_URL` | web | - | RLS-bound PostgreSQL runtime connection. |
| `LAT_MAILGUN_FROM` | web | - | Optional Mailgun sender address. |
| `LAT_CLICKHOUSE_DB` | web | - | ClickHouse database reference. |
| `LAT_CLICKHOUSE_URL` | web | - | Private ClickHouse HTTP endpoint. |
| `LAT_GOOGLE_API_KEY` | web | (secret) | Optional Google AI key for configured features. |
| `LAT_MAILGUN_DOMAIN` | web | - | Optional Mailgun sending domain. |
| `LAT_MAILGUN_REGION` | web | - | Optional Mailgun region such as us or eu. |
| `LAT_OPENAI_API_KEY` | web | (secret) | Optional OpenAI key for configured AI features. |
| `LAT_STORAGE_DRIVER` | web | s3 | Use shared S3-compatible object storage. |
| `LAT_VOYAGE_API_KEY` | web | (secret) | Optional Voyage key for embeddings and reranking. |
| `LAT_CLICKHOUSE_USER` | web | (secret) | ClickHouse user reference. |
| `LAT_MAILGUN_API_KEY` | web | (secret) | Optional Mailgun API key. |
| `LAT_TRUSTED_ORIGINS` | web | - | Trusted web origin for sign-in. |
| `LAT_TEMPORAL_ADDRESS` | web | - | Private Temporal frontend address. |
| `LAT_ANTHROPIC_API_KEY` | web | (secret) | Optional Anthropic key for configured generation features. |
| `LAT_STORAGE_S3_BUCKET` | web | - | Railway bucket name. |
| `LAT_STORAGE_S3_REGION` | web | - | Railway bucket signing region. |
| `LAT_ADMIN_DATABASE_URL` | web | - | PostgreSQL administrator connection used by migrations. |
| `LAT_BETTER_AUTH_SECRET` | web | (secret) | Shared Better Auth signing secret. |
| `LAT_PG_IDLE_TIMEOUT_MS` | web | 30000 | Idle PostgreSQL connection timeout in milliseconds. |
| `LAT_TEMPORAL_NAMESPACE` | web | default | Temporal namespace created by auto-setup. |
| `LAT_CLICKHOUSE_PASSWORD` | web | (secret) | ClickHouse password reference. |
| `LAT_STORAGE_S3_ENDPOINT` | web | - | Railway bucket S3 endpoint. |
| `LAT_TEMPORAL_TASK_QUEUE` | web | latitude-workflows | Temporal task queue shared with workflow workers. |
| `LAT_CORS_ALLOWED_ORIGINS` | web | - | Browser origin allowed to call the API. |
| `LAT_MASTER_ENCRYPTION_KEY` | web | - | Shared key for encrypted provider and integration credentials. |
| `LAT_OSS_TELEMETRY_ENABLED` | web | false | Disable optional anonymous deployment telemetry by default. |
| `LAT_PG_CONNECT_TIMEOUT_MS` | web | 10000 | PostgreSQL connection timeout in milliseconds. |
| `LAT_CLICKHOUSE_MIGRATION_URL` | web | - | Private ClickHouse native endpoint used by migrations. |
| `LAT_STORAGE_S3_ACCESS_KEY_ID` | web | - | Railway bucket access-key reference. |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | web | false | Use the single-node ClickHouse migration set. |
| `LAT_REDACTION_PSEUDONYM_SECRET` | web | (secret) | Stable HMAC secret for optional identity pseudonymization. |
| `LAT_STORAGE_S3_FORCE_PATH_STYLE` | web | true | Use path-style requests required by the Railway S3 endpoint. |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | web | (secret) | Railway bucket secret-key reference. |
| `LAT_TEMPORAL_MAX_CONCURRENT_ACTIVITY_TASKS` | web | 2 | Bound workflow activity concurrency for Railway resources. |
| `PORT` | ingest | 3002 | Internal ingest listener used by Railway health checks. |
| `NODE_ENV` | ingest | production | Run Latitude in production mode. |
| `LAT_API_URL` | ingest | - | Canonical public API and MCP URL. |
| `LAT_WEB_URL` | ingest | - | Canonical Latitude web URL. |
| `LAT_SMTP_FROM` | ingest | - | Shared from the web service: Sender address for Latitude email. |
| `LAT_SMTP_HOST` | ingest | - | Shared from the web service: SMTP server hostname required for production magic-link email. |
| `LAT_SMTP_PASS` | ingest | - | Shared from the web service: SMTP password required when using SMTP. |
| `LAT_SMTP_PORT` | ingest | - | Shared from the web service: SMTP server port, commonly 587. |
| `LAT_SMTP_USER` | ingest | (secret) | Shared from the web service: SMTP username required when using SMTP. |
| `LAT_INGEST_URL` | ingest | - | Canonical public OTLP ingest URL. |
| `LAT_REDIS_HOST` | ingest | - | Private Redis cache hostname. |
| `LAT_REDIS_PORT` | ingest | 6379 | Private Redis cache port. |
| `LAT_BULLMQ_HOST` | ingest | - | Private Redis BullMQ hostname. |
| `LAT_BULLMQ_PORT` | ingest | 6379 | Private Redis BullMQ port. |
| `LAT_INGEST_PORT` | ingest | 3002 | Latitude ingest listener port. |
| `LAT_PG_POOL_MAX` | ingest | 5 | Maximum PostgreSQL connections per Latitude process. |
| `LAT_DATABASE_URL` | ingest | - | RLS-bound PostgreSQL runtime connection. |
| `LAT_MAILGUN_FROM` | ingest | - | Shared from the web service: Optional Mailgun sender address. |
| `LAT_CLICKHOUSE_DB` | ingest | - | ClickHouse database reference. |
| `LAT_CLICKHOUSE_URL` | ingest | - | Private ClickHouse HTTP endpoint. |
| `LAT_GOOGLE_API_KEY` | ingest | (secret) | Shared from the web service: Optional Google AI key for configured features. |
| `LAT_MAILGUN_DOMAIN` | ingest | - | Shared from the web service: Optional Mailgun sending domain. |
| `LAT_MAILGUN_REGION` | ingest | - | Shared from the web service: Optional Mailgun region such as us or eu. |
| `LAT_OPENAI_API_KEY` | ingest | (secret) | Shared from the web service: Optional OpenAI key for configured AI features. |
| `LAT_STORAGE_DRIVER` | ingest | s3 | Use shared S3-compatible object storage. |
| `LAT_VOYAGE_API_KEY` | ingest | (secret) | Shared from the web service: Optional Voyage key for embeddings and reranking. |
| `LAT_CLICKHOUSE_USER` | ingest | (secret) | ClickHouse user reference. |
| `LAT_MAILGUN_API_KEY` | ingest | (secret) | Shared from the web service: Optional Mailgun API key. |
| `LAT_TRUSTED_ORIGINS` | ingest | - | Trusted web origin for sign-in. |
| `LAT_TEMPORAL_ADDRESS` | ingest | - | Private Temporal frontend address. |
| `LAT_ANTHROPIC_API_KEY` | ingest | (secret) | Shared from the web service: Optional Anthropic key for configured generation features. |
| `LAT_STORAGE_S3_BUCKET` | ingest | - | Railway bucket name. |
| `LAT_STORAGE_S3_REGION` | ingest | - | Railway bucket signing region. |
| `LAT_ADMIN_DATABASE_URL` | ingest | - | PostgreSQL administrator connection used by migrations. |
| `LAT_BETTER_AUTH_SECRET` | ingest | (secret) | Shared Better Auth signing secret. |
| `LAT_PG_IDLE_TIMEOUT_MS` | ingest | 30000 | Idle PostgreSQL connection timeout in milliseconds. |
| `LAT_TEMPORAL_NAMESPACE` | ingest | default | Temporal namespace created by auto-setup. |
| `LAT_CLICKHOUSE_PASSWORD` | ingest | (secret) | ClickHouse password reference. |
| `LAT_STORAGE_S3_ENDPOINT` | ingest | - | Railway bucket S3 endpoint. |
| `LAT_TEMPORAL_TASK_QUEUE` | ingest | latitude-workflows | Temporal task queue shared with workflow workers. |
| `LAT_CORS_ALLOWED_ORIGINS` | ingest | - | Browser origin allowed to call the API. |
| `LAT_MASTER_ENCRYPTION_KEY` | ingest | - | Shared key for encrypted provider and integration credentials. |
| `LAT_OSS_TELEMETRY_ENABLED` | ingest | false | Disable optional anonymous deployment telemetry by default. |
| `LAT_PG_CONNECT_TIMEOUT_MS` | ingest | 10000 | PostgreSQL connection timeout in milliseconds. |
| `LAT_CLICKHOUSE_MIGRATION_URL` | ingest | - | Private ClickHouse native endpoint used by migrations. |
| `LAT_STORAGE_S3_ACCESS_KEY_ID` | ingest | - | Railway bucket access-key reference. |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | ingest | false | Use the single-node ClickHouse migration set. |
| `LAT_REDACTION_PSEUDONYM_SECRET` | ingest | (secret) | Stable HMAC secret for optional identity pseudonymization. |
| `LAT_STORAGE_S3_FORCE_PATH_STYLE` | ingest | true | Use path-style requests required by the Railway S3 endpoint. |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | ingest | (secret) | Railway bucket secret-key reference. |
| `LAT_TEMPORAL_MAX_CONCURRENT_ACTIVITY_TASKS` | ingest | 2 | Bound workflow activity concurrency for Railway resources. |
| `PORT` | workflows | 9091 | Internal workflows listener used by Railway health checks. |
| `NODE_ENV` | workflows | production | Run Latitude in production mode. |
| `LAT_API_URL` | workflows | - | Canonical public API and MCP URL. |
| `LAT_WEB_URL` | workflows | - | Canonical Latitude web URL. |
| `LAT_SMTP_FROM` | workflows | - | Shared from the web service: Sender address for Latitude email. |
| `LAT_SMTP_HOST` | workflows | - | Shared from the web service: SMTP server hostname required for production magic-link email. |
| `LAT_SMTP_PASS` | workflows | - | Shared from the web service: SMTP password required when using SMTP. |
| `LAT_SMTP_PORT` | workflows | - | Shared from the web service: SMTP server port, commonly 587. |
| `LAT_SMTP_USER` | workflows | (secret) | Shared from the web service: SMTP username required when using SMTP. |
| `LAT_INGEST_URL` | workflows | - | Canonical public OTLP ingest URL. |
| `LAT_REDIS_HOST` | workflows | - | Private Redis cache hostname. |
| `LAT_REDIS_PORT` | workflows | 6379 | Private Redis cache port. |
| `LAT_BULLMQ_HOST` | workflows | - | Private Redis BullMQ hostname. |
| `LAT_BULLMQ_PORT` | workflows | 6379 | Private Redis BullMQ port. |
| `LAT_PG_POOL_MAX` | workflows | 5 | Maximum PostgreSQL connections per Latitude process. |
| `LAT_DATABASE_URL` | workflows | - | RLS-bound PostgreSQL runtime connection. |
| `LAT_MAILGUN_FROM` | workflows | - | Shared from the web service: Optional Mailgun sender address. |
| `LAT_CLICKHOUSE_DB` | workflows | - | ClickHouse database reference. |
| `LAT_CLICKHOUSE_URL` | workflows | - | Private ClickHouse HTTP endpoint. |
| `LAT_GOOGLE_API_KEY` | workflows | (secret) | Shared from the web service: Optional Google AI key for configured features. |
| `LAT_MAILGUN_DOMAIN` | workflows | - | Shared from the web service: Optional Mailgun sending domain. |
| `LAT_MAILGUN_REGION` | workflows | - | Shared from the web service: Optional Mailgun region such as us or eu. |
| `LAT_OPENAI_API_KEY` | workflows | (secret) | Shared from the web service: Optional OpenAI key for configured AI features. |
| `LAT_STORAGE_DRIVER` | workflows | s3 | Use shared S3-compatible object storage. |
| `LAT_VOYAGE_API_KEY` | workflows | (secret) | Shared from the web service: Optional Voyage key for embeddings and reranking. |
| `LAT_CLICKHOUSE_USER` | workflows | (secret) | ClickHouse user reference. |
| `LAT_MAILGUN_API_KEY` | workflows | (secret) | Shared from the web service: Optional Mailgun API key. |
| `LAT_TRUSTED_ORIGINS` | workflows | - | Trusted web origin for sign-in. |
| `LAT_TEMPORAL_ADDRESS` | workflows | - | Private Temporal frontend address. |
| `LAT_ANTHROPIC_API_KEY` | workflows | (secret) | Shared from the web service: Optional Anthropic key for configured generation features. |
| `LAT_STORAGE_S3_BUCKET` | workflows | - | Railway bucket name. |
| `LAT_STORAGE_S3_REGION` | workflows | - | Railway bucket signing region. |
| `LAT_ADMIN_DATABASE_URL` | workflows | - | PostgreSQL administrator connection used by migrations. |
| `LAT_BETTER_AUTH_SECRET` | workflows | (secret) | Shared Better Auth signing secret. |
| `LAT_PG_IDLE_TIMEOUT_MS` | workflows | 30000 | Idle PostgreSQL connection timeout in milliseconds. |
| `LAT_TEMPORAL_NAMESPACE` | workflows | default | Temporal namespace created by auto-setup. |
| `LAT_CLICKHOUSE_PASSWORD` | workflows | (secret) | ClickHouse password reference. |
| `LAT_STORAGE_S3_ENDPOINT` | workflows | - | Railway bucket S3 endpoint. |
| `LAT_TEMPORAL_TASK_QUEUE` | workflows | latitude-workflows | Temporal task queue shared with workflow workers. |
| `LAT_CORS_ALLOWED_ORIGINS` | workflows | - | Browser origin allowed to call the API. |
| `LAT_MASTER_ENCRYPTION_KEY` | workflows | - | Shared key for encrypted provider and integration credentials. |
| `LAT_OSS_TELEMETRY_ENABLED` | workflows | false | Disable optional anonymous deployment telemetry by default. |
| `LAT_PG_CONNECT_TIMEOUT_MS` | workflows | 10000 | PostgreSQL connection timeout in milliseconds. |
| `LAT_WORKFLOWS_HEALTH_PORT` | workflows | 9091 | Workflows health listener port. |
| `LAT_CLICKHOUSE_MIGRATION_URL` | workflows | - | Private ClickHouse native endpoint used by migrations. |
| `LAT_STORAGE_S3_ACCESS_KEY_ID` | workflows | - | Railway bucket access-key reference. |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | workflows | false | Use the single-node ClickHouse migration set. |
| `LAT_REDACTION_PSEUDONYM_SECRET` | workflows | (secret) | Stable HMAC secret for optional identity pseudonymization. |
| `LAT_STORAGE_S3_FORCE_PATH_STYLE` | workflows | true | Use path-style requests required by the Railway S3 endpoint. |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | workflows | (secret) | Railway bucket secret-key reference. |
| `LAT_TEMPORAL_MAX_CONCURRENT_ACTIVITY_TASKS` | workflows | 2 | Bound workflow activity concurrency for Railway resources. |
| `REDIS_PORT` | redis | 6379 | Private Redis listener port. |
| `POSTGRES_DB` | postgres | latitude | Latitude PostgreSQL database. |
| `POSTGRES_USER` | postgres | (secret) | Latitude PostgreSQL administrator user. |
| `POSTGRES_PASSWORD` | postgres | (secret) | Generated PostgreSQL administrator password. |
| `POSTGRES_RUNTIME_USER` | postgres | (secret) | RLS-bound application database user. |
| `POSTGRES_RUNTIME_PASSWORD` | postgres | (secret) | Generated runtime database password. |
| `PORT` | workers | 9090 | Internal workers listener used by Railway health checks. |
| `NODE_ENV` | workers | production | Run Latitude in production mode. |
| `LAT_API_URL` | workers | - | Canonical public API and MCP URL. |
| `LAT_WEB_URL` | workers | - | Canonical Latitude web URL. |
| `LAT_SMTP_FROM` | workers | - | Shared from the web service: Sender address for Latitude email. |
| `LAT_SMTP_HOST` | workers | - | Shared from the web service: SMTP server hostname required for production magic-link email. |
| `LAT_SMTP_PASS` | workers | - | Shared from the web service: SMTP password required when using SMTP. |
| `LAT_SMTP_PORT` | workers | - | Shared from the web service: SMTP server port, commonly 587. |
| `LAT_SMTP_USER` | workers | (secret) | Shared from the web service: SMTP username required when using SMTP. |
| `LAT_INGEST_URL` | workers | - | Canonical public OTLP ingest URL. |
| `LAT_REDIS_HOST` | workers | - | Private Redis cache hostname. |
| `LAT_REDIS_PORT` | workers | 6379 | Private Redis cache port. |
| `LAT_BULLMQ_HOST` | workers | - | Private Redis BullMQ hostname. |
| `LAT_BULLMQ_PORT` | workers | 6379 | Private Redis BullMQ port. |
| `LAT_PG_POOL_MAX` | workers | 5 | Maximum PostgreSQL connections per Latitude process. |
| `LAT_DATABASE_URL` | workers | - | RLS-bound PostgreSQL runtime connection. |
| `LAT_MAILGUN_FROM` | workers | - | Shared from the web service: Optional Mailgun sender address. |
| `LAT_CLICKHOUSE_DB` | workers | - | ClickHouse database reference. |
| `LAT_CLICKHOUSE_URL` | workers | - | Private ClickHouse HTTP endpoint. |
| `LAT_GOOGLE_API_KEY` | workers | (secret) | Shared from the web service: Optional Google AI key for configured features. |
| `LAT_MAILGUN_DOMAIN` | workers | - | Shared from the web service: Optional Mailgun sending domain. |
| `LAT_MAILGUN_REGION` | workers | - | Shared from the web service: Optional Mailgun region such as us or eu. |
| `LAT_OPENAI_API_KEY` | workers | (secret) | Shared from the web service: Optional OpenAI key for configured AI features. |
| `LAT_STORAGE_DRIVER` | workers | s3 | Use shared S3-compatible object storage. |
| `LAT_VOYAGE_API_KEY` | workers | (secret) | Shared from the web service: Optional Voyage key for embeddings and reranking. |
| `LAT_CLICKHOUSE_USER` | workers | (secret) | ClickHouse user reference. |
| `LAT_MAILGUN_API_KEY` | workers | (secret) | Shared from the web service: Optional Mailgun API key. |
| `LAT_TRUSTED_ORIGINS` | workers | - | Trusted web origin for sign-in. |
| `LAT_TEMPORAL_ADDRESS` | workers | - | Private Temporal frontend address. |
| `LAT_ANTHROPIC_API_KEY` | workers | (secret) | Shared from the web service: Optional Anthropic key for configured generation features. |
| `LAT_STORAGE_S3_BUCKET` | workers | - | Railway bucket name. |
| `LAT_STORAGE_S3_REGION` | workers | - | Railway bucket signing region. |
| `LAT_ADMIN_DATABASE_URL` | workers | - | PostgreSQL administrator connection used by migrations. |
| `LAT_BETTER_AUTH_SECRET` | workers | (secret) | Shared Better Auth signing secret. |
| `LAT_PG_IDLE_TIMEOUT_MS` | workers | 30000 | Idle PostgreSQL connection timeout in milliseconds. |
| `LAT_TEMPORAL_NAMESPACE` | workers | default | Temporal namespace created by auto-setup. |
| `LAT_CLICKHOUSE_PASSWORD` | workers | (secret) | ClickHouse password reference. |
| `LAT_STORAGE_S3_ENDPOINT` | workers | - | Railway bucket S3 endpoint. |
| `LAT_TEMPORAL_TASK_QUEUE` | workers | latitude-workflows | Temporal task queue shared with workflow workers. |
| `LAT_WORKERS_HEALTH_PORT` | workers | 9090 | Workers health listener port. |
| `LAT_CORS_ALLOWED_ORIGINS` | workers | - | Browser origin allowed to call the API. |
| `LAT_MASTER_ENCRYPTION_KEY` | workers | - | Shared key for encrypted provider and integration credentials. |
| `LAT_OSS_TELEMETRY_ENABLED` | workers | false | Disable optional anonymous deployment telemetry by default. |
| `LAT_PG_CONNECT_TIMEOUT_MS` | workers | 10000 | PostgreSQL connection timeout in milliseconds. |
| `LAT_CLICKHOUSE_MIGRATION_URL` | workers | - | Private ClickHouse native endpoint used by migrations. |
| `LAT_STORAGE_S3_ACCESS_KEY_ID` | workers | - | Railway bucket access-key reference. |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | workers | false | Use the single-node ClickHouse migration set. |
| `LAT_REDACTION_PSEUDONYM_SECRET` | workers | (secret) | Stable HMAC secret for optional identity pseudonymization. |
| `LAT_STORAGE_S3_FORCE_PATH_STYLE` | workers | true | Use path-style requests required by the Railway S3 endpoint. |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | workers | (secret) | Railway bucket secret-key reference. |
| `LAT_TEMPORAL_MAX_CONCURRENT_ACTIVITY_TASKS` | workers | 2 | Bound workflow activity concurrency for Railway resources. |
| `DB` | temporal | postgres12 | Use PostgreSQL persistence. |
| `DBNAME` | temporal | temporal | Temporal primary database. |
| `DB_PORT` | temporal | 5432 | Private PostgreSQL port. |
| `POSTGRES_PWD` | temporal | - | PostgreSQL password reference. |
| `POSTGRES_USER` | temporal | (secret) | PostgreSQL administrator user reference. |
| `POSTGRES_SEEDS` | temporal | - | Private PostgreSQL hostname. |
| `VISIBILITY_DBNAME` | temporal | temporal_visibility | Temporal visibility database. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Healthcheck:** `/api/health`
- **Start command:** `/bin/sh -c 'exec redis-server --maxmemory-policy noeviction --appendonly yes --save 3600 1 --save 300 100'`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/latitude-1)
