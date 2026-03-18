# Deploy Kafka (w/Kafka UI) on Railway

One-click deploy: Kafka (KRaft) + Kafka UI

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kafka-wkafka-ui)

## About

Apache Kafka (single-broker, KRaft mode) plus Kafka UI, pre-configured for Railway. Kafka runs on Private Networking for secure, internal traffic; Kafka UI is exposed via HTTP for convenient topic and consumer inspection. Ideal for prototypes, tutorials, and staging environments that need event streaming without operational overhead.

This template deploys a single Kafka broker using Confluent's cp-kafka (KRaft, no ZooKeeper) and Kafka UI for observability. Your apps communicate with Kafka over Railway's Private Networking; only the UI is public. Use Kafka UI to browse topics, create partitions, inspect messages, and view consumer groups. The setup prioritizes simplicity over high availability, making it great for development, demos, and lightweight staging. Scale vertically by increasing service resources. For persistence across restarts, attach a Railway Volume to the Kafka service. Run client services in the same Railway project to reach the broker over its internal address and port.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kafka UI | [kinsyudev/kafka-railway](https://github.com/kinsyudev/kafka-railway) (root: services/kafka-ui) | Web service |
| Kafka | [kinsyudev/kafka-railway](https://github.com/kinsyudev/kafka-railway) (root: services/kafka) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `SERVER_PORT` | Kafka UI | 8080 | - |
| `KAFKA_CLUSTERS_0_NAME` | Kafka UI | Local | - |
| `KAFKA_CLUSTERS_0_PROPERTIES_SECURITY_PROTOCOL` | Kafka UI | PLAINTEXT | - |
| `KAFKA_URL` | Kafka | - | TLS for external listener (optional; enabled when KAFKA_P12_B64 set) |
| `KAFKA_NODE_ID` | Kafka | 1 | - |
| `KAFKA_LOG_DIRS` | Kafka | /var/lib/kafka/data/logs | - |
| `KAFKA_PASSWORD` | Kafka | (secret) | - |
| `KAFKA_LISTENERS` | Kafka | INTERNAL://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093,EXTERNAL://0.0.0.0:19092 | - |
| `KAFKA_PROCESS_ROLES` | Kafka | broker,controller | - |
| `KAFKA_SSL_KEYSTORE_TYPE` | Kafka | PKCS12 | - |
| `KAFKA_SSL_KEYSTORE_LOCATION` | Kafka | /etc/kafka/secrets/server.p12 | - |
| `KAFKA_SSL_KEYSTORE_PASSWORD` | Kafka | (secret) | $%^&*") }} |
| `KAFKA_SASL_ENABLED_MECHANISMS` | Kafka | PLAIN | - |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | Kafka | 1@127.0.0.1:9093 | - |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | Kafka | CONTROLLER | - |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | Kafka | INTERNAL | - |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | Kafka | CONTROLLER:PLAINTEXT,INTERNAL:SASL_PLAINTEXT,EXTERNAL:SASL_PLAINTEXT | - |
| `KAFKA_SASL_MECHANISM_INTER_BROKER_PROTOCOL` | Kafka | PLAIN | - |
| `KAFKA_LISTENER_NAME_EXTERNAL_SASL_ENABLED_MECHANISMS` | Kafka | PLAIN | - |
| `KAFKA_LISTENER_NAME_INTERNAL_SASL_ENABLED_MECHANISMS` | Kafka | PLAIN | - |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 9092
- **Volume:** `/var/lib/kafka/data`

**Category:** Queues · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/kafka-wkafka-ui)
