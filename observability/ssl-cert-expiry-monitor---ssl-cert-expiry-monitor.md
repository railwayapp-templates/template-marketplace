# Deploy ssl-cert-expiry-monitor on Railway

Monitor TLS certificate expiry across domains with alerts before outages

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ssl-cert-expiry-monitor)

## About

Deploying provisions a single service named **monitor**: a Dockerfile build on `node:22-bookworm-slim` (multi-stage, non-root runtime), a persistent **volume at `/data`**, one **public domain**, and a **healthcheck on `/health`** with an ON_FAILURE restart policy. There are **zero deploy-form variables** — nothing to type, no prompts: press the deploy button and the dashboard comes up empty and healthy. After deploy, open the public URL and add your domains; optionally set any of the alert variables listed below in the service's Variables tab.

Hosting this monitor costs one small service (fits comfortably in Railway's entry plan: it sleeps between 30-second scheduler ticks and does one TLS handshake per domain per interval by default). The SQLite database lives on the attached volume, so redeploying or restarting never loses your domain list, check history (last 200 checks per domain) or alert state. Certificate checks run against the public internet — the service refuses to dial loopback, link-local/cloud-metadata (169.254.169.254), unspecified and multicast targets. Reads on the dashboard are public by URL; set `ADMIN_PASSWORD` to require a password for adding/removing domains.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| monitor | [lNamelessl/ssl-cert-expiry-monitor](https://github.com/lNamelessl/ssl-cert-expiry-monitor) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Observability · **Languages:** JavaScript, CSS, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/ssl-cert-expiry-monitor)
