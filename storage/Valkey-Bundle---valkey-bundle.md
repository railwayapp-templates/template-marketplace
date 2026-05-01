# Deploy Valkey Bundle on Railway

Deploy and Host Valkey Bundle with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/valkey-bundle)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/yqG3n6?referralCode=SNAECA&utm_medium=integration&utm_source=template&utm_campaign=generic)

One-click deploy of [Valkey Bundle](https://hub.docker.com/r/valkey/valkey-bundle) on Railway with all modules pre-loaded.

Valkey Bundle is a containerized version of Valkey with popular modules including Valkey JSON, Valkey Bloom, Valkey Search, and Valkey LDAP. This template deploys a fully configured Valkey Bundle instance with authentication, persistent storage, and private networking — all with a single click.

Hosting Valkey Bundle involves deploying a high-performance in-memory data structure server that acts as a database, cache, and message broker with all official modules pre-loaded. It runs on port 6379 by default and maintains full Redis API compatibility, so any existing Redis client library works out of the box. This template configures auto-generated authentication, persistent storage via a volume mount at `/data`, and both private networking for service-to-service communication and a TCP proxy for external access. Connection variables are pre-configured and ready to use on deploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Valkey Bundle | `valkey/valkey-bundle:latest` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `VALKEY_URL` | - | Full connection string (uses reference variables) |
| `VALKEY_HOST` | - | Private network hostname |
| `VALKEY_PORT` | 6379 | Valkey server port |
| `VALKEY_USER	` | default | Valkey username |
| `VALKEY_PASSWORD` | (secret) | Auto-generated secure password |

## Configuration

- **Start command:** `/bin/sh -c "exec docker-entrypoint.sh valkey-server --port ${VALKEY_PORT} --requirepass ${VALKEY_PASSWORD} --save 60 1 --loglevel warning --loadmodule /usr/lib/valkey/libjson.so --loadmodule /usr/lib/valkey/libvalkey_bloom.so --loadmodule /usr/lib/valkey/libsearch.so --loadmodule /usr/lib/valkey/libvalkey_ldap.so"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/valkey-bundle)
