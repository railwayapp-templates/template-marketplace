# Deploy pokemon-showdown on Railway

Self-host Pokemon Showdown: custom battles, formats, moderation

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pokemon-showdown-1)

## About

Deploying this template creates one Railway service built from the public GitHub repo's Dockerfile (Node.js 22, per upstream's requirement) plus one persistent volume mounted at `/data`. Railway injects the `PORT` variable and generates a public domain automatically; the start script passes the port to Showdown (`node pokemon-showdown $PORT`), seeds `config/config.js` from the image's pristine copy on first boot, and symlinks `logs/` and `config/` into the volume. The first deployment passes a healthcheck against the server's root HTTP route before it is marked live. Running cost is a single low-memory service — typically the cheapest Hobby-tier plan — since Showdown is a lightweight Node.js server for small communities.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| showdown | [lNamelessl/pokemon-showdown-railway-template](https://github.com/lNamelessl/pokemon-showdown-railway-template) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Starters · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/pokemon-showdown-1)
