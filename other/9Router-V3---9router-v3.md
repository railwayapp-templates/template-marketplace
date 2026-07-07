# Deploy 9Router V3 on Railway

A self-hosted AI gateway: one endpoint, many providers, automatic fallback.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/9router-v3)

## About

9Router V3 is a self-hosted AI gateway that exposes one OpenAI-compatible endpoint for many AI providers. It includes automatic provider fallback, key rotation, a web dashboard, usage tracking, proxy management, authentication, CLI integrations, and optional browser automation in a single deployable service.

Hosting 9Router V3 on Railway runs the Express API and compiled React dashboard together in one container. Railway builds the included multi-stage Dockerfile, injects the service port, monitors `/api/health`, and restarts failed deployments. The application generates its JWT and API-key signing secrets automatically and stores them in the data directory. For the standard template flow, the only value a user needs to provide is `INITIAL_PASSWORD`; all other essential runtime configuration is supplied by Railway, the Docker image, or generated securely on first boot. Persistent installations should mount a Railway Volume at `/data`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| 9router | [codestorm-official/9router-v3](https://github.com/codestorm-official/9router-v3) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 20128 |
| `DATA_DIR` | /data |
| `NODE_ENV` | production |
| `CLOUD_URL` | https://9router.com |
| `JWT_SECRET` | (secret) |
| `INSTANCE_NAME` | 9router V3 |
| `API_KEY_SECRET` | (secret) |
| `MACHINE_ID_SALT` | endpoint-proxy-salt |
| `REQUIRE_API_KEY` | (secret) |
| `INITIAL_PASSWORD` | (secret) |
| `AUTH_COOKIE_SECURE` | false |
| `ENABLE_REQUEST_LOGS` | false |
| `NEXT_PUBLIC_CLOUD_URL` | https://9router.com |
| `OBSERVABILITY_ENABLED` | true |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** JavaScript, TypeScript, HTML, Python, CSS, Dockerfile, Procfile

[View on Railway →](https://railway.com/deploy/9router-v3)
