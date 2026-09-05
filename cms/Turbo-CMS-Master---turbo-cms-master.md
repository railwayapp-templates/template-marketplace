# Deploy Turbo CMS Master on Railway

Central multi-tenant orchestrator and management hub for Turbo CMS.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/turbo-cms-master)

## About

Turbo CMS Master is the central multi-tenant management orchestrator and command center designed for digital agencies, franchisees, and enterprise platforms. It allows administrators to deploy, configure, monitor, license, and orchestrate dozens or hundreds of high-performance Turbo CMS client instances seamlessly from a single unified interface.

Hosting Turbo CMS Master on Railway provides an instant, production-grade microservices architecture composed of three tightly coupled services. The core application runs on an optimized Node.js 24 and Express container packaged via Docker, pre-configured with security headers, JWT session handling, and CORS controls. Persistent relational data is stored on a high-availability PostgreSQL database with automated volume backups, while high-throughput Redis handles distributed caching and API rate limiting. Environment variables, database connection strings, and internal networking routes are automatically wired using Railway reference variables, eliminating manual DevOps overhead and providing automated zero-downtime deployments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Redis | `redis:8.2` | Database |
| turbo-cms-master | `ghcr.io/diegaosx/turbo-cms-master:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `POSTGRES_DB` | Postgres | railway | Initial default database name created on database startup. |
| `DATABASE_URL` | Postgres | - | Standard connection URI generated for applications connecting to PostgreSQL. |
| `POSTGRES_USER` | Postgres | (secret) | Initial default root database username. |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Secure generated password for PostgreSQL root authentication. |
| `REDISHOST` | Redis | - | Internal private network hostname for Redis. |
| `REDISPORT` | Redis | 6379 | Network port on which Redis listens (default: 6379). |
| `REDISUSER` | Redis | default | Default Redis user for client authentication. |
| `REDIS_URL` | Redis | - | Internal connection URL for Redis distributed caching and rate limiting. |
| `REDISPASSWORD` | Redis | (secret) | Secure access password generated for Redis authentication. |
| `REDIS_PASSWORD` | Redis | (secret) | Secure generated password for Redis root authentication. |
| `PORT` | turbo-cms-master | 4000 | HTTP port on which the Master Panel server listens (default: 4000). |
| `NODE_ENV` | turbo-cms-master | production | Application runtime environment (production). |
| `REDIS_URL` | turbo-cms-master | - | Redis connection URL automatically supplied by the Redis service. |
| `DATABASE_URL` | turbo-cms-master | - | PostgreSQL connection URL automatically supplied by the Postgres service. |
| `TURBO_ALPHA_URL` | turbo-cms-master | - | Base URL of the central Turbo Alpha orchestrator for heartbeat pings and licensing. |
| `TURBO_MASTER_KEY` | turbo-cms-master | - | Secret Master Key issued by Turbo Alpha for authenticated communication with client sites. |
| `MASTER_ADMIN_USER` | turbo-cms-master | (secret) | Initial root administrator username for the Master Panel. |
| `MASTER_JWT_SECRET` | turbo-cms-master | (secret) | 64-character cryptographic secret key used to sign administrative JWT sessions. |
| `TURBO_LICENSE_KEY` | turbo-cms-master | - | Public License Key issued by Turbo Alpha for franchise license verification. |
| `MASTER_ADMIN_PASSWORD` | turbo-cms-master | (secret) | Initial root administrator password for the Master Panel. |

## Configuration

- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** CMS

[View on Railway →](https://railway.com/deploy/turbo-cms-master)
