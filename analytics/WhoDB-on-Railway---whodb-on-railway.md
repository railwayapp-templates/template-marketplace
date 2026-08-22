# Deploy WhoDB on Railway on Railway

Secure WhoDB with persistent sessions, Basic Auth, and generated secrets.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whodb-on-railway)

## About

WhoDB Community Edition is a lightweight database explorer for browsing
schemas, running queries, and inspecting data through a web interface. This
template runs the exact-pinned WhoDB image behind an exact-pinned Caddy Basic
Auth wrapper and persists WhoDB's encrypted session state on a Railway volume.
It deliberately does not deploy a target database: connect only databases you
own and keep them private.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whodb | [l4time/railway-whodb-template](https://github.com/l4time/railway-whodb-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `WHODB_SECURE` | true |
| `WHODB_LOG_LEVEL` | info |
| `WHODB_SESSION_TTL` | 24h |
| `WHODB_BACKEND_PORT` | 8081 |
| `BASIC_AUTH_PASSWORD` | (secret) |
| `BASIC_AUTH_USERNAME` | (secret) |
| `WHODB_HEARTBEAT_DISABLED` | true |
| `WHODB_DISABLE_UPDATE_CHECK` | true |
| `WHODB_DISABLE_CREDENTIAL_FORM` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/whodb-on-railway)
