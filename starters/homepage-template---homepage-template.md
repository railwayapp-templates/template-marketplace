# Deploy homepage-template on Railway

Homepage dashboard on Railway - built-in auth, widgets, one-click deploy

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homepage-template)

## About

This template provisions one Railway service from the pinned upstream image (`ghcr.io/gethomepage/homepage:v2.4.0`) with a volume mounted at `/app/config`. Homepage is configured entirely by YAML files on that volume — there is no database and no state outside it. On first boot a wrapper copies the starter config (settings, services, bookmarks, widgets) into the empty volume exactly once; your later edits are never overwritten by redeploys. Railway probes `/api/healthcheck`, Homepage's own health endpoint, which bypasses the auth gate so the healthcheck never fails on authentication. Restart or redeploy the service and your dashboard config persists on the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| homepage-template | [lNamelessl/homepage-railway-template](https://github.com/lNamelessl/homepage-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOMEPAGE_AUTH_SECRET` | (secret) |
| `HOMEPAGE_AUTH_PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/config`

**Category:** Starters · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/homepage-template)
