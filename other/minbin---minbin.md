# Deploy minbin on Railway

a minimal, ephemeral pastebin service.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/minbin)

## About

minbin is a minimal, ephemeral pastebin service built with simplicity and privacy in mind. it's self-hostable, open source, and ideal for quick, temporary sharing of snippets, logs, or notes.

pastes expire automatically after 1 hour, or immediately after being viewed (optional). you can view pastes through a clean HTML interface or directly as raw plaintext. a QR code is generated for each paste to make sharing even easier.

minbin consists of a microservice and a redis-compatible database. everything is configured to work right out of the box. for all configuration options, reference the [readme](https://github.com/berrysauce/minbin).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| database | `bitnami/redis:7.2.5` | Database |
| minbin | [berrysauce/minbin](https://github.com/berrysauce/minbin) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | database | - | Railway Private Domain Name. |
| `REDISPORT` | database | 6379 | Port to connect to Redis. |
| `REDISUSER` | database | default | Default user to connect to Redis. |
| `REDIS_URL` | database | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | database | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | database | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | database | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | database | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | database | no | Disable writing to AOF file. |
| `DB_HOST` | minbin | - | Redis-compatible database host |
| `DB_PASS` | minbin | - | Redis-compatible database password |
| `DB_PORT` | minbin | - | Redis-compatible database port |
| `DB_USER` | minbin | (secret) | Redis-compatible database username |

## Configuration

- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** HTML, CSS, Python, Dockerfile

[View on Railway →](https://railway.com/deploy/minbin)
