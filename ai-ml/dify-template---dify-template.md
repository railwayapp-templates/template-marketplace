# Deploy dify-template on Railway

Dify 1.17.1: pinned images, one domain, Worker, Beat, Sandbox, Weaviate

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dify-template)

## About

Dify is an open-source platform for building LLM apps: visual workflows, chatbots, agents, RAG knowledge bases and a plugin marketplace. This template deploys the full self-hosted Dify 1.17.1 stack from the official docker-compose, with every image pinned to the matching release.

Dify is several cooperating services, not one container. This template runs 11 of them, already wired together over Railway's private network:

- **Gateway** (Caddy): one public URL serves the web UI and every API, like Dify's official nginx. Console login works on the default Railway domain because session and CSRF cookies stay on one origin.
- **Api + Worker + Beat** (dify-api 1.17.1): migrations run automatically, a separate Celery worker handles indexing and workflows, Celery beat runs scheduled triggers and periodic jobs.
- **Web** (dify-web 1.17.1), **Sandbox** (0.2.15) for Python / Node.js code nodes, **Plugin Daemon** (0.6.10) with a persistent volume.
- **Weaviate 1.39.2** vector store with API-key auth.
- **MinIO** S3 storage on the private network only; Dify creates the bucket on first start (maintained `pgsty/minio` image, since upstream `minio/minio` tags are no longer pullable).
- **Postgres 18** and **Redis 8.2** with persistent volumes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Beat | `langgenius/dify-api:1.17.1` | Worker |
| Redis | `redis:8.2` | Database |
| Api | `langgenius/dify-api:1.17.1` | Web service |
| PluginDaemon | `langgenius/dify-plugin-daemon:0.6.10-local` | Web service |
| Web | `langgenius/dify-web:1.17.1` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Sandbox | `langgenius/dify-sandbox:0.2.15` | Worker |
| Worker | `langgenius/dify-api:1.17.1` | Worker |
| Gateway | `caddy:2.11.7-alpine` | Web service |
| Weaviate | `semitechnologies/weaviate:1.39.2` | Database |
| Storage | `pgsty/minio:RELEASE.2026-08-04T00-00-00Z` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MODE` | Beat | beat | - |
| `DB_TYPE` | Beat | postgresql | - |
| `REDIS_DB` | Beat | 0 | - |
| `LOG_LEVEL` | Beat | INFO | - |
| `S3_REGION` | Beat | us-east-1 | - |
| `DEPLOY_ENV` | Beat | PRODUCTION | - |
| `SECRET_KEY` | Beat | (secret) | - |
| `DB_PASSWORD` | Beat | (secret) | - |
| `DB_USERNAME` | Beat | (secret) | - |
| `STORAGE_TYPE` | Beat | s3 | - |
| `VECTOR_STORE` | Beat | weaviate | - |
| `S3_SECRET_KEY` | Beat | (secret) | - |
| `CELERY_BACKEND` | Beat | redis | - |
| `REDIS_PASSWORD` | Beat | (secret) | - |
| `S3_ADDRESS_STYLE` | Beat | path | - |
| `WEAVIATE_API_KEY` | Beat | (secret) | - |
| `MIGRATION_ENABLED` | Beat | false | - |
| `MARKETPLACE_API_URL` | Beat | https://marketplace.dify.ai | - |
| `MARKETPLACE_ENABLED` | Beat | true | - |
| `CODE_EXECUTION_API_KEY` | Beat | (secret) | - |
| `UPLOAD_FILE_SIZE_LIMIT` | Beat | 15 | - |
| `PLUGIN_MAX_PACKAGE_SIZE` | Beat | 52428800 | - |
| `INNER_API_KEY_FOR_PLUGIN` | Beat | (secret) | - |
| `CONSOLE_CORS_ALLOW_ORIGINS` | Beat | * | - |
| `WEB_API_CORS_ALLOW_ORIGINS` | Beat | * | - |
| `WORKFLOW_FILE_UPLOAD_LIMIT` | Beat | 10 | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password. Generated. |
| `MODE` | Api | api | - |
| `PORT` | Api | 5001 | - |
| `DB_TYPE` | Api | postgresql | - |
| `REDIS_DB` | Api | 0 | - |
| `DIFY_PORT` | Api | 5001 | - |
| `LOG_LEVEL` | Api | INFO | - |
| `S3_REGION` | Api | us-east-1 | - |
| `DEPLOY_ENV` | Api | PRODUCTION | - |
| `SECRET_KEY` | Api | (secret) | Signs sessions and encrypts provider credentials. Generated; never change it after first start. |
| `DB_PASSWORD` | Api | (secret) | - |
| `DB_USERNAME` | Api | (secret) | - |
| `STORAGE_TYPE` | Api | s3 | - |
| `VECTOR_STORE` | Api | weaviate | - |
| `INIT_PASSWORD` | Api | (secret) | Password asked on the /install page before you can create the first admin account. Generated; copy it from the Api service variables. |
| `S3_SECRET_KEY` | Api | (secret) | - |
| `CELERY_BACKEND` | Api | redis | - |
| `REDIS_PASSWORD` | Api | (secret) | - |
| `GUNICORN_TIMEOUT` | Api | 360 | - |
| `S3_ADDRESS_STYLE` | Api | path | - |
| `WEAVIATE_API_KEY` | Api | (secret) | - |
| `DIFY_BIND_ADDRESS` | Api | [::] | - |
| `MIGRATION_ENABLED` | Api | true | - |
| `MARKETPLACE_API_URL` | Api | https://marketplace.dify.ai | - |
| `MARKETPLACE_ENABLED` | Api | true | - |
| `CODE_EXECUTION_API_KEY` | Api | (secret) | - |
| `UPLOAD_FILE_SIZE_LIMIT` | Api | 15 | - |
| `PLUGIN_MAX_PACKAGE_SIZE` | Api | 52428800 | - |
| `INNER_API_KEY_FOR_PLUGIN` | Api | (secret) | Shared key between Api/Worker and the plugin daemon. Generated. |
| `CONSOLE_CORS_ALLOW_ORIGINS` | Api | * | - |
| `WEB_API_CORS_ALLOW_ORIGINS` | Api | * | - |
| `WORKFLOW_FILE_UPLOAD_LIMIT` | Api | 10 | - |
| `RESPECT_XFORWARD_HEADERS_ENABLED` | Api | true | - |
| `DB_TYPE` | PluginDaemon | postgresql | - |
| `GIN_MODE` | PluginDaemon | release | - |
| `PLATFORM` | PluginDaemon | local | - |
| `REDIS_DB` | PluginDaemon | 0 | - |
| `SERVER_KEY` | PluginDaemon | - | Plugin daemon API key used by Api and Worker. Generated. |
| `DB_DATABASE` | PluginDaemon | dify_plugin | - |
| `DB_PASSWORD` | PluginDaemon | (secret) | - |
| `DB_SSL_MODE` | PluginDaemon | disable | - |
| `DB_USERNAME` | PluginDaemon | (secret) | - |
| `SERVER_HOST` | PluginDaemon | [::] | - |
| `SERVER_PORT` | PluginDaemon | 5002 | - |
| `PPROF_ENABLED` | PluginDaemon | false | - |
| `REDIS_PASSWORD` | PluginDaemon | (secret) | - |
| `ROUTINE_POOL_SIZE` | PluginDaemon | 10000 | - |
| `DIFY_INNER_API_KEY` | PluginDaemon | (secret) | - |
| `PLUGIN_STORAGE_TYPE` | PluginDaemon | local | - |
| `PLUGIN_WORKING_PATH` | PluginDaemon | /app/storage/cwd | - |
| `PLUGIN_INSTALLED_PATH` | PluginDaemon | plugin | - |
| `PLUGIN_WEBHOOK_ENABLED` | PluginDaemon | true | - |
| `MAX_PLUGIN_PACKAGE_SIZE` | PluginDaemon | 52428800 | - |
| `PLUGIN_MEDIA_CACHE_PATH` | PluginDaemon | assets | - |
| `PYTHON_ENV_INIT_TIMEOUT` | PluginDaemon | 120 | - |
| `PERSISTENCE_STORAGE_PATH` | PluginDaemon | persistence | - |
| `FORCE_VERIFYING_SIGNATURE` | PluginDaemon | true | - |
| `PLUGIN_PACKAGE_CACHE_PATH` | PluginDaemon | plugin_packages | - |
| `PLUGIN_STORAGE_LOCAL_ROOT` | PluginDaemon | /app/storage | - |
| `PLUGIN_MAX_EXECUTION_TIMEOUT` | PluginDaemon | 600 | - |
| `PLUGIN_REMOTE_INSTALLING_HOST` | PluginDaemon | 0.0.0.0 | - |
| `PLUGIN_REMOTE_INSTALLING_PORT` | PluginDaemon | 5003 | - |
| `DIFY_INVOCATION_CONNECTION_IDLE_TIMEOUT` | PluginDaemon | 120 | - |
| `PORT` | Web | 3000 | - |
| `HOSTNAME` | Web | :: | - |
| `MAX_TOOLS_NUM` | Web | 10 | - |
| `MAX_TREE_DEPTH` | Web | 50 | - |
| `MARKETPLACE_URL` | Web | https://marketplace.dify.ai | - |
| `TOP_K_MAX_VALUE` | Web | 10 | - |
| `MAX_ITERATIONS_NUM` | Web | 99 | - |
| `MAX_PARALLEL_LIMIT` | Web | 10 | - |
| `LOOP_NODE_MAX_COUNT` | Web | 100 | - |
| `MARKETPLACE_API_URL` | Web | https://marketplace.dify.ai | - |
| `NEXT_TELEMETRY_DISABLED` | Web | 1 | - |
| `TEXT_GENERATION_TIMEOUT_MS` | Web | 60000 | - |
| `INDEXING_MAX_SEGMENTATION_TOKENS_LENGTH` | Web | (secret) | - |
| `POSTGRES_DB` | Postgres | dify | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Postgres password. Generated. |
| `API_KEY` | Sandbox | (secret) | Code sandbox API key used by Api and Worker. Generated. |
| `GIN_MODE` | Sandbox | release | - |
| `SANDBOX_PORT` | Sandbox | 8194 | - |
| `ENABLE_NETWORK` | Sandbox | true | - |
| `WORKER_TIMEOUT` | Sandbox | 15 | - |
| `MODE` | Worker | worker | - |
| `DB_TYPE` | Worker | postgresql | - |
| `REDIS_DB` | Worker | 0 | - |
| `LOG_LEVEL` | Worker | INFO | - |
| `S3_REGION` | Worker | us-east-1 | - |
| `DEPLOY_ENV` | Worker | PRODUCTION | - |
| `SECRET_KEY` | Worker | (secret) | - |
| `DB_PASSWORD` | Worker | (secret) | - |
| `DB_USERNAME` | Worker | (secret) | - |
| `STORAGE_TYPE` | Worker | s3 | - |
| `VECTOR_STORE` | Worker | weaviate | - |
| `S3_SECRET_KEY` | Worker | (secret) | - |
| `CELERY_BACKEND` | Worker | redis | - |
| `REDIS_PASSWORD` | Worker | (secret) | - |
| `S3_ADDRESS_STYLE` | Worker | path | - |
| `WEAVIATE_API_KEY` | Worker | (secret) | - |
| `MIGRATION_ENABLED` | Worker | false | - |
| `MARKETPLACE_API_URL` | Worker | https://marketplace.dify.ai | - |
| `MARKETPLACE_ENABLED` | Worker | true | - |
| `CELERY_WORKER_AMOUNT` | Worker | 4 | - |
| `CODE_EXECUTION_API_KEY` | Worker | (secret) | - |
| `UPLOAD_FILE_SIZE_LIMIT` | Worker | 15 | - |
| `PLUGIN_MAX_PACKAGE_SIZE` | Worker | 52428800 | - |
| `INNER_API_KEY_FOR_PLUGIN` | Worker | (secret) | - |
| `CONSOLE_CORS_ALLOW_ORIGINS` | Worker | * | - |
| `WEB_API_CORS_ALLOW_ORIGINS` | Worker | * | - |
| `WORKFLOW_FILE_UPLOAD_LIMIT` | Worker | 10 | - |
| `PORT` | Gateway | 8080 | - |
| `CLUSTER_HOSTNAME` | Weaviate | node1 | - |
| `DISABLE_TELEMETRY` | Weaviate | true | - |
| `QUERY_DEFAULTS_LIMIT` | Weaviate | 25 | - |
| `PERSISTENCE_DATA_PATH` | Weaviate | /var/lib/weaviate | - |
| `DEFAULT_VECTORIZER_MODULE` | Weaviate | none | - |
| `AUTHENTICATION_APIKEY_USERS` | Weaviate | hello@dify.ai | - |
| `AUTHENTICATION_APIKEY_ENABLED` | Weaviate | true | - |
| `AUTHORIZATION_ADMINLIST_USERS` | Weaviate | hello@dify.ai | - |
| `AUTHORIZATION_ADMINLIST_ENABLED` | Weaviate | true | - |
| `AUTHENTICATION_APIKEY_ALLOWED_KEYS` | Weaviate | - | Weaviate API key used by Api and Worker. Generated. |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Weaviate | false | - |
| `MINIO_BUCKET` | Storage | difyai | Bucket for uploaded files; Dify creates it on first start. |
| `MINIO_BROWSER` | Storage | off | - |
| `MINIO_ROOT_USER` | Storage | (secret) | MinIO access key (S3_ACCESS_KEY for Dify). Generated. |
| `MINIO_ROOT_PASSWORD` | Storage | (secret) | MinIO secret key (S3_SECRET_KEY for Dify). Generated. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/storage`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c 'printf "%s" "$CADDYFILE" > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Start command:** `/bin/weaviate --host :: --port 8080 --scheme http`
- **Volume:** `/var/lib/weaviate`
- **Start command:** `/bin/sh -c "exec minio server --address [::]:9000 $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/dify-template)
