# Deploy gcli2api on Railway

Convert GeminiCLI and Antigravity to OpenAI,GEMINI Claude API interfaces

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gcli2api)

## About

Converting [gcli2api](https://github.com/su-kaka/gcli2api) to API interfaces allows developers and applications to access OpenAI, Gemini, and Claude compatible endpoints powered by underlying GeminiCLI and Antigravity authentications. `gcli2api` includes a full-featured web management console for managing OAuth credentials, monitoring usage, streaming logs, and configuring multi-account rotational routing for high-throughput AI API requests.

Hosting `gcli2api` on Railway provisions a continuous containerized service running the FastAPI web server engine. Railway handles build execution, automated domain mapping with HTTPS encryption, and background container health management.

By default, `gcli2api` utilizes an embedded SQLite database and local file paths to manage credential states and refresh tokens. Railay simplifies this setup by attaching a persistent Railway Volume mounted to `/app/creds`, ensuring OAuth authorization tokens remain intact across service restarts and deployments. Alternatively, `gcli2api` can connect to a managed Railway MongoDB database service to store credentials in a cloud environment. Railway's networking layer routes public HTTPS requests on the target port directly to your container.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| gcli2api | `ghcr.io/su-kaka/gcli2api:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `HOST` | 0.0.0.0 |
| `PORT` | 7861 |
| `PASSWORD` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/creds`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/gcli2api)
