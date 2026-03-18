# Deploy Datalust Seq on Railway

Ingestion and analysis of structured logs and traces

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/TgfPHD)

## About

Contains a single service using the official [datalust/seq Docker image](https://hub.docker.com/r/datalust/seq) with an attached volume for log storage. Featuring:

- UI and log ingestion on port 443 using the service's public domain
- Log ingestion on port 5341 within the private network

## Getting Started

1. Set a temporary password in the `SEQ_FIRSTRUN_ADMINPASSWORD` variable and deploy the template
2. Visit the public address of the service (e.g. `https://your-seq-service.up.railway.app`) and log in using `admin` and the temporary password
3. Enter a new, permanent password for the `admin` user

You can now send logs to your Seq instance from the private network on `http://your-seq-service.railway.internal:5341` or from outside on `https://your-seq-service.up.railway.app`.

See [the Seq docs](https://docs.datalust.co/docs/getting-logs-into-seq) for more information on logging. In particular, you might want to add an API key to restrict who can send logs to Seq. There are also many [advanced options](https://docs.datalust.co/docs/environment-variables) available through environment variables.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Seq | `datalust/seq` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Internal port for serving the UI |
| `ACCEPT_EULA` | Y | Automatically accept the Seq EULA |
| `SEQ_API_LISTENURIS` | - | UI and ingestion on $PORT, and private network ingestion on port 5341 |
| `SEQ_API_CANONICALURI` | - | Used for generating links back to Seq (if Seq is exposed publicly) |
| `SEQ_API_INGESTIONPORTS` | 5341 | Limit port 5341 to ingestion |
| `SEQ_FIRSTRUN_ADMINPASSWORD` | (secret) | Initial admin password that must be changed on first login (if empty, access is unrestricted!) |
| `SEQ_FIRSTRUN_ADMINUSERNAME` | (secret) | Admin username |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability

[View on Railway →](https://railway.com/deploy/TgfPHD)
