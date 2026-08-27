# Deploy Pulsar on Railway

Apache Pulsar — Kafka-compatible message streaming with web dashboard

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pulsar-1)

## About

**Apache Pulsar** (distributed streaming and messaging platform) on Railway. Single click spins up a single-node standalone broker — broker, BookKeeper, and ZooKeeper metadata in one process — with BookKeeper ledgers and metadata persisted to a Railway volume, so topics and messages survive restarts and deploys.

Apache Pulsar is a distributed pub-sub streaming platform designed to decouple messaging from compute, storage, and networking. A single standalone node bundles the broker (messaging), BookKeeper (distributed log storage), and ZooKeeper/managed metadata in one process. This template deploys one broker with its data plane on a persistent volume.

**Included web dashboard:** a `pulsar-gui` service ([pulsar-express](https://github.com/bbonnin/pulsar-express)) is deployed alongside the broker and pre-wired to its admin API over the private network — open the `pulsar-gui` service's Railway domain after deploy to browse clusters, tenants, namespaces, topics, subscriptions, and message stats.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pulsar | [INAPP-Mobile/pulsar](https://github.com/INAPP-Mobile/pulsar) | Web service |
| pulsar-gui | `bbonnin/pulsar-express:0.5.1` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PULSAR_DATA` | pulsar | /pulsar/data | Pulsar data directory (BookKeeper ledgers + ZooKeeper/managed-metadata) on the attached persistent volume. |
| `PULSAR_ADVERTISED_ADDRESS` | pulsar | - | Host the broker advertises to clients (what pulsar://:6650 and pulsar+ws://:9091 point at). Defaults to the public domain for external access; set to the private domain to keep same-project traffic off the internet. |
| `PE_CONNECTION_URL` | pulsar-gui | - | Admin API URL of the pulsar broker service. Leave as the default private-network reference. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/pulsar/data`

**Category:** Queues · **Languages:** Shell, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/pulsar-1)
