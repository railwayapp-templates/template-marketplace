# Deploy Redpanda on Railway

Streaming data platform for publishing and consuming event topics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redpanda-kafka)

## About

Redpanda is a streaming data platform that speaks the Apache Kafka API without ZooKeeper, without a JVM, and without a separate Schema Registry or REST proxy alongside it. One C++ binary handles brokering, schema management and HTTP access, so what would normally be several moving parts is a single process. Teams reach for it when they want Kafka-compatible event streaming — order events, clickstreams, change data capture, log shipping — without operating a JVM cluster. Every Kafka client, connector and CLI works unchanged, because Redpanda implements the wire protocol rather than wrapping it.

Self-host Redpanda on Railway in three services. The `redpanda` service runs the broker on a persistent volume, exposing the Kafka API, Schema Registry, HTTP Proxy and Admin API behind SASL/SCRAM authentication. The `console` service runs Redpanda Console, the official web UI for browsing topics, inspecting messages and managing schemas. The `gateway` service is a Caddy reverse proxy holding the public domain: it puts HTTP basic authentication in front of the Console and forwards the broker's two HTTP APIs. External Kafka clients connect over a Railway TCP proxy.

![Diagram of the Redpanda broker, Console and Caddy gateway on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788250291/redpanda-architecture.png)

Redpanda replaces a Kafka deployment with one binary that manages its own Raft consensus and bundles what Kafka users normally install separately. Self-hosting suits teams who want event data on infrastructure they control, whose managed streaming bill is outgrowing their throughput, or who need a staging Kafka endpoint that behaves like the real one.

- **Kafka API compatible** — existing clients, Kafka Connect, kcat, Flink and Spark connectors work
- **Built-in Schema Registry** — Avro, Protobuf and JSON Schema subjects with compatibility checks
- **Built-in HTTP Proxy** — produce and consume over REST where a Kafka client is impractical
- **SASL/SCRAM and ACLs** — users and per-topic authorization inside the broker
- **No ZooKeeper, no JVM** — no heap tuning, no separate quorum tier

The broker owns all state and is the only service with a volume, so topics and consumer offsets survive redeploys. The Console is stateless, reading everything from the broker over the private network. The gateway exists because Console has no authentication outside its enterprise build.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redpanda | [gridalpha/redpanda-railway](https://github.com/gridalpha/redpanda-railway) (root: broker) | Database |
| gateway | [gridalpha/redpanda-railway](https://github.com/gridalpha/redpanda-railway) (root: gateway) | Web service |
| console | [gridalpha/redpanda-railway](https://github.com/gridalpha/redpanda-railway) (root: console) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | redpanda | 9644 | Admin API port, also health-checked |
| `REDPANDA_ADMIN_USER` | redpanda | (secret) | SASL/SCRAM superuser username |
| `REDPANDA_ADMIN_PASSWORD` | redpanda | (secret) | Superuser password, no colons |
| `REDPANDA_SASL_MECHANISM` | redpanda | SCRAM-SHA-256 | SCRAM-SHA-256 or SCRAM-SHA-512 |
| `PORT` | gateway | 8080 | HTTP server listening port |
| `CONSOLE_PORT` | gateway | 8080 | Console upstream port |
| `GATEWAY_USER` | gateway | (secret) | Console basic auth username |
| `CONSOLE_UPSTREAM` | gateway | - | Private Console hostname |
| `GATEWAY_PASSWORD` | gateway | (secret) | Console basic auth password |
| `REDPANDA_UPSTREAM` | gateway | - | Private broker hostname |
| `REDPANDA_HTTP_PROXY_PORT` | gateway | 8082 | Kafka HTTP Proxy upstream port |
| `REDPANDA_SCHEMA_REGISTRY_PORT` | gateway | 8081 | Schema Registry upstream port |
| `PORT` | console | 8080 | HTTP server listening port |
| `KAFKA_BROKERS` | console | - | Kafka bootstrap address |
| `RP_BROKER_HOST` | console | - | Private broker hostname |
| `SERVER_LISTENPORT` | console | 8080 | Console listen port, matches PORT |
| `KAFKA_SASL_ENABLED` | console | true | Authenticate to the Kafka API |
| `KAFKA_SASL_PASSWORD` | console | (secret) | Kafka SASL password |
| `KAFKA_SASL_USERNAME` | console | (secret) | Kafka SASL username |
| `SCHEMAREGISTRY_URLS` | console | - | Schema Registry address |
| `KAFKA_SASL_MECHANISM` | console | - | SCRAM mechanism |
| `REDPANDA_ADMINAPI_URLS` | console | - | Admin API address |
| `SCHEMAREGISTRY_ENABLED` | console | true | Enable the Schema Registry tab |
| `REDPANDA_ADMINAPI_ENABLED` | console | true | Enable Admin API features |
| `SCHEMAREGISTRY_AUTHENTICATION_BASIC_PASSWORD` | console | (secret) | Registry basic auth password |
| `SCHEMAREGISTRY_AUTHENTICATION_BASIC_USERNAME` | console | (secret) | Registry basic auth user |
| `REDPANDA_ADMINAPI_AUTHENTICATION_BASIC_PASSWORD` | console | (secret) | Admin API basic auth password |
| `REDPANDA_ADMINAPI_AUTHENTICATION_BASIC_USERNAME` | console | (secret) | Admin API basic auth user |

## Configuration

- **Healthcheck:** `/v1/status/ready`
- **TCP Proxies:** 19092
- **Volume:** `/var/lib/redpanda/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/admin/health`

**Category:** Queues · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/redpanda-kafka)
