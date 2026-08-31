# Deploy RAGFlow on Railway

Turns your documents into a searchable, citable knowledge base

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ragflow-ai)

## About

RAGFlow is an open-source retrieval-augmented generation engine built around deep document understanding. Instead of splitting a PDF on character counts, it runs layout recognition and OCR over the page first, so tables stay tables, headings stay attached to the text under them, and a scanned invoice or a 200-page manual produces chunks a language model can cite. Teams use it to turn contracts, research libraries, support archives and internal wikis into a knowledge base, then attach a chat assistant or an agent that answers with citations back to the source page.

This template lets you self-host RAGFlow on Railway with every backing service already wired together. The RAGFlow container serves the web interface and API and runs the document task executor. Elasticsearch stores chunks and serves hybrid keyword-plus-vector retrieval. A private text-embeddings-inference service loads `BAAI/bge-small-en-v1.5`, so the deployment produces real embeddings with no external API key. MySQL holds datasets, documents, users and agents, Redis carries the parsing queue, and a Railway bucket keeps the uploaded files.

![Diagram of the RAGFlow, Elasticsearch, embedding, MySQL and Redis services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788045582/ragflow-architecture.png)

RAGFlow is a complete RAG platform rather than a library: it ships the ingestion pipeline, the chunk store, a retrieval tuner, a chat builder and a visual agent canvas, so a knowledge assistant needs no orchestration code. Self-hosting matters because the documents are the sensitive part — they stay in your own infrastructure, and only the prompt leaves.

Key capabilities:

- Layout-aware parsing of PDF, DOCX, PPTX, XLSX, images, HTML and Markdown, with OCR and table recognition
- Chunk templates per document type — paper, book, laws, manual, resume, table, Q&A
- Hybrid BM25-plus-vector retrieval, with optional reranking and cross-language search
- Grounded answers citing the exact chunk and page
- A visual agent builder, an MCP server, and a REST API with Python and JavaScript SDKs

