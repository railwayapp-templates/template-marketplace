# Deploy Opik | Open-Source LLM Evaluation, Tracing & Observability on Railway

Trace, evaluate and monitor LLM apps and agents, behind basic auth

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opik-llm)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/opik-llm?referralCode=sLjDXb&amp;utm_medium=integration&amp;utm_source=button&amp;utm_campaign=opik-llm)

[Opik](https://www.comet.com/docs/opik/) is Comet's open-source (Apache-2.0) platform for tracing, evaluating and monitoring LLM applications and agents. It records every prompt, model call, retrieval and tool step as a trace, scores traces with LLM-as-a-judge metrics, and keeps the datasets, experiments and prompt versions you test against. This template runs the official Opik images with ClickHouse, MySQL, Redis and MinIO, and puts the whole site behind basic auth, because self-hosted Opik has no login of its own.

The stack is six services. Only **Opik** has a public domain; everything else talks over Railway's private network.

- **Opik**: the official `opik-frontend` image (nginx and the React UI) plus the server block upstream's compose mounts from disk. It proxies `/api` to the backend and enforces basic auth on everything except `/health`.
- **Backend**: the official Java API, pinned to 2.2.96. Every boot runs the MySQL and ClickHouse migrations first, and Railway only switches traffic once `/health-check` passes, so upgrading is bumping the image tag.
- **ClickHouse**: stores traces, spans and feedback scores. Opik's schema uses replicated tables and cluster-wide DDL, which need a coordination service even on one node. Upstream runs a separate ZooKeeper for this; here ClickHouse Keeper runs embedded in the ClickHouse server, which saves a service and a 512 MB JVM. ClickHouse logs to the console, its own metric tables are off, and its allocator does not use transparent huge pages (with them, idle ClickHouse on Railway grew past 1.9 GB within half an hour).
- **MySQL 8.4**: projects, datasets, prompts, experiments and settings.
- **Redis 8**: locks, caches and the online-evaluation streams, with an append-only file on a volume.
- **MinIO** (the maintained `pgsty/silo` build): attachments, including large images and payloads the backend strips out of traces. The bucket is created on boot, and uploads and downloads go through the backend, so object storage never needs a public URL.

Every password, plus Opik's encryption key for saved LLM provider keys, is generated per deployment. Upstream's defaults for these are public.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:8.4.2` | Database |
| MinIO | `pgsty/silo:RELEASE.2026-08-06T00-00-00Z` | Database |
| Redis | `redis:8.10.2-alpine` | Database |
| Opik | [two-workspaces/opik](https://github.com/two-workspaces/opik) (root: /frontend) | Web service |
| ClickHouse | [two-workspaces/opik](https://github.com/two-workspaces/opik) (root: /clickhouse) | Database |
| Backend | `ghcr.io/comet-ml/opik/opik-backend:2.2.96` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQL_USER` | MySQL | (secret) | Application user created on first boot |
| `MYSQL_DATABASE` | MySQL | opik | Database created on first boot |
| `MYSQL_PASSWORD` | MySQL | (secret) | Auto-generated application password |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Auto-generated MySQL root password |
| `MINIO_BUCKET` | MinIO | opik | Bucket for trace attachments, created on boot |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO access key |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Auto-generated MinIO secret key |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `PORT` | Opik | 5173 | Port nginx listens on - leave as is |
| `NGINX_PORT` | Opik | 5173 | Port nginx listens on - must match PORT |
| `OPIK_AUTH_USER` | Opik | (secret) | Basic-auth username for the Opik UI. Self-hosted Opik has no login of its own, so this gate is the only thing between the internet and your traces |
| `OPIK_AUTH_PASSWORD` | Opik | (secret) | Basic-auth password for the UI, and the API key for the SDK (OPIK_API_KEY=<this value>). Emptying it makes Opik open to anyone with the URL |
| `OPIK_BACKEND_ADDRESS` | Opik | - | Backend API on the private network; nginx re-resolves it while running so backend redeploys never leave a stale address |
| `CLICKHOUSE_DB` | ClickHouse | opik | ClickHouse database |
| `CLICKHOUSE_USER` | ClickHouse | (secret) | ClickHouse user |
| `CLICKHOUSE_PASSWORD` | ClickHouse | (secret) | Auto-generated ClickHouse password |
| `PORT` | Backend | 8080 | Port the Opik API listens on - leave as is |
| `S3_URL` | Backend | - | MinIO on the private network |
| `IS_MINIO` | Backend | true | Attachments go through the backend to the S3-compatible MinIO service, so object storage never needs a public URL |
| `JAVA_OPTS` | Backend | -Dliquibase.propertySubstitutionEnabled=true -XX:+UseG1GC -Xmx768m | JVM flags. -Xmx caps the heap (upstream sizes it from the container limit, which on Railway is the whole plan); raise it for heavy ingestion. The Liquibase flag is required |
| `REDIS_URL` | Backend | - | Redis (locks, caches, online-scoring streams) on the private network |
| `S3_BUCKET` | Backend | - | Attachment bucket (created by the MinIO service on boot) |
| `STATE_DB_URL` | Backend | - | MySQL (projects, datasets, prompts, experiments) on the private network |
| `STATE_DB_PASS` | Backend | - | MySQL password |
| `STATE_DB_USER` | Backend | (secret) | MySQL user |
| `ANALYTICS_DB_HOST` | Backend | - | ClickHouse (traces, spans, feedback scores) on the private network |
| `ANALYTICS_DB_PASS` | Backend | - | ClickHouse password |
| `ANALYTICS_DB_PORT` | Backend | 8123 | ClickHouse HTTP port |
| `AWS_ACCESS_KEY_ID` | Backend | - | MinIO access key |
| `STATE_DB_PROTOCOL` | Backend | jdbc:mysql:// | JDBC scheme for the state database |
| `OPIK_ENCRYPTION_KEY` | Backend | - | Encrypts the LLM provider API keys you save in Opik (AES, must be 16, 24 or 32 characters). Upstream's default is public - never change it after saving keys |
| `ANALYTICS_DB_PROTOCOL` | Backend | HTTP | ClickHouse client protocol |
| `ANALYTICS_DB_USERNAME` | Backend | (secret) | ClickHouse user |
| `AWS_SECRET_ACCESS_KEY` | Backend | (secret) | MinIO secret key |
| `STATE_DB_DATABASE_NAME` | Backend | - | MySQL database |
| `TOGGLE_DEMO_DATA_ENABLED` | Backend | false | The demo-data generator also runs in python-backend; off so the UI does not wait for it |
| `OPIK_USAGE_REPORT_ENABLED` | Backend | false | Anonymous usage reports to Comet (upstream default is on) |
| `ANALYTICS_DB_DATABASE_NAME` | Backend | - | ClickHouse database |
| `ANALYTICS_DB_MIGRATIONS_URL` | Backend | - | ClickHouse for the schema migrations that run on every boot |
| `ANALYTICS_DB_MIGRATIONS_PASS` | Backend | - | ClickHouse password |
| `ANALYTICS_DB_MIGRATIONS_USER` | Backend | (secret) | ClickHouse user |
| `TOGGLE_WELCOME_WIZARD_ENABLED` | Backend | true | Show the first-run welcome dialog |
| `TOGGLE_PYTHON_EVALUATOR_ENABLED` | Backend | false | Python code metrics need upstream's separate python-backend service, which this template leaves out to save RAM. LLM-as-a-judge metrics work |
| `LLM_PROVIDER_TOKEN_AUTH_DESTINATION_GUARD` | Backend | (secret) | Lets custom LLM providers point at private gateways, as in upstream's self-host compose |
| `TOGGLE_TRACE_THREAD_PYTHON_EVALUATOR_ENABLED` | Backend | false | Same as TOGGLE_PYTHON_EVALUATOR_ENABLED, for thread-level rules |
| `TOGGLE_SPAN_USER_DEFINED_METRIC_PYTHON_ENABLED` | Backend | false | Same as TOGGLE_PYTHON_EVALUATOR_ENABLED, for span-level rules |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --datadir=/var/lib/mysql/data --skip-log-bin --performance-schema=OFF`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/bash -c "(until mc alias set local http://127.0.0.1:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD >/dev/null 2>&1; do sleep 1; done; mc mb --ignore-existing local/$MINIO_BUCKET) & exec /usr/bin/docker-entrypoint.sh server /data --address :9000 --console-address :9001"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes"`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/bash -c "until curl -sf http://$ANALYTICS_DB_HOST:$ANALYTICS_DB_PORT/ping >/dev/null && (: </dev/tcp/${STATE_DB_URL%%:*}/3306) 2>/dev/null; do echo Waiting for MySQL and ClickHouse; sleep 2; done; ./run_db_migrations.sh && exec java $JAVA_OPTS -jar opik-backend-$OPIK_VERSION.jar server config.yml"`
- **Healthcheck:** `/health-check`

**Category:** Observability · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/opik-llm)
