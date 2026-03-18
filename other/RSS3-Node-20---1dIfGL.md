# Deploy RSS3 Node 2.0 on Railway

A lightweight service that joins the RSS3 Network as a node.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/1dIfGL)

## About

## Prerequisites
Before deploying, you need to create a node on the explorer: [RSS3 Explorer](https://explorer.rss3.io/nodes).

Additionally, ensure that your Railway account is upgraded to at least the **Pro Plan** ($20/month). This plan is necessary to support the node's storage requirements, which will be around 10GB.

## Deployment
You only need to fill in two fields in the RSS3-Node-Core service:

- **`NODE_DISCOVERY_MAINTAINER_EVM_ADDRESS`**: Your wallet address (which is also your node address).
- **`NODE_DISCOVERY_MAINTAINER_SIGNATURE`**: The challenge signature obtained here: https://explorer.rss3.io/nodes/YOUR_WALLET_ADDRESS. (Click the "Signature" button to complete the challenge and copy your signature to paste here.)

After the service starts, it will join the RSS3 Network as a lightweight RSS3 Node.

## Contact
If you have any questions, feel free to contact me: [brucexc@rss3.io](mailto:brucexc@rss3.io).

Join the RSS3 Discord: [RSS3 Discord](https://link.rss3.io/discord)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Agentdata | `ghcr.io/rss3-network/agentdata:0.1.0` | Worker |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |
| RSSHub | `ghcr.io/diygod/rsshub` | Worker |
| Redis | `bitnami/redis:7.2.5` | Database |
| RSS3-Node-Broadcaster | `ghcr.io/rss3-network/node:v2.0.0` | Worker |
| RSS3-Node-Core | `ghcr.io/rss3-network/node:v2.0.0` | Web service |
| RSS3-Node-Monitor | `ghcr.io/rss3-network/node:v2.0.0` | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Agentdata | 8887 | - |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |
| `DATABASE_PUBLIC_URL` | Postgres | - | Public URL to connect to Postgres database, used by the Data panel. |
| `PORT` | RSSHub | 80 | - |
| `CACHE_TYPE` | RSSHub | redis | - |
| `PUPPETEER_SKIP_CHROMIUM_DOWNLOAD` | RSSHub | 1 | - |
| `REDISHOST` | Redis | - | Railway Private Domain Name. |
| `REDISPORT` | Redis | 6379 | Port to connect to Redis. |
| `REDISUSER` | Redis | default | Default user to connect to Redis. |
| `REDIS_URL` | Redis | - | URL to connect to Redis over the private network. |
| `REDISPASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PASSWORD` | Redis | (secret) | Password to connect to Redis. |
| `REDIS_PUBLIC_URL` | Redis | - | Public URL to connect to Redis, needed for the Data panel. |
| `REDIS_RDB_POLICY` | Redis | 3600#1 300#100 60#10000 | Set a RDB snapshot policy. |
| `REDIS_AOF_ENABLED` | Redis | no | Disable writing to AOF file. |
| `NODE_REDIS_USERNAME` | RSS3-Node-Broadcaster | (secret) | - |
| `NODE_DISCOVERY_SERVER_ACCESS_TOKEN` | RSS3-Node-Broadcaster | (secret) | - |
| `PORT` | RSS3-Node-Core | 80 | - |
| `NODE_REDIS_PASSWORD` | RSS3-Node-Core | (secret) | - |
| `NODE_REDIS_USERNAME` | RSS3-Node-Core | (secret) | - |
| `NODE_DISCOVERY_OPERATOR_SIGNATURE` | RSS3-Node-Core | - | explorer.rss3.io/nodes/{YOUR_WALLET_ADDRESS} |
| `NODE_DISCOVERY_SERVER_ACCESS_TOKEN` | RSS3-Node-Core | (secret) | - |
| `NODE_DISCOVERY_OPERATOR_EVM_ADDRESS` | RSS3-Node-Core | - | Your wallet address |
| `NODE_DISCOVERY_SERVER_GLOBAL_INDEXER_ENDPOINT` | RSS3-Node-Core | https://gi.rss3.io | - |
| `NODE_REDIS_PASSWORD` | RSS3-Node-Monitor | (secret) | - |
| `NODE_REDIS_USERNAME` | RSS3-Node-Monitor | (secret) | - |

## Configuration

- **TCP Proxies:** 5432
- **Volume:** `/var/lib/postgresql/data`
- **Healthcheck:** `/healthz`
- **Volume:** `/bitnami`
- **Start command:** `"sh" "-c" "sleep 20 &&./node --module=broadcaster"`
- **Start command:** `"sh" "-c" "sleep 10 &&./node --module=core"`
- **Networking:** Public domain with automatic HTTPS
- **Start command:** `"sh" "-c" "sleep 10 &&./node --module monitor"`

**Category:** Other

[View on Railway →](https://railway.com/deploy/1dIfGL)
