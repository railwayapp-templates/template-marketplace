# Deploy railway-image-updater on Railway

Trigger multiple docker deployments for a new docker image tag.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/railway-image-updater)

## About

Railway Image Updater is a lightweight Go service that automatically updates Docker image tags across multiple Railway services in a single API call. Add one step to your CI/CD pipeline and every service sharing an image — web, worker, cron — gets updated and redeployed together.

Railway Image Updater runs as a small HTTP service inside your Railway project. It exposes a single `PUT /update` endpoint that your CI/CD pipeline calls after building a new Docker image. The service queries Railway's API to find all services whose image matches any of the provided prefixes, updates each one to the new tag, preserves replica counts, and triggers a deployment — all in one request. Configuration is minimal: set your `RAILWAY_API_TOKEN` and optionally provide private registry credentials. A `/health` endpoint is included for readiness probes.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| railway-image-updater | `ghcr.io/returnearly/railway-image-updater:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 8080 |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Automation

[View on Railway →](https://railway.com/template/railway-image-updater)
