# Deploy RabbitMQ | (Just Updated) Message Broker, Memory Alarm Sized to Your Container on Railway

RabbitMQ 4 AMQP broker + UI. Memory alarm sized to your plan, not the host.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rabbitmq-or-just-updated-message-broker-)

## About

RabbitMQ is the open-source message broker behind countless job queues, event buses and
microservice backends. It speaks AMQP 0-9-1 and AMQP 1.0, routes messages through exchanges into
durable queues, and ships a web management UI for inspecting queues, connections and throughput.

This template runs RabbitMQ 4.3.6 with the management plugin as a single service: the broker on a
TCP proxy for AMQP clients, the management UI on an HTTPS domain, and the message store on a
Railway volume, from a digest-pinned official image.

RabbitMQ runs on Railway only after a few things are handled for you:

- **The memory alarm is sized to your container, not the host.** RabbitMQ reads the machine's
  total RAM to decide when to stop accepting publishes. On Railway that is the host's memory,
  hundreds of gigabytes, so a stock deploy sets its high watermark far above what your plan
  allows: publishers are never throttled and the container is killed for running out of memory
  instead. Here the start command reads the container's own cgroup memory limit on every boot and
  sets the watermark to 60% of it, and logs the value it chose.
- **The management UI shows real numbers.** Message rates, queue depth history and per-connection
  throughput are on. Many setups ship the metrics collector disabled, which leaves the UI's charts
  empty.
- **One service, not two.** The management UI is served by RabbitMQ itself on the public domain,
  with no extra proxy service to pay for and keep alive.
- **Credentials are generated per deploy.** Both the username and the password are random, and
  the default `guest` account is never created, so neither `guest:guest` nor an anonymous request
  can reach the API.
- **Messages survive redeploys.** Durable queues and persistent messages live on the attached
  volume, and the node keeps a stable name, so its data directory is found again on every boot.
- **Command-line tools work.** `rabbitmqctl` and `rabbitmq-diagnostics` reach the node from a
  Railway shell without extra flags.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rabbitmq | `rabbitmq:4.3.6-management@sha256:cdf40d8cb363d145e377ed88d59696a42386ffe54b30125f10eb128b862eea95` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `RABBITMQ_DEFAULT_USER` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'set -e; M=$(cat /sys/fs/cgroup/memory.max 2>/dev/null || echo max); case "$M" in ""|max) L=2GB; SRC="no cgroup memory limit visible, fallback";; *) L=$((M*6/10)); SRC="60% of cgroup memory.max=$M";; esac; printf '\''vm_memory_high_watermark.absolute = %s\nmanagement.tcp.ip = ::\nmanagement_agent.disable_metrics_collector = false\n'\'' "$L" > /etc/rabbitmq/conf.d/90-railway.conf; echo "[railway] memory high watermark $L ($SRC)"; grep -q " rabbitmq$" /etc/hosts || echo "127.0.0.1 rabbitmq" >> /etc/hosts; echo NODENAME=rabbit@rabbitmq > /etc/rabbitmq/rabbitmq-env.conf; exec docker-entrypoint.sh rabbitmq-server'`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5672
- **Volume:** `/var/lib/rabbitmq`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/rabbitmq-or-just-updated-message-broker-)
