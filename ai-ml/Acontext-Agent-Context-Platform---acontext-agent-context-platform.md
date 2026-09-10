# Deploy Acontext Agent Context Platform on Railway

Agent context management with sessions, queues and object storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/acontext-agent-context-platform)

## About

Agent context management with sessions, queues and object storage.

**Deployment template.** Deployment incurs Railway charges. Supply your own required model, search and external-service credentials; no example provider credentials are included.

This template provisions 9 services in one Railway project, with image digests or upstream source revisions pinned, generated internal credentials, linked environment variables and the persistent paths listed below. Public HTTP routes use Railway HTTPS. SQL and internal dependency endpoints stay private. Keep stateful services single-replica and configure your own backup policy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rabbitmq | `rabbitmq:4-management@sha256:ffd1b50c522ad20172ffd6716a2f41db375c7269560c8f3fb9a694e210ef0852` | Database |
| acontext | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| postgres | `pgvector/pgvector:pg16@sha256:ccc6e83d6e35e931dc7c5def2022729d5a6c370318d099181995567ff1fb4d6b` | Database |
| ui | `ghcr.io/memodb-io/acontext-ui:latest@sha256:b303d1f1894bbe356e4f70483c06a7bfe9c38bcf46a5fff5de2d8826e87ef436` | Worker |
| api | `ghcr.io/memodb-io/acontext-api:latest@sha256:e6e6b4a15999db7447fc9e460b4e18400c742e1bf1989d9bc29abd030ccd9341` | Web service |
| storage | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Web service |
| jaeger | `jaegertracing/all-in-one:1.75.0@sha256:e493bff54e457ba5827f82418d744a322165cd5d46146607fb76489bfb2a8885` | Worker |
| core | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: main) | Worker |
| redis | `redis:7.4@sha256:71da9275c5f3fcb97d0fa0c8c5b36cc995327265420f17a04bfd544f458059f7` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RABBITMQ_NODENAME` | rabbitmq | rabbit@localhost | Stable RabbitMQ node identity for persisted queue data. Keep rabbit@localhost across redeployments. |
| `RABBITMQ_DEFAULT_PASS` | rabbitmq | - | Generated RabbitMQ password. Preserve it with the persistent broker data. |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) | RabbitMQ user created on first initialization. Keep aligned with the NuQ connection URL. |
| `RABBITMQ_DEFAULT_VHOST` | rabbitmq | / | Rabbitmq default vhost for rabbitmq. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `PORT` | acontext | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `ACCESS_USER` | acontext | (secret) | Access user for acontext. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `UPSTREAM_HOST` | acontext | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | acontext | 3000 | Upstream port for acontext. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | acontext | (secret) | Generated access password. Keep private and preserve with backups. |
| `POSTGRES_DB` | postgres | acontext | Initial PostgreSQL database name, or the matching database selected by the application. |
| `DATABASE_URL` | postgres | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `POSTGRES_USER` | postgres | (secret) | PostgreSQL initialization user, or the matching connection user for the private database. |
| `POSTGRES_PASSWORD` | postgres | (secret) | PostgreSQL password. Generated for the database and referenced by dependent services; keep private. |
| `PORT` | ui | 3000 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `HOSTNAME` | ui | 0.0.0.0 | Application bind address. Keep 0.0.0.0 for container networking. |
| `NODE_ENV` | ui | production | Node.js runtime mode. Keep production for hosted deployments. |
| `DATABASE_URL` | ui | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `API_SERVER_URL` | ui | - | Api server url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ROOT_SECRET_PEPPER` | ui | (secret) | Root secret pepper resolved automatically from the linked service. Keep this reference when using the included topology. |
| `JAEGER_INTERNAL_URL` | ui | - | Jaeger internal url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `NEXT_PUBLIC_BASE_URL` | ui | - | Next public base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `NEXT_PUBLIC_BASE_PATH` | ui | - | Next public base path for ui. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ROOT_API_BEARER_TOKEN` | ui | (secret) | Root api bearer token resolved automatically from the linked service. Keep this reference when using the included topology. |
| `APP_ENV` | api | release | App env for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_BUCKET` | api | acontext-assets | S3 bucket for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_REGION` | api | us-east-1 | S3 region for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_HOST` | api | - | Private Redis/Valkey hostname supplied by the redis service reference. |
| `S3_ENDPOINT` | api | - | S3 endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `CORE_BASE_URL` | api | - | Core base url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DATABASE_HOST` | api | - | Database host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DATABASE_NAME` | api | acontext | Database name for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `DATABASE_USER` | api | (secret) | Database user for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `RABBITMQ_HOST` | api | - | Rabbitmq host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `RABBITMQ_USER` | api | (secret) | Rabbitmq user for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_ACCESS_KEY` | api | - | S3 access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `S3_SECRET_KEY` | api | (secret) | S3 secret key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `RABBITMQ_VHOST` | api | / | Rabbitmq vhost for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_PASSWORD` | api | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |
| `API_EXPORT_PORT` | api | 8029 | Api export port for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `APP_EXTERNALURL` | api | - | App externalurl resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DATABASE_PASSWORD` | api | (secret) | Database password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `RABBITMQ_PASSWORD` | api | (secret) | Rabbitmq password resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_EXPORT_PORT` | api | 6379 | Redis export port for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ROOT_SECRET_PEPPER` | api | (secret) | Generated root secret pepper. Keep private and preserve with backups. |
| `DATABASE_EXPORT_PORT` | api | 5432 | Database export port for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `RABBITMQ_EXPORT_PORT` | api | 5672 | Rabbitmq export port for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_INTERNAL_ENDPOINT` | api | - | S3 internal endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ROOT_API_BEARER_TOKEN` | api | (secret) | Generated root api bearer token. Keep private and preserve with backups. |
| `RABBITMQ_VHOST_ENCODED` | api | %2F | Rabbitmq vhost encoded for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | api | - | Otel exporter otlp endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `ARTIFACT_MAX_UPLOAD_SIZE_BYTES` | api | 16777216 | Artifact max upload size bytes for api. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_BUCKETS` | storage | acontext-assets | S3 buckets for storage. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MINIO_ROOT_USER` | storage | (secret) | Generated minio root user. Keep private and preserve with backups. |
| `MINIO_ROOT_PASSWORD` | storage | (secret) | Generated minio root password. Keep private and preserve with backups. |
| `MEMORY_MAX_TRACES` | jaeger | 10000 | Memory max traces for jaeger. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SPAN_STORAGE_TYPE` | jaeger | memory | Span storage type for jaeger. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `COLLECTOR_OTLP_ENABLED` | jaeger | true | Collector otlp enabled for jaeger. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `MQ_URL` | core | - | Mq url resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LLM_SDK` | core | openai | Llm sdk for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `REDIS_URL` | core | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `S3_BUCKET` | core | acontext-assets | S3 bucket for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_REGION` | core | us-east-1 | S3 region for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `LLM_API_KEY` | core | (secret) | Required operator-supplied llm api key. Enter your own value before deployment. |
| `S3_ENDPOINT` | core | - | S3 endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `DATABASE_URL` | core | - | Private PostgreSQL connection URL assembled from generated credentials and service references. No manual value is needed. |
| `LLM_BASE_URL` | core | https://api.openai.com/v1 | Llm base url for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `SANDBOX_TYPE` | core | cloudflare | Sandbox type for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `S3_ACCESS_KEY` | core | - | S3 access key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `S3_SECRET_KEY` | core | (secret) | S3 secret key resolved automatically from the linked service. Keep this reference when using the included topology. |
| `LLM_SIMPLE_MODEL` | core | gpt-4.1 | Llm simple model for core. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `CLOUDFLARE_WORKER_URL` | core | - | Required URL of your separately deployed Acontext Cloudflare sandbox Worker. This template does not deploy the Worker. |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | core | - | Otel exporter otlp endpoint resolved automatically from the linked service. Keep this reference when using the included topology. |
| `REDIS_URL` | redis | - | Private authenticated Redis/Valkey connection URL. Automatically assembled from service references. |
| `REDIS_PASSWORD` | redis | (secret) | Generated private Redis/Valkey password, or a reference to that password. Keep secret. |

## Configuration

- **Volume:** `/var/lib/rabbitmq`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/data`
- **Start command:** `sh -c 'exec redis-server --bind 0.0.0.0 :: --appendonly yes --maxmemory-policy noeviction --requirepass "$REDIS_PASSWORD"'`

**Category:** AI/ML · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/acontext-agent-context-platform)
