# Deploy Kilnx on Railway

Build full-stack apps with 27 keywords. SQL, SQLite, htmx, one binary.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kilnx)

## About

Kilnx is a declarative backend language that compiles to a single binary. You write models, routes, SQL queries, and auth in a `.kilnx` file. The compiler generates a standalone executable with an embedded HTTP server, SQLite database, and htmx. 27 keywords cover everything from CRUD to WebSockets.

Deploying Kilnx on Railway requires no runtime, no package manager, and no external database. 

The template uses a pre-built Docker image (`ghcr.io/kilnx-org/kilnx`) to compile your `.kilnx` file into a standalone binary during the build phase. The resulting container runs a single executable that serves your app, manages its own SQLite database, and handles authentication, CSRF, and session management out of the box. Push changes to your GitHub repo and Railway rebuilds automatically in under 30 seconds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kilnx | [kilnx-org/railway-template](https://github.com/kilnx-org/railway-template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECRET_KEY` | (secret) | Session signing secret for auth cookies. Required when using auth block. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/kilnx)
