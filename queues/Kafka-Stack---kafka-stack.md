# Deploy Kafka Stack on Railway

Apache Kafka (KRaft) and Kafbat UI in one click. No ZooKeeper needed.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kafka-stack)

## About

**Kafka Stack** deploys a ready-to-use single-node Apache Kafka broker in modern KRaft mode together with Kafbat UI. Get a full event-streaming environment with a browser-based management interface in one click — no ZooKeeper required.

This template deploys two services: a single-node Kafka broker running in combined broker/controller KRaft mode, and Kafbat UI for easy cluster management. The UI comes with basic authentication and is pre-connected to the Kafka service. Kafka runs without a persistent volume (data is ephemeral and resets on redeploy), while the UI configuration is persisted. After deploy, open the UI, log in with the default credentials, and start creating topics or inspecting messages immediately. Ideal for development, testing, prototypes, and small internal workloads that need a lightweight event-streaming setup without operational overhead.

**Default UI Credentials**
- Username: `kafka`
- Password: Auto-generated 16-character secret (visible in the Variables tab after deploy)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kafka | `apache/kafka:latest` | Database |
| kafka-ui | `ghcr.io/kafbat/kafka-ui:latest` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `CLUSTER_ID` | kafka | MkU3OEVBNTcwNTJENDM2Qk |
| `KAFKA_NODE_ID` | kafka | 1 |
| `KAFKA_LOG_DIRS` | kafka | /var/lib/kafka/data/kraft-combined-logs |
| `KAFKA_LISTENERS` | kafka | PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093 |
| `KAFKA_PROCESS_ROLES` | kafka | broker,controller |
| `KAFKA_AUTO_CREATE_TOPICS_ENABLE` | kafka | true |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | kafka | CONTROLLER |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | kafka | PLAINTEXT |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | kafka | 1 |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | kafka | CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | kafka | 1 |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | kafka | 1 |
| `AUTH_TYPE` | kafka-ui | LOGIN_FORM |
| `SERVER_PORT` | kafka-ui | 8080 |
| `KAFKA_CLUSTERS_0_NAME` | kafka-ui | local |
| `DYNAMIC_CONFIG_ENABLED` | kafka-ui | true |
| `SPRING_SECURITY_USER_NAME` | kafka-ui | kafka |
| `SPRING_SECURITY_USER_PASSWORD` | kafka-ui | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/kafkaui`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/kafka-stack)
