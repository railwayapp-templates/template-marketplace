# Deploy Betula Deployment on Railway

Federated bookmark manager with ActivityPub support

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/betula-deployment)

## About

Deploy Betula, a self-hosted federated bookmark manager with ActivityPub support, on Railway with one click.

Betula is a lightweight, single-user bookmark manager with Fediverse integration. This template provides a production-ready deployment with:

- Docker multi-stage build (Go 1.23 + Alpine 3.19)
- SQLite database with persistent Railway Volume
- CGO-enabled for native SQLite support
- Automatic HTTPS via Railway
- ActivityPub/Fediverse federation
- Optimized image size (~20-30 MB)

**Post-deployment steps:**
1. Add Railway Volume: Variables → Add Volume → Mount at `/data` → Size: 1 GB
2. Open your Railway-generated URL
3. Create your admin account
4. Optional: Configure custom domain for federation

**Live example:** https://bookmarks.stevennoack.de

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| betula-deployment | [MacStenk/betula-deployment](https://github.com/MacStenk/betula-deployment) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data/`

**Category:** CMS · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/betula-deployment)
