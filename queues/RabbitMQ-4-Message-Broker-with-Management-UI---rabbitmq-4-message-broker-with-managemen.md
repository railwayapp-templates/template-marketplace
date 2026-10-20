# Deploy RabbitMQ 4 Message Broker with Management UI on Railway

AMQP broker with dashboard, metrics and persistent queues, ready to use.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rabbitmq-4-message-broker-with-managemen)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rabbitmq-4-message-broker-with-management-ui?referralCode=20H68q)

RabbitMQ is an open-source message broker for AMQP 0-9-1 and AMQP 1.0, with plugins for MQTT, STOMP and streams. This community template runs a RabbitMQ 4.3 node with a persistent volume, the management UI on a password-protected HTTPS domain, Prometheus metrics, and ready-made connection URLs for your other Railway services.

RabbitMQ is easy to start but easy to host badly in containers. It names its database after the machine's hostname, which changes on every Railway deploy. It sizes its memory alarm from the host's RAM rather than the container's limit. And the Docker image lets the default `guest` user log in from any address. This template pins a fixed node name, so users, queues and messages survive redeploys. It sizes the memory and disk alarms to the container and its volume, creates an administrator with a generated password, and keeps `guest` limited to localhost. AMQP stays on Railway's private network; the management UI and HTTP API sit behind RabbitMQ's own login.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| RabbitMQ | [baranberkay96/rabbitmq-railway](https://github.com/baranberkay96/rabbitmq-railway) (branch: main) (root: /services/rabbitmq) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 15672 | Management UI port: public domain target; the healthcheck GETs / (login page, no auth needed). |
| `AMQP_URL` | - | Alias of RABBITMQ_URL for libraries that read AMQP_URL. |
| `RABBITMQ_URL` | - | AMQP URL on the private network (default vhost). Reference it as ${{RabbitMQ.RABBITMQ_URL}}. |
| `RABBITMQ_HOST` | - | Private hostname for clients configured with separate host/port settings. |
| `RABBITMQ_PORT` | 5672 | AMQP port on the private network. |
| `DISK_FREE_LIMIT` | auto | Publishers block when free disk drops below this. auto = 20% of the volume (50 MB to 2 GB), or e.g. 1GB. |
| `ERLANG_SCHEDULERS` | auto | Erlang scheduler threads. auto = the container CPU quota, at most 8; or a number. |
| `RABBITMQ_NODENAME` | rabbit@localhost | Fixed node name; the database folder is named after it. Do not change after the first deploy. |
| `MEMORY_HIGH_WATERMARK` | 0.6 | Publishers block above this: fraction (max 0.9) of the container memory limit, or a size like 2GiB. |
| `RABBITMQ_DEFAULT_PASS` | - | Administrator password (16+ chars: letters, digits, . _ -). Applied only when the database is created. |
| `RABBITMQ_DEFAULT_USER` | (secret) | Administrator created with a new database: management UI and AMQP login. Not 'guest'. |
| `RABBITMQ_USE_LONGNAME` | false | Short node names (required for rabbit@localhost). |
| `ALLOW_TRANSIENT_QUEUES` | false | true permits non-durable, non-exclusive queues (deprecated, denied by default since 4.3) for older clients. |
| `RABBITMQ_ERLANG_COOKIE` | - | Erlang cookie (shared secret for rabbitmqctl and other CLI tools), written to the cookie file. |
| `RABBITMQ_MANAGEMENT_URL` | - | Management HTTP API on the private network (HTTP Basic auth with the administrator). |
| `RABBITMQ_PROMETHEUS_URL` | - | Prometheus scrape URL on the private network (no auth; never exposed publicly). |
| `RABBITMQ_ENABLED_PLUGINS_FILE` | /var/lib/rabbitmq/enabled_plugins | Plugin list on the volume, so rabbitmq-plugins enable/disable survives redeploys. |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/rabbitmq`

**Category:** Queues · **Tags:** rabbitmq, amqp, message-broker, message-queue, queues · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rabbitmq-4-message-broker-with-managemen)
