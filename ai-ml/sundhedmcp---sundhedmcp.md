# Deploy sundhedmcp on Railway

Let Claude read your own sundhed.dk record after a MitID login. Read-only.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/sundhedmcp)

## About

SundhedMCP lets Claude, or any MCP client, read your own Danish health record on sundhed.dk after you log in with MitID: medicine card, prescriptions, test results, vaccinations and referrals. Read-only, one user, nothing from sundhed.dk is stored.

The server runs a headless browser. You log in with MitID on a password-protected page on your server, which shows that browser and passes on your typing; approval happens in your own MitID app. The MCP endpoint sits behind single-user OAuth, so only you can connect. Only OAuth tokens and a hashed password are written to the volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| sundhedmcp | `ghcr.io/manas-katyal/sundhedmcp:latest` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/sundhedmcp)
