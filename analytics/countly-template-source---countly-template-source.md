# Deploy countly-template-source on Railway

Deploy Countly Community with MongoDB on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/countly-template-source)

## About

Deploy Countly Community 25.03 with a production-style split service layout on Railway.

This template provisions Countly as four Railway services:

- `MongoDB` for Countly data and GridFS file storage.
- `countly-api` from `countly/api:25.03.45`.
- `countly-frontend` from `countly/frontend:25.03.45`.
- `countly-gateway`, an Nginx reverse proxy that exposes one public HTTP endpoint.

The gateway routes `/i`, `/i/*`, `/o`, and `/o/*` to the Countly API service, and all other paths to the Countly Frontend service.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MongoDB | `mongo:8.0` | Database |
| countly-gateway | [yunyu950908/countly-railway-template](https://github.com/yunyu950908/countly-railway-template) (root: /gateway) | Web service |
| countly-frontend | `countly/frontend:25.03.45` | Worker |
| countly-api | `countly/api:25.03.45` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `MONGOPASSWORD` | (secret) |
| `MONGO_INITDB_ROOT_PASSWORD` | (secret) |
| `MONGO_INITDB_ROOT_USERNAME` | (secret) |

## Configuration

- **Start command:** `docker-entrypoint.sh mongod --ipv6 --bind_ip ::,0.0.0.0 --setParameter diagnosticDataCollectionEnabled=false`
- **Volume:** `/data/db`
- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/countly-template-source)
