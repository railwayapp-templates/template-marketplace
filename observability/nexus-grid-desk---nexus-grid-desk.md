# Deploy nexus-grid-desk on Railway

Nexus trader desk — try free, go live when you're ready.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/nexus-grid-desk)

## About

Nexus Grid Desk is an operator desk for retail traders — status, market, engine, and controls in one Railway service. Start with no exchange keys (safe paper mode); add Kraken keys later only if you want live.

Hosting this template means running a single Railway service from the `desk/` folder of the public GitHub repo. Railway builds the Dockerfile, exposes public HTTP on port 8080, and health-checks `/api/health`. The paper loop runs in-process, so you do not need a second worker, database, or DigitalOcean droplet for the appetite-test deploy. Live arming stays gated behind explicit flags and credentials you choose later.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| nexus-grid-webapp | [cheffer0723/nexus-grid-dashboard-](https://github.com/cheffer0723/nexus-grid-dashboard-) (root: /desk) | Web service |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** Observability · **Languages:** JavaScript, Python, CSS, HTML, Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/nexus-grid-desk)
