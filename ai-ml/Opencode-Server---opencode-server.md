# Deploy Opencode Server on Railway

Opencode fully featured server for AI Agents. Web desktop & server mode.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/opencode-server)

## About

Host your own cloud opencode sandbox.   
Ubuntu based minimal Opencode Server deployment. Supports web desktop &amp; server mode with 10+ tools out of the box.

https://github.com/sprisa/opencode-server

Fully featured image for running Opencode agent machines in a Docker or Kubernetes environment. The agent can install it's own tools on demand with `mise`.

Recommended to create 1 machine / template per user.

Recommended to enable CDN caching for faster load times.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Opencode Server | `sprisa/opencode:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4096 | Port for health check |
| `OPENCODE_PORT` | 4096 | Port to run OpenCode on |
| `OPENCODE_USERNAME` | (secret) | Always opencode user. Not editable |
| `OPENCODE_CORS_ORIGIN` | * | Your hosted domain |
| `OPENCODE_SERVER_PASSWORD` | (secret) | Opencode Server Password. Change Me |

## Configuration

- **Healthcheck:** `/site.webmanifest`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/opencode`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/opencode-server)
