# Deploy flux on Railway

A data streaming proxy service that uses Server-Sent Events (SSE).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/_RXeq1)

## About

## Setting Up Turso (Optional)
1. Create a [Turso](https://turso.tech/) account
2. Using either the [CLI](https://docs.turso.tech/quickstart) or web UI, create a new Turso database, and note the URL
3. Using either the [CLI](https://docs.turso.tech/cli/db/tokens/create) or web UI, get the auth token for the database

Note: A local SQLite file can be used instead of a Turso/libSQL database (set the TURSO_URL to a file - eg. 'file:data.db'). The file must be persistent between runs.

## Railway Deployment
- Plug in the environment variables into Railway
- Deploy!

## Live Site
Test out the site by visiting the live page at your Railway domain. Try to create a new Fluxpoint by sending a `POST` request to `/new`, or by pressing the button on the homepage.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flux | [notskamr/flux](https://github.com/notskamr/flux) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `API_KEY` | (secret) | Optional API Key that needs to be provided as a bearer token to create new fluxpoints |
| `WAL_MODE` | - | Set to 'true' to run local SQLite in WAL mode |
| `TURSO_URL` | - | URL to libSQL/Turso database/SQLite file |
| `TURSO_AUTH_TOKEN` | (secret) | Auth token for Turso database (not needed for local file) |

## Configuration

- **Start command:** `bunx drizzle-kit push:sqlite && bun run start`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, HTML

[View on Railway →](https://railway.com/deploy/_RXeq1)
