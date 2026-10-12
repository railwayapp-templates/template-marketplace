# Deploy RAGFlow v0.27 Document AI Engine on Railway

Chat with PDFs, contracts and docs. Deep-document RAG with Elasticsearch.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ragflow-v027-document-ai-engine)

## About

RAGFlow is an open-source retrieval-augmented generation engine built around deep document understanding: it parses PDFs, scans, tables and slides into well-structured chunks and answers questions with traceable citations. This community template deploys RAGFlow v0.27 on Railway with Elasticsearch, MySQL, Redis, a Railway Bucket and a separate parsing worker.

RAGFlow combines several components. The web service serves the UI and API through nginx; task executors run the DeepDoc OCR and layout models that turn uploaded files into chunks, call your embedding model and write chunks and vectors to Elasticsearch. MySQL stores users, datasets and settings, Redis carries the task queue, and object storage keeps the original files. Parsing is CPU- and memory-intensive, so this template runs it in its own service that you can scale independently of the UI. Original files go to a Railway Bucket through RAGFlow's S3 backend instead of a MinIO container, and every password and secret is generated at deploy time. Expect a memory-heavy stack: plan for roughly 6–10 GB of RAM.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ragflow | [baranberkay96/ragflow-railway](https://github.com/baranberkay96/ragflow-railway) (branch: main) (root: /services/ragflow) | Web service |
| ragflow-worker | [baranberkay96/ragflow-railway](https://github.com/baranberkay96/ragflow-railway) (branch: main) (root: /services/ragflow) | Worker |
| Redis | `redis:8.2` | Database |
| MySQL | `mysql:9` | Database |
| Elasticsearch | [baranberkay96/ragflow-railway](https://github.com/baranberkay96/ragflow-railway) (branch: main) (root: /services/elasticsearch) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | ragflow | UTC | Container timezone (upstream .env uses Asia/Shanghai). |
| `PORT` | ragflow | 80 | nginx port serving the UI and proxying the API (public domain target). |
| `DEVICE` | ragflow | cpu | CPU image; Railway has no GPUs. |
| `ES_HOST` | ragflow | - | Elasticsearch host (private network, port 9200). |
| `ES_USER` | ragflow | (secret) | Elasticsearch user. |
| `S3_BUCKET` | ragflow | - | Railway Bucket name (single-bucket mode). |
| `S3_REGION` | ragflow | - | Railway Bucket region. |
| `DOC_ENGINE` | ragflow | elasticsearch | Document/vector engine (upstream default). |
| `MYSQL_HOST` | ragflow | - | MySQL host (private network). |
| `MYSQL_PORT` | ragflow | - | MySQL port. |
| `MYSQL_USER` | ragflow | (secret) | MySQL user (root, as upstream). |
| `REDIS_HOST` | ragflow | - | Redis host (task queue, locks, caches). |
| `REDIS_PORT` | ragflow | - | Redis port. |
| `HF_ENDPOINT` | ragflow | https://huggingface.co | Model download endpoint. The image defaults to a China mirror (hf-mirror.com). |
| `MYSQL_DBNAME` | ragflow | - | Database for RAGFlow metadata (created by the MySQL image). |
| `RAGFLOW_ROLE` | ragflow | web | Runs nginx/UI, API server, admin server and data-source sync (no parsing workers). |
| `STORAGE_IMPL` | ragflow | AWS_S3 | Store uploaded files and parsed images in S3 (Railway Bucket) instead of MinIO. |
| `S3_ACCESS_KEY` | ragflow | - | Bucket access key. |
| `S3_SECRET_KEY` | ragflow | (secret) | Bucket secret key. |
| `MYSQL_PASSWORD` | ragflow | (secret) | MySQL password (reference). |
| `REDIS_PASSWORD` | ragflow | (secret) | Redis password. |
| `S3_PREFIX_PATH` | ragflow | ragflow | Key prefix; files are stored as <prefix>/<dataset-id>/<file> so per-dataset deletes stay scoped. |
| `S3_ENDPOINT_URL` | ragflow | - | Railway Bucket S3 endpoint. |
| `API_PROXY_SCHEME` | ragflow | python | Use the Python API server behind the bundled nginx (upstream default). |
| `ELASTIC_PASSWORD` | ragflow | (secret) | Elasticsearch password (reference). |
| `REGISTER_ENABLED` | ragflow | 1 | Allow sign-up so you can create the first account. Set to 0 after your team has registered. |
| `RAGFLOW_SECRET_KEY` | ragflow | (secret) | Signs sessions and tokens. Generated once; shared with ragflow-worker. |
| `S3_ADDRESSING_STYLE` | ragflow | virtual | Railway Buckets require virtual-hosted-style requests. |
| `ADMIN_DEFAULT_PASSWORD` | ragflow | (secret) | Password of the built-in superuser admin@ragflow.io (admin server). Generated instead of upstream's 'admin'. |
| `TZ` | ragflow-worker | UTC | Container timezone (upstream .env uses Asia/Shanghai). |
| `DEVICE` | ragflow-worker | cpu | CPU image; Railway has no GPUs. |
| `ES_HOST` | ragflow-worker | - | Elasticsearch host (private network, port 9200). |
| `ES_USER` | ragflow-worker | (secret) | Elasticsearch user. |
| `S3_BUCKET` | ragflow-worker | - | Railway Bucket name (single-bucket mode). |
| `S3_REGION` | ragflow-worker | - | Railway Bucket region. |
| `DOC_ENGINE` | ragflow-worker | elasticsearch | Document/vector engine (upstream default). |
| `MYSQL_HOST` | ragflow-worker | - | MySQL host (private network). |
| `MYSQL_PORT` | ragflow-worker | - | MySQL port. |
| `MYSQL_USER` | ragflow-worker | (secret) | MySQL user (root, as upstream). |
| `REDIS_HOST` | ragflow-worker | - | Redis host (task queue, locks, caches). |
| `REDIS_PORT` | ragflow-worker | - | Redis port. |
| `HF_ENDPOINT` | ragflow-worker | https://huggingface.co | Model download endpoint. The image defaults to a China mirror (hf-mirror.com). |
| `MYSQL_DBNAME` | ragflow-worker | - | Database for RAGFlow metadata (created by the MySQL image). |
| `RAGFLOW_ROLE` | ragflow-worker | worker | Runs only document-parsing task executors. |
| `STORAGE_IMPL` | ragflow-worker | AWS_S3 | Store uploaded files and parsed images in S3 (Railway Bucket) instead of MinIO. |
| `S3_ACCESS_KEY` | ragflow-worker | - | Bucket access key. |
| `S3_SECRET_KEY` | ragflow-worker | (secret) | Bucket secret key. |
| `MYSQL_PASSWORD` | ragflow-worker | (secret) | MySQL password (reference). |
| `REDIS_PASSWORD` | ragflow-worker | (secret) | Redis password. |
| `S3_PREFIX_PATH` | ragflow-worker | ragflow | Key prefix; files are stored as <prefix>/<dataset-id>/<file> so per-dataset deletes stay scoped. |
| `S3_ENDPOINT_URL` | ragflow-worker | - | Railway Bucket S3 endpoint. |
| `API_PROXY_SCHEME` | ragflow-worker | python | Use the Python API server behind the bundled nginx (upstream default). |
| `ELASTIC_PASSWORD` | ragflow-worker | (secret) | Elasticsearch password (reference). |
| `RAGFLOW_SECRET_KEY` | ragflow-worker | (secret) | Must match the ragflow service. |
| `S3_ADDRESSING_STYLE` | ragflow-worker | virtual | Railway Buckets require virtual-hosted-style requests. |
| `RAGFLOW_TASK_EXECUTORS` | ragflow-worker | 1 | Task executor processes in this container (~1.5-3 GB RAM each while parsing). Scale with this or with replicas. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
| `MYSQLHOST` | MySQL | - | Railway Private Domain Name. |
| `MYSQLPORT` | MySQL | 3306 | MySQL port. |
| `MYSQLUSER` | MySQL | root | MySQL user, used for the Data panel. |
| `MYSQL_URL` | MySQL | - | URL to connect to MySQL. |
| `MYSQLDATABASE` | MySQL | - | Default database, used for Data panel. |
| `MYSQLPASSWORD` | MySQL | (secret) | Root password, used for Data panel. |
| `MYSQL_DATABASE` | MySQL | railway | Database to be created on image startup. |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password for MySQL DB. |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms2g -Xmx2g | JVM heap. Keep about half of the RAM you want ES to use; without it ES sizes the heap from the host. |
| `network.host` | Elasticsearch | 0.0.0.0 | Bind address. 0.0.0.0, not '::': the image writes these settings to YAML unquoted and '::' breaks the parse. Java binds dual-stack here. |
| `discovery.type` | Elasticsearch | single-node | Single-node cluster (also skips production bootstrap checks). |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Password of the elastic user, generated. |
| `bootstrap.memory_lock` | Elasticsearch | false | memlock ulimits cannot be raised on Railway. |
| `node.store.allow_mmap` | Elasticsearch | false | Do not depend on the host's vm.max_map_count, which containers cannot change. |
| `xpack.security.enabled` | Elasticsearch | true | Require the elastic user's password (as upstream). |
| `ingest.geoip.downloader.enabled` | Elasticsearch | false | Skip GeoIP database downloads (unused by RAGFlow). |
| `xpack.security.http.ssl.enabled` | Elasticsearch | false | Plain HTTP inside the private network (as upstream). |
| `xpack.security.transport.ssl.enabled` | Elasticsearch | false | No transport TLS for a single node (as upstream). |

## Configuration

- **Healthcheck:** `/api/v1/system/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G --max-connections=1000 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci`
- **Volume:** `/var/lib/mysql`
- **Volume:** `/usr/share/elasticsearch/data`

**Category:** AI/ML · **Tags:** ragflow, rag, document-ai, pdf, elasticsearch · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ragflow-v027-document-ai-engine)
