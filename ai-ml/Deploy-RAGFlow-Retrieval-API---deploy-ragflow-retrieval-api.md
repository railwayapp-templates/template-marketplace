# Deploy Deploy RAGFlow Retrieval API on Railway

RAGFlow HTTP API for retrieval and chat

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-ragflow-retrieval-api)

## About

This template runs RAGFlow v0.27.2 as an HTTP retrieval and chat backend. Create a key in the UI, call your-domain/api/v1 with a Bearer header, and cite sources from your own app without owning a parsing pipeline.

Your documents stay in infrastructure you control: MySQL, Elasticsearch, Redis and a MinIO-compatible store, all inside your Railway project, with secrets generated per deploy.

Railway wires the five services, their volumes, the health check and private networking, which is the part that usually eats a weekend. Model provider keys go in the UI after deploy, not in env vars.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MySQL | `mysql:8.4.11@sha256:24989179f58856db763f418010c1169fecc944e3ec1ea7e921572d83eb070f70` | Database |
| Elasticsearch | `elasticsearch:8.11.3@sha256:58a3a280935d830215802322e9a0373faaacdfd646477aa7e718939c2f29292a` | Database |
| ragflow | `infiniflow/ragflow:v0.27.2@sha256:e6b3f1a185c0a70abb3a72e1092415df8c5c6a4fae0089545554f2936c4b27ab` | Web service |
| MinIO | `pgsty/silo:RELEASE.2026-08-06T00-00-00Z@sha256:29a498b24669cae1fed11c1a2fb2b3d73c68829a0a9c0b14e71b386671d38fac` | Database |
| Redis | `redis:8.2.10@sha256:47670742d7924adbcdb404d1288b6327815b23141969c0939b8e5d61f78c2634` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `MYSQLHOST` | MySQL | - | Private hostname of the MySQL service. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port (3306). |
| `MYSQLUSER` | MySQL | root | MySQL user (root). |
| `MYSQL_URL` | MySQL | - | Private MySQL connection URL. |
| `MYSQLDATABASE` | MySQL | - | Alias of the database name for other services. |
| `MYSQLPASSWORD` | MySQL | (secret) | Alias of the root password for other services. |
| `MYSQL_DATABASE` | MySQL | rag_flow | Database created on first boot (rag_flow). |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | MySQL root password, generated per deploy. |
| `PORT` | Elasticsearch | 9200 | Elasticsearch HTTP port (9200). |
| `node.name` | Elasticsearch | es01 | Node name (es01). |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms1g -Xmx1g | JVM heap size (1 GB); raise for large knowledge bases. |
| `cluster.name` | Elasticsearch | ragflow | Cluster name (ragflow). |
| `discovery.type` | Elasticsearch | single-node | Single-node cluster mode. |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Password for the elastic user, generated per deploy. |
| `xpack.ml.enabled` | Elasticsearch | false | Machine learning features; off to save memory. |
| `bootstrap.memory_lock` | Elasticsearch | false | Lock heap in RAM; off because Railway cannot raise memlock. |
| `node.store.allow_mmap` | Elasticsearch | false | Use mmap for index files; off so vm.max_map_count is not needed. |
| `xpack.security.enabled` | Elasticsearch | true | Require authentication (true). |
| `ingest.geoip.downloader.enabled` | Elasticsearch | false | GeoIP database downloads; off. |
| `xpack.security.http.ssl.enabled` | Elasticsearch | false | HTTPS on the REST API; off on the private network. |
| `xpack.security.transport.ssl.enabled` | Elasticsearch | false | TLS between nodes; off for one node. |
| `TZ` | ragflow | UTC | Container timezone (UTC). |
| `PORT` | ragflow | 80 | Public port Railway routes to; nginx serves UI and API (80). |
| `DEVICE` | ragflow | cpu | Compute device for DeepDoc models; cpu. |
| `DB_TYPE` | ragflow | mysql | Metadata database type; mysql. |
| `ES_HOST` | ragflow | - | Elasticsearch private hostname; port 9200 is added. |
| `ES_USER` | ragflow | (secret) | Elasticsearch user (elastic). |
| `DOC_ENGINE` | ragflow | elasticsearch | Document engine backend; elasticsearch. |
| `MINIO_HOST` | ragflow | - | MinIO private hostname; RAGFlow appends port 9000. |
| `MINIO_USER` | ragflow | (secret) | MinIO root user from the MinIO service. |
| `MYSQL_HOST` | ragflow | - | MySQL private hostname from the MySQL service. |
| `MYSQL_PORT` | ragflow | - | MySQL port from the MySQL service. |
| `MYSQL_USER` | ragflow | (secret) | MySQL user from the MySQL service. |
| `REDIS_HOST` | ragflow | - | Redis private hostname; RAGFlow appends port 6379. |
| `HF_ENDPOINT` | ragflow | https://huggingface.co | Hugging Face endpoint for model downloads. |
| `USE_DOCLING` | ragflow | false | Install and use Docling parser at boot; false. |
| `MYSQL_DBNAME` | ragflow | - | MySQL database name (rag_flow). |
| `DOC_BULK_SIZE` | ragflow | 4 | Chunks written to the doc engine per batch (4). |
| `MINIO_PASSWORD` | ragflow | (secret) | MinIO root password from the MinIO service. |
| `MYSQL_PASSWORD` | ragflow | (secret) | MySQL password from the MySQL service. |
| `REDIS_PASSWORD` | ragflow | (secret) | Redis password from the Redis service. |
| `API_PROXY_SCHEME` | ragflow | python | API proxy mode; python (upstream default). |
| `ELASTIC_PASSWORD` | ragflow | (secret) | Elasticsearch password from the Elasticsearch service. |
| `MYSQL_MAX_PACKET` | ragflow | 1073741824 | Max MySQL packet size in bytes (1 GB). |
| `REGISTER_ENABLED` | ragflow | 1 | Allow sign-up (1); set 0 after creating accounts. |
| `RAGFLOW_PUBLIC_URL` | ragflow | - | Public URL for reference only; not read by RAGFlow. |
| `RAGFLOW_SECRET_KEY` | ragflow | (secret) | Signs sessions and API tokens; changing it logs everyone out. |
| `EMBEDDING_BATCH_SIZE` | ragflow | 16 | Texts sent per embedding request (16). |
| `ADMIN_DEFAULT_PASSWORD` | ragflow | (secret) | Built-in superuser password, set on first creation only. |
| `DEFAULT_SUPERUSER_EMAIL` | ragflow | admin@ragflow.io | Built-in superuser email (admin@ragflow.io). |
| `THREAD_POOL_MAX_WORKERS` | ragflow | 128 | Max worker threads for background tasks (128). |
| `PORT` | MinIO | 9000 | MinIO S3 API port (9000). |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO root user (ragflow). |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | MinIO root password, generated per deploy. |
| `REDISHOST` | Redis | - | Private hostname of the Redis service. |
| `REDISPORT` | Redis | 6379 | Redis port (6379). |
| `REDISUSER` | Redis | default | Redis user (default). |
| `REDIS_URL` | Redis | - | Private Redis connection URL. |
| `REDISPASSWORD` | Redis | (secret) | Alias of the Redis password for other services. |
| `REDIS_PASSWORD` | Redis | (secret) | Redis password, generated per deploy. |

## Configuration

- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G --max-connections=1000 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --max-allowed-packet=1073741824`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/bash -c "rm -rf /usr/share/elasticsearch/data/lost+found; chown -R 1000:0 /usr/share/elasticsearch/data && cd /usr/share/elasticsearch && exec setpriv --reuid=1000 --regid=0 --clear-groups env HOME=/usr/share/elasticsearch /bin/tini -- /usr/local/bin/docker-entrypoint.sh eswrapper"`
- **Volume:** `/usr/share/elasticsearch/data`
- **Start command:** `/ragflow/entrypoint.sh --enable-adminserver --init-model-provider-tables`
- **Healthcheck:** `/api/v1/system/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/ragflow/logs`
- **Start command:** `/usr/bin/docker-entrypoint.sh silo server /data --address :9000 --console-address :9001`
- **Healthcheck:** `/minio/health/live`
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/deploy-ragflow-retrieval-api)
