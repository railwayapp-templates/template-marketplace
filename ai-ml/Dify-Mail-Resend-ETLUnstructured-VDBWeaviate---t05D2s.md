# Deploy Dify (Mail: Resend / ETL:Unstructured / VDB:Weaviate) on Railway

Dify works with Resend + Unstructured + Weaviate

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/t05D2s)

## About

# Dify

[Dify](https://dify.ai) is an open-source platform for building AI applications that combines Backend-as-a-Service and LLMOps to streamline the development of generative AI solutions.

## Tools
- Vector Database : [Weaviate](https://weaviate.io) (Self-hosted)
- ETL : [Unstructured](https://unstructured.io)
- Transactional Email : [Resend](https://resend.com)
- RAG Source (Option) : [Notion](https://www.notion.so)

## Requirements
- [Resend](https://resend.com) (Free for 3K emails/mo.): Sending out email for password reset
- [Unstructured](https://unstructured.io/api-key-hosted) ($1/1K pages): ETL for LLMs
- [Notion Public Integration](https://www.notion.so/profile/integrations) (Optional) : For RAG from Notion

## Config
- `RESEND_API_KEY` : Copy from [Resend API keys](https://resend.com/api-keys)
- `MAIL_DEFAULT_SEND_FROM`  : Sender email address via Resend
- `UNSTRUCTURED_API_KEY` :  Copy from [Unstructured](https://app.unstructured.io/keys)

## Setup
1. Access to the public URL of “Web”
2. In case the admin account setting form is not shown, append `/install` to the end of URL

## Update Dify Version
Just to redeploy the following service (Deploy from the latest Dify’s Docker Images)
- Worker
- Api
- Web
- Sandbox 

## Links
- [Dify Github](https://github.com/langgenius/dify)
- [Dify Docs](https://docs.dify.ai)
- [Weaviate](https://weaviate.io)
- [Resend](https://resend.com/)
- [Unstructured](https://unstructured.io)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Storage provision | `minio/mc` | Database |
| Storage | `minio/minio` | Database |
| Api | `langgenius/dify-api:latest` | Web service |
| Sandbox | `langgenius/dify-sandbox:main` | Database |
| Weaviate | `semitechnologies/weaviate` | Database |
| plugin-daemon | `langgenius/dify-plugin-daemon:main-local` | Database |
| Redis | `redis:6-alpine` | Database |
| Postgres | `postgres:15-alpine` | Database |
| Worker | `langgenius/dify-api:latest` | Worker |
| Web | `langgenius/dify-web:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `MINIO_ROOT_USER` | Storage provision | (secret) |
| `MINIO_ROOT_PASSWORD` | Storage provision | (secret) |
| `MINIO_BUCKET` | Storage | difyai |
| `MINIO_ROOT_USER` | Storage | (secret) |
| `MINIO_PRIVATE_PORT` | Storage | 9000 |
| `MINIO_ROOT_PASSWORD` | Storage | (secret) |
| `MODE` | Api | api |
| `PORT` | Api | 5001 |
| `ETL_TYPE` | Api | Unstructured |
| `REDIS_DB` | Api | 0 |
| `LOG_LEVEL` | Api | INFO |
| `MAIL_TYPE` | Api | resend |
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
| `RESEND_API_KEY` | Api | (secret) |
| `RESEND_API_URL` | Api | https://api.resend.com |
| `CODE_MAX_NUMBER` | Api | 9223372036854775807 |
| `CODE_MIN_NUMBER` | Api | -9223372036854775808 |
| `MAX_SUBMIT_COUNT` | Api | 500 |
| `WEAVIATE_API_KEY` | Api | (secret) |
| `DIFY_BIND_ADDRESS` | Api | [::] |
| `MAX_VARIABLE_SIZE` | Api | 204800000 |
| `MIGRATION_ENABLED` | Api | true |
| `MAX_PARALLEL_LIMIT` | Api | 500 |
| `MARKETPLACE_API_URL` | Api | https://marketplace.dify.ai |
| `MARKETPLACE_ENABLED` | Api | true |
| `UNSTRUCTURED_API_KEY` | Api | (secret) |
| `UNSTRUCTURED_API_URL` | Api | https://api.unstructuredapp.io/general/v0/general |
| `PLUGIN_DAEMON_ENABLED` | Api | true |
| `WEAVIATE_GRPC_ENABLED` | Api | true |
| `APP_MAX_EXECUTION_TIME` | Api | 1200000 |
| `CODE_MAX_STRING_LENGTH` | Api | 8000000 |
| `S3_USE_AWS_MANAGED_IAM` | Api | false |
| `SMTP_OPPORTUNISTIC_TLS` | Api | false |
| `UPLOAD_FILE_SIZE_LIMIT` | Api | 500 |
| `APP_MAX_ACTIVE_REQUESTS` | Api | 1000 |
| `UPLOAD_FILE_BATCH_LIMIT` | Api | 50 |
| `WORKFLOW_CALL_MAX_DEPTH` | Api | 500 |
| `INNER_API_KEY_FOR_PLUGIN` | Api | (secret) |
| `NGINX_CLIENT_MAX_BODY_SIZE` | Api | 500M |
| `TEXT_GENERATION_TIMEOUT_MS` | Api | 60000000000 |
| `CODE_EXECUTION_READ_TIMEOUT` | Api | 3000 |
| `WORKFLOW_MAX_EXECUTION_TIME` | Api | 360000 |
| `CODE_EXECUTION_WRITE_TIMEOUT` | Api | 3000 |
| `CODE_MAX_NUMBER_ARRAY_LENGTH` | Api | 1000000 |
| `CODE_MAX_OBJECT_ARRAY_LENGTH` | Api | 1000000 |
| `CODE_MAX_STRING_ARRAY_LENGTH` | Api | 1000000 |
| `HTTP_REQUEST_NODE_SSL_VERIFY` | Api | False |
| `MULTIMODAL_SEND_IMAGE_FORMAT` | Api | base64 |
| `UPLOAD_AUDIO_FILE_SIZE_LIMIT` | Api | 500 |
| `UPLOAD_IMAGE_FILE_SIZE_LIMIT` | Api | 50 |
| `UPLOAD_VIDEO_FILE_SIZE_LIMIT` | Api | 500 |
| `WORKFLOW_MAX_EXECUTION_STEPS` | Api | 100000 |
| `TEMPLATE_TRANSFORM_MAX_LENGTH` | Api | 80000000 |
| `WORKFLOW_PARALLEL_DEPTH_LIMIT` | Api | 300 |
| `CODE_EXECUTION_CONNECT_TIMEOUT` | Api | 3000 |
| `PORT` | Sandbox | 8194 |
| `SANDBOX_PORT` | Sandbox | 8194 |
| `WORKER_TIMEOUT` | Sandbox | 6000000 |
| `SANDBOX_API_KEY` | Sandbox | (secret) |
| `SANDBOX_GIN_MODE` | Sandbox | release |
| `SANDBOX_ENABLE_NETWORK` | Sandbox | true |
| `SANDBOX_WORKER_TIMEOUT` | Sandbox | 150000 |
| `PORT` | Weaviate | 8080 |
| `CLUSTER_HOSTNAME` | Weaviate | node1 |
| `QUERY_DEFAULTS_LIMIT` | Weaviate | 25 |
| `PERSISTENCE_DATA_PATH` | Weaviate | /var/lib/weaviate |
| `DEFAULT_VECTORIZER_MODULE` | Weaviate | none |
| `AUTHENTICATION_APIKEY_ENABLED` | Weaviate | true |
| `AUTHORIZATION_ADMINLIST_ENABLED` | Weaviate | true |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Weaviate | false |
| `GIN_MODE` | plugin-daemon | release |
| `PLATFORM` | plugin-daemon | local |
| `DB_DATABASE` | plugin-daemon | dify_plugin |
| `DB_PASSWORD` | plugin-daemon | (secret) |
| `DB_USERNAME` | plugin-daemon | (secret) |
| `SERVER_PORT` | plugin-daemon | 5002 |
| `PPROF_ENABLED` | plugin-daemon | false |
| `REDIS_PASSWORD` | plugin-daemon | (secret) |
| `MIGRATION_ENABLED` | plugin-daemon | true |
| `ROUTINE_POOL_SIZE` | plugin-daemon | 1024 |
| `DB_MIGRATION_FORCE` | plugin-daemon | true |
| `DIFY_INNER_API_KEY` | plugin-daemon | (secret) |
| `PLUGIN_STORAGE_TYPE` | plugin-daemon | local |
| `PLUGIN_WORKING_PATH` | plugin-daemon | cwd |
| `PLUGIN_DAEMON_ENABLED` | plugin-daemon | true |
| `PLUGIN_INSTALLED_PATH` | plugin-daemon | plugin |
| `PLUGIN_WEBHOOK_ENABLED` | plugin-daemon | true |
| `MAX_PLUGIN_PACKAGE_SIZE` | plugin-daemon | 52428800 |
| `PYTHON_ENV_INIT_TIMEOUT` | plugin-daemon | 320 |
| `PERSISTENCE_STORAGE_PATH` | plugin-daemon | persistence |
| `FORCE_VERIFYING_SIGNATURE` | plugin-daemon | true |
| `PLUGIN_STORAGE_LOCAL_ROOT` | plugin-daemon | ./storage |
| `PERSISTENCE_STORAGE_MAX_SIZE` | plugin-daemon | 104857600 |
| `PLUGIN_MAX_EXECUTION_TIMEOUT` | plugin-daemon | 24000 |
| `PLUGIN_REMOTE_INSTALLING_HOST` | plugin-daemon | 0.0.0.0 |
| `PLUGIN_REMOTE_INSTALLING_PORT` | plugin-daemon | 5003 |
| `PLUGIN_REMOTE_INSTALLING_ENABLED` | plugin-daemon | true |
| `DIFY_PLUGIN_SERVERLESS_CONNECTOR_URL` | plugin-daemon | http://127.0.0.1:5004 |
| `DIFY_INVOCATION_CONNECTION_IDLE_TIMEOUT` | plugin-daemon | 120 |
| `DIFY_PLUGIN_SERVERLESS_CONNECTOR_API_KEY` | plugin-daemon | (secret) |
| `REDISUSER` | Redis | default |
| `REDIS_PASSWORD` | Redis | (secret) |
| `REDISPORT_PRIVATE` | Redis | 6379 |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `PGPORT_PRIVATE` | Postgres | 5432 |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
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
| `RESEND_API_KEY` | Worker | (secret) |
| `WEAVIATE_API_KEY` | Worker | (secret) |
| `UNSTRUCTURED_API_KEY` | Worker | (secret) |
| `INNER_API_KEY_FOR_PLUGIN` | Worker | (secret) |
| `PORT` | Web | 3000 |
| `HOSTNAME` | Web | :: |
| `MARKETPLACE_URL` | Web | https://marketplace.dify.ai |
| `LOOP_NODE_MAX_COUNT` | Web | 100 |
| `MARKETPLACE_API_URL` | Web | https://marketplace.dify.ai |
| `NEXT_PUBLIC_MAX_TOOLS_NUM` | Web | 50 |
| `NEXT_PUBLIC_MAX_PARALLEL_LIMIT` | Web | 50 |

## Configuration

- **Start command:** `/bin/sh -c "sleep 10 && /usr/bin/mc config host add minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && /usr/bin/mc mb minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/dependencies`
- **Volume:** `/var/lib/weaviate`
- **TCP Proxies:** 5003
- **Volume:** `/app/storage`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/t05D2s)
