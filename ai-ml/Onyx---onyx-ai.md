# Deploy Onyx on Railway

AI chat and search over your company's documents and tools

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/onyx-ai)

## About

Onyx is an open-source AI platform that puts your company's own documents behind a chat box. It connects to Slack, Google Drive, Confluence, Jira, GitHub, Notion, Zendesk and forty more tools, pulls their contents into a hybrid keyword-plus-vector index, and answers questions with citations back to the source. Formerly Danswer, it serves support teams, engineers searching design docs, and sales teams mining call transcripts. Self-host Onyx and every document, embedding and transcript stays on infrastructure you control.

Deploy Onyx on Railway and the whole production shape comes up wired together. A Caddy edge proxy is the single public origin, routing `/api` to a FastAPI API server and everything else to the Next.js web server. Behind them: a Celery worker tier, two model servers that embed text with no external API, a single-node OpenSearch cluster, managed Postgres, managed Redis, and an object storage bucket for uploads. Nothing needs an API key to boot.

![Diagram of Onyx's nine Railway services and their connections](https://res.cloudinary.com/rroe4rtk/image/upload/v1788038873/onyx-architecture.png)

Onyx solves the problem every growing company hits: the answer exists, but it is in a Slack thread from March, a Confluence page nobody linked, and a PDF in someone's Drive. It crawls those sources on a schedule, chunks and embeds each document locally, and serves hybrid retrieval — BM25 keyword matching plus dense vector similarity — so exact terms and paraphrased questions both land on the right passage. Answers carry citations, and source permissions can be mirrored so nobody sees a document they could not open at the source.

- Forty first-party connectors, plus a web crawler and file upload
- Hybrid keyword and vector search with reranking, on a self-hosted embedding model
- Works with any LLM — OpenAI, Anthropic, Azure OpenAI, Bedrock, Ollama, vLLM
- Slack and Discord bots answering in-channel from the same index
- Custom agents with tool access, an MCP server, and API keys
- Document sets and per-connector access control

The split matters. The API server streams answers while the worker tier does the slow work — fetching, extracting, chunking, embedding, pruning — so a long Drive sync never blocks a chat. The model servers are separate on purpose: one serves query-time embeddings and reranking, the other embeds only during indexing, so a crawl cannot starve search.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| onyx-worker | [gridalpha/onyx-railway](https://github.com/gridalpha/onyx-railway) (root: worker) | Worker |
| Redis | `redis:8.2` | Database |
| onyx-web | [gridalpha/onyx-railway](https://github.com/gridalpha/onyx-railway) (root: web) | Worker |
| onyx-api | [gridalpha/onyx-railway](https://github.com/gridalpha/onyx-railway) (root: api) | Worker |
| onyx-indexing-model | [gridalpha/onyx-railway](https://github.com/gridalpha/onyx-railway) (root: model-server) | Worker |
| onyx-inference-model | [gridalpha/onyx-railway](https://github.com/gridalpha/onyx-railway) (root: model-server) | Worker |
| onyx-proxy | [gridalpha/onyx-railway](https://github.com/gridalpha/onyx-railway) (root: proxy) | Web service |
| onyx-opensearch | [gridalpha/onyx-railway](https://github.com/gridalpha/onyx-railway) (root: opensearch) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |
| `PORT` | onyx-worker | 8080 | Worker health endpoint port |
| `AUTH_TYPE` | onyx-worker | basic | Email and password sign-in |
| `LOG_LEVEL` | onyx-worker | info | Log verbosity across all workers |
| `REDIS_HOST` | onyx-worker | - | Private Redis hostname |
| `REDIS_PORT` | onyx-worker | - | Redis port |
| `WEB_DOMAIN` | onyx-worker | - | Public base URL for links |
| `POSTGRES_DB` | onyx-worker | - | Postgres database name |
| `POSTGRES_HOST` | onyx-worker | - | Private Postgres hostname |
| `POSTGRES_PORT` | onyx-worker | 5432 | Postgres port |
| `POSTGRES_USER` | onyx-worker | (secret) | Postgres role |
| `S3_VERIFY_SSL` | onyx-worker | true | Verify the bucket TLS certificate |
| `ONYX_IMAGE_TAG` | onyx-worker | v4.6.5 | Onyx version, same on all services |
| `REDIS_PASSWORD` | onyx-worker | (secret) | Redis auth password |
| `API_SERVER_HOST` | onyx-worker | - | Private API server hostname |
| `API_SERVER_PORT` | onyx-worker | 8080 | API server port |
| `AWS_REGION_NAME` | onyx-worker | - | Bucket region |
| `OPENSEARCH_HOST` | onyx-worker | - | Private OpenSearch hostname |
| `S3_ENDPOINT_URL` | onyx-worker | - | Bucket endpoint |
| `USER_AUTH_SECRET` | onyx-worker | (secret) | Must match the API server |
| `DISABLE_TELEMETRY` | onyx-worker | true | Do not send usage telemetry |
| `MODEL_SERVER_HOST` | onyx-worker | - | Query-time embedding server |
| `MODEL_SERVER_PORT` | onyx-worker | 9000 | Model server port |
| `POSTGRES_PASSWORD` | onyx-worker | (secret) | Postgres password |
| `FILE_STORE_BACKEND` | onyx-worker | s3 | Store uploads in object storage |
| `API_SERVER_PROTOCOL` | onyx-worker | http | Scheme used to reach the API server |
| `S3_AWS_ACCESS_KEY_ID` | onyx-worker | - | Bucket access key |
| `ENCRYPTION_KEY_SECRET` | onyx-worker | (secret) | Must match the API server |
| `OPENSEARCH_REST_API_PORT` | onyx-worker | 9200 | OpenSearch REST port |
| `S3_AWS_SECRET_ACCESS_KEY` | onyx-worker | (secret) | Bucket secret key |
| `OPENSEARCH_ADMIN_PASSWORD` | onyx-worker | (secret) | OpenSearch admin password |
| `S3_FILE_STORE_BUCKET_NAME` | onyx-worker | - | Bucket name |
| `INDEXING_MODEL_SERVER_HOST` | onyx-worker | - | Indexing embedding server |
| `CELERY_WORKER_LIGHT_CONCURRENCY` | onyx-worker | 4 | Parallel sync and cleanup jobs |
| `ENABLE_OPENSEARCH_RETRIEVAL_FOR_ONYX` | onyx-worker | true | Required or searches return nothing |
| `CELERY_WORKER_DOCFETCHING_CONCURRENCY` | onyx-worker | 1 | Parallel connector fetches |
| `CELERY_WORKER_DOCPROCESSING_CONCURRENCY` | onyx-worker | 2 | Parallel chunk and embed jobs |
| `ENABLE_PAID_ENTERPRISE_EDITION_FEATURES` | onyx-worker | false | Community Edition behaviour |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | onyx-web | 3000 | Next.js listening port |
| `HOSTNAME` | onyx-web | :: | Dual-stack bind for private networking |
| `WEB_DOMAIN` | onyx-web | - | Public base URL |
| `INTERNAL_URL` | onyx-web | - | Server-side API base URL |
| `NODE_OPTIONS` | onyx-web | --max-old-space-size=2048 | Node heap ceiling |
| `ONYX_IMAGE_TAG` | onyx-web | v4.6.5 | Onyx version, same on all services |
| `PORT` | onyx-api | 8080 | API listening port |
| `AUTH_TYPE` | onyx-api | basic | Email and password sign-in |
| `LOG_LEVEL` | onyx-api | info | Log verbosity across all processes |
| `REDIS_HOST` | onyx-api | - | Private Redis hostname |
| `REDIS_PORT` | onyx-api | - | Redis port |
| `WEB_DOMAIN` | onyx-api | - | Public base URL for redirects |
| `POSTGRES_DB` | onyx-api | - | Postgres database name |
| `POSTGRES_HOST` | onyx-api | - | Private Postgres hostname |
| `POSTGRES_PORT` | onyx-api | 5432 | Postgres port |
| `POSTGRES_USER` | onyx-api | (secret) | Postgres role |
| `S3_VERIFY_SSL` | onyx-api | true | Verify the bucket TLS certificate |
| `ONYX_IMAGE_TAG` | onyx-api | v4.6.5 | Onyx version, same on all services |
| `REDIS_PASSWORD` | onyx-api | (secret) | Redis auth password |
| `AWS_REGION_NAME` | onyx-api | - | Bucket region |
| `OPENSEARCH_HOST` | onyx-api | - | Private OpenSearch hostname |
| `S3_ENDPOINT_URL` | onyx-api | - | Bucket endpoint |
| `USER_AUTH_SECRET` | onyx-api | (secret) | Signs sessions and reset links |
| `DISABLE_TELEMETRY` | onyx-api | true | Do not send usage telemetry |
| `MODEL_SERVER_HOST` | onyx-api | - | Query-time embedding server |
| `MODEL_SERVER_PORT` | onyx-api | 9000 | Model server port |
| `POSTGRES_PASSWORD` | onyx-api | (secret) | Postgres password |
| `FILE_STORE_BACKEND` | onyx-api | s3 | Store uploads in object storage |
| `S3_AWS_ACCESS_KEY_ID` | onyx-api | - | Bucket access key |
| `ENCRYPTION_KEY_SECRET` | onyx-api | (secret) | Encrypts stored connector credentials |
| `OPENSEARCH_REST_API_PORT` | onyx-api | 9200 | OpenSearch REST port |
| `S3_AWS_SECRET_ACCESS_KEY` | onyx-api | (secret) | Bucket secret key |
| `OPENSEARCH_ADMIN_PASSWORD` | onyx-api | (secret) | OpenSearch admin password |
| `S3_FILE_STORE_BUCKET_NAME` | onyx-api | - | Bucket name |
| `INDEXING_MODEL_SERVER_HOST` | onyx-api | - | Indexing embedding server |
| `POSTGRES_API_SERVER_POOL_SIZE` | onyx-api | 20 | Pool size, twenty warmed at boot |
| `POSTGRES_API_SERVER_POOL_OVERFLOW` | onyx-api | 10 | Pool overflow above the base size |
| `ENABLE_OPENSEARCH_RETRIEVAL_FOR_ONYX` | onyx-api | true | Required or searches return nothing |
| `ENABLE_PAID_ENTERPRISE_EDITION_FEATURES` | onyx-api | false | Community Edition behaviour |
| `POSTGRES_API_SERVER_READ_ONLY_POOL_SIZE` | onyx-api | 5 | Read-only pool size |
| `POSTGRES_API_SERVER_READ_ONLY_POOL_OVERFLOW` | onyx-api | 2 | Read-only pool overflow |
| `PORT` | onyx-indexing-model | 9000 | Model server listening port |
| `LOG_LEVEL` | onyx-indexing-model | info | Log verbosity |
| `INDEXING_ONLY` | onyx-indexing-model | True | Serve indexing embeddings only |
| `ONYX_IMAGE_TAG` | onyx-indexing-model | v4.6.5 | Onyx version, same on all services |
| `DISABLE_TELEMETRY` | onyx-indexing-model | true | Do not send usage telemetry |
| `MODEL_SERVER_PORT` | onyx-indexing-model | 9000 | Port the app binds and reports |
| `PORT` | onyx-inference-model | 9000 | Model server listening port |
| `LOG_LEVEL` | onyx-inference-model | info | Log verbosity |
| `ONYX_IMAGE_TAG` | onyx-inference-model | v4.6.5 | Onyx version, same on all services |
| `DISABLE_TELEMETRY` | onyx-inference-model | true | Do not send usage telemetry |
| `MODEL_SERVER_PORT` | onyx-inference-model | 9000 | Port the app binds and reports |
| `PORT` | onyx-proxy | 8080 | Public HTTP listening port |
| `ONYX_API_HOST` | onyx-proxy | - | API upstream for /api routes |
| `ONYX_WEB_HOST` | onyx-proxy | - | Web upstream for all other routes |
| `node.name` | onyx-opensearch | onyx-opensearch | Node name |
| `cluster.name` | onyx-opensearch | onyx | Cluster name |
| `OPENSEARCH_JAVA_OPTS` | onyx-opensearch | -Xms2g -Xmx2g | JVM heap, about half the container limit |
| `OPENSEARCH_INITIAL_ADMIN_PASSWORD` | onyx-opensearch | (secret) | Admin password, complexity enforced |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/opensearch/data`

**Category:** AI/ML · **Languages:** Python, Shell, Dockerfile, JavaScript

[View on Railway →](https://railway.com/deploy/onyx-ai)
