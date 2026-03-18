# Deploy Outpost on Railway

Send webhooks to HTTP endpoints and directly to message queues

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/outpost-starter)

## About

[Outpost](https://outpost.hookdeck.com/?ref=railway-template) is an open source event delivery service for teams building API platforms. It lets you deliver outbound webhooks and [Event Destinations](https://eventdestinations.org/?ref=railway-template) to user-owned endpoints and queues with retries, signatures, observability, topics, and fanout. Deliver to webhooks, Hookdeck Event Gateway, RabbitMQ, AWS SQS, AWS Kinesis, Azure Service Bus, and more.

Outpost is built and maintained by [Hookdeck](https://hookdeck.com/?ref=railway-template).

This template runs Outpost as a single process on Railway. The app exposes an [HTTP API](https://outpost.hookdeck.com/docs/api?ref=railway-template) and includes internal workers that handle delivery, publishing, and logging. PostgreSQL is used for log storage and Redis for coordination and caching. The template provisions what is needed and wires everything together for you. You can scale vertically as needed within Railway's service limits. Outpost receives publish requests from your platform or a queue and delivers events to destinations your customers control, with observability and operational safeguards built in.

### Required Configuration

As part of the deployment process, configure your `TOPICS` environment variable to the topics supported for destination subscriptions, publishing, and routing of events. For example, `TOPICS=user.created,user.updated,user.deleted`. `TOPICS` is strictly optional, but recommended so it's required for this template.

### Get Started

Once deployed, you'll need:

- The public URL of your Outpost instance so you can integrate with the Outpost API (`{RAILWAY_URL}/api/v1`) -
- The generated `API_KEY` environment variable value to authenticate requests.

Read the [getting started with Outpost and Railway guide](https://outpost.hookdeck.com/docs/quickstarts/railway?ref=railway-template) for more information.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Outpost | `hookdeck/outpost` | Web service |
| RabbitMQ | `rabbitmq:3-management` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| Redis | `railwayapp/redis:7.2.5` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Outpost | 3333 | - |
| `TOPICS` | Outpost | - | Comma-separated list of topics that events can be published to and destinations can subscribe to. For example "user.created,user.updated,user.deleted". |
| `API_KEY` | Outpost | (secret) | - |
| `API_JWT_SECRET` | Outpost | (secret) | - |
| `REDIS_DATABASE` | Outpost | 0 | - |
| `REDIS_PASSWORD` | Outpost | (secret) | - |
| `LOG_MAX_CONCURRENCY` | Outpost | 10 | Maximum number of log writing operations to process concurrently. |
| `AES_ENCRYPTION_SECRET` | Outpost | (secret) | - |
| `PUBLISH_MAX_CONCURRENCY` | Outpost | 50 | Maximum number of messages to process concurrently from the publish queue. |
| `DELIVERY_MAX_CONCURRENCY` | Outpost | 100 | Maximum number of delivery attempts to process concurrently. |
| `RABBITMQ_NODENAME` | RabbitMQ | rabbit@rabbitmq | - |
| `RABBITMQ_DEFAULT_USER` | RabbitMQ | (secret) | - |
| `POSTGRES_DB` | Postgres | railway | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | - |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | - |
| `REDIS_AOF_ENABLED` | Redis | no | - |

## Configuration

- **Healthcheck:** `/api/v1/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "CONFIG_PATH=/etc; SYSTEM_FILE=hosts; \ echo 127.0.0.1 rabbitmq >> ${CONFIG_PATH}/${SYSTEM_FILE} && \ echo management.tcp.ip = :: >> /etc/rabbitmq/conf.d/10-defaults.conf && \ docker-entrypoint.sh rabbitmq-server"`
- **Volume:** `/var/lib/rabbitmq`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/template/outpost-starter)
