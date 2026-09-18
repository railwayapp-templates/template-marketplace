# Deploy EdgeEver on Railway

Self-hosted AI-native knowledge base & Evernote-style notes app with MCP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/edgeever)

## About

EdgeEver is an open-source, AI-native knowledge base and Evernote-style notes app with native MCP support. This
template deploys the self-hosted EdgeEver server with your admin account set from the template's variables. It is a
community-maintained template based on EdgeEver; it is not affiliated with, endorsed by, or an official offering of
the EdgeEver project, and it does not use the EdgeEver logo.

EdgeEver runs as a single self-hosted server that serves its web app, its API and its MCP endpoint, storing
everything in SQLite and files on disk. It requires an admin login, and the admin account is configured from
environment variables — so if that password is left as a weak default (or unset), the instance could be signed into
by anyone who finds it.

This template runs EdgeEver on Railway with a generated admin password (so the API is protected from the first
boot), its data persisted on a volume, and the port and health check wired. It runs the official image unmodified,
pinned by digest.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | `ghcr.io/tianma-if/edgeever:1.40.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8787 | Port Railway routes traffic and health checks to (keep it 8787). |
| `EDGE_EVER_AUTH_PASSWORD` | (secret) | The admin's password, generated. Copy it from here to sign in. |
| `EDGE_EVER_AUTH_USERNAME` | (secret) | The admin username you sign in with. |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** CMS

[View on Railway →](https://railway.com/deploy/edgeever)
