# Deploy Tribes Server on Railway

This template will run a Tribes server instance.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tribes-server)

## About

Tribes is a decentralized social network that is meant as an escape from the advertising/corporate web services.

Tribes servers regularly delete information to keep a slim profile and so as to not track people. After all, people come to Tribes as a respite from the hyper tracked Internet.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tribes-server-cloud | [ShariqT/tribes-server-cloud](https://github.com/ShariqT/tribes-server-cloud) | Web service |
| redis-stack-server | `redis/redis-stack-server` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | tribes-server-cloud | 8000 | - |
| `APP_KEY` | tribes-server-cloud | - | The value that will secure cookies and session data |
| `REDIS_DB` | tribes-server-cloud | 0 | The database index for Redis |
| `REDIS_PORT` | tribes-server-cloud | 6379 | The port that Redis is listening on |
| `PUBLIC_ACCESS` | tribes-server-cloud | 1 | The value that makes the server public or private. Public servers have a 1 in this variable. |
| `REDIS_PASSWORD` | tribes-server-cloud | (secret) | - |
| `REDIS_USERNAME` | tribes-server-cloud | (secret) | The username used to login to the Redis DB |
| `PORT` | redis-stack-server | 6379 | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/keys`
- **Volume:** `/data`

**Category:** Other · **Languages:** Python, HTML, Dockerfile

[View on Railway →](https://railway.com/deploy/tribes-server)
