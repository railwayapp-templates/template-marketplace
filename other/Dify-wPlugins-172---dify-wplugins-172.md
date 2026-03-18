# Deploy Dify (w/Plugins) 1.7.2 on Railway

Deploy and Host Dify (w/Plugins) 1.7.2 with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-wplugins-172)

## About

**Dify** is an open-source platform for building production-grade LLM apps. It blends agentic workflows, RAG pipelines, model management, observability, and a visual builder so teams can go from prototype to production fast, while keeping full control in self-hosted setups. ([GitHub][1], [Dify Docs][2])

Hosting Dify on Railway is straightforward: provision a service from this template, set environment variables, and connect core services. Dify runs well via Docker Compose or Helm; for production you’ll typically wire up PostgreSQL, Redis, an object store (S3/Azure/OSS/GCS), and a vector database. Configure public URLs (console and API), enable HTTPS on a custom domain, and monitor logs as you scale resources. If you choose local file storage, mount a persistent Volume; otherwise point Dify to external object storage. This mirrors Dify’s self-hosting guidance and common K8s/Docker setups. ([Dify Docs][3], [Dify][4], [Artifact Hub][5])

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| plugin-daemon | `langgenius/dify-plugin-daemon:0.2.0-local` | Database |
| Storage | `minio/minio:RELEASE.2025-02-28T09-55-16Z` | Database |
| Sandbox | `langgenius/dify-sandbox:0.2.12` | Database |
| Web | `langgenius/dify-web:1.7.2` | Web service |
| Worker | `langgenius/dify-api:1.7.2` | Worker |
| Postgres | `postgres:15-alpine` | Database |
| Api | `langgenius/dify-api:1.7.2` | Web service |
| Weaviate | `semitechnologies/weaviate:1.19.0` | Database |
| Redis | `redis:6-alpine` | Database |
| Storage provision | `minio/mc:RELEASE.2025-02-21T16-00-46Z` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `GIN_MODE` | plugin-daemon | release |
| `PLATFORM` | plugin-daemon | local |
| `DB_DATABASE` | plugin-daemon | dify_plugin |
| `DB_PASSWORD` | plugin-daemon | (secret) |
| `DB_USERNAME` | plugin-daemon | (secret) |
| `SERVER_PORT` | plugin-daemon | 5002 |
| `PPROF_ENABLED` | plugin-daemon | false |
| `REDIS_PASSWORD` | plugin-daemon | (secret) |
| `ROUTINE_POOL_SIZE` | plugin-daemon | 1024 |
| `DIFY_INNER_API_KEY` | plugin-daemon | (secret) |
| `PLUGIN_STORAGE_TYPE` | plugin-daemon | local |
| `PLUGIN_WORKING_PATH` | plugin-daemon | cwd |
| `PLUGIN_INSTALLED_PATH` | plugin-daemon | plugin |
| `PLUGIN_WEBHOOK_ENABLED` | plugin-daemon | true |
| `MAX_PLUGIN_PACKAGE_SIZE` | plugin-daemon | 52428800 |
| `PYTHON_ENV_INIT_TIMEOUT` | plugin-daemon | 120 |
| `PERSISTENCE_STORAGE_PATH` | plugin-daemon | persistence |
| `FORCE_VERIFYING_SIGNATURE` | plugin-daemon | true |
| `PLUGIN_STORAGE_LOCAL_ROOT` | plugin-daemon | ./storage |
| `PERSISTENCE_STORAGE_MAX_SIZE` | plugin-daemon | 104857600 |
| `PLUGIN_REMOTE_INSTALLING_HOST` | plugin-daemon | 0.0.0.0 |
| `PLUGIN_REMOTE_INSTALLING_PORT` | plugin-daemon | 5003 |
| `PLUGIN_REMOTE_INSTALLING_ENABLED` | plugin-daemon | true |
| `DIFY_PLUGIN_SERVERLESS_CONNECTOR_URL` | plugin-daemon | http://127.0.0.1:5004 |
| `DIFY_INVOCATION_CONNECTION_IDLE_TIMEOUT` | plugin-daemon | 120 |
| `DIFY_PLUGIN_SERVERLESS_CONNECTOR_API_KEY` | plugin-daemon | (secret) |
| `MINIO_BUCKET` | Storage | difyai |
| `MINIO_ROOT_USER` | Storage | (secret) |
| `MINIO_PRIVATE_PORT` | Storage | 9000 |
| `MINIO_ROOT_PASSWORD` | Storage | (secret) |
| `PORT` | Sandbox | 8194 |
| `SANDBOX_PORT` | Sandbox | 8194 |
| `SANDBOX_API_KEY` | Sandbox | (secret) |
| `SANDBOX_GIN_MODE` | Sandbox | release |
| `SANDBOX_ENABLE_NETWORK` | Sandbox | true |
| `SANDBOX_WORKER_TIMEOUT` | Sandbox | 15 |
| `PORT` | Web | 3000 |
| `HOSTNAME` | Web | :: |
| `MARKETPLACE_URL` | Web | https://marketplace.dify.ai |
| `LOOP_NODE_MAX_COUNT` | Web | 100 |
| `MARKETPLACE_API_URL` | Web | https://marketplace.dify.ai |
| `NEXT_PUBLIC_MAX_TOOLS_NUM` | Web | 10 |
| `NEXT_PUBLIC_MAX_PARALLEL_LIMIT` | Web | 10 |
| `MODE` | Worker | worker |
| `PORT` | Worker | 5001 |
| `S3_REGION` | Worker | auto |
| `SECRET_KEY` | Worker | (secret) |
| `DB_PASSWORD` | Worker | (secret) |
| `DB_USERNAME` | Worker | (secret) |
| `STORAGE_TYPE` | Worker | s3 |
| `VECTOR_STORE` | Worker | weaviate |
| `S3_SECRET_KEY` | Worker | (secret) |
| `REDIS_PASSWORD` | Worker | (secret) |
| `REDIS_USERNAME` | Worker | (secret) |
| `WEAVIATE_API_KEY` | Worker | (secret) |
| `INNER_API_KEY_FOR_PLUGIN` | Worker | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `PGPORT_PRIVATE` | Postgres | 5432 |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `MODE` | Api | api |
| `PORT` | Api | 5001 |
| `REDIS_DB` | Api | 0 |
| `LOG_LEVEL` | Api | INFO |
| `S3_REGION` | Api | auto |
| `SECRET_KEY` | Api | (secret) |
| `DB_PASSWORD` | Api | (secret) |
| `DB_USERNAME` | Api | (secret) |
| `SMTP_USE_TLS` | Api | true |
| `STORAGE_TYPE` | Api | s3 |
| `VECTOR_STORE` | Api | weaviate |
| `INIT_PASSWORD` | Api | (secret) |
| `S3_SECRET_KEY` | Api | (secret) |
| `REDIS_PASSWORD` | Api | (secret) |
| `REDIS_USERNAME` | Api | (secret) |
| `WEAVIATE_API_KEY` | Api | (secret) |
| `DIFY_BIND_ADDRESS` | Api | [::] |
| `MIGRATION_ENABLED` | Api | true |
| `MARKETPLACE_API_URL` | Api | https://marketplace.dify.ai |
| `MARKETPLACE_ENABLED` | Api | true |
| `SMTP_OPPORTUNISTIC_TLS` | Api | false |
| `UPLOAD_FILE_SIZE_LIMIT` | Api | 15 |
| `UPLOAD_FILE_BATCH_LIMIT` | Api | 5 |
| `INNER_API_KEY_FOR_PLUGIN` | Api | (secret) |
| `HTTP_REQUEST_NODE_SSL_VERIFY` | Api | False |
| `UPLOAD_AUDIO_FILE_SIZE_LIMIT` | Api | 50 |
| `UPLOAD_IMAGE_FILE_SIZE_LIMIT` | Api | 10 |
| `UPLOAD_VIDEO_FILE_SIZE_LIMIT` | Api | 100 |
| `PORT` | Weaviate | 8080 |
| `CLUSTER_HOSTNAME` | Weaviate | node1 |
| `QUERY_DEFAULTS_LIMIT` | Weaviate | 25 |
| `PERSISTENCE_DATA_PATH` | Weaviate | /var/lib/weaviate |
| `DEFAULT_VECTORIZER_MODULE` | Weaviate | none |
| `AUTHENTICATION_APIKEY_ENABLED` | Weaviate | true |
| `AUTHORIZATION_ADMINLIST_ENABLED` | Weaviate | true |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Weaviate | false |
| `REDISUSER` | Redis | default |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDISPORT_PRIVATE` | Redis | 6379 |
| `MINIO_ROOT_USER` | Storage provision | (secret) |
| `MINIO_ROOT_PASSWORD` | Storage provision | (secret) |

## Configuration

- **TCP Proxies:** 5003
- **Volume:** `/app/storage`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/dependencies`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Volume:** `/var/lib/weaviate`
- **Start command:** `/bin/sh -c "sleep 10 && /usr/bin/mc config host add minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && /usr/bin/mc mb minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`

**Category:** Other

[View on Railway →](https://railway.com/deploy/dify-wplugins-172)
