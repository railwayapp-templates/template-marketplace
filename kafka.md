# Deploy Apache Kafka — Open Source RabbitMQ Alternative for High-Throughput Streaming on Railway

Self-host Kafka with KRaft mode, pub/sub, log replay, Flink/Spark-ready

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kafka)

## About

Apache Kafka is a distributed event streaming platform built for high-throughput, fault-tolerant, real-time data pipelines. It lets applications publish, subscribe to, store, and replay streams of records at massive scale — from microservice event buses to analytics pipelines handling trillions of events per day. This Railway template deploys a single-node Kafka broker in **KRaft mode** (no ZooKeeper required), using the official `apache/kafka` Docker image, with a persistent volume at `/var/lib/kafka/data`, pre-configured dual listeners for both private Railway networking and external TCP access via Railway's TCP proxy.

Kafka is an open-source Apache Software Foundation project, implemented in Scala and Java. It uses a distributed commit-log architecture where producers write to partitioned topics stored on brokers, and consumers pull messages sequentially — retaining them indefinitely (by policy) for replay. Since Kafka 3.3, **KRaft mode** removes the ZooKeeper dependency, making single-node deployments dramatically simpler.

Key features:

- **Dual-listener architecture** — internal listener (`INTERNAL://:9092`) for private Railway service-to-service traffic, external listener (`EXTERNAL://:9094`) exposed via TCP proxy for outside clients
- **KRaft combined mode** — broker and controller roles run in a single process (`KAFKA_PROCESS_ROLES=broker,controller`), no ZooKeeper sidecar needed
- **Persistent storage** — topic data survives redeploys via a mounted volume at `/var/lib/kafka/data`
- **Topic replay** — consumers can rewind and re-consume any message within the retention window
- **Ecosystem breadth** — native integrations with Flink, Spark, ksqlDB, Kafka Connect, and most major databases via connectors

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kafka | `apache/kafka:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `KAFKA_NODE_ID` | 1 | Unique identifier for broker node |
| `KAFKA_LOG_DIRS` | /var/lib/kafka/data | Directory storing Kafka log data |
| `KAFKA_LISTENERS` | INTERNAL://:9092,EXTERNAL://:9094,CONTROLLER://:9093 | Kafka listener endpoints configuration |
| `KAFKA_PROCESS_ROLES` | broker,controller | Node roles in Kafka cluster |
| `KAFKA_ADVERTISED_LISTENERS` | - | Broker advertised internal and external listeners |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | 1@localhost:9093 | Controller quorum voters configuration |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | CONTROLLER | Listener name used by controller |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | INTERNAL | Listener used for broker communication |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | 1 | Minimum in-sync replicas transactions |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT,CONTROLLER:PLAINTEXT | Map listeners to security protocols |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | 1 | Replication factor for offsets topic |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | 1 | Replication factor transaction state logs |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf /var/lib/kafka/data/lost+found && exec /etc/kafka/docker/run"`
- **TCP Proxies:** 9094
- **Volume:** `/var/lib/kafka/data`

**Category:** Queues

[View on Railway →](https://railway.com/template/kafka)
