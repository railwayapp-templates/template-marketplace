# Deploy Redpanda v26 Kafka-Compatible Streaming on Railway

Kafka API streaming with Redpanda Console. No ZooKeeper, no JVM.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redpanda-v26-kafka-compatible-streaming)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redpanda-v26-kafka-compatible-streaming?referralCode=20H68q)

Redpanda is a Kafka API-compatible streaming platform written in C++, with no ZooKeeper and no JVM. This community template deploys a single Redpanda broker with SASL authentication, a persistent volume, the built-in Schema Registry and HTTP Proxy, and Redpanda Console behind a password-protected HTTPS domain.

Redpanda runs as one binary that already includes the Kafka API, a Schema Registry and an HTTP Proxy, so a single service replaces Kafka, ZooKeeper or KRaft controllers and a separate registry. Hosting it well means persistent storage, authentication, memory limits that fit a shared container, and listeners that advertise addresses clients can actually reach. This template runs Redpanda in production mode with SASL/SCRAM on every Kafka listener, keeps the broker on Railway's private network by default, and is ready for an optional TCP proxy when clients outside Railway need access. Redpanda Console gives you a web UI for topics, messages, consumer groups, schemas, users and ACLs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| console | `redpandadata/console:v3.12.0` | Worker |
| console-gateway | [baranberkay96/redpanda-railway](https://github.com/baranberkay96/redpanda-railway) (branch: main) (root: /services/console-gateway) | Web service |
| redpanda | [baranberkay96/redpanda-railway](https://github.com/baranberkay96/redpanda-railway) (branch: main) (root: /services/redpanda) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | console | 8080 | Console HTTP port; /admin/health is the healthcheck. |
| `KAFKA_BROKERS` | console | - | Kafka bootstrap server (private network). |
| `SERVER_LISTENPORT` | console | 8080 | Console HTTP port. |
| `KAFKA_SASL_ENABLED` | console | true | Authenticate to Kafka with SASL. |
| `KAFKA_SASL_PASSWORD` | console | (secret) | SASL password (reference). |
| `KAFKA_SASL_USERNAME` | console | (secret) | SASL user (reference). |
| `SCHEMAREGISTRY_URLS` | console | - | Schema Registry URL (reference). |
| `KAFKA_SASL_MECHANISM` | console | - | SCRAM mechanism (reference). |
| `REDPANDA_ADMINAPI_URLS` | console | - | Admin API URL (private network). |
| `SCHEMAREGISTRY_ENABLED` | console | true | Show schemas and decode Avro/Protobuf messages. |
| `REDPANDA_ADMINAPI_ENABLED` | console | true | Manage users, ACLs and cluster settings through the Admin API. |
| `KAFKA_SASL_IMPERSONATEUSER` | console | false | Use the static credentials above (no Console login). |
| `SCHEMAREGISTRY_AUTHENTICATION_BASIC_PASSWORD` | console | (secret) | Schema Registry password (reference). |
| `SCHEMAREGISTRY_AUTHENTICATION_BASIC_USERNAME` | console | (secret) | Schema Registry user (reference). |
| `SCHEMAREGISTRY_AUTHENTICATION_IMPERSONATEUSER` | console | false | Use the static credentials above. |
| `REDPANDA_ADMINAPI_AUTHENTICATION_BASIC_PASSWORD` | console | (secret) | Admin API password (reference). |
| `REDPANDA_ADMINAPI_AUTHENTICATION_BASIC_USERNAME` | console | (secret) | Admin API user (reference). |
| `REDPANDA_ADMINAPI_AUTHENTICATION_IMPERSONATEUSER` | console | false | Use the static credentials above. |
| `PORT` | console-gateway | 8080 | Gateway port (public domain target); /healthz is unauthenticated. |
| `CONSOLE_UPSTREAM` | console-gateway | - | Console on the private network. |
| `BASIC_AUTH_PASSWORD` | console-gateway | (secret) | Password for Redpanda Console. Generated; read it here. |
| `BASIC_AUTH_USERNAME` | console-gateway | (secret) | Login for Redpanda Console. |
| `PORT` | redpanda | 9644 | Admin API port; /v1/status/ready (unauthenticated) is the healthcheck. |
| `REDPANDA_SMP` | redpanda | 1 | CPU cores Redpanda uses (seastar shards). |
| `REDPANDA_MEMORY` | redpanda | 1G | Memory Redpanda reserves for itself. Size it to your throughput; the container needs a little more than this. |
| `REDPANDA_LOG_LEVEL` | redpanda | info | Broker log level. |
| `KAFKA_SASL_PASSWORD` | redpanda | (secret) | Password of the superuser. Used only when the cluster is created; change it later with rpk (see README). |
| `KAFKA_SASL_USERNAME` | redpanda | (secret) | SASL/SCRAM superuser created on first start (also Schema Registry / HTTP Proxy / Admin API login). |
| `SCHEMA_REGISTRY_URL` | redpanda | - | Schema Registry URL on the private network (HTTP Basic auth with the SASL user). |
| `KAFKA_SASL_MECHANISM` | redpanda | SCRAM-SHA-256 | SCRAM-SHA-256 or SCRAM-SHA-512. |
| `KAFKA_LOG_RETENTION_MS` | redpanda | 604800000 | Default topic retention (7 days). Applied when the cluster is created; per-topic retention can be set any time. |
| `KAFKA_BOOTSTRAP_SERVERS` | redpanda | - | Bootstrap address for clients on the private network; reference it as ${{redpanda.KAFKA_BOOTSTRAP_SERVERS}}. |
| `KAFKA_AUTO_CREATE_TOPICS` | redpanda | false | Create topics automatically on first produce. Applied when the cluster is created. |

## Configuration

- **Healthcheck:** `/admin/health`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/v1/status/ready`
- **Volume:** `/var/lib/redpanda/data`

**Category:** Queues · **Tags:** redpanda, kafka, streaming, event-streaming, message-queue · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/redpanda-v26-kafka-compatible-streaming)
