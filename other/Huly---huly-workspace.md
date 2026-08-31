# Deploy Huly on Railway

All-in-one workspace for issues, documents, chat and planning

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/huly-workspace)

## About

Huly is an open-source all-in-one team workspace that folds issue tracking, collaborative documents, team chat, HR and a personal planner into one application. Teams reach for it when they are tired of paying for Linear, Notion and Slack separately and stitching them together with integrations that half-work. Everything shares one data model, so an issue can be mentioned in a document, discussed in a channel and scheduled in a planner without leaving the product. It is published by Hardcore Engineering under the Eclipse Public License 2.0 at [github.com/hcengineering/platform](https://github.com/hcengineering/platform).

Self-host Huly on Railway and you get the full production topology, not a cut-down single container. Deploy Huly with this template and it provisions thirteen services: a Caddy entrypoint routing every path the browser client calls, `front`, `account`, the `transactor` every open workspace holds a WebSocket to, `collaborator` for live document editing, a `workspace` worker, a `fulltext` indexer, `rekoni` for reading text out of attachments, `stats`, `kvs`, plus PostgreSQL, Kafka and Elasticsearch. Attachments and avatars go to an object-storage bucket, so nothing large lives on a volume.

![Diagram of Huly's thirteen Railway services and three volumes](https://res.cloudinary.com/rroe4rtk/image/upload/v1788053768/huly-architecture.png)

Huly is a constellation of services that each own one job, which is why self-hosting it properly means more than one container. `front` serves the client bundle and proxies uploads; `account` owns people, workspaces and tokens. The `transactor` is the heart of it: every open workspace keeps a WebSocket to it and every change flows through it. `collaborator` runs the CRDT layer behind shared editing, so two people typing in one paragraph converge instead of overwriting each other. `workspace` creates and upgrades workspaces, `fulltext` maintains the index and calls `rekoni` to read text out of PDFs, and `stats` collects health metrics.

Key features:

- Issue tracking with projects, components, milestones, sub-issues and templates
- Collaborative documents and teamspaces with live editing and inline comments
- Team chat, threads and an activity feed on every object
- A personal planner for action items created anywhere in the product
- Virtual office, HR, recruiting and CRM modules in the same workspace
- Full-text search across issues, documents and attachment contents

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| stats | `hardcoreeng/stats:v0.7.426` | Worker |
| elastic | [gridalpha/huly-railway](https://github.com/gridalpha/huly-railway) | Database |
| account | `hardcoreeng/account:v0.7.426` | Worker |
| front | `hardcoreeng/front:v0.7.426` | Worker |
| proxy | [gridalpha/huly-railway](https://github.com/gridalpha/huly-railway) | Web service |
| rekoni | `hardcoreeng/rekoni-service:v0.7.426` | Worker |
| fulltext | `hardcoreeng/fulltext:v0.7.426` | Worker |
| transactor | `hardcoreeng/transactor:v0.7.426` | Worker |
| kvs | `hardcoreeng/hulykvs:v0.7.426` | Worker |
| kafka | `apache/kafka:3.9.1` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| workspace | `hardcoreeng/workspace:v0.7.426` | Worker |
| collaborator | `hardcoreeng/collaborator:v0.7.426` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | stats | 4900 | Metrics collector listening port |
| `SERVER_SECRET` | stats | (secret) | Shared platform token secret |
| `PORT` | elastic | 9200 | Elasticsearch HTTP port |
| `ES_JAVA_OPTS` | elastic | -Xms1g -Xmx1g | JVM heap for the index |
| `TAKE_FILE_OWNERSHIP` | elastic | true | Chown the data volume at boot |
| `PORT` | account | 3000 | Account API listening port |
| `DB_URL` | account | - | PostgreSQL connection string |
| `FRONT_URL` | account | - | Public site root |
| `S3_BUCKET` | account | - | Bucket holding all workspaces |
| `STATS_URL` | account | - | Metrics collector endpoint |
| `S3_ENDPOINT` | account | - | Object storage endpoint |
| `SERVER_PORT` | account | 3000 | Same port, read by the app |
| `ACCOUNTS_URL` | account | - | Public account API |
| `ACCOUNT_PORT` | account | 3000 | Same port, legacy name |
| `QUEUE_CONFIG` | account | - | Kafka broker address |
| `MODEL_ENABLED` | account | * | Enable all workspace modules |
| `S3_ACCESS_KEY` | account | - | Object storage access key |
| `S3_SECRET_KEY` | account | (secret) | Object storage secret key |
| `SERVER_SECRET` | account | (secret) | Signs every platform token |
| `DISABLE_SIGNUP` | account | false | Set true to close registration |
| `TRANSACTOR_URL` | account | - | Internal and public transactor |
| `PORT` | front | 8080 | Web server listening port |
| `TITLE` | front | Huly | Product name in the browser tab |
| `GMAIL_URL` | front | - | Optional Gmail service |
| `S3_BUCKET` | front | - | Bucket holding all workspaces |
| `STATS_URL` | front | - | Metrics collector endpoint |
| `REKONI_URL` | front | - | Text extraction endpoint |
| `UPLOAD_URL` | front | /files | Path the client uploads to |
| `ELASTIC_URL` | front | - | Search index endpoint |
| `S3_ENDPOINT` | front | - | Object storage endpoint |
| `SERVER_PORT` | front | 8080 | Same port, read by the app |
| `ACCOUNTS_URL` | front | - | Account API for the browser |
| `CALENDAR_URL` | front | - | Optional calendar service |
| `TELEGRAM_URL` | front | - | Optional Telegram service |
| `S3_ACCESS_KEY` | front | - | Object storage access key |
| `S3_SECRET_KEY` | front | (secret) | Object storage secret key |
| `SERVER_SECRET` | front | (secret) | Shared platform token secret |
| `DISABLE_SIGNUP` | front | false | Set true to close registration |
| `LAST_NAME_FIRST` | front | true | Name ordering in lists |
| `COLLABORATOR_URL` | front | - | Document editing socket |
| `DEFAULT_LANGUAGE` | front | en | Interface language |
| `DISABLED_FEATURES` | front | auto-translate,mailboxes | Modules without a backing service |
| `ACCOUNTS_URL_INTERNAL` | front | - | Account API for the server |
| `PORT` | proxy | 8080 | HTTP port the router listens on |
| `FRONT_HOST` | proxy | - | Web client upstream |
| `STATS_HOST` | proxy | - | Stats upstream |
| `REKONI_HOST` | proxy | - | Rekoni upstream |
| `ACCOUNT_HOST` | proxy | - | Account service upstream |
| `MAX_UPLOAD_SIZE` | proxy | 100MB | Largest accepted request body |
| `TRANSACTOR_HOST` | proxy | - | Transactor upstream |
| `COLLABORATOR_HOST` | proxy | - | Collaborator upstream |
| `PORT` | rekoni | 4004 | Extraction service listening port |
| `SECRET` | rekoni | (secret) | Shared platform token secret |
| `SERVICE_ID` | rekoni | rekoni-service | Service identity in tokens |
| `PORT` | fulltext | 4700 | Indexer listening port |
| `DB_URL` | fulltext | - | PostgreSQL connection string |
| `S3_BUCKET` | fulltext | - | Bucket holding all workspaces |
| `STATS_URL` | fulltext | - | Metrics collector endpoint |
| `REKONI_URL` | fulltext | - | Text extraction endpoint |
| `S3_ENDPOINT` | fulltext | - | Object storage endpoint |
| `ACCOUNTS_URL` | fulltext | - | Private account API |
| `QUEUE_CONFIG` | fulltext | - | Kafka broker address |
| `S3_ACCESS_KEY` | fulltext | - | Object storage access key |
| `S3_SECRET_KEY` | fulltext | (secret) | Object storage secret key |
| `SERVER_SECRET` | fulltext | (secret) | Shared platform token secret |
| `FULLTEXT_DB_URL` | fulltext | - | Elasticsearch endpoint |
| `ELASTIC_INDEX_NAME` | fulltext | huly_storage_index | Index name to maintain |
| `PORT` | transactor | 3333 | Transactor listening port |
| `DB_URL` | transactor | - | PostgreSQL connection string |
| `FRONT_URL` | transactor | - | Public site root |
| `S3_BUCKET` | transactor | - | Bucket holding all workspaces |
| `STATS_URL` | transactor | - | Metrics collector endpoint |
| `S3_ENDPOINT` | transactor | - | Object storage endpoint |
| `SERVER_PORT` | transactor | 3333 | Same port, read by the app |
| `ACCOUNTS_URL` | transactor | - | Private account API |
| `FULLTEXT_URL` | transactor | - | Search service endpoint |
| `QUEUE_CONFIG` | transactor | - | Kafka broker address |
| `S3_ACCESS_KEY` | transactor | - | Object storage access key |
| `S3_SECRET_KEY` | transactor | (secret) | Object storage secret key |
| `SERVER_SECRET` | transactor | (secret) | Shared platform token secret |
| `LAST_NAME_FIRST` | transactor | true | Name ordering in lists |
| `PORT` | kvs | 8094 | Key-value store listening port |
| `HULY_BIND_HOST` | kvs | 0.0.0.0 | Listen on all interfaces |
| `HULY_BIND_PORT` | kvs | 8094 | Same port, read by the app |
| `HULY_TOKEN_SECRET` | kvs | (secret) | Shared platform token secret |
| `HULY_DB_CONNECTION` | kvs | - | PostgreSQL connection string |
| `CLUSTER_ID` | kafka | - | Stable cluster identity |
| `KAFKA_NODE_ID` | kafka | 1 | Broker and controller id |
| `KAFKA_LOG_DIRS` | kafka | /var/lib/kafka/data/logs | Log directory on the volume |
| `KAFKA_HEAP_OPTS` | kafka | -Xms512m -Xmx1g | JVM heap for the broker |
| `KAFKA_LISTENERS` | kafka | PLAINTEXT://:9092,CONTROLLER://:9093 | Client and controller listeners |
| `KAFKA_PROCESS_ROLES` | kafka | broker,controller | Single-node KRaft mode |
| `KAFKA_MIN_INSYNC_REPLICAS` | kafka | 1 | One in-sync replica |
| `KAFKA_ADVERTISED_LISTENERS` | kafka | PLAINTEXT://kafka.railway.internal:9092 | Address given to clients |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | kafka | 1@localhost:9093 | Single-node quorum |
| `KAFKA_AUTO_CREATE_TOPICS_ENABLE` | kafka | true | Allow implicit topic creation |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | kafka | CONTROLLER | Which listener is the controller |
| `KAFKA_DEFAULT_REPLICATION_FACTOR` | kafka | 1 | One copy for new topics |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | kafka | PLAINTEXT | Which listener brokers use |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | kafka | 1 | One in-sync replica |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | kafka | CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT | Protocol per listener |
| `KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS` | kafka | 0 | Join consumer groups immediately |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | kafka | 1 | One copy, single node |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | kafka | 1 | One copy, single node |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password, read by the server |
| `DB_URL` | workspace | - | PostgreSQL connection string |
| `S3_BUCKET` | workspace | - | Bucket holding all workspaces |
| `STATS_URL` | workspace | - | Metrics collector endpoint |
| `S3_ENDPOINT` | workspace | - | Object storage endpoint |
| `ACCOUNTS_URL` | workspace | - | Private account API |
| `QUEUE_CONFIG` | workspace | - | Kafka broker address |
| `MODEL_ENABLED` | workspace | * | Enable all workspace modules |
| `S3_ACCESS_KEY` | workspace | - | Object storage access key |
| `S3_SECRET_KEY` | workspace | (secret) | Object storage secret key |
| `SERVER_SECRET` | workspace | (secret) | Shared platform token secret |
| `TRANSACTOR_URL` | workspace | - | Internal and public transactor |
| `ACCOUNTS_DB_URL` | workspace | - | Account tables connection string |
| `PORT` | collaborator | 3078 | Collaborator listening port |
| `SECRET` | collaborator | (secret) | Shared platform token secret |
| `S3_BUCKET` | collaborator | - | Bucket holding all workspaces |
| `STATS_URL` | collaborator | - | Metrics collector endpoint |
| `S3_ENDPOINT` | collaborator | - | Object storage endpoint |
| `ACCOUNTS_URL` | collaborator | - | Private account API |
| `S3_ACCESS_KEY` | collaborator | - | Object storage access key |
| `S3_SECRET_KEY` | collaborator | (secret) | Object storage secret key |
| `COLLABORATOR_PORT` | collaborator | 3078 | Same port, read by the app |

## Configuration

- **Healthcheck:** `/`
- **Volume:** `/usr/share/elasticsearch/data`
- **Start command:** `/bin/sh -c 'SK=$(printf %s "$S3_SECRET_KEY" | sed "s/+/%2B/g"); export STORAGE_CONFIG="s3|$S3_ENDPOINT?accessKey=$S3_ACCESS_KEY&secretKey=$SK&region=auto&rootBucket=$S3_BUCKET"; exec node bundle.js'`
- **Start command:** `/bin/sh -c 'SK=$(printf %s "$S3_SECRET_KEY" | sed "s/+/%2B/g"); export STORAGE_CONFIG="s3|$S3_ENDPOINT?accessKey=$S3_ACCESS_KEY&secretKey=$SK&region=auto&rootBucket=$S3_BUCKET"; exec node ./bundle.js'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c 'SK=$(printf %s "$S3_SECRET_KEY" | sed "s/+/%2B/g"); export STORAGE_CONFIG="s3|$S3_ENDPOINT?accessKey=$S3_ACCESS_KEY&secretKey=$SK&region=auto&rootBucket=$S3_BUCKET"; exec node --expose-gc bundle.js'`
- **Volume:** `/var/lib/kafka/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/huly-workspace)
