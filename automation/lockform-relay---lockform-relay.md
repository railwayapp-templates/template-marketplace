# Deploy lockform-relay on Railway

Host your own lockform-relay instance

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/lockform-relay)

## About

Lockform Relay is a self-hosted forwarding service for [Lockform](https://app.lockform.io), an end-to-end encrypted form platform. Because Lockform can't decrypt your submissions, this relay holds your private key, decrypts incoming submissions, and fans them out to integrations like Slack, Discord, email, Zapier, and n8n — keeping your key and integration secrets entirely off Lockform's servers.

Hosting Lockform Relay means running a small Node.js (Hono) web service that exposes a webhook endpoint for Lockform and a password-protected config API for managing integrations. It stores integration settings in a local SQLite database, so it needs a persistent volume to survive redeploys. Deployment centers on setting three required secrets — your derived base64 private key(s), a shared webhook secret, and an admin password — as environment variables. Railway builds the image (or pulls the published GHCR image), injects `PORT` automatically, and gives you a public URL you paste back into Lockform to connect the relay. No config files to edit.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| lockform-relay | `ghcr.io/jordan-dalby/lockformrelay` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `ADMIN_PASSWORD` | (secret) |
| `WEBHOOK_SECRET` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/lockform-relay)
