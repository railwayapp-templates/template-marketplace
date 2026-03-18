# Deploy erpc on Railway

Fault-tolerant EVM RPC Proxy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/10iW1q)

## About

[eRPC](https://github.com/erpc/erpc) is a fault-tolerant EVM RPC proxy and permanent caching solution. It is built with read-heavy use-cases in mind such as data indexing and high-load frontend usage.

### Getting Started

Check the [docs](https://docs.erpc.cloud/deployment/railway) for deployment instructions.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| erpc | [erpc/railway-deployment](https://github.com/erpc/railway-deployment) | Web service |
| monitoring | [erpc/railway-deployment](https://github.com/erpc/railway-deployment) | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `PORT` | erpc | 4000 |
| `PORT` | monitoring | 3000 |
| `SERVICE_PORT` | monitoring | 4001 |
| `SERVICE_ENDPOINT` | monitoring | erpc.railway.internal |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell

[View on Railway →](https://railway.com/deploy/10iW1q)
