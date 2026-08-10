# Deploy Coolify self-hosted in Railway on Railway

Deploy Coolify, a self-hosted PaaS, on Railway in one click. Zero config.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/coolify-self-hosted-in-railway)

## About

**What is Coolify self-hosted in Railway?**
Coolify is an open-source, self-hosted PaaS — a drop-in alternative to Vercel, Netlify, and Heroku. This zero-configuration template deploys a fully managed Coolify instance (web UI + PostgreSQL + Redis) on Railway in one click, with automatic SSL, persistent storage, and auto-generated secrets.

Hosting means running the entire Coolify control plane on Railway's infrastructure. The template provisions three services wired over Railway's private network: a PostgreSQL database, a Redis cache/queue, and the Coolify app itself, built from a Dockerfile with Horizon disabled for a lighter footprint. All secrets — database password, Redis password, Laravel encryption key — are generated automatically, so there's nothing to configure. The first boot runs ~600 database migrations and can take 8–15 minutes; later deploys are fast. Because Railway doesn't reliably support privileged containers, Docker-in-Docker is excluded; instead you connect your own Linux VPS servers as compute nodes for production workloads.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| coolify | [BURNI80/coolify-railway-template](https://github.com/BURNI80/coolify-railway-template) | Web service |
| postgres | `postgres:15-alpine` | Database |
| redis | `redis:7-alpine` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `DB_PASSWORD` | coolify | (secret) |
| `DB_USERNAME` | coolify | (secret) |
| `REDIS_PASSWORD` | coolify | (secret) |
| `POSTGRES_USER` | postgres | (secret) |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/coolify`
- **Volume:** `/var/lib/postgresql`
- **Start command:** `redis-server --requirepass 547fd0c3c610dbd5713bc7bf52f79375 --appendonly yes`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/coolify-self-hosted-in-railway)
