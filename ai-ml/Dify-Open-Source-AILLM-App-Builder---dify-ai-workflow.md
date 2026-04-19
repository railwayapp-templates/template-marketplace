# Deploy Dify | Open-Source AI/LLM App Builder on Railway

Self-host Dify on Railway — open-source LLM app builder with RAG and agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-ai-workflow)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-ai-workflow?referralCode=QXdhdr&utm_medium=integration&utm_source=template&utm_campaign=generic)

Dify is an open-source LLM application development platform that combines AI workflow design, RAG knowledge bases, agent tooling, and model management into a single self-hostable stack — letting teams ship production chatbots, copilots, and AI agents without writing orchestration code from scratch. The platform supports hundreds of proprietary and open-source models (OpenAI, Anthropic, Llama, Mistral, local Ollama) behind a unified plugin runtime.

This Railway template self-hosts Dify with the full production architecture pre-wired: a Dify API + Worker + Web frontend, a Plugin Daemon for model providers, a Sandbox for code execution, Weaviate as the vector database, MinIO for shared file storage, PostgreSQL for metadata, Redis for queueing, and an Nginx reverse proxy that routes everything under one public domain. Deploy Dify on Railway in under five minutes — no docker-compose, no nginx.conf to mount, no S3 bucket to provision.

![Dify Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1776523341/Dify_-_railway_arch_xp1wuv.png)

Dify (langgenius/dify) is a TypeScript + Python platform that bundles everything needed to ship LLM products: a low-code workflow builder, a RAG ingestion pipeline, an API gateway with rate limiting and observability, a plugin runtime for tools and model providers, and a sandbox for safely executing model-generated code.

Key features available in the self-hosted edition:
- Visual workflow builder for chains, agents, and conditional logic
- 50+ pre-built tools (web search, code interpreter, image generation, HTTP)
- Knowledge base with hybrid search (vector + keyword) over your private docs
- Built-in observability: per-request token counts, latency, cost
- API endpoints (REST + SSE streaming) for every published app
- Multi-tenant workspaces with role-based access control

