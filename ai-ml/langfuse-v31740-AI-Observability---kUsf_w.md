# Deploy langfuse v3.174.0 (AI Observability) on Railway

Open-source LLM platform for prompt management, tracing, evals & metrics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kUsf_w)

## About

Langfuse is an open-source LLM engineering platform that helps teams collaboratively debug, analyze, and iterate on their LLM applications.

LLM Application Observability: Instrument your app and start ingesting traces to Langfuse, thereby tracking LLM calls and other relevant logic in your app such as retrieval, embedding, or agent actions. Inspect and debug complex logs and user sessions. Try the interactive demo to see this in action.

Prompt Management helps you centrally manage, version control, and collaboratively iterate on your prompts. Thanks to strong caching on server and client side, you can iterate on prompts without adding latency to your application.

Evaluations are key to the LLM application development workflow, and Langfuse adapts to your needs. It supports LLM-as-a-judge, user feedback collection, manual labeling, and custom evaluation pipelines via APIs/SDKs.

Datasets enable test sets and benchmarks for evaluating your LLM application. They support continuous improvement, pre-deployment testing, structured experiments, flexible evaluation, and seamless integration with frameworks like LangChain and LlamaIndex.

LLM Playground is a tool for testing and iterating on your prompts and model configurations, shortening the feedback loop and accelerating development. When you see a bad result in tracing, you can directly jump to the playground to iterate on it.

Comprehensive API: Langfuse is frequently used to power bespoke LLMOps workflows while using the building blocks provided by Langfuse via the API. OpenAPI spec, Postman collection, and typed SDKs for Python, JS/TS are available.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| clickhouse | `clickhouse/clickhouse-server:25.11` | Database |
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16.11` | Database |
| redis | `bitnami/redis:latest` | Database |
| langfuse-web | `langfuse/langfuse:3.174.0` | Web service |
| minio | `minio/minio` | Database |
| langfuse-worker | `langfuse/langfuse-worker:3.174.0` | Worker |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | clickhouse | 8123 |
| `PUBLIC_PORT` | clickhouse | 443 |
| `CLICKHOUSE_DB` | clickhouse | default |
| `INTERNAL_PORT` | clickhouse | 9000 |
| `CLICKHOUSE_USER` | clickhouse | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `POSTGRES_DB` | postgres | railway |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDISPORT` | redis | 6379 |
| `REDISUSER` | redis | default |
| `REDISPASSWORD` | redis | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `REDIS_RDB_POLICY` | redis | 3600#1 300#100 60#10000 |
| `REDIS_AOF_ENABLED` | redis | no |
| `ENCRYPTION_KEY` | langfuse-web | 0000000000000000000000000000000000000000000000000000000000000000 |
| `CLICKHOUSE_USER` | langfuse-web | (secret) |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | false |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | langfuse |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | events/ |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | us-east-1 |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | langfuse |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | media/ |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | us-east-1 |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_PRIVATE_PORT` | minio | 9000 |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `ENCRYPTION_KEY` | langfuse-worker | 0000000000000000000000000000000000000000000000000000000000000000 |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | langfuse |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | us-east-1 |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | langfuse |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | us-east-1 |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) |

## Configuration

- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c 'mkdir -p /data/langfuse && minio server --address ":9000" --console-address ":9001" /data'`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/kUsf_w)
