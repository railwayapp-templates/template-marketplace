# Deploy Infisical | (Just Updated) Secrets Manager Nobody Else Can Claim on Railway

Secrets manager a stranger cannot claim. Admin seeded before port opens.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/infisical-or-just-updated-secrets-manage)

## About

Infisical is the open-source secrets manager (a Doppler and HashiCorp Vault alternative): store
API keys, database URLs and certificates per project and environment, sync them to your apps
with the CLI, SDKs, Kubernetes operator or Terraform provider, and keep an audit log of who
read what. This template runs Infisical v0.146.2 with Postgres and Redis, and it seeds the
instance administrator **before the public port ever opens**.

Infisical is a Node.js API and web app that needs Postgres for its data and Redis for queues
and caching. It ships no admin account: a stock deploy is initialised through an
**unauthenticated** `POST /api/v1/admin/bootstrap`, which hands the first caller a `superAdmin`
account plus an organisation-admin machine token. On a public URL that is a race the deployer
usually loses, and losing it is permanent — the endpoint answers
`Instance has already been set up` afterwards and password recovery is an emailed link a fresh
deploy has no SMTP for.

This template starts Infisical on loopback, bootstraps the administrator from the deploy's own
generated password, stops it, and only then binds the public port — so the first request the
internet ever sees is against an already-claimed instance. It also pins the upstream image by
digest, sizes the Node heap from the container's cgroup limit instead of the image's baked
1 GB cap, publishes a healthcheck on `/api/status`, turns telemetry off, and puts Postgres and
Redis each on their own volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| postgres | `postgres:17.10-alpine` | Database |
| redis | `redis:8.2.1-alpine` | Database |
| infisical | `ghcr.io/bon5co/infisical-railway:v0.146.2` | Web service |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `POSTGRES_PASSWORD` | postgres | (secret) |
| `REDIS_PASSWORD` | redis | (secret) |
| `AUTH_SECRET` | infisical | (secret) |
| `INFISICAL_ADMIN_PASSWORD` | infisical | (secret) |

## Configuration

- **Volume:** `/var/lib/postgresql`
- **Start command:** `/bin/sh -c 'chown -R redis:redis /data && exec docker-entrypoint.sh redis-server --requirepass "$REDIS_PASSWORD" --appendonly yes --dir /data'`
- **Volume:** `/data`
- **Healthcheck:** `/api/status`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/infisical-or-just-updated-secrets-manage)
