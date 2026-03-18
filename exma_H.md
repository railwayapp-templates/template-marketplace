# Deploy Langfuse v3 on Railway

Open source observability and analytics for LLM applications

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/exma_H)

## About

Langfuse is an open source observability & analytics solution for LLM-based applications. It is mostly geared towards production usage but some users also use it for local development of their LLM applications.

Langfuse is focused on applications built on top of LLMs. Many new abstractions and common best practices evolved recently, e.g. agents, chained prompts, embedding-based retrieval, LLM access to REPLs & APIs. These make applications more powerful but also unpredictable for developers as they cannot fully anticipate how changes impact the quality, cost and overall latency of their application. Thus Langfuse helps to monitor and debug these applications.

Using this template, you can deploy Langfuse to Railway. It automatically creates Postgres, Clickhouse, and Redis databases and Minio instance to store your production data.

In case of errors, try restarting the application container or join the Discord to get help: https://langfuse.com/discord

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| minio | `minio/minio` | Database |
| redis | `bitnami/redis:7.2.5` | Database |
| langfuse-worker | `langfuse/langfuse-worker:3` | Worker |
| clickhouse | `clickhouse/clickhouse-server:24` | Database |
| langfuse-web | `langfuse/langfuse:3` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `MINIO_ROOT_USER` | minio | (secret) | - |
| `MINIO_PRIVATE_PORT` | minio | 9000 | - |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | - |
| `REDISHOST` | redis | - | Railway Private Domain Name. |
| `REDISPORT` | redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | redis | default | Default user to connect to Redis. |
| `REDIS_URL` | redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | redis | no | Disable writing to AOF file. |
| `SALT` | langfuse-worker | - | You can generate it your own, e.g. using "openssl rand -base64 32" |
| `DATABASE_URL` | langfuse-worker | - | Connection string of your Postgres database. |
| `NEXTAUTH_URL` | langfuse-worker | - | Public url of application |
| `ENCRYPTION_KEY` | langfuse-worker | 0000000000000000000000000000000000000000000000000000000000000000 | - |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) | - |
| `NEXTAUTH_SECRET` | langfuse-worker | (secret) | You can generate it your own, e.g. using "openssl rand -base64 32" |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) | - |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-worker | false | - |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-worker | langfuse | - |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-worker | events/ | - |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-worker | us-east-1 | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-worker | langfuse | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-worker | media/ | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-worker | us-east-1 | - |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | minio | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-worker | minio | - |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-worker | true | - |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) | - |
| `PORT` | clickhouse | 8123 | - |
| `PUBLIC_PORT` | clickhouse | 443 | - |
| `CLICKHOUSE_DB` | clickhouse | default | - |
| `INTERNAL_PORT` | clickhouse | 9000 | - |
| `CLICKHOUSE_USER` | clickhouse | (secret) | - |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) | - |
| `SALT` | langfuse-web | - | You can generate it your own, e.g. using "openssl rand -base64 32" |
| `DATABASE_URL` | langfuse-web | - | Connection string of your Postgres database. |
| `NEXTAUTH_URL` | langfuse-web | - | Public url of application |
| `ENCRYPTION_KEY` | langfuse-web | 0000000000000000000000000000000000000000000000000000000000000000 | - |
| `CLICKHOUSE_USER` | langfuse-web | (secret) | - |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) | You can generate it your own, e.g. using "openssl rand -base64 32" |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) | - |
| `CLICKHOUSE_CLUSTER_ENABLED` | langfuse-web | false | - |
| `LANGFUSE_S3_EVENT_UPLOAD_BUCKET` | langfuse-web | langfuse | - |
| `LANGFUSE_S3_EVENT_UPLOAD_PREFIX` | langfuse-web | events/ | - |
| `LANGFUSE_S3_EVENT_UPLOAD_REGION` | langfuse-web | us-east-1 | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_BUCKET` | langfuse-web | langfuse | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_PREFIX` | langfuse-web | media/ | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_REGION` | langfuse-web | us-east-1 | - |
| `LANGFUSE_S3_EVENT_UPLOAD_ACCESS_KEY_ID` | langfuse-web | minio | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_ACCESS_KEY_ID` | langfuse-web | minio | - |
| `LANGFUSE_S3_EVENT_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_FORCE_PATH_STYLE` | langfuse-web | true | - |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | - |
| `LANGFUSE_S3_MEDIA_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c 'mkdir -p /data/langfuse && minio server --address ":9000" --console-address ":9001" /data'`
- **Healthcheck:** `/minio/health/ready`
- **Volume:** `/data`
- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Healthcheck:** `/ping`
- **Volume:** `/var/lib/clickhouse`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/exma_H)
