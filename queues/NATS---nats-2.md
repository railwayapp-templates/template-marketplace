# Deploy NATS on Railway

NATS 2.15 messaging server with JetStream, WebSocket and token auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nats-2)

## About

NATS is a high-performance messaging system for services, devices and browsers. It provides publish/subscribe, request/reply and, with JetStream, persistent streams, key-value and object stores. Client libraries exist for Go, Rust, Node.js, Python, Java, .NET, C and more, and browsers connect over WebSocket. The server is a single small binary.

This template deploys NATS Server v2.15.0 with JetStream enabled and stored on a Railway volume, so streams survive restarts. Clients authenticate with a generated token. Services on Railway connect over the private network on port 4222, external clients use the Railway TCP proxy, and browsers or serverless clients use WebSocket on the public HTTPS domain. The monitoring endpoint answers the health check privately. The config lives in the `NATS_CONFIG` variable, so accounts, users or limits can be changed without a custom image. Watch JetStream disk use on the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nats | `nats:2.15.0-alpine` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8222 |
| `NATS_TOKEN` | (secret) |
| `NATS_CONFIG` | server_name: $NATS_SERVER_NAME
listen: '[::]:4222'
http: '[::]:8222'

authorization {
  token: $NATS_TOKEN
}

jetstream {
  store_dir: /data
  max_file_store: $NATS_JETSTREAM_MAX_FILE
}

websocket {
  listen: '[::]:8080'
  no_tls: true
  compression: true
}

max_payload: 1MB
lame_duck_duration: 30s |
| `NATS_SERVER_NAME` | railway-nats |
| `NATS_JETSTREAM_MAX_FILE` | 4G |

## Configuration

- **Start command:** `sh -c 'printf "%s\n" "$NATS_CONFIG" > /tmp/nats.conf && exec nats-server -c /tmp/nats.conf'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 4222
- **Volume:** `/data`

**Category:** Queues

[View on Railway →](https://railway.com/deploy/nats-2)
