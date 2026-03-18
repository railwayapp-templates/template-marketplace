# Deploy RabbitMQ on Railway

Feature rich, multi-protocol messaging and streaming broker

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_o12zG)

## About

RabbitMQ is the most popular open-source message broker, supporting both multi-protocol messaging and streaming all in one easy-to-use app. RabbitMQ is used worldwide by all sorts of companies and developers for handling messages.

Hosting RabbitMQ allows you to access a powerful interface for configuration message streams in numerous protocols, and can easily be integrated within your apps using publicly available APIs. RabbitMQ is lightweight and can scale on Railway in order to support more throughput. RabbitMQ supports a wide variety of protocols, and can be adapted for high scale as well as high availability as needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RabbitMQ Web UI | `ghcr.io/brody192/railway-public-to-private-proxy` | Web service |
| RabbitMQ | `rabbitmq:management` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PROXY_HOST` | RabbitMQ Web UI | - | RabbitMQ internal host |
| `PROXY_PORT` | RabbitMQ Web UI | 15672 | RabbitMQ internal management port |
| `RABBITMQ_URL` | RabbitMQ | - | Public url |
| `RABBITMQ_NODENAME` | RabbitMQ | rabbit@rabbitmq | Hostname for RabbitMQ (Don't change this). |
| `RABBITMQ_PRIVATE_URL` | RabbitMQ | - | Private url |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Default password |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | Default user |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "CONFIG_PATH=/etc; SYSTEM_FILE=hosts; echo 127.0.0.1 rabbitmq >> ${CONFIG_PATH}/${SYSTEM_FILE} && echo management.tcp.ip = :: >> /etc/rabbitmq/conf.d/10-defaults.conf && docker-entrypoint.sh rabbitmq-server"`
- **TCP Proxies:** 5672
- **Volume:** `/var/lib/rabbitmq`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/_o12zG)
