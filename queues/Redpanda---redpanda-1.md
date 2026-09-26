# Deploy Redpanda on Railway

Redpanda 26.2: Kafka-compatible streaming, single node, with Kafbat UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/redpanda-1)

## About

Redpanda is a Kafka-compatible streaming platform written in C++. Existing Kafka clients, connectors and tools work unchanged, but there is no JVM or ZooKeeper to manage. A single binary also includes a Schema Registry and an HTTP proxy, which makes it a good small-footprint Kafka alternative.

This template runs the official `redpandadata/redpanda:v26.2.3` image as a single-node broker plus Kafbat UI, a free web console for Kafka clusters. Redpanda Console's own login needs an enterprise licence, so Kafbat UI provides the login form instead. The Kafka API, Schema Registry and HTTP proxy listen on Railway's private network over IPv4 and IPv6 and advertise the private hostname, so clients in the same project connect without extra setup. Data lives on a Railway volume and survives redeploys. The broker is capped at one core and 1 GB of memory; raise `REDPANDA_MEMORY` for heavier use. It is a single node, so there is no replication.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| redpanda | `redpandadata/redpanda:v26.2.3` | Database |
| kafbat | `ghcr.io/kafbat/kafka-ui:v1.5.0` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDPANDA_MEMORY` | redpanda | 1G |
| `PORT` | kafbat | 8080 |
| `AUTH_TYPE` | kafbat | LOGIN_FORM |
| `KAFKA_CLUSTERS_0_NAME` | kafbat | redpanda |
| `DYNAMIC_CONFIG_ENABLED` | kafbat | false |
| `SPRING_SECURITY_USER_NAME` | kafbat | admin |
| `SPRING_SECURITY_USER_PASSWORD` | kafbat | (secret) |

## Configuration

- **Start command:** `sh -c 'exec /usr/bin/rpk redpanda start --mode dev-container --smp 1 --memory ${REDPANDA_MEMORY:-1G} --overprovisioned --node-id 0 --kafka-addr internal://[::]:9092 --advertise-kafka-addr internal://$RAILWAY_PRIVATE_DOMAIN:9092 --rpc-addr [::]:33145 --advertise-rpc-addr $RAILWAY_PRIVATE_DOMAIN:33145 --schema-registry-addr [::]:8081 --pandaproxy-addr [::]:8082 --advertise-pandaproxy-addr $RAILWAY_PRIVATE_DOMAIN:8082'`
- **Volume:** `/var/lib/redpanda/data`
- **Healthcheck:** `/actuator/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Queues

[View on Railway →](https://railway.com/deploy/redpanda-1)
