# Deploy Kafka + Kafbat UI + Kafka Prometheus Exporter on Railway

Template for Kafka + Kafbat UI + Kafka Prometheus Exporter

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/kafka-kafbat-ui-kafka-prometheus-exporte)

## About

- **Apache Kafka** – the event-streaming platform (brokers, topics, partitions, producers/consumers).
- **Kafbat UI** – a free, open-source web UI to browse/manage clusters (see brokers, topics, partitions, consumer groups, messages, ACLs, etc.). Think “Kafka control panel.” 
- **Kafka Prometheus Exporter** – a small service exposing Prometheus-readable metrics about Kafka (topic/partition counts, consumer-group lag, etc.). Prometheus scrapes it; Grafana (optional) visualizes. (Often used alongside or instead of the JMX Exporter that pulls Kafka’s JMX MBeans.)

Hosting Kafka with Kafbat UI and the Kafka Prometheus Exporter involves provisioning reliable compute, fast disks, and stable networking for brokers (preferably multiple nodes). Configure Kafka (KRaft or ZooKeeper), listeners/advertised addresses, replication factors, and retention. Expose secure endpoints (TLS/SASL), create ACLs, and size partitions for throughput. Deploy Kafbat UI pointing at the cluster for topic/consumer management. Run the Kafka Prometheus Exporter (or JMX exporter) to expose metrics; have Prometheus scrape it and, optionally, Grafana visualize dashboards and alerts. Add log aggregation, backup/snapshot routines, rolling upgrade procedures, and capacity planning. Automate via Docker Compose or Kubernetes manifests, with IaC (e.g., Terraform) for repeatable, versioned environments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kafka | `apache/kafka:latest` | Database |
| Kafbat UI | `ghcr.io/kafbat/kafka-ui` | Database |
| Kafka Exporter | `danielqsj/kafka-exporter` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `CLUSTER_ID` | Kafka | production |
| `KAFKA_NODE_ID` | Kafka | 1 |
| `KAFKA_JMX_PORT` | Kafka | 9997 |
| `KAFKA_LOG_DIRS` | Kafka | /var/lib/kafka/data |
| `KAFKA_LISTENERS` | Kafka | PLAINTEXT://:29092,PLAINTEXT_HOST://:9092,CONTROLLER://:9093 |
| `KAFKA_LOG4J_LOGGERS` | Kafka | kafka.controller=INFO,kafka.producer.async.DefaultEventHandler=INFO,state.change.logger=INFO |
| `KAFKA_PROCESS_ROLES` | Kafka | broker,controller |
| `KAFKA_NUM_PARTITIONS` | Kafka | 3 |
| `KAFKA_AUTO_CREATE_TOPICS_ENABLE` | Kafka | true |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | Kafka | CONTROLLER |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | Kafka | 1 |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | Kafka | PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT,CONTROLLER:PLAINTEXT |
| `KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS` | Kafka | 0 |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | Kafka | 1 |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | Kafka | 1 |
| `PORT` | Kafbat UI | 8080 |
| `AUTH_TYPE` | Kafbat UI | LOGIN_FORM |
| `KAFKA_CLUSTERS_0_NAME` | Kafbat UI | Kafka |
| `DYNAMIC_CONFIG_ENABLED` | Kafbat UI | true |
| `KAFKA_CLUSTERS_0_METRICS_PORT` | Kafbat UI | 9997 |
| `SPRING_SECURITY_USER_PASSWORD` | Kafbat UI | (secret) |
| `SERVER_FORWARD_HEADERS_STRATEGY` | Kafbat UI | FRAMEWORK |

## Configuration

- **Volume:** `/var/lib/kafka/data`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/kafka_exporter --kafka.server=kafka.railway.internal:9092`

**Category:** Queues

[View on Railway →](https://railway.com/template/kafka-kafbat-ui-kafka-prometheus-exporte)
