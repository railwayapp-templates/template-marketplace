# Deploy OpenSEO (Self-Hosted) on Railway

Self-host OpenSEO with prebuilt images, storage, and protected access.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openseo-self-hosted)

## About

OpenSEO is an open-source SEO platform for keyword research, rank tracking, backlink and competitor analysis, site audits, and AI visibility. It includes an MCP server so AI agents can work with your SEO data. This template runs a personal OpenSEO workspace on Railway with persistent storage, protected browser access, and a public HTTPS domain.

Hosting OpenSEO (Self-Hosted) on Railway gives you a straightforward way to run your own SEO workspace without building the deployment from scratch. This template packages OpenSEO and its access gateway in one service, mounts persistent storage at `/data`, and configures the public domain and healthcheck. The application is compiled before deployment, so Railway can start it without a build. It is a practical starting point for people who want to keep projects, keyword lists, audits, and rank history on their own infrastructure. Railway handles the container, networking, restarts, and volume persistence so you can focus on your SEO work.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenSEO | `ghcr.io/hosmelq/railway-openseo-template:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `ACCESS_PASSWORD` | (secret) | Generated 48-character credential for browser login and MCP. Browser username is ACCESS_USERNAME. MCP header: Authorization: Bearer <ACCESS_PASSWORD>. Keep private; use at least 32 letters and numbers if replacing it. |
| `ACCESS_USERNAME` | (secret) | Browser username. Defaults to admin; customize with 1-64 letters, numbers, underscores, dots or hyphens, starting with a letter or number. Changing it invalidates browser sessions; MCP uses the bearer password. |
| `DATAFORSEO_API_KEY` | (secret) | Base64 of your DataForSEO API login and API password in login:password format. Optional to deploy; required for live SEO data. Obtain the credentials at https://app.dataforseo.com/api-access. |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/openseo-self-hosted)
