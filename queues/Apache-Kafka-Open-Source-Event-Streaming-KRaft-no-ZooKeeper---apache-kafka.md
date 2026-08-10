# Deploy Apache Kafka | Open Source Event Streaming (KRaft, no ZooKeeper) on Railway

Kafka in KRaft mode with a web console — no ZooKeeper, data on a volume

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apache-kafka)

## About

Apache Kafka is the distributed log that most event-driven systems are built on: producers append records to topics, consumers read them at their own pace, and nothing is lost in between. This template runs it in KRaft mode — no ZooKeeper — with a web console in front of it.

This template runs the official `apache/kafka` image on a pinned stable tag, with partitions and the metadata log on a persistent Railway volume, plus [kafbat's Kafka UI](https://ui.docs.kafbat.io/) as a management console. Nothing is rebuilt or forked, so upstream releases and upstream security fixes are what you get.

Two choices here are worth stating plainly, because they are the ones that go wrong elsewhere.

The image is Apache's own, not Bitnami's. Bitnami removed versioned tags from the free Docker Hub tier in 2025, and templates pinned to them stopped deploying — a template that cannot pull its image is worse than no template.

The broker is reachable **only inside your Railway project**, at `kafka.railway.internal:9092`. Kafka has no authentication over PLAINTEXT, so a broker on a public TCP proxy is a cluster anyone can produce to, consume from and delete topics in. Doing external access properly means SASL, certificates and a client configuration this template cannot fill in for you. The console is the one thing on a public domain, and it sits behind a login form with a generated password.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kafka-UI | `kafbat/kafka-ui:v1.5.0` | Database |
| Kafka | `apache/kafka:4.3.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Kafka-UI | 8080 | The port Railway routes public traffic to. Kept in step with SERVER_PORT. |
| `AUTH_TYPE` | Kafka-UI | LOGIN_FORM | Puts a login form in front of the UI. Leaving this unset would publish a console that can read every message and delete every topic to anyone who finds the URL. |
| `SERVER_PORT` | Kafka-UI | 8080 | Port the UI listens on. |
| `KAFKA_CLUSTERS_0_NAME` | Kafka-UI | railway | Display name of the cluster in the UI. |
| `DYNAMIC_CONFIG_ENABLED` | Kafka-UI | true | Lets topics and cluster settings be edited from the UI rather than only viewed. |
| `SPRING_SECURITY_USER_NAME` | Kafka-UI | admin | Username for the UI login form. |
| `SPRING_SECURITY_USER_PASSWORD` | Kafka-UI | (secret) | Password for the UI login form. Generated at deploy — copy it from the service variables on first use. |
| `KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS` | Kafka-UI | - | Bootstrap address of the broker, over the Railway private network. |
| `PORT` | Kafka | 9092 | The port the broker listens on. Railway routes by this variable; Kafka itself never reads it. |
| `CLUSTER_ID` | Kafka | - | KRaft cluster id, 22 characters. Generated once and written into the volume on the first boot; the image refuses to start without it. Do not change it afterwards — it identifies the data already on disk. |
| `KAFKA_NODE_ID` | Kafka | 1 | Node id of this broker. Single-node cluster, so it stays 1. |
| `KAFKA_LOG_DIRS` | Kafka | /var/lib/kafka/data/logs | Where partitions live. A subdirectory of the volume, not its root: Railway puts a `lost+found` entry at the mount point and Kafka treats every entry in a log dir as a partition directory, which aborts the boot. |
| `KAFKA_HEAP_OPTS` | Kafka | -Xms512m -Xmx512m | JVM heap for the broker. Raise it together with the service memory if you push real throughput through this. |
| `KAFKA_LISTENERS` | Kafka | PLAINTEXT://:9092,CONTROLLER://:9093 | Bind addresses. The host is left empty on purpose — the JVM binds a dual-stack wildcard socket, which is what Railway's IPv6-only private network needs. Writing 0.0.0.0 here makes kafka.railway.internal unreachable. |
| `KAFKA_PROCESS_ROLES` | Kafka | broker,controller | KRaft combined mode: one process is both broker and controller, so there is no ZooKeeper to run. |
| `KAFKA_ADVERTISED_LISTENERS` | Kafka | - | What clients are told to reconnect to after bootstrap. Without the private domain here the broker advertises its container hostname: the first connection works and every one after it times out. |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | Kafka | 1@localhost:9093 | The controller quorum. One voter, reached over loopback, because broker and controller are the same process. |
| `KAFKA_AUTO_CREATE_TOPICS_ENABLE` | Kafka | true | Creates a topic on first produce. Convenient for development; set to false if you would rather manage topics explicitly. |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | Kafka | CONTROLLER | Which listener carries the KRaft controller protocol. |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | Kafka | PLAINTEXT | Which listener brokers use to talk to each other. |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | Kafka | 1 | Minimum in-sync replicas for the transaction state log. Must be 1 on a single broker. |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | Kafka | CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT | Security protocol per listener. Both are PLAINTEXT: the broker is only reachable inside the Railway private network. |
| `KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS` | Kafka | 0 | How long the coordinator waits for more consumers before the first rebalance. Zero makes a single consumer start immediately instead of after three seconds. |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | Kafka | 1 | Replication factor of the consumer offsets topic. Must be 1 on a single broker, or the topic is never created and the first consumer group hangs. |
| `KAFKA_SHARE_COORDINATOR_STATE_TOPIC_MIN_ISR` | Kafka | 1 | Minimum in-sync replicas for the share coordinator topic. |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | Kafka | 1 | Same for the transaction state log. Must be 1 on a single broker. |
| `KAFKA_SHARE_COORDINATOR_STATE_TOPIC_REPLICATION_FACTOR` | Kafka | 1 | Replication factor for the share coordinator topic used by Kafka 4 share groups. |

## Configuration

- **Healthcheck:** `/actuator/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/kafka/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/apache-kafka)
