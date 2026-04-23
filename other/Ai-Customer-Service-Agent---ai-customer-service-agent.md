# Deploy Ai-Customer-Service-Agent on Railway

Ai customer support with intelligent escalation and real time analytics

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-customer-service-agent)

## About

This AI-first customer service agent uses Claude to automate responses across Chat, Email, and SMS. It features intelligent human escalation, real-time sentiment analysis, and a comprehensive knowledge base for context-aware support. Deploy this template to access a live analytics dashboard, track resolution metrics, and scale your global support operations effortlessly.

Hosting the Ai-Customer-Service-Agent on Railway is designed to be a "one-click" experience. The deployment process automatically provisions a high-performance environment for the Claude-powered AI engine alongside the necessary database architecture.

Because the template includes built-in support for WebSockets and real-time data streaming, Railway’s platform handles the heavy lifting of networking and SSL encryption out of the box. You won't need to manually configure servers or manage complex CI/CD pipelines; simply provide your API keys during the setup, and Railway will build, deploy, and scale your agent's services as your customer traffic grows.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| ai-customer-service-agent | [Jeah84/ai-customer-service-agent](https://github.com/Jeah84/ai-customer-service-agent) | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | - | PostgreSQL database name (auto-configured by Railway) |
| `DATABASE_URL` | Postgres | - | PostgreSQL database password (auto-generated) |
| `POSTGRES_USER` | Postgres | (secret) | PostgreSQL username (auto-configured by Railway) |
| `POSTGRES_PASSWORD` | Postgres | (secret) | PostgreSQL connection URL (public network) |
| `DATABASE_PUBLIC_URL` | Postgres | - | PostgreSQL connection URL (public network) |
| `PORT` | ai-customer-service-agent | - | Redis connection URL (auto-set from Redis) |
| `REDIS_URL` | ai-customer-service-agent | - | PostgreSQL connection URL (auto-set from Postgres) |
| `DATABASE_URL` | ai-customer-service-agent | - | Your Anthropic API key for Claude AI |
| `ANTHROPIC_API_KEY` | ai-customer-service-agent | (secret) | Your Anthropic API key for Claude AI |
| `REDISHOST` | Redis | - | Redis port number |
| `REDISPORT` | Redis | default | Redis username |
| `REDISUSER` | Redis | - | Full Redis connection URL (private network) |
| `REDIS_URL` | Redis | - | Redis password (auto-generated) |
| `REDISPASSWORD` | Redis | (secret) | Redis password (alias for REDISPASSWORD) |
| `REDIS_PASSWORD` | Redis | (secret) | Full Redis connection URL (public network) |
| `REDIS_PUBLIC_URL` | Redis | - | Full Redis connection URL (public network) |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/ai-customer-service-agent)
