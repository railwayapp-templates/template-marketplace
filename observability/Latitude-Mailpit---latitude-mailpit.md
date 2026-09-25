# Deploy Latitude + Mailpit on Railway

LLM and AI agent observability: OTLP traces, evals, MCP. Zero-setup login

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/latitude-mailpit)

## About

Latitude is open-source observability for AI agents. Your apps send OpenTelemetry traces, and Latitude turns them into searchable sessions with token and cost accounting, flags where agents fail, runs evaluations and monitors, and exposes all of it over a REST API and an MCP server.

Latitude is not one container. This template runs the full production stack from upstream's `docker-stack.yml` on the pinned 0.3.118 release: the web app, the public API and MCP server, the OTLP ingest endpoint, background workers, Temporal workflow workers and a one-shot migrations job. Behind them sit Postgres with pgvector, ClickHouse for span analytics, Redis for queues and caching, Temporal, and a Railway Storage Bucket for trace payloads.

Latitude signs you in with a magic link sent by email, so an instance with no mail setup can't be logged into. This template bundles a private Mailpit inbox so you can sign in right away. Add SMTP or Mailgun whenever you want real email delivery.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `pgvector/pgvector:0.8.6-pg16` | Database |
| Ingest | `latitudedata/ingest:0.3.118` | Web service |
| Mailpit | `axllent/mailpit:v1.31.2` | Web service |
| Web | `latitudedata/web:0.3.118` | Web service |
| API | `latitudedata/api:0.3.118` | Web service |
| Redis | `redis:7.4.11` | Database |
| Temporal | `temporalio/auto-setup:1.27.2` | Worker |
| ClickHouse | `clickhouse/clickhouse-server:26.2.19.43` | Database |
| Workflows | `latitudedata/workflows:0.3.118` | Worker |
| Migrations | `latitudedata/migrations:0.3.118` | Worker |
| Workers | `latitudedata/workers:0.3.118` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | latitude | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `POSTGRES_RUNTIME_PASSWORD` | Postgres | (secret) | Password of the latitude_app role the apps connect as (row-level security applies to it). Created by the Migrations service. |
| `PORT` | Ingest | 3002 | - |
| `LAT_SMTP_USER` | Ingest | (secret) | - |
| `LAT_OPENAI_API_KEY` | Ingest | (secret) | - |
| `LAT_VOYAGE_API_KEY` | Ingest | (secret) | - |
| `LAT_CLICKHOUSE_USER` | Ingest | (secret) | - |
| `LAT_MAILGUN_API_KEY` | Ingest | (secret) | - |
| `LAT_ANTHROPIC_API_KEY` | Ingest | (secret) | - |
| `LAT_BETTER_AUTH_SECRET` | Ingest | (secret) | Signs sessions. Changing it logs everyone out. |
| `LAT_CLICKHOUSE_PASSWORD` | Ingest | (secret) | - |
| `LAT_GITHUB_CLIENT_SECRET` | Ingest | (secret) | - |
| `LAT_GOOGLE_CLIENT_SECRET` | Ingest | (secret) | - |
| `LAT_MASTER_ENCRYPTION_KEY` | Ingest | - | AES-256-GCM key for secrets stored in the database. Do not change after first boot. |
| `LAT_REDACTION_PSEUDONYM_SECRET` | Ingest | (secret) | HMAC key for pseudonymized user ids in PII redaction. Rotating it breaks grouping across old and new traces. |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | Ingest | (secret) | - |
| `PORT` | Mailpit | 8025 | - |
| `MAILPIT_PASSWORD` | Mailpit | (secret) | Password for the bundled Mailpit inbox (user: admin). Your sign-in links land there until you configure SMTP or Mailgun on the Web service. |
| `MAILPIT_USERNAME` | Mailpit | (secret) | - |
| `PORT` | Web | 3000 | - |
| `LAT_API_PORT` | Web | 3001 | - |
| `LAT_WEB_PORT` | Web | 3000 | - |
| `LAT_SMTP_FROM` | Web | - | Optional. From address for outgoing mail, on a domain your SMTP provider has verified. |
| `LAT_SMTP_HOST` | Web | - | Optional. SMTP server for real email delivery (sign-in links, invites). Leave blank to keep mail in the bundled Mailpit inbox. |
| `LAT_SMTP_PASS` | Web | - | Optional. SMTP password or API key. |
| `LAT_SMTP_PORT` | Web | 587 | SMTP port. 587 (STARTTLS) or 465 (TLS). |
| `LAT_SMTP_USER` | Web | (secret) | Optional. SMTP username. |
| `LAT_REDIS_PORT` | Web | 6379 | - |
| `LAT_BULLMQ_PORT` | Web | 6379 | - |
| `LAT_INGEST_PORT` | Web | 3002 | - |
| `LAT_MAILGUN_FROM` | Web | - | Optional. From address for Mailgun. |
| `LAT_MAILPIT_FROM` | Web | noreply@latitude.local | - |
| `LAT_MAILPIT_PORT` | Web | 1025 | - |
| `LAT_MAILGUN_DOMAIN` | Web | - | Optional. Mailgun sending domain. |
| `LAT_OPENAI_API_KEY` | Web | (secret) | Optional. Enables AI features (flaggers, evaluations, summaries) with OpenAI. Also set LAT_AI_GENERATION_PROVIDER=openai and a model. |
| `LAT_STORAGE_DRIVER` | Web | s3 | - |
| `LAT_VOYAGE_API_KEY` | Web | (secret) | Optional. Voyage AI key, the default embeddings and reranking provider (semantic search). |
| `LAT_CLICKHOUSE_USER` | Web | (secret) | - |
| `LAT_MAILGUN_API_KEY` | Web | (secret) | Optional. Mailgun API key. Takes precedence over SMTP when set with LAT_MAILGUN_DOMAIN. |
| `LAT_GITHUB_CLIENT_ID` | Web | - | Optional. GitHub OAuth app client id for Sign in with GitHub. |
| `LAT_GOOGLE_CLIENT_ID` | Web | - | Optional. Google OAuth client id for Sign in with Google. |
| `LAT_ANTHROPIC_API_KEY` | Web | (secret) | Optional. Anthropic key for AI features. Pair with LAT_AI_GENERATION_PROVIDER=anthropic and a model. |
| `LAT_AI_EMBEDDING_MODEL` | Web | - | Optional. Embedding model id for the provider above. |
| `LAT_BETTER_AUTH_SECRET` | Web | (secret) | Signs sessions. Changing it logs everyone out. |
| `LAT_TEMPORAL_NAMESPACE` | Web | default | - |
| `LAT_AI_GENERATION_MODEL` | Web | - | Optional. Model id for the provider above, e.g. gpt-5-mini. |
| `LAT_CLICKHOUSE_PASSWORD` | Web | (secret) | - |
| `LAT_TEMPORAL_TASK_QUEUE` | Web | latitude-workflows | - |
| `LAT_GITHUB_CLIENT_SECRET` | Web | (secret) | Optional. GitHub OAuth app client secret. |
| `LAT_GOOGLE_CLIENT_SECRET` | Web | (secret) | Optional. Google OAuth client secret. |
| `LAT_AI_EMBEDDING_PROVIDER` | Web | - | Optional. voyage, openai, google or custom. |
| `LAT_MASTER_ENCRYPTION_KEY` | Web | - | AES-256-GCM key for secrets stored in the database. Do not change after first boot. |
| `LAT_AI_GENERATION_PROVIDER` | Web | - | Optional. amazon-bedrock, anthropic, openai, google or custom. |
| `LAT_REDACTION_PSEUDONYM_SECRET` | Web | (secret) | HMAC key for pseudonymized user ids in PII redaction. Rotating it breaks grouping across old and new traces. |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | Web | (secret) | - |
| `PORT` | API | 3001 | - |
| `LAT_SMTP_USER` | API | (secret) | - |
| `LAT_OPENAI_API_KEY` | API | (secret) | - |
| `LAT_VOYAGE_API_KEY` | API | (secret) | - |
| `LAT_CLICKHOUSE_USER` | API | (secret) | - |
| `LAT_MAILGUN_API_KEY` | API | (secret) | - |
| `LAT_ANTHROPIC_API_KEY` | API | (secret) | - |
| `LAT_BETTER_AUTH_SECRET` | API | (secret) | Signs sessions. Changing it logs everyone out. |
| `LAT_CLICKHOUSE_PASSWORD` | API | (secret) | - |
| `LAT_GITHUB_CLIENT_SECRET` | API | (secret) | - |
| `LAT_GOOGLE_CLIENT_SECRET` | API | (secret) | - |
| `LAT_MASTER_ENCRYPTION_KEY` | API | - | AES-256-GCM key for secrets stored in the database. Do not change after first boot. |
| `LAT_REDACTION_PSEUDONYM_SECRET` | API | (secret) | HMAC key for pseudonymized user ids in PII redaction. Rotating it breaks grouping across old and new traces. |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | API | (secret) | - |
| `DB` | Temporal | postgres12 | - |
| `DBNAME` | Temporal | temporal | - |
| `DB_PORT` | Temporal | 5432 | - |
| `BIND_ON_IP` | Temporal | ::0 | - |
| `POSTGRES_USER` | Temporal | (secret) | - |
| `VISIBILITY_DBNAME` | Temporal | temporal_visibility | - |
| `CLICKHOUSE_DB` | ClickHouse | latitude | - |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | - |
| `PORT` | Workflows | 9091 | - |
| `LAT_SMTP_USER` | Workflows | (secret) | - |
| `LAT_OPENAI_API_KEY` | Workflows | (secret) | - |
| `LAT_VOYAGE_API_KEY` | Workflows | (secret) | - |
| `LAT_CLICKHOUSE_USER` | Workflows | (secret) | - |
| `LAT_MAILGUN_API_KEY` | Workflows | (secret) | - |
| `LAT_ANTHROPIC_API_KEY` | Workflows | (secret) | - |
| `LAT_BETTER_AUTH_SECRET` | Workflows | (secret) | Signs sessions. Changing it logs everyone out. |
| `LAT_CLICKHOUSE_PASSWORD` | Workflows | (secret) | - |
| `LAT_GITHUB_CLIENT_SECRET` | Workflows | (secret) | - |
| `LAT_GOOGLE_CLIENT_SECRET` | Workflows | (secret) | - |
| `LAT_MASTER_ENCRYPTION_KEY` | Workflows | - | AES-256-GCM key for secrets stored in the database. Do not change after first boot. |
| `LAT_REDACTION_PSEUDONYM_SECRET` | Workflows | (secret) | HMAC key for pseudonymized user ids in PII redaction. Rotating it breaks grouping across old and new traces. |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | Workflows | (secret) | - |
| `LAT_CLICKHOUSE_USER` | Migrations | (secret) | - |
| `LAT_CLICKHOUSE_PASSWORD` | Migrations | (secret) | - |
| `POSTGRES_RUNTIME_PASSWORD` | Migrations | (secret) | Password of the latitude_app role the apps connect as (row-level security applies to it). Created by the Migrations service. |
| `LAT_CLICKHOUSE_CLUSTER_ENABLED` | Migrations | false | - |
| `PORT` | Workers | 9090 | - |
| `LAT_SMTP_USER` | Workers | (secret) | - |
| `LAT_OPENAI_API_KEY` | Workers | (secret) | - |
| `LAT_VOYAGE_API_KEY` | Workers | (secret) | - |
| `LAT_CLICKHOUSE_USER` | Workers | (secret) | - |
| `LAT_MAILGUN_API_KEY` | Workers | (secret) | - |
| `LAT_ANTHROPIC_API_KEY` | Workers | (secret) | - |
| `LAT_BETTER_AUTH_SECRET` | Workers | (secret) | Signs sessions. Changing it logs everyone out. |
| `LAT_CLICKHOUSE_PASSWORD` | Workers | (secret) | - |
| `LAT_GITHUB_CLIENT_SECRET` | Workers | (secret) | - |
| `LAT_GOOGLE_CLIENT_SECRET` | Workers | (secret) | - |
| `LAT_MASTER_ENCRYPTION_KEY` | Workers | - | AES-256-GCM key for secrets stored in the database. Do not change after first boot. |
| `LAT_REDACTION_PSEUDONYM_SECRET` | Workers | (secret) | HMAC key for pseudonymized user ids in PII redaction. Rotating it breaks grouping across old and new traces. |
| `LAT_STORAGE_S3_SECRET_ACCESS_KEY` | Workers | (secret) | - |

