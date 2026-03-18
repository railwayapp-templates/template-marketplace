# Deploy Unthread Webhook Server on Railway

Reliable Node.js webhook server for Unthread.io events. 🎫⚡

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/unthread-webhook-server)

## About

### What is Unthread Webhook Server?

Unthread Webhook Server is a production-ready Node.js service that listens and processes webhook events from Unthread.io. Built with TypeScript, Express.js, and Redis, it ensures secure and efficient handling of real-time updates with HMAC signature verification and platform-aware routing.

Hosting Unthread Webhook Server allows you to receive and process real-time events from Unthread.io, such as ticket creation, updates, or automation triggers. Designed with reliability and scalability in mind, it uses Express.js as the HTTP framework, Redis for async event handling, and supports HMAC-based signature validation for added security. Deploying it on Railway ensures rapid provisioning, streamlined environment setup, and easy scaling without needing to manage infrastructure manually.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis (Webhook) | `bitnami/redis:7.2.5` | Database |
| Unthread Webhook Server | `wgtechlabs/unthread-webhook-server` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis (Webhook) | - | Railway Private Domain Name. |
| `REDISPORT` | Redis (Webhook) | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis (Webhook) | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis (Webhook) | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis (Webhook) | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis (Webhook) | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis (Webhook) | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis (Webhook) | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis (Webhook) | no | Disable writing to AOF file. |
| `PORT` | Unthread Webhook Server | 3000 | Server port for webhook endpoints |
| `NODE_ENV` | Unthread Webhook Server | production | Environment mode (keep as production for Railway) |
| `REDIS_URL` | Unthread Webhook Server | - | Auto-configured Redis for webhook event storage |
| `TARGET_PLATFORM` | Unthread Webhook Server | - | Platform integration: "discord" or "telegram" - REQUIRED |
| `UNTHREAD_WEBHOOK_SECRET` | Unthread Webhook Server | (secret) | Webhook secret from Unthread dashboard - REQUIRED |

## Configuration

- **TCP Proxies:** 6379
- **Volume:** `/bitnami`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/unthread-webhook-server)
