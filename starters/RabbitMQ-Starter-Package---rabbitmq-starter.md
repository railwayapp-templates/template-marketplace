# Deploy RabbitMQ Starter Package on Railway

Deploys RabbitMQ and two example apps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/rabbitmq-starter)

## About

RabbitMQ is the most popular open-source message broker, supporting both multi-protocol messaging and streaming all in one easy-to-use app. RabbitMQ is used worldwide by all sorts of companies and developers for handling messages. This template allows you to quickly deploy RabbitMQ alongside a demo application that can send and receive messages, showcasing how to use RabbitMQ in your applications.

Hosting RabbitMQ allows you to access a powerful interface for configuration message streams in numerous protocols, and can easily be integrated within your apps using publicly available APIs. RabbitMQ is lightweight and can scale on Railway in order to support more throughput. RabbitMQ supports a wide variety of protocols, and can be adapted for high scale as well as high availability as needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Publishing | [railwayapp-templates/rabbitmq](https://github.com/railwayapp-templates/rabbitmq) | Worker |
| Receiving | [railwayapp-templates/rabbitmq](https://github.com/railwayapp-templates/rabbitmq) | Worker |
| RabbitMQ | `rabbitmq:management` | Database |
| RabbitMQ Web UI | `ghcr.io/brody192/railway-public-to-private-proxy` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `RABBITMQ_PRIVATE_URL` | Publishing | - | Private RabbitMQ broker url |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Publishing | true | Alpine Private Networking |
| `RABBITMQ_PRIVATE_URL` | Receiving | - | Private RabbitMQ broker url |
| `ENABLE_ALPINE_PRIVATE_NETWORKING` | Receiving | true | Alpine Private Networking |
| `RABBITMQ_URL` | RabbitMQ | - | Public broker url |
| `RABBITMQ_NODENAME` | RabbitMQ | rabbit@rabbitmq | Hostname for RabbitMQ (Don't change this). |
| `RABBITMQ_PRIVATE_URL` | RabbitMQ | - | Private broker url |
| `RABBITMQ_DEFAULT_PASS` | RabbitMQ | - | Default password |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | Default user |
| `PROXY_HOST` | RabbitMQ Web UI | - | RabbitMQ internal host |
| `PROXY_PORT` | RabbitMQ Web UI | 15672 | RabbitMQ internal management port |

## Configuration

- **Start command:** `node send.js`
- **Start command:** `node receive.js`
- **Start command:** `/bin/sh -c "CONFIG_PATH=/etc; SYSTEM_FILE=hosts; echo 127.0.0.1 rabbitmq >> ${CONFIG_PATH}/${SYSTEM_FILE} && echo management.tcp.ip = :: >> /etc/rabbitmq/conf.d/10-defaults.conf && docker-entrypoint.sh rabbitmq-server"`
- **TCP Proxies:** 5672
- **Volume:** `/var/lib/rabbitmq`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript

[View on Railway →](https://railway.com/template/rabbitmq-starter)
