# Deploy Monero Bar on Railway

Deploy your own Monero blockchain dashboard with monero.bar!

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/monero-bar)

## About

Hosting Monero Bar is pretty straightforward compared to running a full blockchain explorer. The app itself is just a frontend (and sometimes a thin backend) that fetches live data from Monero nodes or APIs. You don’t need to store the blockchain locally unless you want full control over your data source. Most setups involve deploying the app, configuring an RPC endpoint (like a public node or your own), and optionally caching results for performance. The main challenge isn’t compute—it’s choosing a reliable data source and keeping latency low.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MB Collector 90S | [islemci/MBCollector](https://github.com/islemci/MBCollector) | Worker |
| Redis | `redis:8.6.2` | Database |
| monerobar | [islemci/monerobar](https://github.com/islemci/monerobar) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `REDISPORT` | - | Port for the deployment |
| `REDISUSER` | - | Username for access |
| `REDISPASSWORD` | (secret) | - |
| `REDIS_PASSWORD` | (secret) | - |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/monero-bar)
