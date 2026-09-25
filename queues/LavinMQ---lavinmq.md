# Deploy LavinMQ on Railway

LavinMQ 2.9: fast AMQP 0-9-1 message broker, RabbitMQ compatible.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lavinmq)

## About

LavinMQ is a fast message broker written in Crystal by CloudAMQP. It implements AMQP 0-9-1 and MQTT, so RabbitMQ clients and libraries work unchanged, while using far less memory per queue. It includes a management UI and HTTP API, streams, shovels, federation and a Prometheus metrics endpoint.

This template runs the official `cloudamqp/lavinmq:2.9.3` image. The management UI is on the Railway domain, and AMQP on port 5672 is published through a Railway TCP proxy for clients outside Railway. The image's default `guest/guest` user is replaced: the start command creates `LAVINMQ_USER` with a hashed, generated password, and remote logins by `guest` fail. Messages and definitions live on a Railway volume at `/var/lib/lavinmq`, so durable queues survive redeploys. `AMQP_URL` gives services in the same project a private connection string, and `AMQP_PUBLIC_URL` is for external clients. It fits the Hobby plan for moderate traffic.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lavinmq | `cloudamqp/lavinmq:2.9.3` | TCP service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 15672 |
| `LAVINMQ_USER` | (secret) |
| `LAVINMQ_PASSWORD` | (secret) |

## Configuration

- **Start command:** `sh -c 'H=$(lavinmqctl hash_password "$LAVINMQ_PASSWORD") && exec /usr/bin/lavinmq -b :: -D /var/lib/lavinmq --http-port "$PORT" --default-user-only-loopback=false --default-user "$LAVINMQ_USER" --default-password-hash "$H"'`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5672
- **Volume:** `/var/lib/lavinmq`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/lavinmq)
