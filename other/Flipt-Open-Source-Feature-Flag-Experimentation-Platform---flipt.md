# Deploy Flipt (Open-Source Feature Flag & Experimentation Platform) on Railway

Flipt [May’26] (Feature Flags, LaunchDarkly & Unleash alternative) Selfhost

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flipt)

## About

Flipt is a free, open-source **feature flag management tool** available on [Flipt GitHub](https://github.com/flipt-io/flipt). It helps developers control the rollout of new features, test functionality with a subset of users, and enable or disable code paths dynamically without redeploying applications. With Flipt, you gain full control over your application’s feature management setup, supported by an active open-source community.

You can **self host Flipt** to manage all your feature flags and configurations without relying on third-party SaaS vendors. This ensures complete privacy and customization for your product experiments and rollouts. With Flipt, you can launch features gradually, perform A/B tests, or turn off features instantly if issues arise. The **Flipt deploy** process is seamless on Railway, making it easy to set up, scale, and manage your feature flag system with minimal effort.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2.1` | Database |
| flipt | `flipt/flipt:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:17` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `REDISPORT` | Redis | 6379 |
| `REDISUSER` | Redis | default |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |
| `PORT` | flipt | 8080 |
| `FLIPT_CACHE_TTL` | flipt | 60s |
| `FLIPT_LOG_LEVEL` | flipt | debug |
| `FLIPT_CACHE_BACKEND` | flipt | redis |
| `FLIPT_CACHE_ENABLED` | flipt | true |
| `FLIPT_CACHE_REDIS_PASSWORD` | flipt | (secret) |
| `FLIPT_CACHE_REDIS_USERNAME` | flipt | (secret) |
| `FLIPT_META_TELEMETRY_ENABLED` | flipt | false |
| `FLIPT_AUTHENTICATION_REQUIRED` | flipt | false |
| `POSTGRES_DB` | Postgres | railway |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/flipt)
