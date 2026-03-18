# Deploy EdgeDB on Railway

EdgeDB template based on their Docker deployment guide

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/uDZcDr)

## About

Refer to the [Official EdgeDB Docker Deployment Guide](https://www.edgedb.com/docs/guides/deployment/docker). This template follows that guide as closely as possible.

This template expects the persistence to happen with a mounted volume, NOT a separate PostgreSQL deployment.

This template expects a password field, which is automatically set right now by the `${{ secret() }}` utility function by Railway.

There are a few additional environment variables that you can configure:
- Admin UI is turned on

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| edgedb | `edgedb/edgedb` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5656 | Required Railway variable to expose this port |
| `EDGEDB_SERVER_ADMIN_UI` | enabled | Web Admin UI |
| `EDGEDB_SERVER_PASSWORD` | (secret) | - |
| `EDGEDB_SERVER_TLS_CERT_MODE` | generate_self_signed | Recommended setting by EdgeDB team |

## Configuration

- **TCP Proxies:** 5656
- **Volume:** `/var/lib/edgedb/data`

**Category:** Storage

[View on Railway →](https://railway.com/template/uDZcDr)
