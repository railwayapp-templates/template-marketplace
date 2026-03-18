# Deploy Lightweight Kafka with volume on Railway

Single-node Confluent Kafka with Golang example consumer and producer.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/PhV3c8)

## About

Single-node, persistent Kafka using Confluent's best-practice Kafka image. Uses the built-in KRaft controller for a lighter deployment that doesn't require zookeeper.

The project deploys an example producer and consumer, written in Go and following Confluent's examples. They can be removed once you've deployed the template.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kafka | [Antvirf/railway_kafka_stack](https://github.com/Antvirf/railway_kafka_stack) | Database |
| producer | [Antvirf/railway_kafka_stack](https://github.com/Antvirf/railway_kafka_stack) (root: /go) | Worker |
| consumer | [Antvirf/railway_kafka_stack](https://github.com/Antvirf/railway_kafka_stack) (root: /go) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `CLUSTER_ID` | kafka | 1 | - |
| `KAFKA_NODE_ID` | kafka | 1 | - |
| `KAFKA_LISTENERS` | kafka | PLAINTEXT://kafka.railway.internal:29092,CONTROLLER://kafka:29093,PLAINTEXT_HOST://0.0.0.0:9092 | - |
| `KAFKA_PROCESS_ROLES` | kafka | broker,controller | - |
| `KAFKA_ADVERTISED_LISTENERS` | kafka | PLAINTEXT://kafka.railway.internal:29092,PLAINTEXT_HOST://localhost:9092 | - |
| `KAFKA_CONTROLLER_QUORUM_VOTERS` | kafka | 1@kafka.railway.internal:29093 | - |
| `KAFKA_CONTROLLER_LISTENER_NAMES` | kafka | CONTROLLER | - |
| `KAFKA_INTER_BROKER_LISTENER_NAME` | kafka | PLAINTEXT | - |
| `KAFKA_LISTENER_SECURITY_PROTOCOL_MAP` | kafka | CONTROLLER:PLAINTEXT,PLAINTEXT:PLAINTEXT,PLAINTEXT_HOST:PLAINTEXT | - |
| `KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR` | kafka | 1 | - |
| `KAFKA_BROKER_ADDRESS` | producer | kafka.railway.internal:29092 | Internal hostname of the Kafka broker on port 29092. If you change the name of the Kafka service, you need to update this value. |
| `KAFKA_BROKER_ADDRESS` | consumer | - | Internal hostname of the Kafka broker on port 29092. If you change the name of the Kafka service, you need to update this value. |

## Configuration

- **Volume:** `/var/lib/kafka/`
- **Start command:** `/app.out -mode producer -wait 60`
- **Start command:** `/app.out -mode consumer -wait 60`

**Category:** Storage · **Languages:** Go, Dockerfile, Makefile

[View on Railway →](https://railway.com/deploy/PhV3c8)
