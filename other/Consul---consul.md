# Deploy Consul on Railway

Deploy and Host Consul with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/consul)

## About

Consul is a networking and service discovery tool by HashiCorp. This template runs a single-node Consul server with the UI enabled, making it ideal for development and testing environments.

On Railway, this template starts a standalone Consul agent with port **8500** exposed for the web UI. Data is persisted via a mounted volume at `/consul/data` so state is retained across restarts. This lightweight setup is intended for development and experimentation, not production clusters.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Consul | `consul:1.15` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8500 |

## Configuration

- **Start command:** `consul agent -server -ui -node=server-alone -bootstrap-expect=1 -client=0.0.0.0 -data-dir=/consul/data`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/consul/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/consul)