## Configuration

- **Start command:** `/usr/local/bin/docker-entrypoint.sh postgres -c wal_level=logical`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/livez`
- **Healthcheck:** `/api/health`
- **Start command:** `/bin/sh -c "rm -rf /data/lost+found && exec docker-entrypoint.sh redis-server --maxmemory-policy noeviction --appendonly yes"`
- **Volume:** `/data`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "cd /app/packages/platform/db-postgres && node -e 'const {Client}=require(`pg`);const c=new Client({connectionString:process.env.LAT_ADMIN_DATABASE_URL});(async()=>{await c.connect();await c.query(`DO $$BEGIN CREATE ROLE latitude_app LOGIN; EXCEPTION WHEN duplicate_object THEN NULL; END$$`);await c.query(`ALTER ROLE latitude_app WITH LOGIN PASSWORD ${c.escapeLiteral(process.env.POSTGRES_RUNTIME_PASSWORD)}`);await c.query(`GRANT CONNECT ON DATABASE ${c.escapeIdentifier(c.database)} TO latitude_app`);await c.end();console.log(`latitude_app role ready`)})().catch(e=>{console.error(e);process.exit(1)})' && pnpm pg:migrate && pnpm --filter @platform/db-clickhouse ch:up"`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/latitude-mailpit)
