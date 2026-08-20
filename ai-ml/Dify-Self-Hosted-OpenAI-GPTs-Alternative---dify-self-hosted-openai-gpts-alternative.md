# Deploy Dify (Self-Hosted OpenAI GPTs Alternative) on Railway

Open-source Coze & OpenAI GPTs alternative. [Updated Aug '26]

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-self-hosted-openai-gpts-alternative)

## About

Dify is an open-source LLM application development platform — build AI chatbots, agents, and RAG-powered assistants with a visual builder, then serve them over an OpenAI-compatible API. This template deploys the complete production stack: API, Celery worker, Next.js web console, plugin daemon, sandboxed code executor, PostgreSQL with pgvector, Redis, MinIO object storage, and an SSRF proxy. Every service is pinned to a verified upstream image and wired over Railway's private network, so it boots reliably on the first deploy instead of failing the way older single-service templates do.

Hosting Dify means running nine coordinated services, not one container. The API server runs database migrations and serves the console and app APIs; a separate Celery worker handles async jobs; the web service is the Next.js console; the plugin daemon and dify-sandbox isolate plugin and code execution; PostgreSQL (pgvector) stores both relational data and vector embeddings; Redis backs the cache and task queue; MinIO holds uploaded files and datasets; and a Squid SSRF proxy safely brokers outbound calls. This template sets every environment variable, shared secret, private-domain reference, and volume so the stack comes up green without manual wiring.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| worker | `langgenius/dify-api:1.16.0` | Worker |
| dify-api | `langgenius/dify-api:1.16.0` | Web service |
| dify-web | `langgenius/dify-web:1.16.0` | Web service |
| pgvector | `pgvector/pgvector:pg16` | Database |
| squid | `ubuntu/squid:latest` | Worker |
| minio | `minio/minio:RELEASE.2025-04-08T15-41-24Z` | Database |
| redis | `redis:6-alpine` | Database |
| dify-sandbox | `langgenius/dify-sandbox:0.2.15` | Worker |
| dify-plugin-daemon | `langgenius/dify-plugin-daemon:0.6.3-local` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODE` | worker | worker | Process role for this service (api or worker) |
| `DB_HOST` | worker | - | PostgreSQL private host |
| `DB_PORT` | worker | 5432 | PostgreSQL port |
| `DB_TYPE` | worker | postgresql | Database engine type |
| `REDIS_DB` | worker | 0 | Redis database index |
| `LOG_LEVEL` | worker | INFO | Application log verbosity |
| `S3_REGION` | worker | us-east-1 | S3 region |
| `DEPLOY_ENV` | worker | PRODUCTION | Deployment environment label |
| `REDIS_HOST` | worker | - | Redis private host |
| `REDIS_PORT` | worker | 6379 | Redis port |
| `SECRET_KEY` | worker | (secret) | Secret used to sign sessions and tokens |
| `DB_DATABASE` | worker | dify | PostgreSQL database name |
| `DB_PASSWORD` | worker | (secret) | PostgreSQL password (referenced from the database service) |
| `DB_SSL_MODE` | worker | disable | PostgreSQL SSL mode |
| `DB_USERNAME` | worker | (secret) | PostgreSQL user |
| `S3_ENDPOINT` | worker | - | MinIO/S3 endpoint URL |
| `STORAGE_TYPE` | worker | s3 | File storage backend (S3/MinIO) |
| `VECTOR_STORE` | worker | pgvector | Vector store backend |
| `PGVECTOR_HOST` | worker | - | pgvector host |
| `PGVECTOR_PORT` | worker | 5432 | pgvector port |
| `PGVECTOR_USER` | worker | (secret) | pgvector user |
| `REDIS_USE_SSL` | worker | false | Whether to connect to Redis over SSL |
| `S3_ACCESS_KEY` | worker | minio | S3 access key |
| `S3_SECRET_KEY` | worker | (secret) | S3 secret key (MinIO root password) |
| `BROKER_USE_SSL` | worker | false | Whether the Celery broker uses SSL |
| `CELERY_BACKEND` | worker | redis | Celery result backend |
| `REDIS_PASSWORD` | worker | (secret) | Redis password (referenced from the Redis service) |
| `S3_BUCKET_NAME` | worker | dify | S3 bucket for Dify files |
| `MARKETPLACE_URL` | worker | https://marketplace.dify.ai | Dify marketplace URL |
| `S3_ADDRESS_STYLE` | worker | path | S3 addressing style (path or virtual) |
| `CELERY_BROKER_URL` | worker | - | Celery broker connection string (Redis) |
| `MIGRATION_ENABLED` | worker | false | Run database migrations on boot (api only) |
| `PGVECTOR_DATABASE` | worker | dify | pgvector database name |
| `PGVECTOR_PASSWORD` | worker | (secret) | pgvector password |
| `PLUGIN_DAEMON_KEY` | worker | - | Key shared with the plugin daemon |
| `PLUGIN_DAEMON_URL` | worker | - | Plugin daemon internal URL |
| `MARKETPLACE_API_URL` | worker | https://marketplace.dify.ai | Dify marketplace API URL |
| `MARKETPLACE_ENABLED` | worker | true | Enable the Dify plugin marketplace |
| `SSRF_PROXY_HTTP_URL` | worker | - | SSRF proxy HTTP URL |
| `SQLALCHEMY_POOL_SIZE` | worker | 30 | SQLAlchemy connection pool size |
| `SSRF_PROXY_HTTPS_URL` | worker | - | SSRF proxy HTTPS URL |
| `CODE_EXECUTION_API_KEY` | worker | (secret) | API key shared with the sandbox service |
| `S3_USE_AWS_MANAGED_IAM` | worker | false | Use AWS-managed IAM for S3 auth |
| `CODE_EXECUTION_ENDPOINT` | worker | - | Dify sandbox code-execution endpoint |
| `PGVECTOR_MAX_CONNECTION` | worker | 5 | Maximum pgvector connections |
| `PGVECTOR_MIN_CONNECTION` | worker | 1 | Minimum pgvector connections |
| `PLUGIN_MAX_PACKAGE_SIZE` | worker | 52428800 | Maximum plugin package size in bytes |
| `SQLALCHEMY_POOL_RECYCLE` | worker | 3600 | Seconds before a pooled DB connection is recycled |
| `INNER_API_KEY_FOR_PLUGIN` | worker | (secret) | Inner API key for plugin-to-API calls |
| `VECTOR_INDEX_NAME_PREFIX` | worker | Vector_index | Prefix for vector index names |
| `CODE_EXECUTION_SSL_VERIFY` | worker | false | Verify SSL on code-execution calls |
| `MODE` | dify-api | api | Process role for this service (api or worker) |
| `PORT` | dify-api | 5001 | HTTP port Railway routes the public domain to |
| `DB_HOST` | dify-api | - | PostgreSQL private host |
| `DB_PORT` | dify-api | 5432 | PostgreSQL port |
| `DB_TYPE` | dify-api | postgresql | Database engine type |
| `REDIS_DB` | dify-api | 0 | Redis database index |
| `DIFY_PORT` | dify-api | 5001 | Port the Dify API listens on |
| `FILES_URL` | dify-api | - | Public URL used for file downloads |
| `LOG_LEVEL` | dify-api | INFO | Application log verbosity |
| `S3_REGION` | dify-api | us-east-1 | S3 region |
| `DEPLOY_ENV` | dify-api | PRODUCTION | Deployment environment label |
| `REDIS_HOST` | dify-api | - | Redis private host |
| `REDIS_PORT` | dify-api | 6379 | Redis port |
| `SECRET_KEY` | dify-api | (secret) | Secret used to sign sessions and tokens |
| `APP_API_URL` | dify-api | - | Public URL of the app/backend API |
| `APP_WEB_URL` | dify-api | - | Public URL for published apps |
| `DB_DATABASE` | dify-api | dify | PostgreSQL database name |
| `DB_PASSWORD` | dify-api | (secret) | PostgreSQL password (referenced from the database service) |
| `DB_SSL_MODE` | dify-api | disable | PostgreSQL SSL mode |
| `DB_USERNAME` | dify-api | (secret) | PostgreSQL user |
| `S3_ENDPOINT` | dify-api | - | MinIO/S3 endpoint URL |
| `STORAGE_TYPE` | dify-api | s3 | File storage backend (S3/MinIO) |
| `VECTOR_STORE` | dify-api | pgvector | Vector store backend |
| `PGVECTOR_HOST` | dify-api | - | pgvector host |
| `PGVECTOR_PORT` | dify-api | 5432 | pgvector port |
| `PGVECTOR_USER` | dify-api | (secret) | pgvector user |
| `REDIS_USE_SSL` | dify-api | false | Whether to connect to Redis over SSL |
| `S3_ACCESS_KEY` | dify-api | minio | S3 access key |
| `S3_SECRET_KEY` | dify-api | (secret) | S3 secret key (MinIO root password) |
| `BROKER_USE_SSL` | dify-api | false | Whether the Celery broker uses SSL |
| `CELERY_BACKEND` | dify-api | redis | Celery result backend |
| `REDIS_PASSWORD` | dify-api | (secret) | Redis password (referenced from the Redis service) |
| `S3_BUCKET_NAME` | dify-api | dify | S3 bucket for Dify files |
| `CONSOLE_API_URL` | dify-api | - | Public URL of the console API |
| `CONSOLE_WEB_URL` | dify-api | - | Public URL of the web console |
| `MARKETPLACE_URL` | dify-api | https://marketplace.dify.ai | Dify marketplace URL |
| `SERVICE_API_URL` | dify-api | - | Public URL of the service API |
| `S3_ADDRESS_STYLE` | dify-api | path | S3 addressing style (path or virtual) |
| `CELERY_BROKER_URL` | dify-api | - | Celery broker connection string (Redis) |
| `DIFY_BIND_ADDRESS` | dify-api | 0.0.0.0 | Address the API server binds to |
| `MIGRATION_ENABLED` | dify-api | true | Run database migrations on boot (api only) |
| `PGVECTOR_DATABASE` | dify-api | dify | pgvector database name |
| `PGVECTOR_PASSWORD` | dify-api | (secret) | pgvector password |
| `PLUGIN_DAEMON_KEY` | dify-api | - | Key shared with the plugin daemon |
| `PLUGIN_DAEMON_URL` | dify-api | - | Plugin daemon internal URL |
| `INTERNAL_FILES_URL` | dify-api | - | Internal URL for file access between services |
| `MARKETPLACE_API_URL` | dify-api | https://marketplace.dify.ai | Dify marketplace API URL |
| `MARKETPLACE_ENABLED` | dify-api | true | Enable the Dify plugin marketplace |
| `SSRF_PROXY_HTTP_URL` | dify-api | - | SSRF proxy HTTP URL |
| `SQLALCHEMY_POOL_SIZE` | dify-api | 30 | SQLAlchemy connection pool size |
| `SSRF_PROXY_HTTPS_URL` | dify-api | - | SSRF proxy HTTPS URL |
| `CODE_EXECUTION_API_KEY` | dify-api | (secret) | API key shared with the sandbox service |
| `S3_USE_AWS_MANAGED_IAM` | dify-api | false | Use AWS-managed IAM for S3 auth |
| `CODE_EXECUTION_ENDPOINT` | dify-api | - | Dify sandbox code-execution endpoint |
| `PGVECTOR_MAX_CONNECTION` | dify-api | 5 | Maximum pgvector connections |
| `PGVECTOR_MIN_CONNECTION` | dify-api | 1 | Minimum pgvector connections |
| `PLUGIN_MAX_PACKAGE_SIZE` | dify-api | 52428800 | Maximum plugin package size in bytes |
| `SQLALCHEMY_POOL_RECYCLE` | dify-api | 3600 | Seconds before a pooled DB connection is recycled |
| `INNER_API_KEY_FOR_PLUGIN` | dify-api | (secret) | Inner API key for plugin-to-API calls |
| `VECTOR_INDEX_NAME_PREFIX` | dify-api | Vector_index | Prefix for vector index names |
| `CODE_EXECUTION_SSL_VERIFY` | dify-api | false | Verify SSL on code-execution calls |
| `CONSOLE_CORS_ALLOW_ORIGINS` | dify-api | * | Allowed CORS origins for the console |
| `PLUGIN_REMOTE_INSTALL_HOST` | dify-api | - | Plugin daemon host for remote install |
| `PLUGIN_REMOTE_INSTALL_PORT` | dify-api | 5003 | Plugin daemon port for remote install |
| `WEB_API_CORS_ALLOW_ORIGINS` | dify-api | * | Allowed CORS origins for the web API |
| `PORT` | dify-web | 3000 | HTTP port Railway routes the public domain to |
| `HOSTNAME` | dify-web | 0.0.0.0 | Host the web server binds to |
| `APP_API_URL` | dify-web | - | Public URL of the app/backend API |
| `CONSOLE_API_URL` | dify-web | - | Public URL of the console API |
| `MARKETPLACE_URL` | dify-web | https://marketplace.dify.ai | Dify marketplace URL |
| `MARKETPLACE_API_URL` | dify-web | https://marketplace.dify.ai | Dify marketplace API URL |
| `NEXT_TELEMETRY_DISABLED` | dify-web | 1 | Disable Next.js telemetry |
| `POSTGRES_DB` | pgvector | dify | Primary Dify database name |
| `POSTGRES_USER` | pgvector | (secret) | PostgreSQL superuser name |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Auto-generated PostgreSQL password |
| `MINIO_ROOT_USER` | minio | (secret) | MinIO root username |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Auto-generated MinIO root password |
| `REDIS_PASSWORD` | redis | (secret) | Redis password (referenced from the Redis service) |
| `API_KEY` | dify-sandbox | (secret) | Auto-generated key the API uses to call the sandbox |
| `GIN_MODE` | dify-sandbox | release | Gin web framework run mode |
| `HTTP_PROXY` | dify-sandbox | - | HTTP proxy for sandboxed outbound calls |
| `HTTPS_PROXY` | dify-sandbox | - | HTTPS proxy for sandboxed outbound calls |
| `SANDBOX_PORT` | dify-sandbox | 8194 | Port the sandbox service listens on |
| `ENABLE_NETWORK` | dify-sandbox | true | Allow network access from sandboxed code |
| `WORKER_TIMEOUT` | dify-sandbox | 15 | Sandbox worker timeout in seconds |
| `DB_HOST` | dify-plugin-daemon | - | PostgreSQL private host |
| `DB_PORT` | dify-plugin-daemon | 5432 | PostgreSQL port |
| `DB_TYPE` | dify-plugin-daemon | postgresql | Database engine type |
| `REDIS_HOST` | dify-plugin-daemon | - | Redis private host |
| `REDIS_PORT` | dify-plugin-daemon | 6379 | Redis port |
| `SERVER_KEY` | dify-plugin-daemon | - | Auto-generated plugin daemon server key |
| `DB_DATABASE` | dify-plugin-daemon | dify_plugin | PostgreSQL database name |
| `DB_PASSWORD` | dify-plugin-daemon | (secret) | PostgreSQL password (referenced from the database service) |
| `DB_SSL_MODE` | dify-plugin-daemon | disable | PostgreSQL SSL mode |
| `DB_USERNAME` | dify-plugin-daemon | (secret) | PostgreSQL user |
| `SERVER_PORT` | dify-plugin-daemon | 5002 | Plugin daemon HTTP port |
| `REDIS_PASSWORD` | dify-plugin-daemon | (secret) | Redis password (referenced from the Redis service) |
| `DIFY_INNER_API_KEY` | dify-plugin-daemon | (secret) | Auto-generated inner API key |
| `DIFY_INNER_API_URL` | dify-plugin-daemon | - | Internal URL of the Dify API |
| `PLUGIN_STORAGE_TYPE` | dify-plugin-daemon | local | Plugin storage backend |
| `PLUGIN_WORKING_PATH` | dify-plugin-daemon | /app/storage/cwd | Working directory for plugins |
| `PLUGIN_INSTALLED_PATH` | dify-plugin-daemon | plugin | Subdirectory for installed plugins |
| `MAX_PLUGIN_PACKAGE_SIZE` | dify-plugin-daemon | 52428800 | Maximum plugin package size in bytes |
| `PLUGIN_MEDIA_CACHE_PATH` | dify-plugin-daemon | assets | Subdirectory for plugin media cache |
| `PYTHON_ENV_INIT_TIMEOUT` | dify-plugin-daemon | 120 | Timeout for Python env init (seconds) |
| `FORCE_VERIFYING_SIGNATURE` | dify-plugin-daemon | true | Require plugin signature verification |
| `PLUGIN_PACKAGE_CACHE_PATH` | dify-plugin-daemon | plugin_packages | Subdirectory for plugin package cache |
| `PLUGIN_STORAGE_LOCAL_ROOT` | dify-plugin-daemon | /app/storage | Local root path for plugin storage |
| `PLUGIN_MAX_EXECUTION_TIMEOUT` | dify-plugin-daemon | 600 | Maximum plugin execution time (seconds) |
| `PLUGIN_REMOTE_INSTALLING_HOST` | dify-plugin-daemon | 0.0.0.0 | Bind host for remote plugin install |
| `PLUGIN_REMOTE_INSTALLING_PORT` | dify-plugin-daemon | 5003 | Port for remote plugin install |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c "echo 'CREATE DATABASE dify_plugin;' > /docker-entrypoint-initdb.d/10-dify-plugin.sql; exec docker-entrypoint.sh postgres"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "printf 'http_port 3128\nacl all src all\nhttp_access allow all\ncoredump_dir /var/spool/squid\ndns_v4_first on\nrequest_timeout 2 minutes\n' > /etc/squid/squid.conf && exec /usr/sbin/squid -f /etc/squid/squid.conf -NYC 1"`
- **Start command:** `sh -c 'mkdir -p /data/dify && minio server --address ":9000" --console-address ":9001" /data'`
- **Volume:** `/data`
- **Start command:** `sh -c 'redis-server --requirepass "$REDIS_PASSWORD"'`
- **Volume:** `/app/storage`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/dify-self-hosted-openai-gpts-alternative)
