# Deploy OmniRoute - Latest on Railway

Always up-to-date OmniRoute deployment with the latest release.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omniroute-latest)

## About

OmniRoute AI Gateway is a unified AI proxy that routes multiple LLM providers through a single OpenAI-compatible endpoint. Instead of juggling separate provider URLs, request formats, and per-tool client configs, OmniRoute gives you one gateway for connecting models across providers. This template self-hosts it on Railway with a Redis-backed cache layer.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/omniroute)

![OmniRoute](https://github.com/diegosouzapw/OmniRoute/raw/main/docs/screenshots/MainOmniRoute.png)

Hosting OmniRoute AI Gateway on Railway means running two services on Railway's private network: the **omniroute** app itself, and **Redis** for session and routing-state caching. The app connects to Redis over `REDIS_URL` on the private network, so no extra networking setup is needed beyond deploying both services from the template.

A persistent volume on the `omniroute` service keeps your dashboard configuration, providers, endpoints, and routing setup intact across redeploys. Redis has its own separate volume for its data (`--save 60 1` — snapshotting every 60 seconds if at least one key changed).

Once it's up, open the public URL, add your provider credentials from the dashboard, create an endpoint and API key, then point tools like Claude Code, Cursor, Cline, OpenWebUI, or any OpenAI-compatible SDK at the generated `/v1` endpoint.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| OmniRoute | `diegosouzapw/omniroute:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private hostname used to connect to Redis over Railway's private network. |
| `REDISPORT` | Redis | 6379 | Redis server port. |
| `REDISUSER` | Redis | default | Redis username. The default Redis user is "default". |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network. |
| `REDISPASSWORD` | Redis | (secret) | Redis password, referencing the generated REDIS_PASSWORD variable. |
| `REDIS_PASSWORD` | Redis | (secret) | Automatically generated 32-character Redis password using letters only. |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for connecting to Redis externally through Railway's TCP proxy. |
| `PORT` | OmniRoute | 20128 | Port the application listens on. Railway routes public traffic to this port. |
| `BASE_URL` | OmniRoute | - | Public URL where OmniRoute is accessible. |
| `DATA_DIR` | OmniRoute | /app/data | Directory used to store persistent application data. |
| `HOSTNAME` | OmniRoute | 0.0.0.0 | Binds the application to all network interfaces so Railway can reach it. |
| `NODE_ENV` | OmniRoute | production | Runs the Node.js application in production mode. |
| `CLOUD_URL` | OmniRoute | https://9router.com | URL of the 9Router cloud service. |
| `REDIS_URL` | OmniRoute | - | Redis connection URL provided by the Redis service. |
| `JWT_SECRET` | OmniRoute | (secret) | Secret used to sign and verify JWT tokens. |
| `MODELS_DEV` | OmniRoute | false | Disables development model configuration. |
| `API_KEY_SECRET` | OmniRoute | (secret) | Secret used to secure and validate API keys. |
| `MACHINE_ID_SALT` | OmniRoute | - | Salt used to generate a unique machine identifier. |
| `INITIAL_PASSWORD` | OmniRoute | (secret) | Initial administrator password. Leave empty if the application provides another setup method. |
| `NEXT_PUBLIC_BASE_URL` | OmniRoute | - | Public base URL exposed to the frontend. |
| `PRICING_SYNC_ENABLED` | OmniRoute | true | Enables automatic synchronization of model/provider pricing. |
| `NEXT_PUBLIC_CLOUD_URL` | OmniRoute | https://omniroute.online/ | Public OmniRoute cloud service URL used by the frontend. |

## Configuration

- **Start command:** `/bin/sh -c \"rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH\"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/omniroute-latest)
