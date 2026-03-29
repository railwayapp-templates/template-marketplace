# Deploy RabbitMQ | Open Source Kafka Alternative for Task Queues on Railway on Railway

Self-host RabbitMQ. Queues, MQTT, STOMP, AMQP with built-in web dashboard.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rabbitmq-message-broker)

## About

RabbitMQ is an open-source message broker that implements AMQP and supports additional protocols including STOMP and MQTT — giving distributed systems a reliable, low-latency backbone for async task queues, event-driven microservices, and real-time pub/sub messaging. 

Self-host RabbitMQ on Railway in seconds using the `rabbitmq:4-management` Docker image, pre-configured with persistent storage, a Management UI accessible over HTTPS, and an AMQP endpoint exposed via Railway's TCP proxy — no manual broker setup required.

![RabbitMQ Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1774710783/rabbit_mq_railay_architecture_xyzcrp.png)

RabbitMQ is a battle-tested, open-source message broker written in Erlang. It solves the core distributed systems challenge of decoupling producers from consumers — letting services communicate asynchronously without tight coupling or synchronous blocking calls.

Key features:

- **Multi-protocol support** — AMQP 0-9-1, STOMP, MQTT, and WebSockets via plugins
- **Flexible routing** — direct, fanout, topic, and headers exchanges with fine-grained bindings
- **Persistent queues** — messages survive broker restarts when declared durable
- **Management UI** — built-in browser dashboard for monitoring queues, connections, and message rates
- **Quorum queues** — replicated queue type for high-availability deployments (RabbitMQ 3.8+)
- **Plugin ecosystem** — Prometheus metrics, Shovel, Federation, and more

This Railway template runs a single-node RabbitMQ 4 instance with the management plugin enabled. Queue data is persisted to a Railway volume mounted at `/var/lib/rabbitmq`, ensuring messages and configuration survive redeployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RabbitMQ | `rabbitmq:4-management` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 15672 | - |
| `RABBITMQ_DEFAULT_PASS` | - | Create default user password credential |
| `RABBITMQ_DEFAULT_USER` | (secret) | Create default username for authentication |
| `RABBITMQ_DEFAULT_VHOST` | / | Default virtual host namespace |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/rabbitmq`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/rabbitmq-message-broker)
