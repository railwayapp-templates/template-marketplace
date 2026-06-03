# Deploy Convoy on Railway

Webhook gateway for managing incoming and outgoing webhooks

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/convoy)

## About

Convoy is an open-source webhook gateway for receiving, routing, retrying, and observing webhook deliveries. This template deploys Convoy on Railway with a split control plane, agent/data plane, managed PostgreSQL, managed Redis, and a Caddy gateway that routes public traffic to the correct internal service.

Hosting Convoy requires more than a single HTTP service. The control plane serves the dashboard, management API, portal management, and background scheduling, while the agent handles ingestion and portal event delivery routes. PostgreSQL stores application state, and Redis backs queues and runtime coordination. This template keeps those responsibilities separated while exposing Convoy through one public Railway domain. Convoy migrations run before the server starts, and internal service-to-service traffic uses Railway private networking.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Convoy Gateway | [zawlodzki/convoy-railway-template](https://github.com/zawlodzki/convoy-railway-template) (root: railway/gateway) | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| Convoy Agent | [zawlodzki/convoy-railway-template](https://github.com/zawlodzki/convoy-railway-template) (root: railway/agent) | Worker |
| Convoy Server | [zawlodzki/convoy-railway-template](https://github.com/zawlodzki/convoy-railway-template) (root: railway/server) | Worker |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Convoy Gateway | 8080 | Description: Public HTTP port for Railway to route to Caddy. |
| `CONVOY_AGENT_PRIVATE_DOMAIN` | Convoy Gateway | - | Description: Private hostname for Convoy Agent. |
| `CONVOY_SERVER_PRIVATE_DOMAIN` | Convoy Gateway | - | Description: Private hostname for Convoy Server. |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | Convoy Agent | 5008 | Description: Port used by Railway healthchecks for Convoy Agent. |
| `AGENT_PORT` | Convoy Agent | 5008 | Description: Convoy Agent HTTP port. |
| `CONVOY_DB_HOST` | Convoy Agent | - | Description: Private Railway Postgres host. |
| `CONVOY_DB_PORT` | Convoy Agent | - | Description: Private Railway Postgres port. |
| `CONVOY_DB_OPTIONS` | Convoy Agent | sslmode=disable&connect_timeout=30 | Description: Connection options for private Railway Postgres networking. |
| `CONVOY_JWT_SECRET` | Convoy Agent | (secret) | Description: Reuses the generated server JWT secret. |
| `CONVOY_REDIS_HOST` | Convoy Agent | - | Description: Private Railway Redis host. |
| `CONVOY_REDIS_PORT` | Convoy Agent | - | Description: Private Railway Redis port. |
| `CONVOY_DB_DATABASE` | Convoy Agent | - | Description: Postgres database name. |
| `CONVOY_DB_PASSWORD` | Convoy Agent | (secret) | Description: Postgres password. |
| `CONVOY_DB_USERNAME` | Convoy Agent | (secret) | Description: Postgres username. |
| `CONVOY_REDIS_SCHEME` | Convoy Agent | redis | Description: Redis scheme for private Railway Redis. |
| `CONVOY_REDIS_PASSWORD` | Convoy Agent | (secret) | Description: Redis password. |
| `CONVOY_REDIS_USERNAME` | Convoy Agent | (secret) | Description: Redis username, if provided by the Redis service. |
| `CONVOY_JWT_REFRESH_SECRET` | Convoy Agent | (secret) | Description: Reuses the generated server refresh secret. |
| `PORT` | Convoy Server | 5005 | Description: Port used by Convoy Server and Railway healthchecks. |
| `CONVOY_HOST` | Convoy Server | - | Description: Public base URL for Convoy dashboard, API, portal, and webhook URLs. |
| `CONVOY_DB_HOST` | Convoy Server | - | Description: Private Railway Postgres host. |
| `CONVOY_DB_PORT` | Convoy Server | - | Description: Private Railway Postgres port. |
| `CONVOY_DB_OPTIONS` | Convoy Server | sslmode=disable&connect_timeout=30 | Description: Connection options for private Railway Postgres networking. |
| `CONVOY_JWT_SECRET` | Convoy Server | (secret) | Description: Generated JWT signing secret. |
| `CONVOY_REDIS_HOST` | Convoy Server | - | Description: Private Railway Redis host. |
| `CONVOY_REDIS_PORT` | Convoy Server | - | Description: Private Railway Redis port. |
| `CONVOY_DB_DATABASE` | Convoy Server | - | Description: Postgres database name. |
| `CONVOY_DB_PASSWORD` | Convoy Server | (secret) | Description: Postgres password. |
| `CONVOY_DB_USERNAME` | Convoy Server | (secret) | Description: Postgres username. |
| `CONVOY_LOGGER_LEVEL` | Convoy Server | info | Description: Default log level. |
| `CONVOY_REDIS_SCHEME` | Convoy Server | redis | Description: Redis scheme for private Railway Redis. |
| `CONVOY_REDIS_PASSWORD` | Convoy Server | (secret) | Description: Redis password. |
| `CONVOY_REDIS_USERNAME` | Convoy Server | (secret) | Description: Redis username, if provided by the Redis service. |
| `CONVOY_SIGNUP_ENABLED` | Convoy Server | true | Description: Allows first users to sign up; disable after initial setup if invite-only access is required. |
| `CONVOY_JWT_REFRESH_SECRET` | Convoy Server | (secret) | Description: Generated JWT refresh-token secret. |
| `CONVOY_NATIVE_REALM_ENABLED` | Convoy Server | true | Description: Enables native username/password authentication. |
| `REDISPORT` | Redis | 6379 | - |
| `REDISUSER` | Redis | default | - |
| `REDIS_URL` | Redis | - | Connection string for connecting to redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | - |
| `REDIS_PASSWORD` | Redis | (secret) | - |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to redis externally |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379
- **Volume:** `/data`

**Category:** Automation · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/convoy)
