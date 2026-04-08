# Deploy Ragflow with infinity — Working ✅ on Railway

RAGFlow stack with Infinity and MinIO, tested 100% work

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ragflow-with-infinity-working)

## About

RAGFlow with Infinity is a production-ready Retrieval-Augmented
Generation (RAG) stack combining document ingestion, vector search, and
AI-powered chat. It integrates Infinity as a vector database, MinIO for
object storage, and MySQL/Redis for persistence and caching.

This template deploys a complete multi-service RAG architecture on
Railway. RAGFlow handles ingestion, chunking, embedding, and querying.
Infinity stores vectors for semantic search, MinIO stores files, MySQL
handles metadata, and Redis manages caching and queues.

All services are preconfigured to work together using internal Railway
networking. The setup is optimized for CPU deployments and includes
automatic MinIO bucket creation, secure credentials, and ready-to-use
environment variables. Once deployed, you can upload documents and
instantly query them via chat.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| minio | `minio/minio` | Database |
| MySQL | `mysql:9.4` | Database |
| Redis | `redis:8.2.1` | Database |
| ragflow | [XavTo/Ragflow](https://github.com/XavTo/Ragflow) | Web service |
| infinity | `infiniflow/infinity:v0.6.15` | Database |

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
