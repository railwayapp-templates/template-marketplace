# Deploy Glance on Railway

A self-hosted dashboard that puts all your feeds in one place.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/glance)

## About

A self-hosted dashboard that puts all your feeds in one place. GitHub based deployment configuration.

Simply deploy the template to get started. To make changes to the layout, fork the repository and update it on the deployment. Modify the `/config/home.yml` and `/config/glance.yml` files to your hearts content and push the changes to Git to trigger an automatic deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Glance | [zpuckeridge/glance-railway-template](https://github.com/zpuckeridge/glance-railway-template) | Web service |

## Configuration

- **Healthcheck:** `/api/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/glance`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/template/glance)
