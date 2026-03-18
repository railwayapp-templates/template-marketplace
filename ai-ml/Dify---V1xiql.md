# Deploy Dify on Railway

An open-source LLM app development platform

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/V1xiql)

## About

Dify is an open-source LLM app development platform. Its intuitive interface combines AI workflow, RAG pipeline, agent capabilities, model management, observability features and more, letting you quickly go from prototype to production.

Hosting Dify means running a comprehensive LLM application platform that orchestrates AI workflows, manages multiple model integrations, and provides development tools for building AI applications. The platform requires coordinating database connections, managing LLM provider APIs, handling file storage for documents and models, and maintaining user authentication and workspace management. Production deployment involves configuring environment variables for model providers, setting up persistent storage for workflows and data, and managing the complex multi-service architecture. Railway simplifies Dify deployment by providing integrated database hosting, managing environment variable configuration for LLM providers, handling persistent storage requirements, and coordinating the multi-container setup with automatic service discovery.

![Dify Platform](https://github.com/langgenius/dify/assets/13230914/f9e19af5-61ba-4119-b926-d10c4c06ebab)

⚠️ **Important Setup Note**: After deploying for the first time, you'll need the auto-generated `INIT_PASSWORD` variable in the `Api` service to setup the admin account. After deploying for the first time additionally, you can delete both "Storage Provision" and "Database Provision" services. Expect possible loading delays as a result of cache on fresh deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Web | `langgenius/dify-web` | Web service |
| Sandbox | `langgenius/dify-sandbox` | Database |
| Redis | `redis:6-alpine` | Database |
| Api | `langgenius/dify-api` | Web service |
| Weaviate | `semitechnologies/weaviate` | Database |
| Plugin Daemon | `langgenius/dify-plugin-daemon:latest-local` | Worker |
| Database Provision | `postgres:15-alpine` | Database |
| Worker | `langgenius/dify-api` | Worker |
| Postgres | `postgres:15-alpine` | Database |
| Storage Provision | `minio/mc` | Database |
| Storage | `minio/minio` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Web | 3000 |
| `PORT` | Sandbox | 8194 |
| `SANDBOX_PORT` | Sandbox | 8194 |
| `SANDBOX_API_KEY` | Sandbox | (secret) |
| `SANDBOX_ENABLE_NETWORK` | Sandbox | true |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `MODE` | Api | api |
| `PORT` | Api | 5001 |
| `REDIS_DB` | Api | 0 |
| `S3_REGION` | Api | auto |
| `SECRET_KEY` | Api | (secret) |
| `DB_DATABASE` | Api | dify |
| `DB_PASSWORD` | Api | (secret) |
| `DB_USERNAME` | Api | (secret) |
| `STORAGE_TYPE` | Api | s3 |
| `VECTOR_STORE` | Api | weaviate |
| `INIT_PASSWORD` | Api | (secret) |
| `S3_SECRET_KEY` | Api | (secret) |
| `REDIS_PASSWORD` | Api | (secret) |
| `REDIS_USERNAME` | Api | (secret) |
| `S3_BUCKET_NAME` | Api | dify |
| `WEAVIATE_API_KEY` | Api | (secret) |
| `DIFY_BIND_ADDRESS` | Api | [::] |
| `MIGRATION_ENABLED` | Api | true |
| `CODE_EXECUTION_API_KEY` | Api | (secret) |
| `INNER_API_KEY_FOR_PLUGIN` | Api | (secret) |
| `PLUGIN_REMOTE_INSTALL_PORT` | Api | 5003 |
| `PORT` | Weaviate | 8080 |
| `CLUSTER_HOSTNAME` | Weaviate | node1 |
| `QUERY_DEFAULTS_LIMIT` | Weaviate | 25 |
| `PERSISTENCE_DATA_PATH` | Weaviate | /var/lib/weaviate |
| `DEFAULT_VECTORIZER_MODULE` | Weaviate | none |
| `AUTHENTICATION_APIKEY_ENABLED` | Weaviate | true |
| `AUTHORIZATION_ADMINLIST_ENABLED` | Weaviate | true |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Weaviate | false |
| `AWS_REGION` | Plugin Daemon | auto |
| `S3_USE_AWS` | Plugin Daemon | true |
| `DB_DATABASE` | Plugin Daemon | dify_plugin |
| `DB_PASSWORD` | Plugin Daemon | (secret) |
| `DB_USERNAME` | Plugin Daemon | (secret) |
| `SERVER_PORT` | Plugin Daemon | 5002 |
| `AWS_SECRET_KEY` | Plugin Daemon | (secret) |
| `REDIS_PASSWORD` | Plugin Daemon | (secret) |
| `S3_USE_PATH_STYLE` | Plugin Daemon | true |
| `DIFY_INNER_API_KEY` | Plugin Daemon | (secret) |
| `PLUGIN_STORAGE_TYPE` | Plugin Daemon | s3 |
| `PLUGIN_WORKING_PATH` | Plugin Daemon | /app/storage/cwd |
| `PLUGIN_WEBHOOK_ENABLED` | Plugin Daemon | true |
| `S3_USE_AWS_MANAGED_IAM` | Plugin Daemon | false |
| `PLUGIN_STORAGE_OSS_BUCKET` | Plugin Daemon | dify-plugin |
| `PLUGIN_REMOTE_INSTALLING_HOST` | Plugin Daemon | 0.0.0.0 |
| `PLUGIN_REMOTE_INSTALLING_PORT` | Plugin Daemon | 5003 |
| `MODE` | Worker | worker |
| `PORT` | Worker | 5001 |
| `S3_REGION` | Worker | auto |
| `SECRET_KEY` | Worker | (secret) |
| `DB_DATABASE` | Worker | dify |
| `DB_PASSWORD` | Worker | (secret) |
| `DB_USERNAME` | Worker | (secret) |
| `STORAGE_TYPE` | Worker | s3 |
| `VECTOR_STORE` | Worker | weaviate |
| `S3_SECRET_KEY` | Worker | (secret) |
| `REDIS_PASSWORD` | Worker | (secret) |
| `REDIS_USERNAME` | Worker | (secret) |
| `S3_BUCKET_NAME` | Worker | dify |
| `WEAVIATE_API_KEY` | Worker | (secret) |
| `INNER_API_KEY_FOR_PLUGIN` | Worker | (secret) |
| `PLUGIN_REMOTE_INSTALL_PORT` | Worker | 5003 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `MINIO_ROOT_USER` | Storage Provision | (secret) |
| `MINIO_ROOT_PASSWORD` | Storage Provision | (secret) |
| `PORT` | Storage | 9001 |
| `MINIO_ROOT_USER` | Storage | (secret) |
| `MINIO_ROOT_PASSWORD` | Storage | (secret) |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/dependencies`
- **TCP Proxies:** 6379
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Volume:** `/var/lib/weaviate`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "sleep 10 && mc alias set minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && mc mb --ignore-existing minio/dify && mc anonymous set public minio/dify/public && mc mb --ignore-existing minio/dify-plugin && mc anonymous set public minio/dify-plugin/public && exit 0"`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:9000 --console-address :9001 $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/V1xiql)
