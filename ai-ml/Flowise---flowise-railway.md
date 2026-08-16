# Deploy Flowise on Railway

AI agent builder. Visual LLM app & AI agent builder [with Worker]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flowise-railway)

## About

Flowise is an open-source visual builder for LLM applications and AI agents. Instead of wiring LangChain calls together in code, you drag nodes onto a canvas — a chat model, a retriever, a vector store, a memory buffer, a tool — connect them, and Flowise turns the result into a working chatbot, a RAG pipeline or a multi-step agent. Every flow is immediately available as an embeddable widget and a REST endpoint with its own API key.

This template runs Flowise in **queue mode**, the configuration its maintainers document for production rather than the single-container quick start. Five pieces come wired together: the **Flowise** app serving the canvas and public API, a dedicated **Flowise Worker** executing predictions, **PostgreSQL** for flows and chat history, **Redis** carrying the job queue and streaming event bus, and a **Railway object storage bucket** for uploads. A chat request is enqueued in Redis and streamed back while the worker runs the flow, so ingestion never blocks the interface.

![Flowise Railway architecture](https://res.cloudinary.com/rroe4rtk/image/upload/v1786823686/ba2b0906-981f-49ce-b440-d7d586f50aa5.png)

Flowise sits between raw framework code and a closed SaaS agent builder, shipping 100+ nodes on a canvas non-specialists can read. Self-hosting matters more here than for most tools: the data crossing an instance is your prompts, your documents and your provider API keys.

Key capabilities:

- Visual canvas for chatflows, agentflows and multi-agent systems
- OpenAI, Anthropic, Mistral, Groq, Ollama, Pinecone, Qdrant, Faiss and more
- Every flow exposed as a REST API, embeddable widget or MCP endpoint
- Document Stores with chunking, embedding and retrieval built in
- Workspaces, roles and per-flow API keys

One thing to weigh first: FlowiseAI wound the project down in 2026. Version **3.1.4** is the final core-team release and the repository is archived, so no further official patches are expected. The code stays Apache-2.0 and fully functional, and this template deploys that final release — itself the security-hardening one — but for multi-year use, track a community fork.

The **app** serves the canvas and public API and never executes a flow itself here; the **worker** runs three BullMQ consumers (prediction, upsertion, schedule) and is what calls the providers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flowise-worker | `flowiseai/flowise-worker:3.1.4` | Worker |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| flowise | `flowiseai/flowise:3.1.4` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODE` | flowise-worker | queue | Runs as queue consumer |
| `PORT` | flowise-worker | 5566 | Health check port for platform probe |
| `APP_URL` | flowise-worker | - | Public app URL |
| `LOG_LEVEL` | flowise-worker | info | Application log verbosity |
| `QUEUE_NAME` | flowise-worker | flowise-queue | Must match app queue name |
| `REDIS_HOST` | flowise-worker | - | Redis private hostname |
| `REDIS_PORT` | flowise-worker | - | Redis port |
| `WORKER_PORT` | flowise-worker | 5566 | Worker health server port |
| `NODE_OPTIONS` | flowise-worker | --max-old-space-size=4096 | Node heap ceiling for container |
| `STORAGE_TYPE` | flowise-worker | s3 | Store uploads in object storage |
| `DATABASE_HOST` | flowise-worker | - | Postgres private hostname |
| `DATABASE_NAME` | flowise-worker | - | Postgres database name |
| `DATABASE_PORT` | flowise-worker | - | Postgres port |
| `DATABASE_TYPE` | flowise-worker | postgres | Database driver selection |
| `DATABASE_USER` | flowise-worker | (secret) | Postgres username |
| `REDIS_PASSWORD` | flowise-worker | (secret) | Redis password |
| `REDIS_USERNAME` | flowise-worker | (secret) | Redis username |
| `SECURE_COOKIES` | flowise-worker | true | Marks cookies secure behind HTTPS |
| `S3_ENDPOINT_URL` | flowise-worker | - | Bucket S3 endpoint |
| `DATABASE_PASSWORD` | flowise-worker | (secret) | Postgres password |
| `S3_STORAGE_REGION` | flowise-worker | - | Bucket region |
| `TOKEN_HASH_SECRET` | flowise-worker | (secret) | Shared token hash secret |
| `S3_FORCE_PATH_STYLE` | flowise-worker | true | Path-style bucket addressing |
| `JWT_AUTH_TOKEN_SECRET` | flowise-worker | (secret) | Shared auth token secret |
| `EXPRESS_SESSION_SECRET` | flowise-worker | (secret) | Shared session secret |
| `S3_STORAGE_BUCKET_NAME` | flowise-worker | - | Bucket name |
| `FLOWISE_FILE_SIZE_LIMIT` | flowise-worker | 50mb | Maximum request body size |
| `JWT_REFRESH_TOKEN_SECRET` | flowise-worker | (secret) | Shared refresh token secret |
| `S3_STORAGE_ACCESS_KEY_ID` | flowise-worker | - | Bucket access key |
| `DISABLE_FLOWISE_TELEMETRY` | flowise-worker | true | Disables anonymous usage reporting |
| `FLOWISE_SECRETKEY_OVERWRITE` | flowise-worker | (secret) | Shared credential encryption key |
| `S3_STORAGE_SECRET_ACCESS_KEY` | flowise-worker | (secret) | Bucket secret key |
| `REDISHOST` | Redis | - | Private hostname, reachable only inside the project |
| `REDISPORT` | Redis | 6379 | Standard Redis port |
| `REDISUSER` | Redis | default | Default ACL user created on first boot |
| `REDIS_URL` | Redis | - | Private connection string, use this from other services |
| `REDISPASSWORD` | Redis | (secret) | Convenience alias of the generated password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated password for the default user |
| `POSTGRES_DB` | Postgres | rRAILWAY_PRIVATE_DOMAINailway | Default database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string, use this from other services |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated superuser password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public connection string over the TCP proxy, for external tools |
| `MODE` | flowise | queue | Enables app plus worker split |
| `PORT` | flowise | 3000 | HTTP server listening port |
| `APP_URL` | flowise | - | Public-facing app URL |
| `LOG_LEVEL` | flowise | info | Application log verbosity |
| `QUEUE_NAME` | flowise | flowise-queue | BullMQ queue name prefix |
| `REDIS_HOST` | flowise | - | Redis private hostname |
| `REDIS_PORT` | flowise | - | Redis port |
| `NODE_OPTIONS` | flowise | --max-old-space-size=4096 | Node heap ceiling for container |
| `STORAGE_TYPE` | flowise | s3 | Store uploads in object storage |
| `DATABASE_HOST` | flowise | - | Postgres private hostname |
| `DATABASE_NAME` | flowise | - | Postgres database name |
| `DATABASE_PORT` | flowise | - | Postgres port |
| `DATABASE_TYPE` | flowise | postgres | Database driver selection |
| `DATABASE_USER` | flowise | (secret) | Postgres username |
| `REDIS_PASSWORD` | flowise | (secret) | Redis password |
| `REDIS_USERNAME` | flowise | (secret) | Redis username |
| `SECURE_COOKIES` | flowise | true | Marks cookies secure behind HTTPS |
| `S3_ENDPOINT_URL` | flowise | - | Bucket S3 endpoint |
| `DATABASE_PASSWORD` | flowise | (secret) | Postgres password |
| `S3_STORAGE_REGION` | flowise | - | Bucket region |
| `TOKEN_HASH_SECRET` | flowise | (secret) | Hashes issued API tokens |
| `S3_FORCE_PATH_STYLE` | flowise | true | Path-style bucket addressing |
| `JWT_AUTH_TOKEN_SECRET` | flowise | (secret) | Signs authentication tokens |
| `EXPRESS_SESSION_SECRET` | flowise | (secret) | Signs session cookies |
| `S3_STORAGE_BUCKET_NAME` | flowise | - | Bucket name |
| `FLOWISE_FILE_SIZE_LIMIT` | flowise | 50mb | Maximum request body size |
| `JWT_REFRESH_TOKEN_SECRET` | flowise | (secret) | Signs refresh tokens |
| `S3_STORAGE_ACCESS_KEY_ID` | flowise | - | Bucket access key |
| `DISABLE_FLOWISE_TELEMETRY` | flowise | true | Disables anonymous usage reporting |
| `FLOWISE_SECRETKEY_OVERWRITE` | flowise | (secret) | Encrypts stored provider credentials |
| `S3_STORAGE_SECRET_ACCESS_KEY` | flowise | (secret) | Bucket secret key |

## Configuration

- **Healthcheck:** `/healthz`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/api/v1/ping`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/flowise-railway)
