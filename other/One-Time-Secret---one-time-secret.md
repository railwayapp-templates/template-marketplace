# Deploy One-Time Secret on Railway

Secure links that only work once

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/one-time-secret)

## About

*Keep passwords and other sensitive information out of your inboxes and chat logs.*

A onetime secret is a link that can be viewed only once. A single-use URL.

Try it out on [OnetimeSecret.com](https://onetimesecret.com/)

When you send people sensitive info like passwords and private links via email or chat, there are copies of that information stored in many places. If you use a Onetime link instead, the information persists for a single viewing which means it can't be read by someone else later. This allows you to send sensitive information in a safe way knowing it's seen by one person only. Think of it like a self-destructing message.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `railwayapp/redis:8.2` | Database |
| onetimesecret | `onetimesecret/onetimesecret` | Web service |

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
| `SSL` | onetimesecret | true | - |
| `PORT` | onetimesecret | 8080 | - |
| `SECRET` | onetimesecret | (secret) | - |
| `COLONEL` | onetimesecret | admin@example.com | - |
| `RACK_ENV` | onetimesecret | production | - |
| `AUTH_SIGNIN` | onetimesecret | false | - |
| `AUTH_SIGNUP` | onetimesecret | false | - |
| `AUTH_ENABLED` | onetimesecret | false | - |
| `AUTH_AUTOVERIFY` | onetimesecret | false | - |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/one-time-secret)
