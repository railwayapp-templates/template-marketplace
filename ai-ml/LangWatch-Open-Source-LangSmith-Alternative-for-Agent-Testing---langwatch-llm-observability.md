# Deploy LangWatch | Open Source LangSmith Alternative for Agent Testing on Railway

Self-hosted LangWatch: LLM tracing, evals, guardrails and agent testing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langwatch-llm-observability)

## About

LangWatch is an open-source platform for testing and monitoring LLM applications and AI agents: tracing, evaluations and guardrails, datasets, prompt management, agent simulations and the Optimization Studio. This template runs the complete self-hosted stack in one click, on the same images upstream ships in its own Docker Compose file and Helm chart.

LangWatch is not a single container. The application needs a background worker, two sidecar services and three datastores, and this template wires all of them together over Railway's private network:

- **LangWatch** — the web app and API (port 5560). It runs the PostgreSQL and ClickHouse migrations on every boot, after waiting for both databases to accept connections, and is the only service with a public domain.
- **Workers** — the same image running the background worker: trace processing, evaluations, topic clustering, alerts and scheduled jobs.
- **NLP** — the Go engine behind the Optimization Studio and workflow execution.
- **LangEvals** — the Python evaluators and guardrails (PII detection, language detection, LLM-as-judge and more).
- **PostgreSQL 18** — users, organizations, projects, prompts and settings, on a volume.
- **ClickHouse** — traces, spans, evaluations and analytics, on a volume. This is upstream's own `clickhouse-serverless` image, which sizes its memory limits and thread pools from `CH_CPU` and `CH_RAM`.
- **Valkey** — the job queue, with a generated password and an append-only file on a volume, so queued work survives a restart.
- **Storage bucket** — a Railway object storage bucket for datasets and stored objects, instead of the container's local disk.

