# Deploy RabbitMQ [Updated Sep'26] on Railway

Self-host RabbitMQ — AMQP broker for Celery, Sidekiq, BullMQ workers

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rabbitmq-background-jobs)

## About

RabbitMQ is the message broker most background job systems are built on — a self-hosted alternative to Amazon MQ, CloudAMQP and SQS. It routes messages into queues by binding rules and delivers them with per-message acknowledgement, which is what lets a worker crash mid-job without losing it. This template deploys RabbitMQ 4 with the management UI, a volume and a fixed node name, so your queues are still there after a redeploy instead of quietly starting empty.

RabbitMQ is easy to start and easy to lose data on. Every failure below is silent — the broker comes up healthy and reports nothing wrong.

**A changing hostname makes the broker forget everything.** RabbitMQ derives its node name from the container hostname and stores its Mnesia database in a directory named after it. Railway gives each deploy a new hostname, so the node looks for `rabbit@old-host`, finds nothing, and initialises a fresh empty database — on the same volume, beside data it can no longer see. Queues, users and vhosts appear to vanish with no error logged. This template pins `RABBITMQ_NODENAME` so the node finds its own directory every time.

**Publishers block at 40% of memory, and it looks like a hang.** RabbitMQ applies flow control above its high watermark, which defaults to 40% of available RAM. The producer stops mid-publish with no exception and no timeout — it just waits. On a small container this trips far earlier than expected, and reads like an application deadlock rather than a broker limit. Size RAM for the queue depth you expect, not the binary.

**The `guest` account only works from localhost.** RabbitMQ restricts `guest` to loopback, so a worker on another service gets `ACCESS_REFUSED` even with the right password. You need a real user, which this template generates as `RABBITMQ_DEFAULT_USER` and `RABBITMQ_DEFAULT_PASS`.

**A volume alone does not make messages durable.** Persistence is two properties: the queue must be durable *and* the message published as persistent. Get either wrong and the volume faithfully preserves an empty queue across the restart that lost your messages.

**The plain image has no management UI.** `rabbitmq:4` ships without the management plugin, so the `-management` tag is not cosmetic — without it `15672` serves nothing and you inspect queues only from the CLI.

Typical cost: **~$8–15/month** for the broker and a small volume at light traffic, on rates of $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. Note the interaction with flow control: the cheapest configuration blocks publishers soonest. RabbitMQ is MPL 2.0 and free.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RabbitMQ | `rabbitmq:4-management` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 15672 | Port |
| `RABBITMQ_DEFAULT_PASS` | - | Create default user password credential |
| `RABBITMQ_DEFAULT_USER` | (secret) | Create default username for authentication |
| `RABBITMQ_DEFAULT_VHOST` | / | Default virtual host namespace |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/rabbitmq`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/rabbitmq-background-jobs)
