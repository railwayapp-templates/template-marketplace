# Deploy Langflow v1 AI Agent Builder on Railway

Build agents, RAG pipelines and MCP servers visually, backed by Postgres.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow-v1-ai-agent-builder)

## About

Langflow is an open-source visual builder for AI agents, RAG pipelines and MCP servers. You connect components on a canvas, test them in a playground and serve every flow as an API or MCP tool. This community template runs a pinned Langflow release with Postgres, Redis and persistent storage.

Langflow is a Python application that serves its editor, REST API and MCP endpoints from one process. For a team deployment it needs a real database instead of SQLite, a persistent configuration directory for uploaded files, knowledge bases and logs, a stable encryption key for stored credentials, and a login-protected admin account. Running more than one worker also requires a shared job queue, otherwise editor builds can land on the wrong worker. This template provides all of that on Railway: Postgres for flows and users, Redis for the job queue and rate limits, a volume for the config directory, and generated admin credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| Langflow | `langflowai/langflow:1.12.5` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `PORT` | Langflow | 7860 | Port Railway routes the public domain to. |
| `LANGFLOW_HOST` | Langflow | 0.0.0.0 | Bind address (Langflow's port check only supports IPv4 literals). |
| `LANGFLOW_PORT` | Langflow | - | Langflow listen port. |
| `LANGFLOW_WORKERS` | Langflow | 2 | Gunicorn worker processes. Safe above 1 because the job queue is in Redis. |
| `LANGFLOW_LOG_LEVEL` | Langflow | info | Log level (debug, info, warning, error). |
| `LANGFLOW_SUPERUSER` | Langflow | admin | Admin username created on first boot. |
| `LANGFLOW_AUTO_LOGIN` | Langflow | (secret) | Require login (multi-user mode). |
| `LANGFLOW_CONFIG_DIR` | Langflow | /app/langflow | Config dir on the volume: uploaded files, logs, MCP/Composer state. |
| `LANGFLOW_SECRET_KEY` | Langflow | (secret) | Encryption key for stored credentials/API keys and JWT signing. Never change after first boot. |
| `LANGFLOW_CORS_ORIGINS` | Langflow | - | Allowed browser origins. Add sites that embed the Langflow chat widget (comma-separated). |
| `LANGFLOW_DATABASE_URL` | Langflow | - | Postgres connection (converted to the async psycopg driver by Langflow). |
| `LANGFLOW_DO_NOT_TRACK` | Langflow | true | Disable anonymous product telemetry. |
| `LANGFLOW_MCP_BASE_URL` | Langflow | - | Public origin used in the MCP server URLs Langflow shows for projects. |
| `LANGFLOW_JOB_QUEUE_TYPE` | Langflow | redis | Shared build/job queue so any worker can serve any flow run. |
| `LANGFLOW_WORKER_TIMEOUT` | Langflow | 300 | Worker timeout in seconds. |
| `LANGFLOW_REDIS_QUEUE_URL` | Langflow | - | Redis URL for the job queue (DB 1, authenticated). |
| `LANGFLOW_FS_TOOL_BASE_DIR` | Langflow | /app/langflow/fs_tool | File System component sandbox on the volume. |
| `LANGFLOW_NEW_USER_IS_ACTIVE` | Langflow | false | New sign-ups stay inactive until an admin activates them. |
| `LANGFLOW_SUPERUSER_PASSWORD` | Langflow | (secret) | Admin password (generated). Read it here to sign in. |
| `LANGFLOW_KNOWLEDGE_BASES_DIR` | Langflow | /app/langflow/knowledge_bases | Knowledge bases on the volume (default ~/.langflow is outside it). |
| `LANGFLOW_ALEMBIC_LOG_TO_STDOUT` | Langflow | true | Show database migration logs in Railway logs. |
| `LANGFLOW_DB_CONNECTION_SETTINGS` | Langflow | {"pool_size": 10, "max_overflow": 10, "pool_timeout": 30, "pool_pre_ping": true, "pool_recycle": 1800, "echo": false} | SQLAlchemy pool per worker, sized for Postgres' 100-connection limit. |
| `LANGFLOW_RATE_LIMIT_STORAGE_URI` | Langflow | - | Shared login/public-flow rate-limit counters (DB 2). |
| `LANGFLOW_RATE_LIMIT_TRUST_PROXY` | Langflow | true | Use X-Forwarded-For from Railway's proxy so limits apply per client, not per proxy. |
| `LANGFLOW_DATABASE_CONNECTION_RETRY` | Langflow | true | Retry the DB connection while Postgres is still starting. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health_check`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/langflow`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Tags:** langflow, agents, rag, mcp, llm

[View on Railway →](https://railway.com/deploy/langflow-v1-ai-agent-builder)
