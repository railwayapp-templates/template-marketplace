# Deploy Light Phone Luma Dashboard on Railway

Self-hosted dashboard for the Luma launcher on the Light Phone III

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/light-phone-luma-dashboard)

## About

Luma Dashboard is a self-hosted dashboard for Luma, vandamd's launcher for the Light Phone III. Choose the tools and apps on your phone, set a message above the lock screen clock, and add live cards under it: weather, webhooks, and Habitica tasks you can complete from the lock screen. Not affiliated with Light.

The template runs two services. `backend` is the open-source Convex backend running the dashboard's functions, with its data on a Railway volume. `web` serves the dashboard and passes only the phone's sync connection and lock screen webhooks to the backend over Railway's private network. The instance secret is generated during deployment, so there is nothing to fill in. When both services are running, open the web service's URL, create an account, and enter that same URL under Server on Luma's login screen. Changes made on the dashboard reach the phone within seconds.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| backend | `ghcr.io/vbbot/luma-dashboard-backend:latest` | Database |
| web | `ghcr.io/vbbot/luma-dashboard-web:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `GITHUB_TOKEN` | backend | (secret) | GitHub token with no scopes, for faster App Store refreshes |
| `INSTANCE_SECRET` | backend | (secret) | Root secret of the backend, generated for you. Admin keys and encryption keys come from it. Keep it private and never change it once there is data. |
| `CONVEX_CLOUD_ORIGIN` | backend | - | Public HTTPS address of the dashboard, used for Habitica webhooks. Change it if you add a custom domain to the web service. |
| `SITE_UPSTREAM` | web | - | Private address of the backend’s webhook endpoint. Leave as is. |
| `BACKEND_UPSTREAM` | web | - | Private address of the backend’s sync API. Leave as is. |

## Configuration

- **Volume:** `/convex/data`
- **Healthcheck:** `/version`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/light-phone-luma-dashboard)
