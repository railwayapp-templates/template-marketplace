# Deploy RAGFlow on Railway

RAGFlow (RAG Flow): document AI chat with Infinity, MySQL and MinIO.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ragflow-with-infinity-working)

## About

[Deploy RAGFlow on Railway](https://railway.com/deploy/ragflow-with-infinity-working) to build a document knowledge base with ingestion, retrieval and AI chat. This template connects **RAGFlow v0.26.4** to **Infinity v0.7.0**, **MinIO**, **MySQL** and **Redis**. Uploaded files, metadata and search data have persistent storage, and application connections use Railway's private network.

RAGFlow, also searched as **RAG Flow**, helps teams turn documents into searchable knowledge and assistants with source references. This is a **CPU configuration with external model providers**. After deployment, create your account, configure chat and embedding models, then import documents and test retrieval.

| Service | Published source | Role |
| --- | --- | --- |
| ragflow | `XavTo/Ragflow`, default RAGFlow v0.26.4 | Web UI, API, parsing and chat |
| infinity | `infiniflow/infinity:v0.7.0` | Document/vector search engine |
| minio | `minio/minio` | Uploaded objects and automatic bucket creation |
| MySQL | `mysql:9.4` | Accounts, knowledge-base metadata and application state |
| Redis | `redis:8.2.1` | Queues and caching with volume-backed snapshots |

The repository includes version-specific Nginx configuration and strictly checked parser patches for path-backed parsing. An incompatible patch target fails the image build, helping expose upstream changes before deployment. MinIO's image reference is floating; inspect and test upstream image changes before routine redeployments.

The application uses private references for `INFINITY_HOST`, `MINIO_HOST`, `MYSQL_HOST` and `REDIS_HOST`. MySQL and Redis expose Railway-style connection variables. Preserve their generated passwords; the application references those service values automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minio | `minio/minio` | Database |
| MySQL | `mysql:9.4` | Database |
| Redis | `redis:8.2.1` | Database |
| ragflow | [XavTo/Ragflow](https://github.com/XavTo/Ragflow) | Web service |
| infinity | `infiniflow/infinity:v0.7.0` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | minio | 9000 | MinIO API port |
| `MINIO_BUCKET` | minio | ragflow | Default bucket name |
| `MINIO_ROOT_USER` | minio | (secret) | MinIO root user |
| `MINIO_ROOT_PASSWORD` | minio | (secret) | MinIO root password |
| `MYSQLHOST` | MySQL | - | Internal MySQL host |
| `MYSQLPORT` | MySQL | 3306 | MySQL port |
| `MYSQLUSER` | MySQL | root | MySQL user |
| `MYSQL_URL` | MySQL | - | Internal connection URL |
| `MYSQLDATABASE` | MySQL | - | Database name |
| `MYSQLPASSWORD` | MySQL | (secret) | Database password |
| `MYSQL_DATABASE` | MySQL | rag_flow | Default database |
| `MYSQL_PUBLIC_URL` | MySQL | - | Public connection URL |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password |
| `REDISHOST` | Redis | - | Internal Redis host |
| `REDISPORT` | Redis | 6379 | Redis port |
| `REDISUSER` | Redis | default | Redis user |
| `REDIS_URL` | Redis | - | Internal connection URL |
| `REDISPASSWORD` | Redis | (secret) | Redis password |
| `REDIS_PASSWORD` | Redis | (secret) | Generated Redis password |
| `REDIS_PUBLIC_URL` | Redis | - | Public connection URL |
| `TZ` | ragflow | UTC | Timezone |
| `DEVICE` | ragflow | cpu | Compute device |
| `DOC_ENGINE` | ragflow | infinity | Document engine |
| `MINIO_HOST` | ragflow | - | MinIO host |
| `MINIO_PORT` | ragflow | 9000 | MinIO port |
| `MINIO_USER` | ragflow | (secret) | MinIO user |
| `MYSQL_HOST` | ragflow | - | MySQL host |
| `MYSQL_PORT` | ragflow | - | MySQL port |
| `MYSQL_USER` | ragflow | (secret) | MySQL user |
| `REDIS_HOST` | ragflow | - | Redis host |
| `REDIS_PORT` | ragflow | - | Redis port |
| `SECRET_KEY` | ragflow | (secret) | App secret key |
| `MINIO_BUCKET` | ragflow | ragflow | MinIO bucket |
| `MINIO_SECURE` | ragflow | false | Disable HTTPS for MinIO |
| `MYSQL_DBNAME` | ragflow | - | MySQL database |
| `INFINITY_HOST` | ragflow | - | Infinity host |
| `INFINITY_PORT` | ragflow | - | Infinity port |
| `MINIO_PASSWORD` | ragflow | (secret) | MinIO password |
| `MYSQL_PASSWORD` | ragflow | (secret) | MySQL password |
| `REDIS_PASSWORD` | ragflow | (secret) | Redis password |
| `REDIS_USERNAME` | ragflow | (secret) | Redis user |
| `API_PROXY_SCHEME` | ragflow | python | API proxy mode |
| `REGISTER_ENABLED` | ragflow | 1 | Set to 1 to enable registration, 0 to disable |
| `INFINITY_PORT` | infinity | 23817 | Infinity API port |
| `INFINITY_CONSOLE_PORT` | infinity | 23820 | Infinity console port |

## Configuration

- **Start command:** `sh -c "minio server /data --console-address :9001 & sleep 5 && mc alias set local http://127.0.0.1:9000 $MINIO_ROOT_USER $MINIO_ROOT_PASSWORD && mc mb -p local/ragflow || true; wait"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **TCP Proxies:** 3306
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/ragflow/logs`
- **Volume:** `/var/infinity`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ragflow-with-infinity-working)
