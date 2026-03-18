# Deploy Apache Kvrocks on Railway

A drop-in replacement for Redis to store data on a volume.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/wdpkLY)

## About

### Overview

Apache Kvrocks deployed with the apache/kvrocks Docker image. A volume is mounted to the service to persist data.

### How to use

Reference the `KVROCKS_PRIVATE_URL` variable from your service to connect to Kvrocks (e.g. `${{Kvrocks.KVROCKS_PRIVATE_URL}}`)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Kvrocks | `apache/kvrocks` | Database |

## Environment variables

| Variable | Description |
| --------- | ----------- |
| `KVROCKS_PRIVATE_URL` | URL to connect to Kvrocks over private network. |

## Configuration

- **Start command:** `kvrocks -c /var/lib/kvrocks/kvrocks.conf --dir /kvrocks --pidfile /var/run/kvrocks/kvrocks.pid --bind ::`
- **Volume:** `/kvrocks`

**Category:** Storage

[View on Railway →](https://railway.com/template/wdpkLY)
