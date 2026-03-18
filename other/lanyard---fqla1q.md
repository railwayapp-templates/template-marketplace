# Deploy lanyard on Railway

Expose Discord user presence to a websocket & API

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fqla1q)

## About

Lanyard is a service that makes it super easy to export your live Discord presence to an API endpoint and to a WebSocket for you to use wherever you want - for example, I use this to display what I'm listening to on Spotify on my personal website. It also acts as a globally-accessible realtime KV store which you can update from the Lanyard Discord bot or from the Lanyard API.

[Docs](https://github.com/phineas/lanyard)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |
| lanyard | [phineas/lanyard](https://github.com/phineas/lanyard) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `PORT` | lanyard | 8080 | - |
| `BOT_TOKEN` | lanyard | (secret) | The Discord bot token to use Lanyard with |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Elixir, Dockerfile

[View on Railway →](https://railway.com/template/fqla1q)
