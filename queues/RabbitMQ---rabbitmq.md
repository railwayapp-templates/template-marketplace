# Deploy RabbitMQ on Railway

Message broker with management dashboard, persistent storage, and AMQP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rabbitmq)

## About

RabbitMQ is an open-source message broker that enables applications to communicate asynchronously through message queues. It supports AMQP 0-9-1 and includes a web-based management dashboard for monitoring queues, exchanges, and connections in real time.

Hosting RabbitMQ requires a persistent server to maintain message durability and queue state across restarts. This template deploys RabbitMQ 4 with the Management UI plugin pre-enabled, backed by a persistent volume so your queues, exchanges, bindings, and user configurations survive redeployments. Admin credentials are auto-generated using Railway's secret variables. The service exposes AMQP on port 5672 for message broker connections and HTTP on port 15672 for the management dashboard. No external dependencies are needed — RabbitMQ runs as a single self-contained service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rabbitmq | [Sokanon/railway-rabbitmq](https://github.com/Sokanon/railway-rabbitmq) | Worker |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `RABBITMQ_DEFAULT_PASS` | - | Default Password |
| `RABBITMQ_DEFAULT_USER` | (secret) | Default username |
| `RABBITMQ_DEFAULT_VHOST` | / | Vhost entry |

**Category:** Queues · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/rabbitmq)
