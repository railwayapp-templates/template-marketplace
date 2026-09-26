# Deploy Tuwunel on Railway

Tuwunel 1.9: fast Matrix homeserver in Rust, successor to conduwuit.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tuwunel-1)

## About

Tuwunel is a fast Matrix homeserver written in Rust and the successor to conduwuit. Matrix is an open, federated chat protocol: you can talk to people on matrix.org and other servers, run bridges and bots, and use clients such as Element, Cinny or FluffyChat on every platform.

This template runs the official `jevolk/tuwunel:v1.9.2` image as one service with its RocksDB database on a Railway volume. Tuwunel serves the `.well-known` files itself, so federation works on the Railway domain over port 443; the public Matrix federation tester reports it as OK. Registration requires the generated token, and the first account registered becomes the server admin. The database worker pool is capped so Tuwunel stays within Railway's process limits. Your server name is the Railway domain; set `TUWUNEL_SERVER_NAME` to a custom domain before the first boot if you want addresses like `@you:example.com`. It needs around 200 MB of memory.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tuwunel | `jevolk/tuwunel:v1.9.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8008 |
| `TUWUNEL_PORT` | 8008 |
| `TUWUNEL_ADDRESS` | ["::"] |
| `TUWUNEL_IP_SOURCE` | rightmost_x_forwarded_for |
| `TUWUNEL_DATABASE_PATH` | /var/lib/tuwunel |
| `TUWUNEL_TRUSTED_SERVERS` | ["matrix.org"] |
| `TUWUNEL_ALLOW_FEDERATION` | true |
| `TUWUNEL_MAX_REQUEST_SIZE` | 20000000 |
| `TUWUNEL_ALLOW_REGISTRATION` | true |
| `TUWUNEL_REGISTRATION_TOKEN` | (secret) |
| `TUWUNEL_DB_POOL_MAX_WORKERS` | 64 |

## Configuration

- **Healthcheck:** `/_matrix/client/versions`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/tuwunel`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/tuwunel-1)
