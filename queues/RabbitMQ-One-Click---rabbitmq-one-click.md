# Deploy RabbitMQ One Click on Railway

RabbitMQ broker with Management UI, volume, and generated credentials.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rabbitmq-one-click)

## About

RabbitMQ is a widely used open source message broker. This template gives you a ready broker with the Management UI, persistent storage, and generated credentials. Click Deploy and start publishing messages.

Hosting RabbitMQ means running the broker process, keeping queue data on disk, exposing AMQP for apps, and exposing the Management UI for operators. This template uses the official `rabbitmq:4-management-alpine` image, mounts a volume at `/var/lib/rabbitmq`, pins the node name so data survives redeploys, and publishes the Management UI on a Railway domain. Username and password are generated at deploy time. No extra services are included.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RabbitMQ | `rabbitmq:4-management-alpine` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `RABBITMQ_DEFAULT_USER` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/rabbitmq`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/rabbitmq-one-click)
