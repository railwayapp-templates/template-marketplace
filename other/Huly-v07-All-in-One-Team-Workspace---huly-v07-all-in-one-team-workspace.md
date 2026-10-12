# Deploy Huly v0.7 All-in-One Team Workspace on Railway

Projects, chat and docs in one app. Open-source Linear + Slack alternative.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/huly-v07-all-in-one-team-workspace)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/huly-v07-all-in-one-team-workspace?referralCode=20H68q)

Huly is an open-source workspace that combines project tracking, team chat and collaborative documents, often compared to Linear, Slack and Notion. This community template deploys the full Huly v0.7 self-hosted stack on Railway behind one domain, with CockroachDB, Redpanda, Elasticsearch search, a Railway Bucket for files and an owner account created for you.

> **License note:** this stack runs CockroachDB, which is distributed under the CockroachDB Software License. Production use requires a license key from Cockroach Labs (free tiers exist for some organizations), and telemetry cannot be disabled without one. Set `COCKROACH_LICENSE_KEY` and `COCKROACH_ORGANIZATION` after deploying. Review the license terms before using this template in production.

Self-hosted Huly is a set of cooperating services: a front server for the web app, an account service, a transactor that handles every change over websockets, a collaborator for real-time document editing, a workspace service, full-text indexing with text extraction, and small stats, key-value and presence services. It stores data in CockroachDB, streams events through a Kafka-compatible broker, indexes content in Elasticsearch and keeps files in S3-compatible storage. This template runs each part as its own Railway service following the official huly-selfhost setup, routes everything through a Caddy proxy on one domain, stores files in a Railway Bucket, and closes public sign-up so only invited people can join.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| front | `hardcoreeng/front:v0.7.426` | Worker |
| collaborator | `hardcoreeng/collaborator:v0.7.426` | Worker |
| account | `hardcoreeng/account:v0.7.426` | Worker |
| redpanda | `redpandadata/redpanda:v24.3.18` | Database |
| fulltext | `hardcoreeng/fulltext:v0.7.426` | Worker |
| rekoni | `hardcoreeng/rekoni-service:v0.7.426` | Worker |
| proxy | [baranberkay96/huly-railway](https://github.com/baranberkay96/huly-railway) (branch: main) (root: /services/proxy) | Web service |
| cockroach | [baranberkay96/huly-railway](https://github.com/baranberkay96/huly-railway) (branch: main) (root: /services/cockroach) | Database |
| workspace | `hardcoreeng/workspace:v0.7.426` | Worker |
| init | [baranberkay96/huly-railway](https://github.com/baranberkay96/huly-railway) (branch: main) (root: /services/init) | Worker |
| hulypulse | `hardcoreeng/service_hulypulse:0.1.29` | Worker |
| stats | `hardcoreeng/stats:v0.7.426` | Worker |
| kvs | `hardcoreeng/hulykvs:v0.7.426` | Worker |
| elastic | [baranberkay96/huly-railway](https://github.com/baranberkay96/huly-railway) (branch: main) (root: /services/elasticsearch) | Database |
| transactor | `hardcoreeng/transactor:v0.7.426` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | front | 8080 | Port the front server listens on; Railway's healthcheck probes it. |
| `TITLE` | front | Huly | Browser title of your instance. |
| `GMAIL_URL` | front | - | Gmail integration URL (service not included; as upstream). |
| `PULSE_URL` | front | - | Public HulyPulse URL. |
| `S3_BUCKET` | front | - | Bucket name; every workspace is a folder in it (rootBucket). |
| `S3_REGION` | front | - | Bucket region. |
| `STATS_URL` | front | - | Public stats URL. |
| `REKONI_URL` | front | - | Public Rekoni URL. |
| `UPLOAD_URL` | front | /files | Upload path served by front. |
| `ELASTIC_URL` | front | - | Elasticsearch (private network). |
| `S3_ENDPOINT` | front | - | Railway Bucket S3 endpoint; the start command builds Huly's STORAGE_CONFIG from the S3_* variables (URL-encoded). |
| `SERVER_PORT` | front | 8080 | Front server port. |
| `ACCOUNTS_URL` | front | - | Public account service URL (used by browsers). |
| `CALENDAR_URL` | front | - | Calendar integration URL (service not included; as upstream). |
| `TELEGRAM_URL` | front | - | Telegram integration URL (service not included; as upstream). |
| `S3_ACCESS_KEY` | front | - | Bucket access key. |
| `S3_SECRET_KEY` | front | (secret) | Bucket secret key. |
| `SERVER_SECRET` | front | (secret) | Shared Huly server secret (signs tokens between services). |
| `DISABLE_SIGNUP` | front | - | Hide the sign-up form (follows the account service). |
| `LAST_NAME_FIRST` | front | true | Show people as 'Last First' (upstream default). |
| `COLLABORATOR_URL` | front | - | Public collaborator websocket URL. |
| `DEFAULT_LANGUAGE` | front | en | Default UI language. |
| `DISABLED_FEATURES` | front | auto-translate,mailboxes | Features that need services not included (as upstream). |
| `ACCOUNTS_URL_INTERNAL` | front | - | Account service (private network). |
| `DESKTOP_UPDATES_CHANNEL` | front | 0.7.426 | Desktop app update channel; keep equal to the server version without 'v'. |
| `SECRET` | collaborator | (secret) | Shared Huly server secret (signs tokens between services). |
| `S3_BUCKET` | collaborator | - | Bucket name; every workspace is a folder in it (rootBucket). |
| `S3_REGION` | collaborator | - | Bucket region. |
| `STATS_URL` | collaborator | - | Stats service (private network). |
| `S3_ENDPOINT` | collaborator | - | Railway Bucket S3 endpoint; the start command builds Huly's STORAGE_CONFIG from the S3_* variables (URL-encoded). |
| `ACCOUNTS_URL` | collaborator | - | Account service (private network). |
| `S3_ACCESS_KEY` | collaborator | - | Bucket access key. |
| `S3_SECRET_KEY` | collaborator | (secret) | Bucket secret key. |
| `COLLABORATOR_PORT` | collaborator | 3078 | Collaborator port (websocket, Y.js documents). |
| `DB_URL` | account | - | CockroachDB connection URL. |
| `FRONT_URL` | account | - | Public URL of Huly. |
| `S3_BUCKET` | account | - | Bucket name; every workspace is a folder in it (rootBucket). |
| `S3_REGION` | account | - | Bucket region. |
| `STATS_URL` | account | - | Public stats URL (as upstream). |
| `S3_ENDPOINT` | account | - | Railway Bucket S3 endpoint; the start command builds Huly's STORAGE_CONFIG from the S3_* variables (URL-encoded). |
| `SERVER_PORT` | account | 3000 | Account service port. |
| `ACCOUNTS_URL` | account | - | Public account service URL. |
| `ACCOUNT_PORT` | account | 3000 | Account service port (same as SERVER_PORT). |
| `QUEUE_CONFIG` | account | - | Redpanda (Kafka API) broker. |
| `MODEL_ENABLED` | account | * | Enable all Huly modules. |
| `S3_ACCESS_KEY` | account | - | Bucket access key. |
| `S3_SECRET_KEY` | account | (secret) | Bucket secret key. |
| `SERVER_SECRET` | account | (secret) | Shared Huly server secret (signs tokens between services). |
| `DISABLE_SIGNUP` | account | true | Public sign-up off: the owner account is created by the init service; others join through invite links. Set false (here and on front) to allow open sign-up. |
| `TRANSACTOR_URL` | account | - | Transactor endpoints: internal for services, public for browsers. |
| `REDPANDA_MEMORY` | redpanda | 1G | Memory Redpanda allocates (Seastar would otherwise size itself to the host). |
| `DB_URL` | fulltext | - | CockroachDB connection URL. |
| `S3_BUCKET` | fulltext | - | Bucket name; every workspace is a folder in it (rootBucket). |
| `S3_REGION` | fulltext | - | Bucket region. |
| `STATS_URL` | fulltext | - | Stats service (private network). |
| `REKONI_URL` | fulltext | - | Rekoni text extraction (private network). |
| `S3_ENDPOINT` | fulltext | - | Railway Bucket S3 endpoint; the start command builds Huly's STORAGE_CONFIG from the S3_* variables (URL-encoded). |
| `ACCOUNTS_URL` | fulltext | - | Account service (private network). |
| `QUEUE_CONFIG` | fulltext | - | Redpanda (Kafka API) broker. |
| `S3_ACCESS_KEY` | fulltext | - | Bucket access key. |
| `S3_SECRET_KEY` | fulltext | (secret) | Bucket secret key. |
| `SERVER_SECRET` | fulltext | (secret) | Shared Huly server secret (signs tokens between services). |
| `FULLTEXT_DB_URL` | fulltext | - | Elasticsearch with credentials (private network). |
| `ELASTIC_INDEX_NAME` | fulltext | huly_storage_index | Search index name (upstream). |
| `PORT` | rekoni | 4004 | Rekoni port. |
| `SECRET` | rekoni | (secret) | Shared Huly server secret (signs tokens between services). |
| `PORT` | proxy | 8080 | Port Caddy listens on; Railway routes the public domain and its healthcheck here. |
| `FRONT_HOST` | proxy | - | Front server. |
| `PULSE_HOST` | proxy | - | HulyPulse (/_pulse -> /ws). |
| `STATS_HOST` | proxy | - | Stats (/_stats). |
| `REKONI_HOST` | proxy | - | Rekoni (/_rekoni). |
| `ACCOUNT_HOST` | proxy | - | Account service (/_accounts). |
| `MAX_UPLOAD_SIZE` | proxy | 100MB | Maximum request body (upstream nginx: 100M). |
| `TRANSACTOR_HOST` | proxy | - | Transactor (/_transactor and /eyJ… websockets). |
| `COLLABORATOR_HOST` | proxy | - | Collaborator (/_collaborator). |
| `DB_URL` | cockroach | - | Connection URL the Huly services use (password auth over the private network, as upstream). |
| `COCKROACH_USER` | cockroach | (secret) | SQL user created on first start (huly-selfhost default). |
| `COCKROACH_CACHE` | cockroach | 256MiB | CockroachDB cache size (default would be 25% of the host's memory). |
| `COCKROACH_DATABASE` | cockroach | defaultdb | Database created on first start (huly-selfhost default). |
| `COCKROACH_PASSWORD` | cockroach | (secret) | Password of the SQL user (generated). |
| `COCKROACH_LICENSE_KEY` | cockroach | - | Optional CockroachDB license key (the CockroachDB Software License requires one for production use; Cockroach Labs offers a free tier for qualifying companies). Applied as a cluster setting on start. |
| `COCKROACH_ORGANIZATION` | cockroach | - | Organization name the license key was issued to (cluster.organization). |
| `COCKROACH_MAX_SQL_MEMORY` | cockroach | 256MiB | Memory for SQL query processing (default would be 25% of the host's memory). |
| `DB_URL` | workspace | - | CockroachDB connection URL. |
| `S3_BUCKET` | workspace | - | Bucket name; every workspace is a folder in it (rootBucket). |
| `S3_REGION` | workspace | - | Bucket region. |
| `STATS_URL` | workspace | - | Stats service (private network). |
| `S3_ENDPOINT` | workspace | - | Railway Bucket S3 endpoint; the start command builds Huly's STORAGE_CONFIG from the S3_* variables (URL-encoded). |
| `ACCOUNTS_URL` | workspace | - | Account service (private network). |
| `FULLTEXT_URL` | workspace | - | Fulltext service, used to clean a workspace's search index when it is deleted. |
| `QUEUE_CONFIG` | workspace | - | Redpanda (Kafka API) broker. |
| `MODEL_ENABLED` | workspace | * | Enable all Huly modules. |
| `S3_ACCESS_KEY` | workspace | - | Bucket access key. |
| `S3_SECRET_KEY` | workspace | (secret) | Bucket secret key. |
| `SERVER_SECRET` | workspace | (secret) | Shared Huly server secret (signs tokens between services). |
| `TRANSACTOR_URL` | workspace | - | Transactor endpoints: internal for services, public for browsers. |
| `ACCOUNTS_DB_URL` | workspace | - | Account database (same CockroachDB). |
| `DB_URL` | init | - | CockroachDB connection URL. |
| `ACCOUNTS_URL` | init | - | Account service (private network); the init waits for it. |
| `SERVER_SECRET` | init | (secret) | Shared Huly server secret (signs tokens between services). |
| `ACCOUNT_DB_URL` | init | - | Account database (same CockroachDB). |
| `HULY_OWNER_EMAIL` | init | - | E-mail (login) of the owner account created on first deploy. |
| `HULY_OWNER_PASSWORD` | init | (secret) | Password of the owner account (generated; used once). Change it in Huly afterwards. |
| `HULY_OWNER_LAST_NAME` | init | Admin | Last name of the owner account. |
| `HULY_OWNER_FIRST_NAME` | init | Owner | First name of the owner account. |
| `HULY_LOG` | hulypulse | info | Log level. |
| `HULY_BACKEND` | hulypulse | memory | In-memory backend (upstream default for single-node installs; no Redis needed). |
| `HULY_BIND_HOST` | hulypulse | :: | Listen on IPv4 and IPv6. |
| `HULY_BIND_PORT` | hulypulse | 8099 | HulyPulse port. |
| `HULY_TOKEN_SECRET` | hulypulse | (secret) | Shared Huly server secret (signs tokens between services). |
| `HULY_HEARTBEAT_TIMEOUT` | hulypulse | 60 | Seconds before a silent websocket client is dropped. |
| `PORT` | stats | 4900 | Stats port. |
| `SERVER_SECRET` | stats | (secret) | Shared Huly server secret (signs tokens between services). |
| `HULY_BIND_HOST` | kvs | :: | Listen on IPv4 and IPv6 (upstream default 0.0.0.0 is IPv4 only). |
| `HULY_BIND_PORT` | kvs | 8094 | KVS port. |
| `HULY_TOKEN_SECRET` | kvs | (secret) | Shared Huly server secret (signs tokens between services). |
| `HULY_DB_CONNECTION` | kvs | - | CockroachDB connection URL. |
| `ES_JAVA_OPTS` | elastic | -Xms1g -Xmx1g | JVM heap (upstream: 1 GB). |
| `network.host` | elastic | 0.0.0.0 | Bind address (Java listens dual-stack). 0.0.0.0, not '::': the image writes these settings to YAML unquoted and '::' breaks the parse. |
| `discovery.type` | elastic | single-node | Single-node cluster (also skips production bootstrap checks). |
| `ELASTIC_PASSWORD` | elastic | (secret) | Password of the elastic user (generated). |
| `xpack.ml.enabled` | elastic | false | Machine learning off (unused, saves memory). |
| `bootstrap.memory_lock` | elastic | false | memlock ulimits cannot be raised on Railway. |
| `node.store.allow_mmap` | elastic | false | Do not depend on the host's vm.max_map_count, which containers cannot change. |
| `xpack.security.enabled` | elastic | true | Require the elastic user's password (upstream runs without). |
| `ingest.geoip.downloader.enabled` | elastic | false | Skip GeoIP database downloads. |
| `DB_URL` | transactor | - | CockroachDB connection URL. |
| `FRONT_URL` | transactor | - | Public URL of Huly. |
| `PULSE_URL` | transactor | - | HulyPulse (presence, typing indicators). |
| `S3_BUCKET` | transactor | - | Bucket name; every workspace is a folder in it (rootBucket). |
| `S3_REGION` | transactor | - | Bucket region. |
| `STATS_URL` | transactor | - | Stats service (private network). |
| `S3_ENDPOINT` | transactor | - | Railway Bucket S3 endpoint; the start command builds Huly's STORAGE_CONFIG from the S3_* variables (URL-encoded). |
| `SERVER_PORT` | transactor | 3333 | Transactor port (websocket). |
| `ACCOUNTS_URL` | transactor | - | Account service (private network). |
| `FULLTEXT_URL` | transactor | - | Fulltext service (private network). |
| `QUEUE_CONFIG` | transactor | - | Redpanda (Kafka API) broker. |
| `S3_ACCESS_KEY` | transactor | - | Bucket access key. |
| `S3_SECRET_KEY` | transactor | (secret) | Bucket secret key. |
| `SERVER_SECRET` | transactor | (secret) | Shared Huly server secret (generated, like setup.sh's `openssl rand -hex 32`). The other services reference it. |
| `LAST_NAME_FIRST` | transactor | true | Show people as 'Last First' (upstream default). |

## Configuration

- **Start command:** `/bin/sh -c 'q() { node -p "encodeURIComponent(process.argv[1])" "$1"; }; export STORAGE_CONFIG="s3|$S3_ENDPOINT?accessKey=$(q "$S3_ACCESS_KEY")&secretKey=$(q "$S3_SECRET_KEY")&region=$(q "$S3_REGION")&rootBucket=$(q "$S3_BUCKET")&allowPresign=false"; exec node ./bundle.js'`
- **Healthcheck:** `/`
- **Start command:** `/bin/sh -c 'q() { node -p "encodeURIComponent(process.argv[1])" "$1"; }; export STORAGE_CONFIG="s3|$S3_ENDPOINT?accessKey=$(q "$S3_ACCESS_KEY")&secretKey=$(q "$S3_SECRET_KEY")&region=$(q "$S3_REGION")&rootBucket=$(q "$S3_BUCKET")&allowPresign=false"; exec node bundle.js'`
- **Start command:** `/bin/sh -c "rm -rf /var/lib/redpanda/data/lost+found && exec rpk redpanda start --kafka-addr internal://[::]:9092 --advertise-kafka-addr internal://$RAILWAY_PRIVATE_DOMAIN:9092 --pandaproxy-addr internal://[::]:8082 --advertise-pandaproxy-addr internal://$RAILWAY_PRIVATE_DOMAIN:8082 --schema-registry-addr internal://[::]:8081 --rpc-addr 0.0.0.0:33145 --advertise-rpc-addr $RAILWAY_PRIVATE_DOMAIN:33145 --mode dev-container --smp 1 --memory $REDPANDA_MEMORY --reserve-memory 0M --default-log-level=info"`
- **Volume:** `/var/lib/redpanda/data`
- **Start command:** `/bin/sh -c 'q() { node -p "encodeURIComponent(process.argv[1])" "$1"; }; export STORAGE_CONFIG="s3|$S3_ENDPOINT?accessKey=$(q "$S3_ACCESS_KEY")&secretKey=$(q "$S3_SECRET_KEY")&region=$(q "$S3_REGION")&rootBucket=$(q "$S3_BUCKET")&allowPresign=false"; exec node --expose-gc bundle.js'`
- **Healthcheck:** `/_healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/cockroach/persist`
- **Volume:** `/usr/share/elasticsearch/data`

**Category:** Other · **Tags:** huly, project-management, issue-tracker, team-chat, documents · **Languages:** Shell, JavaScript, Dockerfile

[View on Railway →](https://railway.com/deploy/huly-v07-all-in-one-team-workspace)
