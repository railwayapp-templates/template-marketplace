# Deploy NATS + JetStream on Railway

An open source messaging system that promises at-most-once delivery.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nats-jetstream)

## About

NATS is a lightweight, high-performance messaging system for building distributed applications and services. JetStream extends NATS with durable message storage, replay, acknowledgements, streams, and consumers, making it useful for workloads that need both fast pub/sub messaging and reliable event persistence.

Hosting NATS + JetStream typically requires running a NATS server with JetStream enabled, configuring client authentication, providing persistent storage for retained messages, and exposing a TCP endpoint that clients can reach.

This Railway template handles those essentials for you. It launches NATS with JetStream enabled, includes a persistent Railway volume mounted at `/data` for retained messages, protects client connections with an automatically generated authorization token, and automatically provisions a Railway TCP proxy for external NATS client access.

Once deployed, you can use the generated TCP proxy endpoint and authorization token to connect with the NATS CLI or any supported NATS client library, then immediately begin publishing messages, subscribing to subjects, creating streams, and configuring durable consumers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nats-server | `nats:2.15.0-alpine` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NATS_CONFIG` | host: "::"
port: 4222
monitor_port: 8222

authorization {
  token: $NATS_AUTHORIZATION_TOKEN
}

jetstream {
  store_dir: "/data"
  max_mem_store: 32Mb
  max_file_store: 4GB
} | While the NATS server has many flags that allow for simple testing of features, the NATS server products provide a flexible configuration format that combines the best of traditional formats and newer styles such as JSON and YAML. Injected using a start command on this container. See https://docs.nats.io/reference/config/ |
| `NATS_AUTHORIZATION_TOKEN` | (secret) | Specifies a global token that clients can use to authenticate with the server. |

## Configuration

- **Start command:** `sh -c 'echo "$NATS_CONFIG" > /tmp/nats.conf && exec nats-server -c /tmp/nats.conf'`
- **TCP Proxies:** 4222
- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/nats-jetstream)
