# Deploy Cloudflare Email on Railway

EmailFlare is a self-hosted email sending platform built around Cloudflare

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/emailflare)

## About

EmailFlare is an open-source, self-hosted email sending platform built on the Cloudflare Email Sending API. It ships an admin UI for managing domains, API keys, templates, and send logs — packaged as a single Docker container with embedded SQLite storage.

EmailFlare is built for minimum infrastructure. A single container bundles the Hono API backend, React admin UI, and embedded SQLite storage via mesahub-core. There are no external databases or message queues to provision. The Railway template pre-configures everything — generated secrets, embedded storage, and a persistent `/data` volume. All you need to bring are your Cloudflare credentials.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| EmailFlare | `ghcr.io/0xdps/emailflare:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ADMIN_TOKEN` | (secret) | Static bearer token for the admin UI and admin API routes.  |
| `MESAHUB_URL` | mh://local/emailflare | Controls where Email Flare stores its data (API keys, templates, send logs) |
| `CF_API_TOKEN` | (secret) | Required for production email sending via the Cloudflare Email Sending API. Guide: https://emailflare.dev/cloudflare-token |
| `CF_ACCOUNT_ID` | - | Your Cloudflare account ID — found in the Cloudflare dashboard sidebar. |
| `SESSION_SECRET` | (secret) | Secret used to sign HTTP session cookies |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/emailflare)
