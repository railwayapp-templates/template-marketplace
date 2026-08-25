# Deploy RabbitMQ on Railway

Highly available AMQP message broker with per-message acks and routing

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rabbitmq-cluster)

## About

RabbitMQ is the message broker most teams reach for when one service needs to hand work to another without waiting for it. It speaks AMQP 0-9-1 and AMQP 1.0 natively, plus MQTT and STOMP through plugins, and has been the default job queue behind Celery, Spring AMQP, MassTransit and NestJS microservices for over a decade. Publishers write to an exchange, RabbitMQ routes each message into queues by binding rules, and consumers acknowledge messages one at a time — so a worker that crashes mid-job returns that job to the queue instead of losing it. That, plus routing richer than a topic name, is why it stays the better fit for task dispatch even where an event log wins on throughput.

Deploy RabbitMQ on Railway as a three-node cluster rather than a single container. The template provisions `rabbitmq`, `rabbitmq-node-2` and `rabbitmq-node-3` from the same image, each with its own volume at `/var/lib/rabbitmq`, joined into one cluster over Railway's private network. Queues declared without an explicit type become quorum queues, replicated over Raft across all three nodes, so a node can be lost or redeployed without dropping an unacknowledged message. Only the first node is public: the management UI on port 15672 gets an HTTPS domain and a TCP proxy publishes AMQP on 5672. Erlang distribution, `epmd`, the metrics endpoint and the other two nodes stay private.

![Diagram of three clustered RabbitMQ services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787445059/rabbitmq-architecture.png)

RabbitMQ is an open-source broker written in Erlang under the Mozilla Public License 2.0. Teams self-host it for the delivery guarantees of a managed queue without per-message billing, for protocols a cloud queue does not offer, or to keep message data in their own infrastructure. It is a stateful clustered service, so hosting it well means giving each node durable storage and a stable identity.

- Per-message acknowledgements, redelivery and delivery limits
- Direct, topic, fanout and headers exchanges for precise routing
- Quorum queues with Raft replication; streams for replayable logs
- Dead-letter exchanges, message TTL, priorities and delayed retry
- Publisher confirms and consumer prefetch for back-pressure
- Management UI, full HTTP API and a Prometheus metrics endpoint
- Virtual hosts, users and topic permissions for tenant isolation

Each service runs a complete broker; there is no coordinator and any node can serve clients. The first forms the cluster on a fresh deploy and carries the public surfaces; the other two are peers that give quorum queues a majority when one node goes down.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rabbitmq-node-3 | [gridalpha/rabbitmq-railway](https://github.com/gridalpha/rabbitmq-railway) | Database |
| rabbitmq-node-2 | [gridalpha/rabbitmq-railway](https://github.com/gridalpha/rabbitmq-railway) | Database |
| rabbitmq | [gridalpha/rabbitmq-railway](https://github.com/gridalpha/rabbitmq-railway) | TCP service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | rabbitmq-node-3 | 15692 | Prometheus metrics port |
| `RABBITMQ_SEED_NODE` | rabbitmq-node-3 | - | Node that forms the cluster |
| `RABBITMQ_DEFAULT_PASS` | rabbitmq-node-3 | - | Same administrator password |
| `RABBITMQ_DEFAULT_USER` | rabbitmq-node-3 | (secret) | Same administrator as the first node |
| `RABBITMQ_CLUSTER_NODES` | rabbitmq-node-3 | - | Peer list for cluster formation |
| `RABBITMQ_ERLANG_COOKIE_VALUE` | rabbitmq-node-3 | - | Must match every cluster node |
| `PORT` | rabbitmq-node-2 | 15692 | Prometheus metrics port |
| `RABBITMQ_SEED_NODE` | rabbitmq-node-2 | - | Node that forms the cluster |
| `RABBITMQ_DEFAULT_PASS` | rabbitmq-node-2 | - | Same administrator password |
| `RABBITMQ_DEFAULT_USER` | rabbitmq-node-2 | (secret) | Same administrator as the first node |
| `RABBITMQ_CLUSTER_NODES` | rabbitmq-node-2 | - | Peer list for cluster formation |
| `RABBITMQ_ERLANG_COOKIE_VALUE` | rabbitmq-node-2 | - | Must match every cluster node |
| `PORT` | rabbitmq | 15692 | Prometheus metrics port |
| `RABBITMQ_SEED_NODE` | rabbitmq | - | Node that forms the cluster |
| `RABBITMQ_DEFAULT_PASS` | rabbitmq | - | First administrator password |
| `RABBITMQ_DEFAULT_USER` | rabbitmq | (secret) | First administrator username |
| `RABBITMQ_CLUSTER_NODES` | rabbitmq | - | Peer list for cluster formation |
| `RABBITMQ_ERLANG_COOKIE_VALUE` | rabbitmq | - | Shared cluster authentication secret |

## Configuration

- **Volume:** `/var/lib/rabbitmq`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5672

**Category:** Queues · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rabbitmq-cluster)
