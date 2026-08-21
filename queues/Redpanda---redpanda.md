# Deploy Redpanda on Railway

Redpanda Kafka-compatible streaming platform with web console

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redpanda)

## About

**Redpanda** (Kafka-compatible streaming data platform) with **Redpanda Console** (web UI) on Railway. Single click spins up both services with internal networking already wired — no broker env-var hunting, no manual listener configuration.

Redpanda is a Kafka-compatible streaming data platform written in C++. It's a drop-in replacement for Apache Kafka with lower latency, simpler ops, and no ZooKeeper dependency. This template deploys a single-node Redpanda broker with a web-based management console so you can inspect topics, produce/consume messages, and monitor schemas from one UI.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| broker | [INAPP-Mobile/redpanda](https://github.com/INAPP-Mobile/redpanda) (root: broker) | Database |
| console | [INAPP-Mobile/redpanda](https://github.com/INAPP-Mobile/redpanda) (root: .) | Web service |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `KAFKA_BROKERS` | Kafka bootstrap servers Console connects to. Defaults to the sibling broker service over the Railway private network (INTERNAL listener). |
| `SCHEMA_REGISTRY_URL` | Built-in Redpanda Schema Registry (enabled on the broker). Enables per-topic schema views in Console. Leave empty to disable. |

## Configuration

- **Healthcheck:** `/health`
- **Volume:** `/var/lib/redpanda/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues · **Languages:** Shell, Perl, Dockerfile

[View on Railway →](https://railway.com/deploy/redpanda)