Architecture: the Web frontend (Next.js) and API (Flask/Gunicorn) are separated; long-running tasks run in a Celery Worker pool; the Plugin Daemon (Go) runs model and tool plugins out-of-process; the Sandbox isolates user code; Weaviate stores vector embeddings; MinIO holds uploaded files (shared between API and Worker over the S3 protocol since Railway forbids cross-service volume mounts).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nginx | `nginx:latest` | Web service |
| Sandbox | `langgenius/dify-sandbox:0.2.14` | Worker |
| Plugin-Daemon | `langgenius/dify-plugin-daemon:0.5.3-local` | Worker |
| Dify-Web | `langgenius/dify-web:1.13.3` | Worker |
| Dify-API | `langgenius/dify-api:1.13.3` | Worker |
| Dify-Worker | `langgenius/dify-api:1.13.3` | Worker |
| Weaviate | `semitechnologies/weaviate:1.27.0` | Worker |
| MinIO | `minio/minio:latest` | Database |
| Redis | `redis:8.2.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Nginx | 80 | HTTP listen port |
| `NGINX_PORT` | Nginx | 80 | HTTP listen port |
| `API_KEY` | Sandbox | (secret) | Sandbox API auth key |
| `GIN_MODE` | Sandbox | release | Go web framework mode |
| `SANDBOX_PORT` | Sandbox | 8194 | Sandbox listen port |
| `ENABLE_NETWORK` | Sandbox | true | Allow network from sandbox |
| `WORKER_TIMEOUT` | Sandbox | 15 | Code exec timeout seconds |
| `DB_HOST` | Plugin-Daemon | - | Managed Postgres internal host |
| `DB_PORT` | Plugin-Daemon | - | Managed Postgres port |
| `PLATFORM` | Plugin-Daemon | local | Platform mode |
| `REDIS_HOST` | Plugin-Daemon | - | Managed Redis internal host |
| `REDIS_PORT` | Plugin-Daemon | - | Managed Redis port |
| `SERVER_KEY` | Plugin-Daemon | - | Daemon API auth key (API refs this) |
| `DB_DATABASE` | Plugin-Daemon | - | Shared DB with API |
| `DB_PASSWORD` | Plugin-Daemon | (secret) | Managed Postgres password |
| `DB_USERNAME` | Plugin-Daemon | (secret) | Managed Postgres user |
| `SERVER_PORT` | Plugin-Daemon | 5002 | Daemon listen port |
| `PPROF_ENABLED` | Plugin-Daemon | false | Disable Go profiler |
| `PIP_MIRROR_URL` | Plugin-Daemon | - | Optional pip mirror |
| `REDIS_PASSWORD` | Plugin-Daemon | (secret) | Managed Redis password |
| `ROUTINE_POOL_SIZE` | Plugin-Daemon | 10000 | Goroutine pool size |
| `DB_PLUGIN_DATABASE` | Plugin-Daemon | - | Same DB as API (no conflict) |
| `DIFY_INNER_API_KEY` | Plugin-Daemon | (secret) | Inner API auth key (API refs this) |
| `DIFY_INNER_API_URL` | Plugin-Daemon | - | Reference API service |
| `MARKETPLACE_API_URL` | Plugin-Daemon | https://marketplace.dify.ai | Marketplace endpoint |
| `MARKETPLACE_ENABLED` | Plugin-Daemon | true | Enable marketplace |
| `PLUGIN_STORAGE_TYPE` | Plugin-Daemon | local | Plugin storage backend |
| `PLUGIN_WORKING_PATH` | Plugin-Daemon | /app/storage/cwd | Plugin working dir |
| `PLUGIN_INSTALLED_PATH` | Plugin-Daemon | plugin | Installed plugin subdir |
| `MAX_PLUGIN_PACKAGE_SIZE` | Plugin-Daemon | 52428800 | Max plugin size bytes |
| `PLUGIN_MEDIA_CACHE_PATH` | Plugin-Daemon | assets | Asset cache subdir |
| `PYTHON_ENV_INIT_TIMEOUT` | Plugin-Daemon | 120 | Python env init timeout |
| `PYTHON_INTERPRETER_PATH` | Plugin-Daemon | /usr/bin/python3 | Python interpreter |
| `FORCE_VERIFYING_SIGNATURE` | Plugin-Daemon | false | Skip signature verification |
| `PLUGIN_PACKAGE_CACHE_PATH` | Plugin-Daemon | plugin_packages | Plugin cache subdir |
| `PLUGIN_STORAGE_LOCAL_ROOT` | Plugin-Daemon | /app/storage | Plugin storage root |
| `LIFETIME_STATE_GC_INTERVAL` | Plugin-Daemon | 300 | State GC interval |
| `PLUGIN_MAX_EXECUTION_TIMEOUT` | Plugin-Daemon | 600 | Plugin exec timeout seconds |
| `PLUGIN_REMOTE_INSTALLING_HOST` | Plugin-Daemon | 0.0.0.0 | Remote install bind host |
| `PLUGIN_REMOTE_INSTALLING_PORT` | Plugin-Daemon | 5003 | Remote install port |
| `LIFETIME_COLLECTION_GC_INTERVAL` | Plugin-Daemon | 60 | GC sweep interval |
| `LIFETIME_COLLECTION_HEARTBEAT_INTERVAL` | Plugin-Daemon | 5 | Heartbeat interval |
| `PORT` | Dify-Web | 3000 | Web frontend port |
| `APP_API_URL` | Dify-Web | - | App API URL |
| `CONSOLE_API_URL` | Dify-Web | - | Console API URL |
| `NEXT_PUBLIC_EDITION` | Dify-Web | SELF_HOSTED | Edition flag |
| `NEXT_PUBLIC_API_PREFIX` | Dify-Web | - | Console API prefix |
| `NEXT_PUBLIC_DEPLOY_ENV` | Dify-Web | PRODUCTION | Frontend deploy env |
| `NEXT_PUBLIC_PUBLIC_API_PREFIX` | Dify-Web | - | Public API prefix |
| `MODE` | Dify-API | api | API server mode |
| `DB_HOST` | Dify-API | - | Managed Postgres internal host |
| `DB_PORT` | Dify-API | - | Managed Postgres port |
| `DB_TYPE` | Dify-API | postgresql | Database backend type |
| `REDIS_DB` | Dify-API | 0 | Redis logical DB index |
| `DIFY_PORT` | Dify-API | 5001 | API listen port |
| `FILES_URL` | Dify-API | - | Public file URL prefix |
| `LOG_LEVEL` | Dify-API | INFO | Application log verbosity |
| `S3_REGION` | Dify-API | us-east-1 | S3 region (any value) |
| `DEPLOY_ENV` | Dify-API | PRODUCTION | Production deployment flag |
| `REDIS_HOST` | Dify-API | - | Managed Redis internal host |
| `REDIS_PORT` | Dify-API | - | Managed Redis port |
| `SECRET_KEY` | Dify-API | (secret) | Flask session signing key |
| `APP_API_URL` | Dify-API | - | App API base URL |
| `APP_WEB_URL` | Dify-API | - | App web base URL |
| `DB_DATABASE` | Dify-API | - | Managed Postgres default DB |
| `DB_PASSWORD` | Dify-API | (secret) | Managed Postgres password |
| `DB_USERNAME` | Dify-API | (secret) | Managed Postgres user |
| `S3_ENDPOINT` | Dify-API | - | MinIO internal endpoint |
| `STORAGE_TYPE` | Dify-API | s3 | Storage backend (NOT opendal) |
| `VECTOR_STORE` | Dify-API | weaviate | Vector DB backend |
| `S3_ACCESS_KEY` | Dify-API | - | MinIO access key |
| `S3_SECRET_KEY` | Dify-API | (secret) | MinIO secret key |
| `REDIS_PASSWORD` | Dify-API | (secret) | Managed Redis password |
| `S3_BUCKET_NAME` | Dify-API | dify-storage | MinIO bucket name |
| `CONSOLE_API_URL` | Dify-API | - | Console API base URL |
| `CONSOLE_WEB_URL` | Dify-API | - | Console web base URL |
| `SERVICE_API_URL` | Dify-API | - | Service API base URL |
| `GUNICORN_TIMEOUT` | Dify-API | 360 | Worker request timeout seconds |
| `S3_ADDRESS_STYLE` | Dify-API | path | MinIO requires path-style |
| `WEAVIATE_API_KEY` | Dify-API | (secret) | Weaviate API key |
| `CELERY_BROKER_URL` | Dify-API | - | Celery broker URL |
| `DIFY_BIND_ADDRESS` | Dify-API | 0.0.0.0 | API bind interface |
| `MIGRATION_ENABLED` | Dify-API | true | Auto-run DB migrations on boot |
| `PLUGIN_DAEMON_KEY` | Dify-API | - | Plugin daemon auth |
| `PLUGIN_DAEMON_URL` | Dify-API | - | Plugin daemon URL |
| `WEAVIATE_ENDPOINT` | Dify-API | - | Weaviate internal URL |
| `INTERNAL_FILES_URL` | Dify-API | http://Dify-API.railway.internal:5001 | Internal file URL |
| `MARKETPLACE_API_URL` | Dify-API | https://marketplace.dify.ai | Marketplace endpoint |
| `MARKETPLACE_ENABLED` | Dify-API | true | Enable plugin marketplace |
| `SERVER_WORKER_AMOUNT` | Dify-API | 1 | Gunicorn worker count |
| `SQLALCHEMY_POOL_SIZE` | Dify-API | 30 | DB connection pool size |
| `CODE_EXECUTION_API_KEY` | Dify-API | (secret) | Sandbox auth key |
| `CODE_EXECUTION_ENDPOINT` | Dify-API | - | Sandbox internal URL |
| `SQLALCHEMY_MAX_OVERFLOW` | Dify-API | 10 | DB pool overflow allowance |
| `SQLALCHEMY_POOL_RECYCLE` | Dify-API | 3600 | DB connection recycle seconds |
| `PLUGIN_DIFY_INNER_API_KEY` | Dify-API | (secret) | Inner API key |
| `PLUGIN_DIFY_INNER_API_URL` | Dify-API | - | Own internal URL |
| `CONSOLE_CORS_ALLOW_ORIGINS` | Dify-API | * | CORS for console API |
| `WEB_API_CORS_ALLOW_ORIGINS` | Dify-API | * | CORS for web API |
| `MODE` | Dify-Worker | worker | Celery worker mode |
| `DB_HOST` | Dify-Worker | - | Managed Postgres internal host |
| `DB_PORT` | Dify-Worker | - | Managed Postgres port |
| `DB_TYPE` | Dify-Worker | postgresql | Database backend type |
| `REDIS_DB` | Dify-Worker | 0 | Redis logical DB index |
| `FILES_URL` | Dify-Worker | - | Public file URL prefix |
| `LOG_LEVEL` | Dify-Worker | INFO | Application log verbosity |
| `S3_REGION` | Dify-Worker | us-east-1 | S3 region (any value) |
| `DEPLOY_ENV` | Dify-Worker | PRODUCTION | Production deployment flag |
| `REDIS_HOST` | Dify-Worker | - | Managed Redis internal host |
| `REDIS_PORT` | Dify-Worker | - | Managed Redis port |
| `SECRET_KEY` | Dify-Worker | (secret) | Must match API secret key |
| `APP_API_URL` | Dify-Worker | - | App API base URL |
| `APP_WEB_URL` | Dify-Worker | - | App web base URL |
| `DB_DATABASE` | Dify-Worker | - | Managed Postgres default DB |
| `DB_PASSWORD` | Dify-Worker | (secret) | Managed Postgres password |
| `DB_USERNAME` | Dify-Worker | (secret) | Managed Postgres user |
| `S3_ENDPOINT` | Dify-Worker | - | MinIO internal endpoint |
| `STORAGE_TYPE` | Dify-Worker | s3 | Storage backend (NOT opendal) |
| `VECTOR_STORE` | Dify-Worker | weaviate | Vector DB backend |
| `S3_ACCESS_KEY` | Dify-Worker | - | MinIO access key |
| `S3_SECRET_KEY` | Dify-Worker | (secret) | MinIO secret key |
| `REDIS_PASSWORD` | Dify-Worker | (secret) | Managed Redis password |
| `S3_BUCKET_NAME` | Dify-Worker | dify-storage | MinIO bucket name |
| `CONSOLE_API_URL` | Dify-Worker | - | Console API base URL |
| `CONSOLE_WEB_URL` | Dify-Worker | - | Console web base URL |
| `SERVICE_API_URL` | Dify-Worker | - | Service API base URL |
| `S3_ADDRESS_STYLE` | Dify-Worker | path | MinIO requires path-style |
| `WEAVIATE_API_KEY` | Dify-Worker | (secret) | Weaviate API key |
| `CELERY_BROKER_URL` | Dify-Worker | - | Celery broker URL |
| `MIGRATION_ENABLED` | Dify-Worker | true | Auto-run DB migrations on boot |
| `PLUGIN_DAEMON_KEY` | Dify-Worker | - | Plugin daemon auth |
| `PLUGIN_DAEMON_URL` | Dify-Worker | - | Plugin daemon URL |
| `WEAVIATE_ENDPOINT` | Dify-Worker | - | Weaviate internal URL |
| `INTERNAL_FILES_URL` | Dify-Worker | http://Dify-API.railway.internal:5001 | Internal file URL |
| `MARKETPLACE_API_URL` | Dify-Worker | https://marketplace.dify.ai | Marketplace endpoint |
| `MARKETPLACE_ENABLED` | Dify-Worker | true | Enable plugin marketplace |
| `CELERY_WORKER_AMOUNT` | Dify-Worker | 1 | Number of Celery workers |
| `SQLALCHEMY_POOL_SIZE` | Dify-Worker | 30 | DB connection pool size |
| `CODE_EXECUTION_API_KEY` | Dify-Worker | (secret) | Sandbox auth key |
| `CODE_EXECUTION_ENDPOINT` | Dify-Worker | - | Sandbox internal URL |
| `SQLALCHEMY_MAX_OVERFLOW` | Dify-Worker | 10 | DB pool overflow allowance |
| `SQLALCHEMY_POOL_RECYCLE` | Dify-Worker | 3600 | DB connection recycle seconds |
| `PLUGIN_DIFY_INNER_API_KEY` | Dify-Worker | (secret) | Inner API key |
| `PLUGIN_DIFY_INNER_API_URL` | Dify-Worker | - | Reference API service |
| `PORT` | Weaviate | 8080 | Weaviate REST port |
| `CLUSTER_HOSTNAME` | Weaviate | node1 | Single-node hostname |
| `DISABLE_TELEMETRY` | Weaviate | true | Disable telemetry |
| `QUERY_DEFAULTS_LIMIT` | Weaviate | 25 | Default query limit |
| `PERSISTENCE_DATA_PATH` | Weaviate | /var/lib/weaviate | Vector DB data dir |
| `DEFAULT_VECTORIZER_MODULE` | Weaviate | none | No built-in vectorizer |
| `AUTHENTICATION_APIKEY_USERS` | Weaviate | dify@railway.app | Mapped user emails |
| `AUTHENTICATION_APIKEY_ENABLED` | Weaviate | true | Enable API key auth |
| `AUTHORIZATION_ADMINLIST_USERS` | Weaviate | dify@railway.app | Admin user emails |
| `AUTHORIZATION_ADMINLIST_ENABLED` | Weaviate | true | Enable admin allowlist |
| `AUTHENTICATION_APIKEY_ALLOWED_KEYS` | Weaviate | - | API keys list |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Weaviate | false | Disable anon access |
| `MINIO_ROOT_USER` | MinIO | (secret) | Root username |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Root password |
| `REDISHOST` | Redis | - | Internal Redis service hostname |
| `REDISPORT` | Redis | 6379 | Redis server listening port |
| `REDISUSER` | Redis | default | Redis default authentication user |
| `REDIS_URL` | Redis | - | Internal Redis connection string |
| `REDISPASSWORD` | Redis | (secret) | Redis password environment reference |
| `REDIS_PASSWORD` | Redis | (secret) | Password for Redis authentication |
| `REDIS_PUBLIC_URL` | Redis | - | Public Redis connection URL |
| `POSTGRES_DB` | Postgres | railway | Initial database created on startup |
| `DATABASE_URL` | Postgres | - | Internal Postgres connection string |
| `POSTGRES_USER` | Postgres | (secret) | Default database superuser name |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres database user password |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public Postgres connection string |

## Configuration

- **Start command:** `/bin/sh -c "echo c2VydmVyIHsKICAgIGxpc3RlbiA4MDsKICAgIHNlcnZlcl9uYW1lIF87CiAgICBjbGllbnRfbWF4X2JvZHlfc2l6ZSAxMDBNOwoKICAgIHJlc29sdmVyIF9fUkVTT0xWRVJfXyB2YWxpZD0xMHMgaXB2Nj1vZmY7CgogICAgbG9jYXRpb24gL2NvbnNvbGUvYXBpIHsKICAgICAgICBzZXQgJHVwc3RyZWFtX2FwaSBEaWZ5LUFQSS5yYWlsd2F5LmludGVybmFsOjUwMDE7CiAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vJHVwc3RyZWFtX2FwaTsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIEhvc3QgJGhvc3Q7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLVJlYWwtSVAgJHJlbW90ZV9hZGRyOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgWC1Gb3J3YXJkZWQtRm9yICRwcm94eV9hZGRfeF9mb3J3YXJkZWRfZm9yOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgWC1Gb3J3YXJkZWQtUHJvdG8gaHR0cHM7CiAgICAgICAgcHJveHlfaHR0cF92ZXJzaW9uIDEuMTsKICAgICAgICBwcm94eV9idWZmZXJpbmcgb2ZmOwogICAgICAgIHByb3h5X3JlYWRfdGltZW91dCAzNjAwczsKICAgICAgICBwcm94eV9zZW5kX3RpbWVvdXQgMzYwMHM7CiAgICB9CiAgICBsb2NhdGlvbiAvYXBpIHsKICAgICAgICBzZXQgJHVwc3RyZWFtX2FwaSBEaWZ5LUFQSS5yYWlsd2F5LmludGVybmFsOjUwMDE7CiAgICAgICAgcHJveHlfcGFzcyBodHRwOi8vJHVwc3RyZWFtX2FwaTsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIEhvc3QgJGhvc3Q7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLVJlYWwtSVAgJHJlbW90ZV9hZGRyOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgWC1Gb3J3YXJkZWQtRm9yICRwcm94eV9hZGRfeF9mb3J3YXJkZWRfZm9yOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgWC1Gb3J3YXJkZWQtUHJvdG8gaHR0cHM7CiAgICAgICAgcHJveHlfaHR0cF92ZXJzaW9uIDEuMTsKICAgICAgICBwcm94eV9idWZmZXJpbmcgb2ZmOwogICAgICAgIHByb3h5X3JlYWRfdGltZW91dCAzNjAwczsKICAgICAgICBwcm94eV9zZW5kX3RpbWVvdXQgMzYwMHM7CiAgICB9CiAgICBsb2NhdGlvbiAvdjEgewogICAgICAgIHNldCAkdXBzdHJlYW1fYXBpIERpZnktQVBJLnJhaWx3YXkuaW50ZXJuYWw6NTAwMTsKICAgICAgICBwcm94eV9wYXNzIGh0dHA6Ly8kdXBzdHJlYW1fYXBpOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgSG9zdCAkaG9zdDsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFgtUmVhbC1JUCAkcmVtb3RlX2FkZHI7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Gb3IgJHByb3h5X2FkZF94X2ZvcndhcmRlZF9mb3I7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Qcm90byBodHRwczsKICAgICAgICBwcm94eV9odHRwX3ZlcnNpb24gMS4xOwogICAgICAgIHByb3h5X2J1ZmZlcmluZyBvZmY7CiAgICAgICAgcHJveHlfcmVhZF90aW1lb3V0IDM2MDBzOwogICAgICAgIHByb3h5X3NlbmRfdGltZW91dCAzNjAwczsKICAgIH0KICAgIGxvY2F0aW9uIC9maWxlcyB7CiAgICAgICAgc2V0ICR1cHN0cmVhbV9hcGkgRGlmeS1BUEkucmFpbHdheS5pbnRlcm5hbDo1MDAxOwogICAgICAgIHByb3h5X3Bhc3MgaHR0cDovLyR1cHN0cmVhbV9hcGk7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBIb3N0ICRob3N0OwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgWC1SZWFsLUlQICRyZW1vdGVfYWRkcjsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFgtRm9yd2FyZGVkLUZvciAkcHJveHlfYWRkX3hfZm9yd2FyZGVkX2ZvcjsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFgtRm9yd2FyZGVkLVByb3RvIGh0dHBzOwogICAgICAgIHByb3h5X2h0dHBfdmVyc2lvbiAxLjE7CiAgICAgICAgcHJveHlfYnVmZmVyaW5nIG9mZjsKICAgIH0KICAgIGxvY2F0aW9uIC9lIHsKICAgICAgICBzZXQgJHVwc3RyZWFtX3BkIFBsdWdpbi1EYWVtb24ucmFpbHdheS5pbnRlcm5hbDo1MDAyOwogICAgICAgIHByb3h5X3Bhc3MgaHR0cDovLyR1cHN0cmVhbV9wZDsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIEhvc3QgJGhvc3Q7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLVJlYWwtSVAgJHJlbW90ZV9hZGRyOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgWC1Gb3J3YXJkZWQtRm9yICRwcm94eV9hZGRfeF9mb3J3YXJkZWRfZm9yOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgWC1Gb3J3YXJkZWQtUHJvdG8gaHR0cHM7CiAgICAgICAgcHJveHlfaHR0cF92ZXJzaW9uIDEuMTsKICAgIH0KICAgIGxvY2F0aW9uIC8gewogICAgICAgIHNldCAkdXBzdHJlYW1fd2ViIERpZnktV2ViLnJhaWx3YXkuaW50ZXJuYWw6MzAwMDsKICAgICAgICBwcm94eV9wYXNzIGh0dHA6Ly8kdXBzdHJlYW1fd2ViOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgSG9zdCAkaG9zdDsKICAgICAgICBwcm94eV9zZXRfaGVhZGVyIFgtUmVhbC1JUCAkcmVtb3RlX2FkZHI7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Gb3IgJHByb3h5X2FkZF94X2ZvcndhcmRlZF9mb3I7CiAgICAgICAgcHJveHlfc2V0X2hlYWRlciBYLUZvcndhcmRlZC1Qcm90byBodHRwczsKICAgICAgICBwcm94eV9odHRwX3ZlcnNpb24gMS4xOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgVXBncmFkZSAkaHR0cF91cGdyYWRlOwogICAgICAgIHByb3h5X3NldF9oZWFkZXIgQ29ubmVjdGlvbiAidXBncmFkZSI7CiAgICB9Cn0K | base64 -d > /etc/nginx/conf.d/default.conf && RESOLVER=\$(awk '/^nameserver/ {print \$2; exit}' /etc/resolv.conf) && case \$RESOLVER in *:*) RESOLVER=[\$RESOLVER] ;; esac && echo Using resolver \$RESOLVER && sed -i \"s|__RESOLVER__|\$RESOLVER|g\" /etc/nginx/conf.d/default.conf && head -8 /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "minio server /data --console-address :9001 & sleep 5 && mc alias set local http://localhost:9000 minioadmin b18df41bed03c5168b6dfd5961e29b68 && mc mb local/dify-storage --ignore-existing; wait"`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/dify-ai-workflow)
