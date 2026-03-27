# Deploy Flipt Local on Railway

Flipt v2 with local storage, persistent volume, and correct permissions.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/flipt-local)

## About

Flipt is an open-source feature flag and A/B testing platform. This template runs Flipt v2 in local-first mode using Git-native storage instead of an external database. Flag data is persisted to a Railway volume with file permissions pre-configured for Flipt's non-root user.

Flipt Local stores all flag definitions, segments, and rules on the local filesystem rather than requiring a separate database or cache layer. This template extends the official Flipt v2 image to handle Railway's volume permission model, where volumes mount as root but Flipt runs as a non-root user. After deploying the service, you attach a persistent volume at `/var/opt/flipt` and the container handles ownership correction at startup. Authentication is not configured by default, so you should either place the instance behind a private network or enable one of Flipt's built-in auth methods.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Flipt | [vehm/railway-flipt](https://github.com/vehm/railway-flipt) | Database |

## Configuration

- **Volume:** `/var/opt/flipt`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/flipt-local)
