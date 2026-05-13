# Deploy Dify v1.14.1 on Railway

Open-source AI platform with BaaS & LLMOps for all users.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/TiT2V6)

## About

After deploying Dify for the first time, do not start the admin installation yet.

Before creating the root admin account, you must set up custom domains for both the Web service and the API service. You must also set the cookie domain so authentication works correctly across subdomains.

### 1. Add custom domains

Assign a custom domain to:
	•	The Web service (e.g., app.example.com)
	•	The API service (e.g., api.example.com)

Railway will automatically update the environment variables when you attach these custom domains.

### 2. Configure DNS

Add the DNS records provided by Railway.

Once DNS has propagated, click each custom domain link in the Railway dashboard to confirm they load correctly:
	•	The Web custom domain should display the Dify UI.
	•	The API custom domain should return a normal API response.

Continue only once both domains work.

### 3. Set the cookie domain (API service only)

To allow login, sessions, and CSRF protection to work across subdomains, manually set the cookie domain in the API service environment variables:

COOKIE_DOMAIN=.yourdomain.com

Example
```
COOKIE_DOMAIN=.example.com
```

This value is not injected automatically. You must set it manually.
Without the correct cookie domain, session cookies and CSRF tokens will not work.

### 4. Redeploy both services

Redeploy both services:
	•	API service
	•	Web service

This ensures both services rebuild using the new custom domains and the correct cookie domain.

### 5. Proceed with admin setup

