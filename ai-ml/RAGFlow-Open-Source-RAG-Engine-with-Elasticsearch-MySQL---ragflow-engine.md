# Deploy RAGFlow | Open-Source RAG Engine with Elasticsearch & MySQL on Railway

Deep-document RAG engine: chat with PDFs, docs and sheets, with citations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ragflow-engine)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/ragflow-engine?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=ragflow-engine)

[RAGFlow](https://ragflow.io/) is an open-source RAG (retrieval-augmented generation) engine built around deep document understanding. It parses PDFs, Word files, slides, spreadsheets, scans and web pages into clean, layout-aware chunks, indexes them for hybrid full-text and vector search, and lets you chat with your knowledge bases through grounded answers that cite their sources. It also has an agent builder, an OpenAI-compatible API and an MCP server. This template runs the official RAGFlow image with Elasticsearch, MySQL, MinIO and Redis, each with its own volume.

The stack is five services, the same shape as upstream's Docker Compose setup:

- **RAGFlow** (`infiniflow/ragflow:v0.27.2`, pinned): one container runs the web UI behind its built-in nginx, the API server and the document parsing task executor. The admin server and the data-source sync worker are optional (see below), which keeps the default stack lean. It is the only public service. Its health check (`/api/v1/system/healthz`) only passes once MySQL, Redis, Elasticsearch and MinIO all answer.
- **Elasticsearch 8.11** (upstream's tested version): the full-text and vector index. Single-node, password-protected, 1 GB JVM heap, data on a volume. Disk watermarks are off so a small Railway volume does not flip the index to read-only.
- **MySQL 8.0**: users, knowledge bases, documents and settings.
- **MinIO** (the `pgsty/silo` build upstream uses): stores the original uploaded files on a volume.
- **Redis 8**: the parsing task queue and cache, with an append-only file on a volume.

Every password, plus RAGFlow's session signing key and the built-in superuser's password, is generated per deployment; none of upstream's well-known defaults (`infini_rag_flow`, admin password `admin`) are used.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Elasticsearch | `elasticsearch:8.11.3` | Database |
| RAGFlow | `infiniflow/ragflow:v0.27.2` | Web service |
| MySQL | `mysql:8.0.40` | Database |
| Redis | `redis:8.10.2-alpine` | Database |
| MinIO | `pgsty/silo:RELEASE.2026-08-06T00-00-00Z` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms1g -Xmx1g | JVM heap. 1 GB suits small and medium knowledge bases; raise it (and the service RAM) for large ones |
| `discovery.type` | Elasticsearch | single-node | Single-node cluster |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Auto-generated password of the elastic user (only applied on first boot) |
| `xpack.ml.enabled` | Elasticsearch | false | Machine-learning node features are not used by RAGFlow; off saves memory |
| `bootstrap.memory_lock` | Elasticsearch | false | Memory locking is not available on Railway |
| `xpack.security.enabled` | Elasticsearch | true | Require the elastic password |
| `ingest.geoip.downloader.enabled` | Elasticsearch | false | GeoIP database downloads are not needed |
| `xpack.security.http.ssl.enabled` | Elasticsearch | false | Plain HTTP inside the private network |
| `xpack.security.transport.ssl.enabled` | Elasticsearch | false | Single node, no transport TLS needed |
| `cluster.routing.allocation.disk.threshold_enabled` | Elasticsearch | false | Disk watermarks would make the index read-only on small Railway volumes |
| `TZ` | RAGFlow | UTC | Server time zone |
| `PORT` | RAGFlow | 80 | Port of RAGFlow's built-in nginx (web UI + API) - leave as is |
| `ES_HOST` | RAGFlow | - | Elasticsearch on the private network |
| `DOC_ENGINE` | RAGFlow | elasticsearch | Full-text + vector index backend |
| `MINIO_HOST` | RAGFlow | - | MinIO (uploaded files) on the private network, port 9000 |
| `MINIO_USER` | RAGFlow | (secret) | MinIO access key |
| `MYSQL_HOST` | RAGFlow | - | MySQL on the private network |
| `REDIS_HOST` | RAGFlow | - | Redis (task queue + cache) on the private network |
| `MYSQL_DBNAME` | RAGFlow | - | MySQL database |
| `MINIO_PASSWORD` | RAGFlow | (secret) | MinIO secret key |
| `MYSQL_PASSWORD` | RAGFlow | (secret) | MySQL root password |
| `REDIS_PASSWORD` | RAGFlow | (secret) | Redis password |
| `API_PROXY_SCHEME` | RAGFlow | python | Serve the API with the Python server (upstream default) |
| `ELASTIC_PASSWORD` | RAGFlow | (secret) | Elasticsearch password |
| `ENABLE_DATA_SYNC` | RAGFlow | false | true = run the data-source sync worker for connectors like Confluence, Notion, Google Drive or S3 (about +0.8 GB RAM). File uploads work without it |
| `REGISTER_ENABLED` | RAGFlow | 1 | 1 = anyone who reaches the URL can sign up (each user gets their own workspace). Set to 0 after creating your accounts |
| `RAGFLOW_SECRET_KEY` | RAGFlow | (secret) | Signs login sessions and API tokens. Changing it logs everyone out |
| `ENABLE_ADMIN_SERVER` | RAGFlow | false | true = also run the admin server: the /admin panel and the built-in superuser below (about +1 GB RAM) |
| `ADMIN_DEFAULT_PASSWORD` | RAGFlow | (secret) | Password of the built-in superuser (DEFAULT_SUPERUSER_EMAIL), created when the admin server first starts (ENABLE_ADMIN_SERVER=true). Changing this later does not change an existing account |
| `DEFAULT_SUPERUSER_EMAIL` | RAGFlow | admin@ragflow.io | Email of the built-in superuser created when the admin server first starts |
| `MYSQL_DATABASE` | MySQL | rag_flow | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Auto-generated MySQL root password |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated Redis password |
| `MINIO_ROOT_USER` | MinIO | (secret) | MinIO access key |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) | Auto-generated MinIO secret key |

## Configuration

- **Start command:** `/bin/bash -c "chown -R 1000:0 /usr/share/elasticsearch/data && exec env HOME=/usr/share/elasticsearch setpriv --reuid=1000 --regid=0 --clear-groups /usr/local/bin/docker-entrypoint.sh eswrapper"`
- **Volume:** `/usr/share/elasticsearch/data`
- **Start command:** `/bin/bash -c "a=--init-model-provider-tables; [ x$ENABLE_ADMIN_SERVER = xtrue ] && a=$a' --enable-adminserver'; [ x$ENABLE_DATA_SYNC = xtrue ] || a=$a' --disable-datasync'; exec /ragflow/entrypoint.sh $a"`
- **Healthcheck:** `/api/v1/system/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh mysqld --datadir=/var/lib/mysql/data --max_connections=1000 --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci --default-authentication-plugin=mysql_native_password --skip-log-bin --performance-schema=OFF`
- **Volume:** `/var/lib/mysql`
- **Start command:** `/bin/sh -c "chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --appendonly yes --maxmemory 128mb --maxmemory-policy volatile-lru"`
- **Volume:** `/data`
- **Start command:** `/usr/bin/docker-entrypoint.sh server /data --address :9000 --console-address :9001`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/ragflow-engine)
