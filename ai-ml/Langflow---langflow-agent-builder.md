# Deploy Langflow on Railway

Visual canvas for building AI agents and LLM workflows

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/langflow-agent-builder)

## About

Langflow is an open-source visual builder for AI agents and LLM workflows. You drag components onto a canvas — chat inputs, prompt templates, language models, vector stores, web search, custom Python — wire them together, and test the result in a built-in playground. Every flow is also an API: Langflow serves it over HTTP and as an MCP server, so what you prototyped visually is what your application calls. It is Python, MIT-licensed, and used by teams building RAG pipelines, document Q&A bots and research agents.

Deploy Langflow on Railway and you get the production shape, not the laptop one. Three services: **Langflow** on a public HTTPS domain, a **PostgreSQL** database for flows, users, chat history and API keys, and **Redis** backing the component cache and the cross-worker build-event queue. Langflow runs two worker processes in one container, which is why Redis is here — on the default in-memory queue it refuses to start with more than one worker. A volume holds uploads, knowledge bases and the encryption key. Authentication is on, sign-up is off, CORS is pinned to your domain.

![Diagram of the Langflow, Postgres and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787595007/langflow-architecture.png)

Langflow sits between a notebook and a framework. Hand-written agent code means a redeploy for every prompt tweak; a closed SaaS builder puts your prompts, keys and customer documents on someone else's infrastructure. Self-hosting keeps both the iteration loop and the data.

- Visual canvas with 100+ components: models, embeddings, vector stores, web search, file loaders, memory, routing and loops
- Every flow is instantly an HTTP API and an MCP server, so the agents you build are callable by other agents
- Custom Python components, editable in the browser, for anything the built-ins miss
- Encrypted global variables for provider keys, and knowledge bases for retrieval over your documents

Langflow is the only service with a public domain, serving the React front end and the FastAPI backend on one port. PostgreSQL is the system of record for flows, users, message history, API keys and job state; version 15 or newer is required. Redis does two jobs: database 0 caches component and graph state so both workers share it, database 1 carries build events between them. The volume at `/app/langflow` holds uploads, knowledge base indexes, and the key encrypting your credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Langflow | [gridalpha/langflow-railway](https://github.com/gridalpha/langflow-railway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Langflow | 7860 | Port Railway health-checks |
| `LANGFLOW_HOST` | Langflow | 0.0.0.0 | Bind address inside the container |
| `LANGFLOW_PORT` | Langflow | 7860 | HTTP listener port |
| `LANGFLOW_WORKERS` | Langflow | 2 | Gunicorn worker processes |
| `LANGFLOW_LOG_LEVEL` | Langflow | info | Application log verbosity |
| `LANGFLOW_POOL_SIZE` | Langflow | 10 | SQLAlchemy pool size per worker |
| `LANGFLOW_REDIS_URL` | Langflow | - | Cache connection, database 0 |
| `LANGFLOW_SUPERUSER` | Langflow | admin | First admin username |
| `LANGFLOW_AUTO_LOGIN` | Langflow | (secret) | Require a login |
| `LANGFLOW_CACHE_TYPE` | Langflow | redis | Share the cache across workers |
| `LANGFLOW_CONFIG_DIR` | Langflow | /app/langflow | Volume path for files and keys |
| `LANGFLOW_SECRET_KEY` | Langflow | (secret) | Session and credential encryption key |
| `LANGFLOW_CORS_ORIGINS` | Langflow | - | Allowed browser origins |
| `LANGFLOW_DATABASE_URL` | Langflow | - | Postgres connection string |
| `LANGFLOW_MAX_OVERFLOW` | Langflow | 10 | Extra connections per worker |
| `LANGFLOW_ACCESS_SECURE` | Langflow | true | Secure flag on the access cookie |
| `LANGFLOW_ENABLE_SIGNUP` | Langflow | false | Disable public registration |
| `LANGFLOW_JOB_QUEUE_TYPE` | Langflow | redis | Required for multiple workers |
| `LANGFLOW_REFRESH_SECURE` | Langflow | true | Secure flag on the refresh cookie |
| `LANGFLOW_REDIS_QUEUE_URL` | Langflow | - | Build-event queue, database 1 |
| `LANGFLOW_FS_TOOL_BASE_DIR` | Langflow | /app/langflow/fs_tool/fs_sandbox | File component sandbox on the volume |
| `LANGFLOW_SUPERUSER_PASSWORD` | Langflow | (secret) | First admin password, created once |
| `LANGFLOW_KNOWLEDGE_BASES_DIR` | Langflow | /app/langflow/knowledge_bases | Knowledge base storage on the volume |
| `LANGFLOW_ALEMBIC_LOG_TO_STDOUT` | Langflow | true | Send migration output to the logs |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/langflow`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/langflow-agent-builder)