Once redeployments are complete, visit your Web custom domain (e.g., https://app.example.com).
You will see the installation screen and can safely create the root admin account.

With the custom domains and cookie domain configured, authentication, cookies, and CSRF validation will work correctly.


**Dify** is an open-source platform for building AI applications. We combine Backend-as-a-Service and LLMOps to streamline the development of generative AI solutions, making it accessible to both developers and non-technical innovators.


**Dify integrates:**
- Support for mainstream LLMs
- An intuitive Prompt orchestration interface
- High-quality RAG engines
- A flexible AI Agent framework
- An Intuitive Low-code Workflow
- Easy-to-use interfaces and APIs

With Dify, you can skip the complexity and focus on what matters most - creating innovative AI applications that solve real-world problems.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Weaviate | `semitechnologies/weaviate:1.32.19` | Database |
| Storage provision | `minio/mc:RELEASE.2025-02-21T16-00-46Z` | Database |
| Sandbox | `langgenius/dify-sandbox:0.2.15` | Database |
| Worker | `langgenius/dify-api:1.14.1` | Worker |
| Api | `langgenius/dify-api:1.14.1` | Web service |
| Storage | `minio/minio:RELEASE.2025-02-28T09-55-16Z` | Database |
| plugin-daemon | `langgenius/dify-plugin-daemon:0.6.0-local` | Database |
| Postgres | `postgres:15-alpine` | Database |
| Redis | `redis:6-alpine` | Database |
| Web | `langgenius/dify-web:1.14.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Weaviate | 8080 | - |
| `CLUSTER_HOSTNAME` | Weaviate | node1 | - |
| `QUERY_DEFAULTS_LIMIT` | Weaviate | 25 | - |
| `PERSISTENCE_DATA_PATH` | Weaviate | /var/lib/weaviate | - |
| `DEFAULT_VECTORIZER_MODULE` | Weaviate | none | - |
| `AUTHENTICATION_APIKEY_ENABLED` | Weaviate | true | - |
| `AUTHORIZATION_ADMINLIST_ENABLED` | Weaviate | true | - |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Weaviate | false | - |
| `MINIO_ROOT_USER` | Storage provision | (secret) | - |
| `MINIO_ROOT_PASSWORD` | Storage provision | (secret) | - |
| `PORT` | Sandbox | 8194 | - |
| `SANDBOX_PORT` | Sandbox | 8194 | - |
| `SANDBOX_API_KEY` | Sandbox | (secret) | - |
| `SANDBOX_GIN_MODE` | Sandbox | release | - |
| `SANDBOX_ENABLE_NETWORK` | Sandbox | true | - |
| `SANDBOX_WORKER_TIMEOUT` | Sandbox | 15 | - |
| `MODE` | Worker | worker | - |
| `PORT` | Worker | 5001 | - |
| `S3_REGION` | Worker | auto | - |
| `SECRET_KEY` | Worker | (secret) | - |
| `DB_PASSWORD` | Worker | (secret) | - |
| `DB_USERNAME` | Worker | (secret) | - |
| `STORAGE_TYPE` | Worker | s3 | - |
| `VECTOR_STORE` | Worker | weaviate | - |
| `S3_SECRET_KEY` | Worker | (secret) | - |
| `REDIS_PASSWORD` | Worker | (secret) | - |
| `REDIS_USERNAME` | Worker | (secret) | - |
| `WEAVIATE_API_KEY` | Worker | (secret) | - |
| `INNER_API_KEY_FOR_PLUGIN` | Worker | (secret) | - |
| `MODE` | Api | api | - |
| `PORT` | Api | 5001 | - |
| `REDIS_DB` | Api | 0 | - |
| `LOG_LEVEL` | Api | INFO | - |
| `MAIL_TYPE` | Api | - | smtp or resend |
| `S3_REGION` | Api | auto | - |
| `SMTP_PORT` | Api | - | 465 |
| `SECRET_KEY` | Api | (secret) | - |
| `DB_PASSWORD` | Api | (secret) | - |
| `DB_USERNAME` | Api | (secret) | - |
| `SMTP_SERVER` | Api | - | smtp.gmail.com |
| `SMTP_USE_TLS` | Api | true | - |
| `STORAGE_TYPE` | Api | s3 | - |
| `VECTOR_STORE` | Api | weaviate | - |
| `COOKIE_DOMAIN` | Api | - | Set it up with ".yourdomain.com" |
| `INIT_PASSWORD` | Api | (secret) | - |
| `S3_SECRET_KEY` | Api | (secret) | - |
| `SMTP_PASSWORD` | Api | (secret) | - |
| `SMTP_USERNAME` | Api | (secret) | - |
| `REDIS_PASSWORD` | Api | (secret) | - |
| `REDIS_USERNAME` | Api | (secret) | - |
| `WEAVIATE_API_KEY` | Api | (secret) | - |
| `MIGRATION_ENABLED` | Api | true | - |
| `MARKETPLACE_API_URL` | Api | https://marketplace.dify.ai | - |
| `MARKETPLACE_ENABLED` | Api | true | - |
| `SMTP_OPPORTUNISTIC_TLS` | Api | false | - |
| `UPLOAD_FILE_SIZE_LIMIT` | Api | 15 | - |
| `UPLOAD_FILE_BATCH_LIMIT` | Api | 5 | - |
| `INNER_API_KEY_FOR_PLUGIN` | Api | (secret) | - |
| `HTTP_REQUEST_NODE_SSL_VERIFY` | Api | False | - |
| `UPLOAD_AUDIO_FILE_SIZE_LIMIT` | Api | 50 | - |
| `UPLOAD_IMAGE_FILE_SIZE_LIMIT` | Api | 10 | - |
| `UPLOAD_VIDEO_FILE_SIZE_LIMIT` | Api | 100 | - |
| `RESPECT_XFORWARD_HEADERS_ENABLED` | Api | true | - |
| `MINIO_BUCKET` | Storage | difyai | - |
| `MINIO_ROOT_USER` | Storage | (secret) | - |
| `MINIO_PRIVATE_PORT` | Storage | 9000 | - |
| `MINIO_ROOT_PASSWORD` | Storage | (secret) | - |
| `GIN_MODE` | plugin-daemon | release | - |
| `PLATFORM` | plugin-daemon | local | - |
| `SERVER_KEY` | plugin-daemon | lYkiYYT6owG+71oLerGzA7GXCgOT++6ovaezWAjpCjf+Sjc3ZtU+qUEi | - |
| `DB_DATABASE` | plugin-daemon | dify_plugin | - |
| `DB_PASSWORD` | plugin-daemon | (secret) | - |
| `DB_USERNAME` | plugin-daemon | (secret) | - |
| `SERVER_PORT` | plugin-daemon | 5002 | - |
| `PPROF_ENABLED` | plugin-daemon | false | - |
| `REDIS_PASSWORD` | plugin-daemon | (secret) | - |
| `ROUTINE_POOL_SIZE` | plugin-daemon | 1024 | - |
| `DIFY_INNER_API_KEY` | plugin-daemon | (secret) | - |
| `PLUGIN_STORAGE_TYPE` | plugin-daemon | local | - |
| `PLUGIN_WORKING_PATH` | plugin-daemon | cwd | - |
| `PLUGIN_INSTALLED_PATH` | plugin-daemon | plugin | - |
| `PLUGIN_WEBHOOK_ENABLED` | plugin-daemon | true | - |
| `MAX_PLUGIN_PACKAGE_SIZE` | plugin-daemon | 52428800 | - |
| `PYTHON_ENV_INIT_TIMEOUT` | plugin-daemon | 120 | - |
| `PERSISTENCE_STORAGE_PATH` | plugin-daemon | persistence | - |
| `FORCE_VERIFYING_SIGNATURE` | plugin-daemon | true | - |
| `PLUGIN_STORAGE_LOCAL_ROOT` | plugin-daemon | ./storage | - |
| `PERSISTENCE_STORAGE_MAX_SIZE` | plugin-daemon | 104857600 | - |
| `PLUGIN_REMOTE_INSTALLING_HOST` | plugin-daemon | 0.0.0.0 | - |
| `PLUGIN_REMOTE_INSTALLING_PORT` | plugin-daemon | 5003 | - |
| `PLUGIN_REMOTE_INSTALLING_ENABLED` | plugin-daemon | true | - |
| `DIFY_PLUGIN_SERVERLESS_CONNECTOR_URL` | plugin-daemon | http://127.0.0.1:5004 | - |
| `DIFY_INVOCATION_CONNECTION_IDLE_TIMEOUT` | plugin-daemon | 120 | - |
| `DIFY_PLUGIN_SERVERLESS_CONNECTOR_API_KEY` | plugin-daemon | (secret) | - |
| `POSTGRES_DB` | Postgres | dify | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `PGPORT_PRIVATE` | Postgres | 5432 | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDISPORT_PRIVATE` | Redis | 6379 | - |
| `PORT` | Web | 3000 | - |
| `HOSTNAME` | Web | :: | - |
| `MARKETPLACE_URL` | Web | https://marketplace.dify.ai | - |
| `LOOP_NODE_MAX_COUNT` | Web | 100 | - |
| `MARKETPLACE_API_URL` | Web | https://marketplace.dify.ai | - |
| `NEXT_PUBLIC_COOKIE_DOMAIN` | Web | 1 | - |
| `NEXT_PUBLIC_MAX_TOOLS_NUM` | Web | 10 | - |
| `NEXT_PUBLIC_MAX_PARALLEL_LIMIT` | Web | 10 | - |

## Configuration

- **Volume:** `/var/lib/weaviate`
- **Start command:** `/bin/sh -c "sleep 10 && /usr/bin/mc config host add minio ${MINIO_ENDPOINT} ${MINIO_ROOT_USER} ${MINIO_ROOT_PASSWORD} && /usr/bin/mc mb minio/${MINIO_BUCKET} && /usr/bin/mc anonymous set public minio/${MINIO_BUCKET}/public && exit 0"`
- **Volume:** `/dependencies`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "exec minio server --address [::]:$MINIO_PRIVATE_PORT $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **TCP Proxies:** 5003
- **Volume:** `/app/storage`
- **Start command:** `/bin/sh -c "unset PGPORT; docker-entrypoint.sh postgres --port=5432"`
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/TiT2V6)