The template splits the work across five services. **RAGFlow** serves the UI and API through nginx and runs the task executor that parses documents. **Elasticsearch** holds every chunk with its vector and answers retrieval queries. **tei** runs Hugging Face's text-embeddings-inference server, keeping embedding local and free. **MySQL** stores metadata and **Redis** queues parsing jobs. The bucket holds original files, streamed back through the app rather than exposed publicly.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ragflow | [gridalpha/ragflow-railway](https://github.com/gridalpha/ragflow-railway) | Web service |
| Redis | `redis:8.2` | Database |
| elasticsearch | [gridalpha/ragflow-elasticsearch-railway](https://github.com/gridalpha/ragflow-elasticsearch-railway) | Database |
| MySQL | `mysql:9.4` | Database |
| tei | `ghcr.io/huggingface/text-embeddings-inference:cpu-1.8` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | ragflow | UTC | Container timezone |
| `PORT` | ragflow | 80 | Port Railway probes and routes to |
| `DB_TYPE` | ragflow | mysql | Metadata database flavour |
| `ES_HOST` | ragflow | - | Private Elasticsearch host |
| `ES_USER` | ragflow | (secret) | Elasticsearch superuser |
| `TEI_HOST` | ragflow | - | Private embedding server host |
| `TEI_PORT` | ragflow | 80 | Private embedding server port |
| `S3_BUCKET` | ragflow | - | Bucket name |
| `S3_REGION` | ragflow | - | Bucket region |
| `TEI_MODEL` | ragflow | BAAI/bge-small-en-v1.5 | Must match MODEL_ID on tei |
| `DOC_ENGINE` | ragflow | elasticsearch | Chunk store and retrieval backend |
| `MYSQL_HOST` | ragflow | - | Private MySQL host |
| `MYSQL_PORT` | ragflow | 3306 | MySQL port |
| `MYSQL_USER` | ragflow | (secret) | Metadata database user |
| `REDIS_HOST` | ragflow | - | Private Redis host |
| `MYSQL_DBNAME` | ragflow | - | Metadata database name |
| `STORAGE_IMPL` | ragflow | AWS_S3 | Object storage backend |
| `S3_ACCESS_KEY` | ragflow | - | Bucket access key |
| `S3_SECRET_KEY` | ragflow | (secret) | Bucket secret key |
| `MYSQL_PASSWORD` | ragflow | (secret) | Metadata database password |
| `REDIS_PASSWORD` | ragflow | (secret) | Redis auth password |
| `S3_PREFIX_PATH` | ragflow | ragflow | Key prefix inside the bucket |
| `ENABLE_REGISTER` | ragflow | 0 | Hides the signup link in the UI |
| `S3_ENDPOINT_URL` | ragflow | - | Bucket endpoint with scheme |
| `API_PROXY_SCHEME` | ragflow | python | Serve the Python API, not the Go one |
| `COMPOSE_PROFILES` | ragflow | tei-cpu | Enables the Builtin embedding provider |
| `ELASTIC_PASSWORD` | ragflow | (secret) | Elasticsearch password |
| `REGISTER_ENABLED` | ragflow | 0 | Self-service signup, enforced server-side |
| `RAGFLOW_SECRET_KEY` | ragflow | (secret) | Session signing key |
| `MYSQL_MAX_CONNECTIONS` | ragflow | 100 | Connection pool ceiling |
| `RAGFLOW_WAIT_ATTEMPTS` | ragflow | 60 | Wait attempts, five seconds apart |
| `RAGFLOW_WAIT_FOR_DEPS` | ragflow | 1 | Wait for search and embeddings at boot |
| `DEFAULT_SUPERUSER_EMAIL` | ragflow | admin@example.com | First administrator's login email |
| `DEFAULT_SUPERUSER_NICKNAME` | ragflow | admin | First administrator's display name |
| `DEFAULT_SUPERUSER_PASSWORD` | ragflow | (secret) | First administrator's password |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `PORT` | elasticsearch | 9200 | Port Railway probes |
| `http.port` | elasticsearch | 9200 | Elasticsearch HTTP port |
| `node.name` | elasticsearch | es01 | Node name |
| `ES_JAVA_OPTS` | elasticsearch | -Xms2g -Xmx2g | JVM heap size |
| `network.host` | elasticsearch | "::" | Dual-stack bind, quoted for the settings file |
| `discovery.type` | elasticsearch | single-node | Skips multi-node bootstrap checks |
| `ELASTIC_PASSWORD` | elasticsearch | (secret) | Password for the elastic user |
| `TAKE_FILE_OWNERSHIP` | elasticsearch | 1 | Chown the data directory at boot |
| `bootstrap.memory_lock` | elasticsearch | false | Memory locking unavailable in containers |
| `node.store.allow_mmap` | elasticsearch | false | vm.max_map_count is not settable here |
| `xpack.security.enabled` | elasticsearch | true | Require authentication |
| `xpack.security.http.ssl.enabled` | elasticsearch | false | Private traffic only |
| `xpack.security.authc.anonymous.roles` | elasticsearch | monitoring_user | Read-only monitoring access |
| `xpack.security.transport.ssl.enabled` | elasticsearch | false | Single node, no transport TLS |
| `xpack.security.authc.anonymous.username` | elasticsearch | (secret) | Anonymous identity for health checks |
| `cluster.routing.allocation.disk.watermark.low` | elasticsearch | 85% | Relative to the volume size |
| `cluster.routing.allocation.disk.watermark.high` | elasticsearch | 90% | Relative to the volume size |
| `xpack.security.authc.anonymous.authz_exception` | elasticsearch | false | Return 403 rather than 401 |
| `cluster.routing.allocation.disk.watermark.flood_stage` | elasticsearch | 95% | Relative to the volume size |
| `cluster.routing.allocation.disk.watermark.flood_stage.frozen` | elasticsearch | 95% | Relative to the volume size |
| `MYSQLHOST` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPORT` | MySQL | 3306 | Data panel alias, not read by the server |
| `MYSQLUSER` | MySQL | root | Data panel alias, not read by the server |
| `MYSQL_URL` | MySQL | - | Private connection string |
| `MYSQLDATABASE` | MySQL | - | Data panel alias, not read by the server |
| `MYSQLPASSWORD` | MySQL | (secret) | Data panel alias, not read by the server |
| `MYSQL_DATABASE` | MySQL | railway | Database created on first boot |
| `MYSQL_ROOT_PASSWORD` | MySQL | (secret) | Root password, read by the entrypoint |
| `PORT` | tei | 80 | HTTP port |
| `HOSTNAME` | tei | :: | Dual-stack bind for the private network |
| `MODEL_ID` | tei | BAAI/bge-small-en-v1.5 | Embedding model to load |
| `AUTO_TRUNCATE` | tei | true | Truncate over-long inputs instead of failing |
| `RAYON_NUM_THREADS` | tei | 8 | Worker threads, matched to the CPU quota |
| `HUGGINGFACE_HUB_CACHE` | tei | /data | Model cache on the volume |
| `MAX_CLIENT_BATCH_SIZE` | tei | 64 | Maximum inputs per request |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/usr/share/elasticsearch/data`
- **Start command:** `docker-entrypoint.sh mysqld --innodb-use-native-aio=0 --disable-log-bin --performance_schema=0 --innodb-buffer-pool-size=1G`
- **Volume:** `/var/lib/mysql`
- **Healthcheck:** `/health`

**Category:** AI/ML · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/ragflow-ai)
