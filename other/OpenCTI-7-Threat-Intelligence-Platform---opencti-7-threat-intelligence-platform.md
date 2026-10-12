# Deploy OpenCTI 7 Threat Intelligence Platform on Railway

Collect, link and share cyber threat intel. Full stack with workers.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencti-7-threat-intelligence-platform)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencti-7-threat-intelligence-platform?referralCode=20H68q)

OpenCTI is an open-source platform for structuring, storing and sharing cyber threat intelligence as a STIX 2.1 knowledge graph. This community template deploys the full OpenCTI 7 stack on Railway: the platform, three workers, Elasticsearch, Redis, RabbitMQ, a Railway Bucket for files, and the ten built-in connectors from the official Docker setup.

OpenCTI's platform serves the web UI and GraphQL API and stores its knowledge graph in Elasticsearch. Redis holds caches and live event streams, RabbitMQ distributes work, and S3-compatible storage keeps uploaded reports and exports. Workers consume the queues and write data through the API, and connectors import or export data. This template follows the official docker-compose service by service, pins every image to the same release, generates all credentials, stores files in a Railway Bucket instead of MinIO, and loads the MITRE ATT&CK and OpenCTI reference datasets on first start.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenCTI Worker | `opencti/worker:7.261008.0` | Worker |
| connector-analysis | `opencti/connector-import-document:7.261008.0` | Worker |
| connector-import-external-reference | `opencti/connector-import-external-reference:7.261008.0` | Worker |
| connector-export-file-csv | `opencti/connector-export-file-csv:7.261008.0` | Worker |
| connector-import-file-yara | `opencti/connector-import-file-yara:7.261008.0` | Worker |
| connector-mitre | `opencti/connector-mitre:7.261008.0` | Worker |
| Redis | `redis:8.2` | Database |
| RabbitMQ | `rabbitmq:4.3.6-management` | Database |
| connector-import-document | `opencti/connector-import-document:7.261008.0` | Worker |
| OpenCTI | `opencti/platform:7.261008.0` | Web service |
| connector-export-file-txt | `opencti/connector-export-file-txt:7.261008.0` | Worker |
| connector-export-file-stix | `opencti/connector-export-file-stix:7.261008.0` | Worker |
| Elasticsearch | [baranberkay96/opencti-railway](https://github.com/baranberkay96/opencti-railway) (branch: main) (root: /services/elasticsearch) | Database |
| connector-opencti | `opencti/connector-opencti:7.261008.0` | Worker |
| connector-import-file-stix | `opencti/connector-import-file-stix:7.261008.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `OPENCTI_URL` | OpenCTI Worker | - | OpenCTI API on the private network. |
| `OPENCTI_TOKEN` | OpenCTI Worker | (secret) | Admin API token. |
| `WORKER_LOG_LEVEL` | OpenCTI Worker | info | Worker log level. |
| `OPENCTI_URL` | connector-analysis | - | OpenCTI API on the private network. |
| `CONNECTOR_ID` | connector-analysis | - | Unique connector ID (UUIDv4, generated). Keep it stable. |
| `OPENCTI_TOKEN` | connector-analysis | (secret) | Admin API token. |
| `CONNECTOR_AUTO` | connector-analysis | true | Analyse automatically. |
| `CONNECTOR_NAME` | connector-analysis | ImportDocumentAnalysis | Name shown in Data > Ingestion > Connectors. |
| `CONNECTOR_TYPE` | connector-analysis | INTERNAL_ANALYSIS | Content analysis connector (same image as ImportDocument). |
| `CONNECTOR_SCOPE` | connector-analysis | application/pdf,text/plain,text/html | Analyses PDF, text and HTML content. |
| `CONNECTOR_ONLY_CONTEXTUAL` | connector-analysis | false | Also extract data not already linked to the container. |
| `CONNECTOR_VALIDATE_BEFORE_IMPORT` | connector-analysis | false | Analysis results are shown in the UI, no workbench. |
| `OPENCTI_URL` | connector-import-external-reference | - | OpenCTI API on the private network. |
| `CONNECTOR_ID` | connector-import-external-reference | - | Unique connector ID (UUIDv4, generated). Keep it stable. |
| `OPENCTI_TOKEN` | connector-import-external-reference | (secret) | Admin API token. |
| `CONNECTOR_NAME` | connector-import-external-reference | ImportExternalReference | Name shown in Data > Ingestion > Connectors (fetches external reference URLs as files). |
| `OPENCTI_URL` | connector-export-file-csv | - | OpenCTI API on the private network. |
| `CONNECTOR_ID` | connector-export-file-csv | - | Unique connector ID (UUIDv4, generated). Keep it stable. |
| `OPENCTI_TOKEN` | connector-export-file-csv | (secret) | Admin API token. |
| `CONNECTOR_NAME` | connector-export-file-csv | ExportFileCsv | Name shown in Data > Ingestion > Connectors. |
| `CONNECTOR_TYPE` | connector-export-file-csv | INTERNAL_EXPORT_FILE | Export connector. |
| `CONNECTOR_SCOPE` | connector-export-file-csv | text/csv | Exports CSV files. |
| `OPENCTI_URL` | connector-import-file-yara | - | OpenCTI API on the private network. |
| `CONNECTOR_ID` | connector-import-file-yara | - | Unique connector ID (UUIDv4, generated). Keep it stable. |
| `OPENCTI_TOKEN` | connector-import-file-yara | (secret) | Admin API token. |
| `CONNECTOR_AUTO` | connector-import-file-yara | false | Import only on demand. |
| `CONNECTOR_NAME` | connector-import-file-yara | ImportFileYARA | Name shown in Data > Ingestion > Connectors. |
| `CONNECTOR_SCOPE` | connector-import-file-yara | text/yara+plain | Imports YARA rule files. |
| `YARA_IMPORT_FILE_SPLIT_RULES` | connector-import-file-yara | true | One indicator per YARA rule. |
| `CONNECTOR_VALIDATE_BEFORE_IMPORT` | connector-import-file-yara | true | Create a workbench for review before import. |
| `OPENCTI_URL` | connector-mitre | - | OpenCTI API on the private network. |
| `CONNECTOR_ID` | connector-mitre | - | Unique connector ID (UUIDv4, generated). Keep it stable. |
| `OPENCTI_TOKEN` | connector-mitre | (secret) | Admin API token. |
| `CONNECTOR_AUTO_CREATE_SERVICE_ACCOUNT` | connector-mitre | true | Run under its own service account (as upstream compose). |
| `CONNECTOR_AUTO_CREATE_SERVICE_ACCOUNT_CONFIDENCE_LEVEL` | connector-mitre | 75 | Confidence level of imported MITRE ATT&CK data. |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment. |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on. |
| `REDISUSER` | Redis | default | Username for authenticating with Redis. |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name. |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis. |
| `RABBITMQ_NODENAME` | RabbitMQ | rabbit01@localhost | Fixed node name so the data on the volume survives redeploys (as upstream compose). |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Broker password (generated). |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | Broker user created on first boot. |
| `RABBITMQ_SERVER_ADDITIONAL_ERL_ARGS` | RabbitMQ | +S 2:2 +SDio 2 -rabbit max_message_size 536870912 -rabbit consumer_timeout 86400000 | Upstream rabbitmq.conf settings (512 MB messages, 24 h consumer timeout) as Erlang arguments, and 2 schedulers instead of one per host CPU. |
| `OPENCTI_URL` | connector-import-document | - | OpenCTI API on the private network. |
| `CONNECTOR_ID` | connector-import-document | - | Unique connector ID (UUIDv4, generated). Keep it stable. |
| `OPENCTI_TOKEN` | connector-import-document | (secret) | Admin API token. |
| `CONNECTOR_AUTO` | connector-import-document | true | Process uploaded files automatically. |
| `CONNECTOR_NAME` | connector-import-document | ImportDocument | Name shown in Data > Ingestion > Connectors. |
| `CONNECTOR_TYPE` | connector-import-document | INTERNAL_IMPORT_FILE | File import connector. |
| `CONNECTOR_SCOPE` | connector-import-document | application/pdf,text/plain,text/html | Extracts entities and observables from PDF, text and HTML reports. |
| `CONNECTOR_ONLY_CONTEXTUAL` | connector-import-document | false | Also extract data not already linked to the container. |
| `CONNECTOR_VALIDATE_BEFORE_IMPORT` | connector-import-document | true | Create a workbench for review before import. |
| `IMPORT_DOCUMENT_CREATE_INDICATOR` | connector-import-document | true | Create indicators from extracted observables. |
| `PORT` | OpenCTI | 8080 | Port the platform listens on; Railway routes the public domain and its healthcheck here. |
| `APP__PORT` | OpenCTI | 8080 | OpenCTI HTTP port (same as PORT). |
| `MINIO__PORT` | OpenCTI | 443 | S3 port. |
| `REDIS__PORT` | OpenCTI | - | Redis port. |
| `NODE_OPTIONS` | OpenCTI | --max-old-space-size=4096 | Node.js heap limit for the platform (MB). Raise it with the service's memory for large datasets. |
| `APP__BASE_URL` | OpenCTI | - | Public URL of OpenCTI (links, SSO callbacks). Update it after adding a custom domain. |
| `MINIO__USE_SSL` | OpenCTI | true | Use HTTPS for S3. |
| `RABBITMQ__PORT` | OpenCTI | 5672 | AMQP port. |
| `MINIO__ENDPOINT` | OpenCTI | - | S3 endpoint of the Railway Bucket (the start command strips the https:// prefix, as OpenCTI expects a host name). |
| `REDIS__HOSTNAME` | OpenCTI | - | Redis host (private network). |
| `REDIS__PASSWORD` | OpenCTI | (secret) | Redis password. |
| `APP__ADMIN__EMAIL` | OpenCTI | admin@opencti.io | Login e-mail of the built-in admin account, created on first start. Change it here before the first deploy if you like. |
| `APP__ADMIN__TOKEN` | OpenCTI | (secret) | API token (UUIDv4) of the admin account; workers and connectors authenticate with it (generated). |
| `MINIO__ACCESS_KEY` | OpenCTI | - | Bucket access key. |
| `MINIO__SECRET_KEY` | OpenCTI | (secret) | Bucket secret key. |
| `ELASTICSEARCH__URL` | OpenCTI | - | Elasticsearch URL (private network). |
| `MINIO__BUCKET_NAME` | OpenCTI | - | Bucket for uploaded files, exports and imports. |
| `RABBITMQ__HOSTNAME` | OpenCTI | - | RabbitMQ host (private network); also handed to workers and connectors. |
| `RABBITMQ__PASSWORD` | OpenCTI | (secret) | RabbitMQ password. |
| `RABBITMQ__USERNAME` | OpenCTI | (secret) | RabbitMQ user. |
| `APP__ENCRYPTION_KEY` | OpenCTI | - | Master key for secrets OpenCTI stores encrypted (at least 32 bytes as base64; generated). Never change it after the first start. |
| `APP__ADMIN__PASSWORD` | OpenCTI | (secret) | Password of the built-in admin account (generated). |
| `MINIO__BUCKET_REGION` | OpenCTI | - | Bucket region. |
| `REDIS__HOST_IP_FAMILY` | OpenCTI | 6 | Resolve Redis over IPv6, which every Railway private network supports (OpenCTI default is IPv4 only). |
| `APP__HEALTH_ACCESS_KEY` | OpenCTI | public | Lets Railway's healthcheck call /health without a key; only a status is returned, never details. |
| `ELASTICSEARCH__PASSWORD` | OpenCTI | (secret) | Elasticsearch password. |
| `ELASTICSEARCH__USERNAME` | OpenCTI | (secret) | Elasticsearch user. |
| `RABBITMQ__MANAGEMENT_SSL` | OpenCTI | false | Plain HTTP to the management API on the private network. |
| `APP__APP_LOGS__LOGS_FILES` | OpenCTI | false | Log to the console only (Railway collects it); no log files on the ephemeral disk. |
| `RABBITMQ__PORT_MANAGEMENT` | OpenCTI | 15672 | RabbitMQ management API port (queue statistics). |
| `PROVIDERS__LOCAL__STRATEGY` | OpenCTI | LocalStrategy | Local e-mail/password login. |
| `APP__AUDIT_LOGS__LOGS_FILES` | OpenCTI | false | Audit log to the console only. |
| `ELASTICSEARCH__NUMBER_OF_REPLICAS` | OpenCTI | 0 | Index replicas (single Elasticsearch node). |
| `MINIO__DISABLE_CHECKSUM_VALIDATION` | OpenCTI | true | Send S3 checksums only when required (broadest compatibility with S3-compatible storage). |
| `OPENCTI_URL` | connector-export-file-txt | - | OpenCTI API on the private network. |
| `CONNECTOR_ID` | connector-export-file-txt | - | Unique connector ID (UUIDv4, generated). Keep it stable. |
| `OPENCTI_TOKEN` | connector-export-file-txt | (secret) | Admin API token. |
| `CONNECTOR_NAME` | connector-export-file-txt | ExportFileTxt | Name shown in Data > Ingestion > Connectors. |
| `CONNECTOR_TYPE` | connector-export-file-txt | INTERNAL_EXPORT_FILE | Export connector. |
| `CONNECTOR_SCOPE` | connector-export-file-txt | text/plain | Exports plain-text lists (e.g. observables). |
| `OPENCTI_URL` | connector-export-file-stix | - | OpenCTI API on the private network. |
| `CONNECTOR_ID` | connector-export-file-stix | - | Unique connector ID (UUIDv4, generated). Keep it stable. |
| `OPENCTI_TOKEN` | connector-export-file-stix | (secret) | Admin API token. |
| `CONNECTOR_NAME` | connector-export-file-stix | ExportFileStix2 | Name shown in Data > Ingestion > Connectors. |
| `CONNECTOR_TYPE` | connector-export-file-stix | INTERNAL_EXPORT_FILE | Export connector. |
| `CONNECTOR_SCOPE` | connector-export-file-stix | application/json | Exports STIX 2.1 bundles. |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms2g -Xmx2g | JVM heap (upstream sample: 4G). Keep about half of the RAM you give Elasticsearch. |
| `network.host` | Elasticsearch | 0.0.0.0 | Bind address (Java listens dual-stack). 0.0.0.0, not '::': the image writes these settings to YAML unquoted and '::' breaks the parse. |
| `discovery.type` | Elasticsearch | single-node | Single-node cluster (also skips production bootstrap checks). |
| `ELASTIC_PASSWORD` | Elasticsearch | (secret) | Password of the elastic user (generated). |
| `xpack.ml.enabled` | Elasticsearch | false | Machine learning off (as upstream compose). |
| `bootstrap.memory_lock` | Elasticsearch | false | memlock ulimits cannot be raised on Railway. |
| `node.store.allow_mmap` | Elasticsearch | false | Do not depend on the host's vm.max_map_count, which containers cannot change. |
| `xpack.security.enabled` | Elasticsearch | true | Require the elastic user's password (upstream compose disables it). |
| `thread_pool.search.queue_size` | Elasticsearch | 5000 | Larger search queue (as upstream compose). |
| `ingest.geoip.downloader.enabled` | Elasticsearch | false | Skip GeoIP database downloads. |
| `xpack.security.http.ssl.enabled` | Elasticsearch | false | Plain HTTP inside the private network. |
| `xpack.security.transport.ssl.enabled` | Elasticsearch | false | No transport TLS for a single node. |
| `OPENCTI_URL` | connector-opencti | - | OpenCTI API on the private network. |
| `CONNECTOR_ID` | connector-opencti | - | Unique connector ID (UUIDv4, generated). Keep it stable. |
| `OPENCTI_TOKEN` | connector-opencti | (secret) | Admin API token. |
| `CONNECTOR_NAME` | connector-opencti | OpenCTI Datasets | Imports OpenCTI's reference datasets. |
| `CONNECTOR_SCOPE` | connector-opencti | marking-definition,identity,location | Markings, sectors/organizations and countries/regions. |
| `CONNECTOR_AUTO_CREATE_SERVICE_ACCOUNT` | connector-opencti | true | Run under its own service account (as upstream compose). |
| `CONNECTOR_AUTO_CREATE_SERVICE_ACCOUNT_CONFIDENCE_LEVEL` | connector-opencti | 100 | Confidence level of the service account. |
| `OPENCTI_URL` | connector-import-file-stix | - | OpenCTI API on the private network. |
| `CONNECTOR_ID` | connector-import-file-stix | - | Unique connector ID (UUIDv4, generated). Keep it stable. |
| `OPENCTI_TOKEN` | connector-import-file-stix | (secret) | Admin API token. |
| `CONNECTOR_AUTO` | connector-import-file-stix | true | Process uploaded files automatically. |
| `CONNECTOR_NAME` | connector-import-file-stix | ImportFileStix | Name shown in Data > Ingestion > Connectors. |
| `CONNECTOR_TYPE` | connector-import-file-stix | INTERNAL_IMPORT_FILE | File import connector. |
| `CONNECTOR_SCOPE` | connector-import-file-stix | application/json,text/xml | Imports STIX 2.1 JSON and STIX 1 XML files. |
| `CONNECTOR_VALIDATE_BEFORE_IMPORT` | connector-import-file-stix | true | Create a workbench for review before import. |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/rabbitmq`
- **Start command:** `/bin/sh -c 'e="${MINIO__ENDPOINT#*://}"; export MINIO__ENDPOINT="${e%%/*}"; exec node build/back.mjs'`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/usr/share/elasticsearch/data`

**Category:** Other · **Tags:** opencti, threat-intelligence, cti, stix, mitre-attack · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/opencti-7-threat-intelligence-platform)
