# Deploy exquisite-growth on Railway

Self-hosted Dify LLM app platform with pgvector, Redis, and MinIO

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/exquisite-growth)

## About

exquisite-growth is a self-hosted deployment of Dify, the open-source LLM app development platform. It bundles everything Dify needs — API, web console, background worker, plugin daemon, code sandbox, Postgres with pgvector, Redis, MinIO object storage, and an egress proxy — into one Railway project.

This template deploys nine services that work together out of the box. The Dify API and web console are exposed publicly, while pgvector (Postgres), Redis, MinIO, the plugin daemon, the code sandbox, and the Squid egress proxy communicate over Railway's private network. Databases are created automatically on first boot, secrets are generated for you, and persistent volumes are attached to Postgres, Redis, MinIO, and the plugin daemon — so a one-click deploy gives you a production-style Dify stack with no manual configuration.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minio | `minio/minio:RELEASE.2025-04-08T15-41-24Z` | Database |
| dify-sandbox | `langgenius/dify-sandbox:0.2.15` | Worker |
| dify-plugin-daemon | `langgenius/dify-plugin-daemon:0.6.3-local` | Database |
| dify-web | `langgenius/dify-web:1.16.0` | Web service |
| worker | `langgenius/dify-api:1.16.0` | Worker |
| squid | `ubuntu/squid:latest` | Worker |
| dify-api | `langgenius/dify-api:1.16.0` | Web service |
| redis | `redis:6-alpine` | Database |
| pgvector | `pgvector/pgvector:pg16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MINIO_ROOT_USER` | minio | (secret) | Root username for MinIO — also used as the S3 access key. |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | Root password for MinIO — also used as the S3 secret key. |
| `API_KEY` | dify-sandbox | (secret) | API key the sandbox requires; the API and worker send it as CODE_EXECUTION_API_KEY. |
| `GIN_MODE` | dify-sandbox | release | Gin framework run mode. |
| `HTTP_PROXY` | dify-sandbox | - | HTTP proxy for outbound sandbox traffic, routed through the squid service. |
| `HTTPS_PROXY` | dify-sandbox | - | HTTPS proxy for outbound sandbox traffic, routed through the squid service. |
| `SANDBOX_PORT` | dify-sandbox | 8194 | Port the code-execution sandbox listens on. |
| `ENABLE_NETWORK` | dify-sandbox | true | Whether code running in the sandbox may access the network. |
| `WORKER_TIMEOUT` | dify-sandbox | 15 | Max seconds a sandboxed code execution may run. |
| `DB_HOST` | dify-plugin-daemon | - | Postgres host — the pgvector service’s private domain. |
| `DB_PORT` | dify-plugin-daemon | 5432 | Postgres port. |
| `DB_TYPE` | dify-plugin-daemon | postgresql | Database engine type. |
| `REDIS_HOST` | dify-plugin-daemon | - | Redis host — the redis service’s private domain. |
| `REDIS_PORT` | dify-plugin-daemon | 6379 | Redis port. |
| `SERVER_KEY` | dify-plugin-daemon | - | Secret the daemon requires on incoming calls; the API and worker send it as PLUGIN_DAEMON_KEY. |
| `DB_DATABASE` | dify-plugin-daemon | dify_plugin | Database for plugin data (created by the pgvector init script). |
| `DB_PASSWORD` | dify-plugin-daemon | (secret) | Postgres password, referenced from the pgvector service. |
| `DB_SSL_MODE` | dify-plugin-daemon | disable | SSL mode for Postgres connections. |
| `DB_USERNAME` | dify-plugin-daemon | (secret) | Postgres username. |
| `SERVER_PORT` | dify-plugin-daemon | 5002 | Port the plugin daemon’s HTTP API listens on. |
| `REDIS_PASSWORD` | dify-plugin-daemon | (secret) | Redis password, referenced from the redis service. |
| `DIFY_INNER_API_KEY` | dify-plugin-daemon | (secret) | Shared secret for calling the Dify inner API; matches INNER_API_KEY_FOR_PLUGIN. |
| `DIFY_INNER_API_URL` | dify-plugin-daemon | - | Internal URL of the Dify API service. |
| `PLUGIN_STORAGE_TYPE` | dify-plugin-daemon | local | Storage backend for installed plugins. |
| `PLUGIN_WORKING_PATH` | dify-plugin-daemon | /app/storage/cwd | Working directory for running plugins. |
| `PLUGIN_INSTALLED_PATH` | dify-plugin-daemon | plugin | Subdirectory where installed plugins live. |
| `MAX_PLUGIN_PACKAGE_SIZE` | dify-plugin-daemon | 52428800 | Max plugin package size in bytes (50 MB). |
| `PLUGIN_MEDIA_CACHE_PATH` | dify-plugin-daemon | assets | Subdirectory for cached plugin media assets. |
| `PYTHON_ENV_INIT_TIMEOUT` | dify-plugin-daemon | 120 | Seconds allowed for a plugin’s Python environment to initialize. |
| `FORCE_VERIFYING_SIGNATURE` | dify-plugin-daemon | true | Only allow plugins with verified signatures. |
| `PLUGIN_PACKAGE_CACHE_PATH` | dify-plugin-daemon | plugin_packages | Subdirectory for cached plugin packages. |
| `PLUGIN_STORAGE_LOCAL_ROOT` | dify-plugin-daemon | /app/storage | Root directory for plugin storage on the attached volume. |
| `PLUGIN_MAX_EXECUTION_TIMEOUT` | dify-plugin-daemon | 600 | Max seconds a plugin invocation may run. |
| `PLUGIN_REMOTE_INSTALLING_HOST` | dify-plugin-daemon | 0.0.0.0 | Bind address for the remote plugin debugging server. |
| `PLUGIN_REMOTE_INSTALLING_PORT` | dify-plugin-daemon | 5003 | Port for the remote plugin debugging server. |
| `PORT` | dify-web | 3000 | Port the web frontend listens on. |
| `HOSTNAME` | dify-web | 0.0.0.0 | Interface the Next.js server binds to. |
| `APP_API_URL` | dify-web | - | Public URL of the Dify API, used by published apps. |
| `CONSOLE_API_URL` | dify-web | - | Public URL of the Dify console API. |
| `MARKETPLACE_URL` | dify-web | https://marketplace.dify.ai | URL of the Dify plugin marketplace. |
| `MARKETPLACE_API_URL` | dify-web | https://marketplace.dify.ai | API URL of the Dify plugin marketplace. |
| `NEXT_TELEMETRY_DISABLED` | dify-web | 1 | Disables Next.js telemetry. |
| `MODE` | worker | worker | Run mode for the Dify image; this service runs the Celery worker. |
| `DB_HOST` | worker | - | Postgres host — the pgvector service’s private domain. |
| `DB_PORT` | worker | 5432 | Postgres port. |
| `DB_TYPE` | worker | postgresql | Database engine type. |
| `REDIS_DB` | worker | 0 | Redis database index used for caching. |
| `LOG_LEVEL` | worker | INFO | Application log verbosity. |
| `S3_REGION` | worker | us-east-1 | S3 region (any value works for MinIO). |
| `DEPLOY_ENV` | worker | PRODUCTION | Deployment environment name. |
| `REDIS_HOST` | worker | - | Redis host — the redis service’s private domain. |
| `REDIS_PORT` | worker | 6379 | Redis port. |
| `SECRET_KEY` | worker | (secret) | Secret key, shared with the dify-api service. |
| `DB_DATABASE` | worker | - | Name of the Postgres database Dify uses. |
| `DB_PASSWORD` | worker | (secret) | Postgres password, referenced from the pgvector service. |
| `DB_SSL_MODE` | worker | disable | SSL mode for Postgres connections (internal network, so disabled). |
| `DB_USERNAME` | worker | (secret) | Postgres username. |
| `S3_ENDPOINT` | worker | - | S3 API endpoint — the MinIO service’s private address. |
| `STORAGE_TYPE` | worker | s3 | File storage backend; s3 uses the bundled MinIO service. |
| `VECTOR_STORE` | worker | pgvector | Vector database backend used for embeddings. |
| `PGVECTOR_HOST` | worker | - | pgvector host — the pgvector service’s private domain. |
| `PGVECTOR_PORT` | worker | 5432 | pgvector Postgres port. |
| `PGVECTOR_USER` | worker | (secret) | pgvector Postgres username. |
| `REDIS_USE_SSL` | worker | false | Whether Redis connections use SSL (not needed on the private network). |
| `S3_ACCESS_KEY` | worker | - | S3 access key — the MinIO root user. |
| `S3_SECRET_KEY` | worker | (secret) | S3 secret key — the MinIO root password. |
| `BROKER_USE_SSL` | worker | false | Whether the Celery broker connection uses SSL. |
| `CELERY_BACKEND` | worker | redis | Backend Celery uses to store task results. |
| `REDIS_PASSWORD` | worker | (secret) | Redis password, referenced from the redis service. |
| `S3_BUCKET_NAME` | worker | dify | S3 bucket where uploaded files are stored (created by MinIO on boot). |
| `MARKETPLACE_URL` | worker | https://marketplace.dify.ai | URL of the Dify plugin marketplace. |
| `S3_ADDRESS_STYLE` | worker | path | S3 addressing style; path style is required for MinIO. |
| `CELERY_BROKER_URL` | worker | - | Redis URL Celery uses as its message broker. |
| `MIGRATION_ENABLED` | worker | false | Run database migrations on startup (handled by dify-api, so disabled here). |
| `PGVECTOR_DATABASE` | worker | - | Database that stores vector embeddings. |
| `PGVECTOR_PASSWORD` | worker | (secret) | pgvector Postgres password. |
| `PLUGIN_DAEMON_KEY` | worker | - | Key for calling the plugin daemon; must match its SERVER_KEY. |
| `PLUGIN_DAEMON_URL` | worker | - | Internal URL of the dify-plugin-daemon service. |
| `MARKETPLACE_API_URL` | worker | https://marketplace.dify.ai | API URL of the Dify plugin marketplace. |
| `MARKETPLACE_ENABLED` | worker | true | Enable the Dify plugin marketplace. |
| `SSRF_PROXY_HTTP_URL` | worker | - | HTTP proxy for outbound requests, routed through the squid service. |
| `SQLALCHEMY_POOL_SIZE` | worker | 30 | SQLAlchemy database connection pool size. |
| `SSRF_PROXY_HTTPS_URL` | worker | - | HTTPS proxy for outbound requests, routed through the squid service. |
| `CODE_EXECUTION_API_KEY` | worker | (secret) | API key for the code-execution sandbox; must match dify-sandbox API_KEY. |
| `S3_USE_AWS_MANAGED_IAM` | worker | false | Use AWS-managed IAM instead of access keys (off for MinIO). |
| `CODE_EXECUTION_ENDPOINT` | worker | - | Internal URL of the dify-sandbox code-execution service. |
| `PGVECTOR_MAX_CONNECTION` | worker | 5 | Max connections in the pgvector pool. |
| `PGVECTOR_MIN_CONNECTION` | worker | 1 | Min connections in the pgvector pool. |
| `PLUGIN_MAX_PACKAGE_SIZE` | worker | 52428800 | Max plugin package size in bytes (50 MB). |
| `SQLALCHEMY_POOL_RECYCLE` | worker | 3600 | Seconds before pooled DB connections are recycled. |
| `INNER_API_KEY_FOR_PLUGIN` | worker | (secret) | Shared secret the plugin daemon uses to call the Dify inner API. |
| `VECTOR_INDEX_NAME_PREFIX` | worker | dify | Prefix for vector index/collection names. |
| `CODE_EXECUTION_SSL_VERIFY` | worker | false | Verify SSL when calling the sandbox (internal HTTP, so disabled). |
| `MODE` | dify-api | api | Run mode for the Dify image; this service runs the API. |
| `PORT` | dify-api | 5001 | Port the API server listens on. |
| `DB_HOST` | dify-api | - | Postgres host — the pgvector service’s private domain. |
| `DB_PORT` | dify-api | 5432 | Postgres port. |
| `DB_TYPE` | dify-api | postgresql | Database engine type. |
| `REDIS_DB` | dify-api | 0 | Redis database index used for caching. |
| `DIFY_PORT` | dify-api | 5001 | Port the API server listens on. |
| `FILES_URL` | dify-api | - | Public base URL for file previews and downloads. |
| `LOG_LEVEL` | dify-api | INFO | Application log verbosity. |
| `S3_REGION` | dify-api | us-east-1 | S3 region (any value works for MinIO). |
| `DEPLOY_ENV` | dify-api | PRODUCTION | Deployment environment name. |
| `REDIS_HOST` | dify-api | - | Redis host — the redis service’s private domain. |
| `REDIS_PORT` | dify-api | 6379 | Redis port. |
| `SECRET_KEY` | dify-api | (secret) | Secret key used to sign sessions and encrypt sensitive credentials. |
| `APP_API_URL` | dify-api | - | Public API URL used by web apps. |
| `APP_WEB_URL` | dify-api | - | Public URL of the Dify web frontend. |
| `DB_DATABASE` | dify-api | - | Name of the Postgres database Dify uses. |
| `DB_PASSWORD` | dify-api | (secret) | Postgres password, referenced from the pgvector service. |
| `DB_SSL_MODE` | dify-api | disable | SSL mode for Postgres connections (internal network, so disabled). |
| `DB_USERNAME` | dify-api | (secret) | Postgres username. |
| `S3_ENDPOINT` | dify-api | - | S3 API endpoint — the MinIO service’s private address. |
| `STORAGE_TYPE` | dify-api | s3 | File storage backend; s3 uses the bundled MinIO service. |
| `VECTOR_STORE` | dify-api | pgvector | Vector database backend used for embeddings. |
| `PGVECTOR_HOST` | dify-api | - | pgvector host — the pgvector service’s private domain. |
| `PGVECTOR_PORT` | dify-api | 5432 | pgvector Postgres port. |
| `PGVECTOR_USER` | dify-api | (secret) | pgvector Postgres username. |
| `REDIS_USE_SSL` | dify-api | false | Whether Redis connections use SSL (not needed on the private network). |
| `S3_ACCESS_KEY` | dify-api | - | S3 access key — the MinIO root user. |
| `S3_SECRET_KEY` | dify-api | (secret) | S3 secret key — the MinIO root password. |
| `BROKER_USE_SSL` | dify-api | false | Whether the Celery broker connection uses SSL. |
| `CELERY_BACKEND` | dify-api | redis | Backend Celery uses to store task results. |
| `REDIS_PASSWORD` | dify-api | (secret) | Redis password, referenced from the redis service. |
| `S3_BUCKET_NAME` | dify-api | dify | S3 bucket where uploaded files are stored (created by MinIO on boot). |
| `CONSOLE_API_URL` | dify-api | - | Public URL of the console API (this service). |
| `CONSOLE_WEB_URL` | dify-api | - | Public URL of the console web frontend. |
| `MARKETPLACE_URL` | dify-api | https://marketplace.dify.ai | URL of the Dify plugin marketplace. |
| `SERVICE_API_URL` | dify-api | - | Public URL of the service API (this service). |
| `S3_ADDRESS_STYLE` | dify-api | path | S3 addressing style; path style is required for MinIO. |
| `CELERY_BROKER_URL` | dify-api | - | Redis URL Celery uses as its message broker. |
| `DIFY_BIND_ADDRESS` | dify-api | 0.0.0.0 | Address the API server binds to. |
| `MIGRATION_ENABLED` | dify-api | true | Run database migrations on startup. |
| `PGVECTOR_DATABASE` | dify-api | - | Database that stores vector embeddings. |
| `PGVECTOR_PASSWORD` | dify-api | (secret) | pgvector Postgres password. |
| `PLUGIN_DAEMON_KEY` | dify-api | - | Key for calling the plugin daemon; must match its SERVER_KEY. |
| `PLUGIN_DAEMON_URL` | dify-api | - | Internal URL of the dify-plugin-daemon service. |
| `INTERNAL_FILES_URL` | dify-api | - | Internal URL other services use to fetch files from the API. |
| `MARKETPLACE_API_URL` | dify-api | https://marketplace.dify.ai | API URL of the Dify plugin marketplace. |
| `MARKETPLACE_ENABLED` | dify-api | true | Enable the Dify plugin marketplace. |
| `SSRF_PROXY_HTTP_URL` | dify-api | - | HTTP proxy for outbound requests, routed through the squid service. |
| `SQLALCHEMY_POOL_SIZE` | dify-api | 30 | SQLAlchemy database connection pool size. |
| `SSRF_PROXY_HTTPS_URL` | dify-api | - | HTTPS proxy for outbound requests, routed through the squid service. |
| `CODE_EXECUTION_API_KEY` | dify-api | (secret) | API key for the code-execution sandbox; must match dify-sandbox API_KEY. |
| `S3_USE_AWS_MANAGED_IAM` | dify-api | false | Use AWS-managed IAM instead of access keys (off for MinIO). |
| `CODE_EXECUTION_ENDPOINT` | dify-api | - | Internal URL of the dify-sandbox code-execution service. |
| `PGVECTOR_MAX_CONNECTION` | dify-api | 5 | Max connections in the pgvector pool. |
| `PGVECTOR_MIN_CONNECTION` | dify-api | 1 | Min connections in the pgvector pool. |
| `PLUGIN_MAX_PACKAGE_SIZE` | dify-api | 52428800 | Max plugin package size in bytes (50 MB). |
| `SQLALCHEMY_POOL_RECYCLE` | dify-api | 3600 | Seconds before pooled DB connections are recycled. |
| `INNER_API_KEY_FOR_PLUGIN` | dify-api | (secret) | Shared secret the plugin daemon uses to call the Dify inner API. |
| `VECTOR_INDEX_NAME_PREFIX` | dify-api | dify | Prefix for vector index/collection names. |
| `CODE_EXECUTION_SSL_VERIFY` | dify-api | false | Verify SSL when calling the sandbox (internal HTTP, so disabled). |
| `CONSOLE_CORS_ALLOW_ORIGINS` | dify-api | * | Allowed CORS origins for the console API. |
| `PLUGIN_REMOTE_INSTALL_HOST` | dify-api | - | Host for remote plugin debugging — the plugin daemon’s private domain. |
| `PLUGIN_REMOTE_INSTALL_PORT` | dify-api | 5003 | Port for remote plugin debugging on the plugin daemon. |
| `WEB_API_CORS_ALLOW_ORIGINS` | dify-api | * | Allowed CORS origins for the web API. |
| `REDIS_PASSWORD` | redis | (secret) | Password Redis requires for connections (enforced via --requirepass). |
| `POSTGRES_DB` | pgvector | dify | Name of the default Postgres database created on first boot. |
| `POSTGRES_USER` | pgvector | (secret) | Username for the Postgres superuser account. |
| `POSTGRES_PASSWORD` | pgvector | (secret) | Password for the Postgres superuser account. |

## Configuration

- **Start command:** `sh -c 'mkdir -p /data/dify && minio server --address ":9000" --console-address ":9001" /data'`
- **Volume:** `/data`
- **Volume:** `/app/storage`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `sh -c "printf 'http_port 3128\nacl all src all\nhttp_access allow all\ncoredump_dir /var/spool/squid\ndns_v4_first on\nrequest_timeout 2 minutes\n' > /etc/squid/squid.conf && exec /usr/sbin/squid -f /etc/squid/squid.conf -NYC 1"`
- **Start command:** `sh -c 'redis-server --requirepass "$REDIS_PASSWORD"'`
- **Start command:** `sh -c "echo 'CREATE DATABASE dify_plugin;' > /docker-entrypoint-initdb.d/10-dify-plugin.sql; exec docker-entrypoint.sh postgres"`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/exquisite-growth)
