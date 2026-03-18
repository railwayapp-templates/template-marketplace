# Deploy Kafka on Railway

Is a UI free, open-source web to monitor and manage Apache Kafka clusters.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/1WkwXE)

## About

UI for Apache Kafka is a free, open-source web UI to monitor and manage Apache Kafka clusters.

UI for Apache Kafka is a simple tool that makes your data flows observable, helps find and troubleshoot issues faster and deliver optimal performance. Its lightweight dashboard makes it easy to track key metrics of your Kafka clusters - Brokers, Topics, Partitions, Production, and Consumption.


Set up UI for Apache Kafka with just a couple of easy commands to visualize your Kafka data in a comprehensible way. You can run the tool locally or in the cloud.

[Documentation](https://docs.kafka-ui.provectus.io/)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kafka-UI | `provectuslabs/kafka-ui:latest` | Database |
| Kafka | `confluentinc/cp-kafka:latest` | Database |
| Schema-Registry | `confluentinc/cp-schema-registry:latest` | Web service |
| Zookeeper | `confluentinc/cp-zookeeper:latest` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | Kafka-UI | 8080 |
| `AUTH_TYPE` | Kafka-UI | LOGIN_FORM |
| `KAFKA_CLUSTERS_0_NAME` | Kafka-UI | production |
| `DYNAMIC_CONFIG_ENABLED` | Kafka-UI | true |
| `KAFKA_CLUSTERS_0_METRICS_PORT` | Kafka-UI | 9997 |
| `SPRING_SECURITY_USER_PASSWORD` | Kafka-UI | (secret) |
| `PORT` | Kafka | 9092 |
| `KAFKA_JMX_PORT` | Kafka | 9997 |
| `KAFKA_BROKER_ID` | Kafka | 1 |
| `KAFKA_LISTENERS` | Kafka | PLAINTEXT://:29092,PLAINTEXT_HOST://:9092 |
| `KAFKA_JMX_HOSTNAME` | Kafka | kafka |
| `KAFKA_CREATE_TOPICS` | Kafka | railway.sample.topic.v1:1:1 |
| `KAFKA_LOG4J_LOGGERS` | Kafka | kafka.controller=INFO,kafka.producer.async.DefaultEventHandler=INFO,state.change.logger=INFO |
| `KAFKA_AUTO_CREATE_TOPICS_ENABLE` | Kafka | true |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | Kafka | PLAINTEXT |
| `KAFKA_TRANSACTION_STATE_LOG_MIN_ISR` | Kafka | 1 |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | Kafka | PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT |
| `KAFKA_GROUP_INITIAL_REBALANCE_DELAY_MS` | Kafka | 0 |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | Kafka | 1 |
| `KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR` | Kafka | 1 |
| `KAFKA_CONFLUENT_LICENSE_TOPIC_REPLICATION_FACTOR` | Kafka | 1 |
| `KAFKA_CONFLUENT_BALANCER_TOPIC_REPLICATION_FACTOR` | Kafka | 1 |
| `PORT` | Schema-Registry | 8085 |
| `SCHEMA_REGISTRY_HOST_NAME` | Schema-Registry | schema-registry |
| `ZOOKEEPER_TICK_TIME` | Zookeeper | 2000 |
| `ZOOKEEPER_CLIENT_PORT` | Zookeeper | 2181 |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Queues

[View on Railway →](https://railway.com/deploy/1WkwXE)
