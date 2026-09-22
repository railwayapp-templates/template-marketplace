# Deploy Kafka [Updated Sep'26] on Railway

Self-host Kafka — event streaming, log replay, no Confluent Cloud bill

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kafka-event-streaming)

## About

Apache Kafka is the distributed event streaming platform behind most modern data pipelines — a self-hosted alternative to Confluent Cloud and Amazon MSK. Publish, subscribe, store and replay streams of records, with consumers reading from any offset rather than draining a queue that forgets. This template runs a single-node broker in KRaft mode on the official image, with logs on a volume and listeners wired for private and external clients — a working bootstrap server, not a broker that accepts one connection then fails.

Kafka fails on a PaaS in ways that produce no useful error, and almost all of them are decided before the first message is produced.

**A regenerated `CLUSTER_ID` bricks an existing volume.** Kafka writes the cluster ID into `meta.properties` on first format. Supply a different ID on a later deploy and the broker finds the mismatch and refuses to start, reporting an inconsistent cluster ID rather than anything pointing at your config. This template fixes the ID so volume and broker stay in agreement.

**`KAFKA_ADVERTISED_LISTENERS` decides whether clients can use the broker at all.** Kafka answers a connection by handing back the address to use afterwards. Advertise the wrong host and clients connect once, get metadata pointing somewhere unreachable, then fail on every produce and fetch. Internal services use the private domain while external clients arrive via TCP proxy on a different host and port — both need advertising.

**The log directory must not be the volume mount root.** Kafka treats every entry in a log directory as a partition, and Railway creates `lost+found` at every volume root. Point `KAFKA_LOG_DIRS` at the mount and the broker aborts on boot. Leave it unset and the image default lands on the ephemeral container layer, where topics vanish on the next deploy without logging anything.

**Single node means replication factor 1 — this is not high availability.** With one broker there is nowhere to replicate to, so the internal offsets and transaction-state topics must be pinned to 1 or they are never created. A restart interrupts consumers and a lost volume is lost data. Fine for development, staging, internal event buses and low-to-medium production; not for anything needing durability across node failure.

**Kafka is a JVM service with a real memory floor.** It is not a $5 sidecar. Budget 1–2 GB of RAM before topics get busy, and treat retention as a disk decision: a week of a chatty topic sizes your volume, not your broker.

Typical cost: **~$20–35/month** for the broker and a 10 GB volume at light traffic, on rates of $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. Kafka is Apache 2.0 and free.

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

- **Volume:** `/var/lib/kafka/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/kafka-event-streaming)
