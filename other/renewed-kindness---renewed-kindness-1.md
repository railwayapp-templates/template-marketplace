# Deploy renewed-kindness on Railway

Deploy and Host renewed-kindness with Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/renewed-kindness-1)

## About

`renewed-kindness` is a modern full-stack application template built with **Next.js**, **Tailwind CSS**, and **PostgreSQL**. It offers a developer-friendly boilerplate ideal for building SaaS apps, dashboards, or internal tools with built-in auth, API routes, and styling.

Hosting `renewed-kindness` on Railway allows you to deploy both the frontend and backend quickly using pre-configured infrastructure. Railway provisions a Node.js environment, sets up environment variables, and connects to a PostgreSQL database automatically. You can trigger deployments through GitHub pushes and manage logs, scaling, and environments right from the Railway dashboard — no manual DevOps setup required.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `bitnami/redis:7.2.5` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISHOST` | - | Railway Private Domain Name. |
| `REDISPORT` | 6379 | Port to connect to Redis. |
| `REDISUSER` | default | Default user to connect to Redis. |
| `REDIS_URL` | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | no | Disable writing to AOF file. |

## Configuration

- **Volume:** `/bitnami`

**Category:** Other

[View on Railway →](https://railway.com/deploy/renewed-kindness-1)
