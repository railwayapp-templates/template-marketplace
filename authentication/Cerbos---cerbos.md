# Deploy Cerbos on Railway

Cerbos 0.55: authorization policy engine with Admin API and SQLite store.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cerbos)

## About

Cerbos is an open-source authorization engine. You describe who can do what in YAML or JSON policies, and your application asks Cerbos whether a principal may perform an action on a resource. Decisions take milliseconds and support roles, attributes and conditions, which keeps access rules out of application code.

This template deploys Cerbos 0.55.0 from a small public wrapper repository. The wrapper copies the official binary, pinned by digest, onto Alpine, so a startup script can hash the admin password and write the config. Policies are stored in SQLite on a Railway volume and managed through the Admin API, which needs the generated admin password. The check API and the Admin API share a public HTTPS domain on port 3592, while gRPC stays on the private network on port 3593. The check API itself has no authentication. The server runs as an unprivileged user and fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cerbos | [aalfath/cerbos-railway-template](https://github.com/aalfath/cerbos-railway-template) | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3592 |
| `CERBOS_ADMIN_PASSWORD` | (secret) |
| `CERBOS_ADMIN_USERNAME` | (secret) |

## Configuration

- **Healthcheck:** `/_cerbos/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Authentication · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/cerbos)
