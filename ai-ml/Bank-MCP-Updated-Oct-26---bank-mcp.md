# Deploy Bank MCP [Updated Oct '26] on Railway

Your AI reads your bank: read-only, self-hosted, no 3rd party holds data.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/bank-mcp)

## About

[BankMCP™](https://github.com/noskillish/bankmcp) connects Claude, ChatGPT, Cursor, or any MCP client to your own bank accounts, read-only, through [Enable Banking](https://enablebanking.com)'s PSD2 open-banking API — ask it what you spent on groceries last month, or tell it to notify you when a balance drops below a threshold. This is a different kind of template post than usual: the official Railway template for this one isn't broken, and this post says so plainly instead of manufacturing a reason it needs fixing.

This template deploys `ghcr.io/noskillish/bankmcp`, the official image, exactly as the project's own README documents for Railway: a volume at `/data`, a public domain, and nothing else to configure before the setup page takes over. Checked this claim line by line against the actual Dockerfile and entrypoint script rather than taking it on faith, and it holds up — `ENV DATA_DIR=/data` and `PORT=8080` are baked into the image, and `docker-entrypoint.sh` already handles the root-owned-volume problem (it `chown`s the mount to an unprivileged user before dropping root) that shows up as a real bug on other self-hosted templates in this same series.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| bankmcp | `ghcr.io/noskillish/bankmcp:latest` | Web service |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/bank-mcp)
