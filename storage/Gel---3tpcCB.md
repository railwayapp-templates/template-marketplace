# Deploy Gel on Railway

Gel template based on the Docker deployment guide

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/3tpcCB)

## About

This template is based on the official Docker deployment [guide](https://docs.geldata.com/resources/guides/deployment/docker).

It consumes less resources than the baseline by changing the variables `GEL_SERVER_COMPILER_POOL_MODE` and `GEL_SERVER_MAX_BACKEND_CONNECTIONS`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gel | `geldata/gel` | Database |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `GEL_SERVER_DATADIR` | /gel/data |
| `GEL_SERVER_ADMIN_UI` | enabled |
| `GEL_SERVER_PASSWORD` | (secret) |
| `GEL_SERVER_TLS_CERT_MODE` | generate_self_signed |
| `GEL_SERVER_COMPILER_POOL_MODE` | on_demand |
| `GEL_SERVER_MAX_BACKEND_CONNECTIONS` | 4 |

## Configuration

- **TCP Proxies:** 5656
- **Volume:** `/gel`

**Category:** Storage

[View on Railway →](https://railway.com/template/3tpcCB)
