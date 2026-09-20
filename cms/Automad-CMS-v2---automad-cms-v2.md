# Deploy Automad CMS v2 on Railway

Flat-file visual CMS with a persistent site and a protected editor setup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/automad-cms-v2)

## About

Flat-file visual CMS with a persistent site and a protected editor setup.

| Service | Access | Persistent storage |
| --- | --- | --- |
| automad | Public HTTPS | None |
| app | Private | /app |

Railway provides the public HTTPS endpoint. Dependencies stay on private networking. Keep each volume-backed service at one replica.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| automad | [orenaksakal/railway-templates](https://github.com/orenaksakal/railway-templates) (branch: codex/unique-template-drafts) | Web service |
| app | `automad/automad:v2@sha256:5af9d80ae307fa2cc5afa504adfa66f3cfc8c6967cb00a1ac2e5f4b5cb88042d` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP port inside this service. Keep the default to match its Railway public port and health check. |
| `OWNER_AUTH` | true | Require owner authentication for every application route. |
| `OWNER_SCOPE` | all | Protect all application routes. |
| `UPSTREAM_HOST` | - | Upstream host resolved automatically from the linked service. Keep this reference when using the included topology. |
| `UPSTREAM_PORT` | 80 | Upstream port for automad. The supplied value follows the pinned upstream deployment; change only with its configuration guide. |
| `ACCESS_PASSWORD` | (secret) | Generated access password. Keep private and preserve with backups. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app`

**Category:** CMS · **Languages:** Python, Dockerfile, JavaScript, Shell

[View on Railway →](https://railway.com/deploy/automad-cms-v2)
