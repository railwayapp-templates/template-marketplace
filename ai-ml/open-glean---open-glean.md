# Deploy open-glean on Railway

Self-hosted AI knowledge workspace with Hydra DB search and citations

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-glean)

## About

Open Glean is a self-hosted AI workspace for knowledge work. It connects to Hydra DB, retrieves relevant memories and files, and produces cited answers through a modern browser interface. Deep Research, collections, context management, integrations, mindmaps, and OpenAI-compatible model support make it a practical second brain for teams and individuals.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/open-glean)

Railway runs the official Open Glean production container as a single HTTP service with automatic HTTPS, a generated public domain, environment variables, logs, and managed deployments. The template uses a pre-built Docker image and does not perform a source-code or Railpack build at deployment time.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| open-glean | `xiaosong233/open-glean-railway:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `OPEN_GLEAN_SESSION_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/open-glean)