Every image is pinned to a full version (LangWatch 3.17.0), so a redeploy months from now installs exactly what was tested rather than whatever `latest` has become.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| LangWatch | `langwatch/langwatch:3.17.0` | Web service |
| Valkey | `valkey/valkey:9.1.2-alpine` | Database |
| ClickHouse | `langwatch/clickhouse-serverless:0.4.0` | Database |
| NLP | `langwatch/langwatch_nlp:3.17.0` | Worker |
| Postgres | `postgres:18.6-alpine` | Database |
| LangEvals | `langwatch/langevals:3.17.0` | Worker |
| Workers | `langwatch/langwatch:3.17.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | LangWatch | 5560 | Port the LangWatch server listens on. Railway routes the public domain here. |
| `NODE_ENV` | LangWatch | production | Runs the production build. Do not change. |
| `WAIT_FOR` | LangWatch | - | Databases the start command waits for before running migrations (host:port, space-separated). |
| `BASE_HOST` | LangWatch | - | Public URL of this deployment. |
| `REDIS_URL` | LangWatch | - | Valkey connection for the job queue, with its generated password. |
| `S3_REGION` | LangWatch | - | Railway bucket region. |
| `S3_ENDPOINT` | LangWatch | - | Railway bucket S3 endpoint. |
| `DATABASE_URL` | LangWatch | - | PostgreSQL connection over the private network. |
| `NEXTAUTH_URL` | LangWatch | - | Public URL used for login callbacks. Same as BASE_HOST. |
| `CLICKHOUSE_URL` | LangWatch | - | ClickHouse HTTP connection over the private network (traces, spans, analytics). |
| `INSTALL_METHOD` | LangWatch | docker | Install method reported by the app, as in upstream's Docker Compose file. |
| `S3_BUCKET_NAME` | LangWatch | - | Railway bucket for datasets and stored objects. |
| `NEXTAUTH_SECRET` | LangWatch | (secret) | Session signing secret. Generated on deploy. |
| `S3_ACCESS_KEY_ID` | LangWatch | - | Railway bucket access key. |
| `NEXTAUTH_PROVIDER` | LangWatch | email | Login method. 'email' is email and password; set auth0, azure-ad, okta, cognito, onelogin or oidc (plus that provider's variables) for SSO. |
| `CREDENTIALS_SECRET` | LangWatch | (secret) | AES-256 key for API keys and project secrets stored in the database. Must be exactly 64 hex characters. Do not change it after deploying, or stored secrets can no longer be decrypted. |
| `LANGEVALS_ENDPOINT` | LangWatch | - | LangEvals evaluators and guardrails over the private network. |
| `LANGWATCH_ENDPOINT` | LangWatch | - | Private URL of the LangWatch server, used by the other services to call it back. |
| `DISABLE_USAGE_STATS` | LangWatch | true | Anonymous usage statistics are off. Remove this variable to send them to the LangWatch team. |
| `SKIP_ENV_VALIDATION` | LangWatch | true | Skips the build-time env schema check, as upstream's Docker Compose does. Runtime checks still apply. |
| `API_TOKEN_JWT_SECRET` | LangWatch | (secret) | Signing secret for API tokens. Generated on deploy. |
| `S3_SECRET_ACCESS_KEY` | LangWatch | (secret) | Railway bucket secret key. |
| `LANGWATCH_NLP_SERVICE` | LangWatch | - | NLP engine (Optimization Studio, workflows, code evaluators) over the private network. |
| `LW_GATEWAY_JWT_SECRET` | LangWatch | (secret) | Signing key for AI Gateway virtual-key tokens. 64 hex characters, generated on deploy. |
| `LW_VIRTUAL_KEY_PEPPER` | LangWatch | - | Pepper for hashing AI Gateway virtual keys at rest. 64 hex characters, generated on deploy. |
| `LW_GATEWAY_INTERNAL_SECRET` | LangWatch | (secret) | Shared HMAC secret for the AI Gateway's internal calls. 64 hex characters, generated on deploy. |
| `CLICKHOUSE_BACKUP_METRICS_ENABLED` | LangWatch | false | This ClickHouse has no backups configured, so system.backup_log does not exist; leaving collection on fails a query on every stats tick. |
| `REDIS_PASSWORD` | Valkey | (secret) | Valkey password (requirepass). Generated on deploy. |
| `PORT` | ClickHouse | 8123 | ClickHouse HTTP port, for Railway. |
| `CH_CPU` | ClickHouse | 2 | CPU cores ClickHouse sizes its thread pools and merges for. Raise together with CH_RAM for large trace volumes. |
| `CH_RAM` | ClickHouse | 4Gi | Memory ClickHouse sizes its limits and caches for (85% server limit, 25% per query). Railway bills actual use, not this value. |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Password of the ClickHouse default user. Generated on deploy. |
| `PORT` | NLP | 5561 | Port the NLP engine listens on (SERVER_ADDR in the image). |
| `LANGWATCH_ENDPOINT` | NLP | - | Private URL of the LangWatch server, for evaluator and workflow callbacks. |
| `POSTGRES_DB` | Postgres | langwatch | Database name. |
| `POSTGRES_USER` | Postgres | (secret) | Database user. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Database password. Generated on deploy. |
| `PORT` | LangEvals | 5562 | Port the evaluators server listens on. |
| `CPU_COUNT` | LangEvals | 1 | Number of evaluator worker processes. Each one loads the full evaluator stack, about 1.8 GB of RAM; raise it only if evaluations queue up. |
| `DISABLE_EVALUATORS_PRELOAD` | LangEvals | true | Load evaluators on first use instead of at boot, for a faster start. |
| `PORT` | Workers | 5560 | Kept equal to the app's PORT: the worker's health listener binds PORT - 2561 (2999). |
| `NODE_ENV` | Workers | production | Runs the production build. Do not change. |
| `BASE_HOST` | Workers | - | Public URL of this deployment. |
| `REDIS_URL` | Workers | - | Valkey connection for the job queue, with its generated password. |
| `S3_REGION` | Workers | - | Railway bucket region. |
| `S3_ENDPOINT` | Workers | - | Railway bucket S3 endpoint. |
| `DATABASE_URL` | Workers | - | PostgreSQL connection over the private network. |
| `NEXTAUTH_URL` | Workers | - | Public URL used for login callbacks. Same as BASE_HOST. |
| `CLICKHOUSE_URL` | Workers | - | ClickHouse HTTP connection over the private network (traces, spans, analytics). |
| `INSTALL_METHOD` | Workers | docker | Install method reported by the app, as in upstream's Docker Compose file. |
| `S3_BUCKET_NAME` | Workers | - | Railway bucket for datasets and stored objects. |
| `NEXTAUTH_SECRET` | Workers | (secret) | Shared with the LangWatch service. |
| `S3_ACCESS_KEY_ID` | Workers | - | Railway bucket access key. |
| `NEXTAUTH_PROVIDER` | Workers | email | Login method. 'email' is email and password; set auth0, azure-ad, okta, cognito, onelogin or oidc (plus that provider's variables) for SSO. |
| `CREDENTIALS_SECRET` | Workers | (secret) | Shared with the LangWatch service, so the worker can decrypt stored secrets. |
| `LANGEVALS_ENDPOINT` | Workers | - | LangEvals evaluators and guardrails over the private network. |
| `LANGWATCH_ENDPOINT` | Workers | - | Private URL of the LangWatch server, used by the other services to call it back. |
| `DISABLE_USAGE_STATS` | Workers | true | Anonymous usage statistics are off. Remove this variable to send them to the LangWatch team. |
| `SKIP_ENV_VALIDATION` | Workers | true | Skips the build-time env schema check, as upstream's Docker Compose does. Runtime checks still apply. |
| `API_TOKEN_JWT_SECRET` | Workers | (secret) | Shared with the LangWatch service. |
| `S3_SECRET_ACCESS_KEY` | Workers | (secret) | Railway bucket secret key. |
| `LANGWATCH_NLP_SERVICE` | Workers | - | NLP engine (Optimization Studio, workflows, code evaluators) over the private network. |
| `LW_GATEWAY_JWT_SECRET` | Workers | (secret) | Shared with the LangWatch service. |
| `LW_VIRTUAL_KEY_PEPPER` | Workers | - | Shared with the LangWatch service. |
| `LW_GATEWAY_INTERNAL_SECRET` | Workers | (secret) | Shared with the LangWatch service. |
| `CLICKHOUSE_BACKUP_METRICS_ENABLED` | Workers | false | This ClickHouse has no backups configured, so system.backup_log does not exist; leaving collection on fails a query on every stats tick. |

## Configuration

- **Start command:** `bash -c 'for hp in $WAIT_FOR; do for i in $(seq 1 90); do (echo > /dev/tcp/${hp%:*}/${hp##*:}) 2>/dev/null && break; echo "waiting for $hp ($i/90)"; sleep 2; done; done; cd /app/platform/app && exec pnpm start'`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'exec valkey-server --requirepass "$REDIS_PASSWORD" --appendonly yes --maxmemory-policy noeviction --dir /data'`
- **Volume:** `/data`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `bash -c 'cd /app/platform/app && exec node --enable-source-maps dist/server/workers.cjs'`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/langwatch-llm-observability)
