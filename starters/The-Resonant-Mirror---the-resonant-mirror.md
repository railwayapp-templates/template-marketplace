# Deploy The Resonant Mirror on Railway

Railway gives Resonance to the Mirror

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/the-resonant-mirror)

## About

- Prepare your Host machine
 - Decide where your Database will reside
 - Follow the tips below:

Set these minimal values in your environment:

 - CLOUDFLARE_ACCOUNT_ID =	Account containing your D1 database

 - CLOUDFLARE_D1_DATABASE_ID	= D1 database UUID

 - CLOUDFLARE_API_TOKEN = Cloudflare API token with Account / D1 / Edit permissions granted for that account

 - MCP_AUTH_TOKEN	A separate, randomly generated secret shared with your MCP client
PORT
 - Optional listening port; defaults to 3000

Use Node.js 22.13 or later. Install and build:

 - npm ci
 - npm run build'

The name comes from a simple idea: the best technology should not flatten us into metrics or replace our judgment. It should reflect something meaningful back

A personal MCP server with three tools: create_todo, list_todos, and complete_todo. It stores tasks in Cloudflare D1 through the HTTPS REST API. The Node.js server can run on Railway; no Cloudflare Worker or Wrangler is needed.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| resonant-railway | [mooserini/resonant-railway](https://github.com/mooserini/resonant-railway) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | - | Port the server listens on. Defaults to 3000. |
| `MCP_AUTH_TOKEN` | (secret) | Randomly generated secret shared with your MCP client for authentication. |
| `CLOUDFLARE_API_TOKEN` | (secret) | Cloudflare API token with Account, D1, and Edit permissions for your account. |
| `CLOUDFLARE_ACCOUNT_ID` | - | Cloudflare account ID that contains your D1 database. |
| `CLOUDFLARE_D1_DATABASE_ID` | - | UUID of your Cloudflare D1 database. |

## Configuration

- **Start command:** `npm run start`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/the-resonant-mirror)
