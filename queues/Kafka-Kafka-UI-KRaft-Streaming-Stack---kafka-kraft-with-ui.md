# Deploy Kafka + Kafka UI — KRaft Streaming Stack on Railway

Single-node Kafka in KRaft mode with a web UI — no ZooKeeper

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kafka-kraft-with-ui)

## About

Apache Kafka is the industry-standard distributed event streaming platform — publish, subscribe, store, and replay streams of records at scale, powering everything from microservice event buses to analytics pipelines handling trillions of events a day. This template deploys a single-node Kafka broker in **KRaft mode** (no ZooKeeper) **bundled with Kafka UI**, so you get a working broker and a web interface to see topics, messages, and consumer lag from the first deploy.
---

Kafka in KRaft mode combines the broker and controller into one process (`KAFKA_PROCESS_ROLES=broker,controller`), removing the ZooKeeper sidecar that used to double the operational surface. That's the easy part. The hard part on any cloud platform is one setting: **`KAFKA_ADVERTISED_LISTENERS`.**

When a client connects, Kafka doesn't just serve data — it replies with the address clients should use for later requests. If that advertised address doesn't match how clients actually reach the broker, they connect once, receive metadata pointing at an unreachable host, and then fail on every real operation. On Railway this is sharper than usual: internal traffic uses the private domain on `9092` while external clients come through the TCP proxy on a different host and port. Both listeners must be advertised correctly, or half your clients silently break.

This template wires dual listeners for exactly that — private networking for Railway-to-Railway services and TCP-proxy access for external clients — and bundles Kafka UI so you can actually see whether it's working. A misconfigured broker looks fine until an app fails; the UI makes topic creation, message flow, and consumer lag visible immediately.

Typical cost: **~$5–15/month** on Railway for the broker and UI. Confluent Cloud and other managed Kafka services bill per hour plus per GB of throughput and storage, which climbs fast; a self-hosted single node is flat.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kafka | `apache/kafka:latest` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `KAFKA_NODE_ID` | 1 |
| `KAFKA_LOG_DIRS` | /var/lib/kafka/data |
| `KAFKA_LISTENERS` | INTERNAL://:9092,EXTERNAL://:9094,CONTROLLER://:9093 |
| `KAFKA_PROCESS_ROLES` | broker,controller |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | 1@localhost:9093 |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | CONTROLLER |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | INTERNAL |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | 1 |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | INTERNAL:PLAINTEXT,EXTERNAL:PLAINTEXT,CONTROLLER:PLAINTEXT |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | 1 |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | 1 |

## Configuration

- **Volume:** `/var/lib/kafka/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/kafka-kraft-with-ui)
