# Deploy Huly on Railway

A project management & collaboration tool similar to Linear, Jira or Notion

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/huly-1)

## About

Huly is an all-in-one project management platform combining tasks, issues, documents, and team collaboration in a single workspace. An open-source alternative to Linear, Jira, and Notion – purpose-built for development teams wanting full data control.

Deploying Huly traditionally requires orchestrating multiple microservices, complex Docker Compose configurations, manual networking setup, and tedious environment variable management. This Railway template eliminates that complexity entirely.  With one click, you get a fully configured Huly instance with Caddy reverse proxy handling SSL and routing, private networking for all backend services, and pre-wired environment variables.  No Docker knowledge required, no configuration files to edit – just deploy and start collaborating in under 5 minutes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Fulltext | `hardcoreeng/fulltext:s0.7.330` | Worker |
| Hulykvs | `hardcoreeng/hulykvs:s0.7.330` | Worker |
| Elasticsearch | `elasticsearch:7.14.2` | Database |
| MinIO | `minio/minio` | Database |
| Rekoni | `hardcoreeng/rekoni-service:s0.7.330` | Worker |
| Kafka | [vipulasri/kafka-railway](https://github.com/vipulasri/kafka-railway) (root: services/kafka) | Database |
| Cockroachdb | `cockroachdb/cockroach:latest-v24.2` | Database |
| Stats | `hardcoreeng/stats:s0.7.330` | Worker |
| Workspace | `hardcoreeng/workspace:s0.7.330` | Worker |
| Transactor | `hardcoreeng/transactor:s0.7.330` | Worker |
| Frontend | `hardcoreeng/front:s0.7.330` | Worker |
| Account | `hardcoreeng/account:s0.7.330` | Worker |
| Collaborator | `hardcoreeng/collaborator:s0.7.330` | Worker |
| Huly-Caddy | [vipulasri/huly-caddy-railway](https://github.com/vipulasri/huly-caddy-railway) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `SERVER_SECRET` | Fulltext | (secret) |
| `ELASTIC_INDEX_NAME` | Fulltext | huly_storage_index |
| `PORT` | Hulykvs | 8094 |
| `HULY_TOKEN_SECRET` | Hulykvs | (secret) |
| `ES_JAVA_OPTS` | Elasticsearch | -Xms512m -Xmx512m |
| `BITNAMI_DEBUG` | Elasticsearch | true |
| `discovery.type` | Elasticsearch | single-node |
| `http.cors.enabled` | Elasticsearch | true |
| `bootstrap.memory_lock` | Elasticsearch | false |
| `node.store.allow_mmap` | Elasticsearch | false |
| `http.cors.allow-origin` | Elasticsearch | http://localhost:8082 |
| `xpack.security.enabled` | Elasticsearch | false |
| `ELASTICSEARCH_PORT_NUMBER` | Elasticsearch | 9200 |
| `MINIO_ROOT_USER` | MinIO | (secret) |
| `MINIO_ROOT_PASSWORD` | MinIO | (secret) |
| `SERVER_SECRET` | Rekoni | (secret) |
| `KAFKA_NODE_ID` | Kafka | 1 |
| `KAFKA_LOG_DIRS` | Kafka | /var/lib/kafka/data/logs |
| `KAFKA_PASSWORD` | Kafka | (secret) |
| `KAFKA_LISTENERS` | Kafka | PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093 |
| `KAFKA_PROCESS_ROLES` | Kafka | broker,controller |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | Kafka | 1@${RAILWAY_PRIVATE_DOMAIN}:9093 |
| `KAFKA_AUTO_CREATE_TOPICS_ENABLE` | Kafka | true |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | Kafka | CONTROLLER |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | Kafka | PLAINTEXT |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | Kafka | 1 |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | Kafka | PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | Kafka | 1 |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | Kafka | 1 |
| `COCKROACH_USER` | Cockroachdb | (secret) |
| `COCKROACH_DATABASE` | Cockroachdb | huly |
| `COCKROACH_PASSWORD` | Cockroachdb | (secret) |
| `PORT` | Stats | 4900 |
| `SERVER_SECRET` | Stats | (secret) |
| `MODEL_ENABLED` | Workspace | * |
| `SERVER_SECRET` | Workspace | (secret) |
| `SERVER_PORT` | Transactor | 3333 |
| `SERVER_SECRET` | Transactor | (secret) |
| `UPLOAD_URL` | Frontend | /files |
| `SERVER_PORT` | Frontend | 8080 |
| `SERVER_SECRET` | Frontend | (secret) |
| `SERVER_PORT` | Account | 3000 |
| `ACCOUNT_PORT` | Account | 3000 |
| `MODEL_ENABLED` | Account | * |
| `SERVER_SECRET` | Account | (secret) |
| `SECRET` | Collaborator | (secret) |
| `COLLABORATOR_PORT` | Collaborator | 3078 |

## Configuration

- **Start command:** `bash -c "chown -R elasticsearch:elasticsearch /usr/share/elasticsearch/data && exec su -s /bin/bash elasticsearch -c /usr/share/elasticsearch/bin/elasticsearch"`
- **Volume:** `/usr/share/elasticsearch/data`
- **Start command:** `/usr/bin/minio server /data --console-address ":9001" --address ":9000"`
- **Volume:** `/data`
- **TCP Proxies:** 9092
- **Volume:** `/var/lib/kafka/data`
- **Start command:** `/bin/bash -c "/cockroach/cockroach start-single-node --insecure --accept-sql-without-tls --background && /cockroach/cockroach sql --insecure -e 'CREATE DATABASE IF NOT EXISTS huly;' && tail -f /cockroach/cockroach-data/logs/cockroach.log"`
- **Volume:** `/cockroach/cockroach-data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/huly-1)
