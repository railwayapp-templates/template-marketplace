# Deploy Kafka + Kafka UI (KRaft) on Railway

Single-node Kafka in KRaft mode with Kafka UI on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kafka-kafka-ui-kraft)

## About

Kafka + Kafka UI (KRaft) is a simple Railway template that deploys Apache Kafka in modern ZooKeeper-free KRaft mode together with Kafka UI for browser-based management. It is ideal for development, testing, prototypes, and small internal workloads that need a lightweight event streaming setup with persistent storage and an easy admin interface.

This template deploys a single-node Kafka broker running in KRaft mode, plus Kafka UI for managing brokers, topics, and consumers from a web interface. It is designed for teams that want to start quickly on Railway without setting up ZooKeeper or a multi-node Kafka cluster. Persistent storage is included for Kafka data, and the configuration is optimized for internal development and small workloads. This setup is best suited for dev environments, prototypes, small internal queues, async processing pipelines, and event-driven services. It is not intended for high-availability production workloads that require multiple brokers and replication across nodes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kafka-ui | `provectuslabs/kafka-ui:latest` | Database |
| cp-kafka | `confluentinc/cp-kafka:latest` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `AUTH_TYPE` | kafka-ui | LOGIN_FORM | Enable username/password login for Kafka UI. |
| `KAFKA_CLUSTERS_0_NAME` | kafka-ui | local | Display name of the Kafka cluster in the UI. |
| `SPRING_SECURITY_USER_NAME` | kafka-ui | - | Auto-generated Kafka UI username. |
| `SPRING_SECURITY_USER_PASSWORD` | kafka-ui | (secret) | Auto-generated Kafka UI password. |
| `KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS` | kafka-ui | - | Internal Kafka bootstrap server for Kafka UI. |
| `CLUSTER_ID` | cp-kafka | MkU3OEVBNTcwNTJENDM2Qk | Valid KRaft cluster ID from Confluent example. |
| `KAFKA_NODE_ID` | cp-kafka | 1 | Unique node ID for this Kafka server. |
| `KAFKA_LOG_DIRS` | cp-kafka | /var/lib/kafka/data/kraft-combined-logs | Kafka data directory inside the mounted volume, avoids the lost+found folder problem. |
| `KAFKA_LISTENERS` | cp-kafka | PLAINTEXT://0.0.0.0:9092,CONTROLLER://0.0.0.0:9093 | Internal listeners Kafka binds to. |
| `KAFKA_PROCESS_ROLES` | cp-kafka | broker,controller | Run this single node as both broker and controller in KRaft mode. |
| `KAFKA_ADVERTISED_LISTENERS` | cp-kafka | - | Internal broker address advertised to Railway services. |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | cp-kafka | - | Single-node KRaft controller quorum. |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | cp-kafka | CONTROLLER | Listener name used for controller traffic. |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | cp-kafka | PLAINTEXT | Listener used for broker communication. |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | cp-kafka | PLAINTEXT:PLAINTEXT,CONTROLLER:PLAINTEXT | Maps listener names to protocols. |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | cp-kafka | 1 | Internal offsets topic replication factor for one broker. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/kafka/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/kafka-kafka-ui-kraft)
