# Deploy Postgres CDC | Every Row Change, Delivered to a Webhook on Railway

Every row change in Postgres, delivered to a webhook. Debezium, no Kafka.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/postgres-cdc-or-every-row-change-deliver)

## About

Every insert, update and delete in a Postgres schema, delivered to an HTTP endpoint of yours — without polling, without changing your application, and without Kafka.

Three services: Postgres with logical decoding enabled, Debezium Server, and a small receiver that records what arrives so you can watch it work.

Search this catalogue for change data capture and there is nothing. Out of 3991 templates, Debezium is not mentioned once — while Postgres is the most-installed template on the platform, at over 340,000 deployments.

So the usual answer is a polling loop: `select ... where updated_at > ?`, every few seconds, forever. It misses deletes entirely. It misses anything that changed twice between two polls. It gets slower as the table grows, and it runs whether or not anything happened.

Postgres already writes every change to its write-ahead log. Debezium reads that log through a replication slot and posts what it finds to a URL — no broker in between, no schema registry, no cluster.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Debezium | `quay.io/debezium/server:3.6.0.Final` | Worker |
| Sink | [ak40u/postgres-cdc-railway](https://github.com/ak40u/postgres-cdc-railway) | Web service |
| Postgres | `postgres:17-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `QUARKUS_LOG_LEVEL` | Debezium | INFO |
| `DEBEZIUM_SINK_TYPE` | Debezium | http |
| `DEBEZIUM_FORMAT_KEY` | Debezium | json |
| `DEBEZIUM_FORMAT_VALUE` | Debezium | json |
| `DEBEZIUM_SOURCE_SLOT_NAME` | Debezium | debezium_slot |
| `DEBEZIUM_SOURCE_TRANSFORMS` | Debezium | unwrap |
| `DEBEZIUM_SOURCE_PLUGIN_NAME` | Debezium | pgoutput |
| `DEBEZIUM_SOURCE_TOPIC_PREFIX` | Debezium | app |
| `DEBEZIUM_SOURCE_DATABASE_PORT` | Debezium | 5432 |
| `DEBEZIUM_SOURCE_DATABASE_USER` | Debezium | (secret) |
| `DEBEZIUM_SOURCE_CONNECTOR_CLASS` | Debezium | io.debezium.connector.postgresql.PostgresConnector |
| `DEBEZIUM_SOURCE_DATABASE_DBNAME` | Debezium | railway |
| `DEBEZIUM_SOURCE_PUBLICATION_NAME` | Debezium | debezium_pub |
| `DEBEZIUM_SOURCE_DATABASE_PASSWORD` | Debezium | (secret) |
| `DEBEZIUM_SOURCE_SCHEMA_INCLUDE_LIST` | Debezium | app |
| `DEBEZIUM_FORMAT_VALUE_SCHEMAS_ENABLE` | Debezium | false |
| `DEBEZIUM_SOURCE_TRANSFORMS_UNWRAP_TYPE` | Debezium | io.debezium.transforms.ExtractNewRecordState |
| `DEBEZIUM_SOURCE_OFFSET_FLUSH_INTERVAL_MS` | Debezium | 10000 |
| `DEBEZIUM_SOURCE_OFFSET_STORAGE_FILE_FILENAME` | Debezium | /data/offsets.dat |
| `DEBEZIUM_SOURCE_TRANSFORMS_UNWRAP_ADD_FIELDS` | Debezium | op,table,source.ts_ms |
| `PORT` | Sink | 8080 |
| `API_TOKEN` | Sink | (secret) |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `docker-entrypoint.sh postgres -c wal_level=logical -c max_replication_slots=8 -c max_wal_senders=8`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Storage · **Languages:** TypeScript, Shell

[View on Railway →](https://railway.com/deploy/postgres-cdc-or-every-row-change-deliver)
