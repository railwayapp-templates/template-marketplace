# Deploy RabbitMQ — Self-Hosted Message Broker with AMQP on Railway

Self-host RabbitMQ: message broker for queues & background jobs. AMQP/MQTT.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rabbitmq-queue)

## About

![RabbitMQ message broker management UI](https://res.cloudinary.com/asset-cloudinary/image/upload/v1774710398/Rabiit_mq_setup_xea6q9.png)

RabbitMQ is the most widely deployed open-source message broker — the reliable backbone for
decoupling services, background jobs, and event-driven architectures. Producers publish messages,
RabbitMQ routes and queues them, and consumers process them at their own pace, so a slow or failed
service never takes down the rest. The 4.x line brings a modernized management UI, quorum queues
(35% less memory than 3.x), native AMQP 1.0, MQTT 5.0 for IoT, and streams for replay and fan-out.

This template deploys RabbitMQ with the management plugin and a persistent volume, pre-wired on
Railway. Speak AMQP, MQTT, or STOMP from any language, watch queues and message rates in the web
UI, and pay flat compute — ~$5–15/month — instead of Amazon MQ's per-broker-hour billing.

---

Any app that outgrows synchronous request-response needs a message broker: to run background jobs,
smooth out traffic spikes, decouple microservices, or fan events out to multiple consumers.
RabbitMQ is the default choice — battle-tested, protocol-rich (AMQP, MQTT, STOMP), and far lighter
to operate than Kafka for small-to-medium scale.

Running it means a persistent Erlang service, a volume for durable messages, and network access
for your producers and consumers. Railway runs RabbitMQ as a managed container with automatic
HTTPS on the management UI and a persistent volume, so durable queues and messages survive
restarts. Set the admin credentials, connect your services, and you have a production broker.

Typical cost: **~$5–15/month** on Railway depending on throughput and RAM. Amazon MQ for RabbitMQ
bills per broker-instance-hour plus storage; CloudAMQP's paid plans start around $20/month. Self-
hosting on Railway is flat compute with full control over configuration and no per-broker fees.

---

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
| `RABBITMQ_DEFAULT_VHOST` | / | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/rabbitmq`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/rabbitmq-queue)
