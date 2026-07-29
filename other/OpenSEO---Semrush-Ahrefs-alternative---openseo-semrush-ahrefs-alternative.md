# Deploy OpenSEO - Semrush, Ahrefs alternative on Railway

SEO tool for the people. Connect with any agent with MCP.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openseo-semrush-ahrefs-alternative)

## About

OpenSEO is an open-source SEO platform designed as a cost-effective alternative to Ahrefs and Semrush. It provides core SEO features like keyword research, rank tracking, site audits, and backlink analysis using live DataForSEO data. It uniquely features an MCP server to connect directly with AI agents.

Hosting OpenSEO on Railway allows you to take full control of your SEO workflows without expensive, flat-rate monthly subscriptions. Deploying this open-source platform involves setting up a web service on Railway, configuring your environment variables, and connecting it to a DataForSEO API account to fetch real market data. Because it runs on your own infrastructure, your SEO data remains private. Railway’s automated build process makes it seamless to pull the OpenSEO repository from GitHub and deploy it. You will also need to provision a database to store your workspaces, saved keywords, rank tracking history, and site audit logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| every-app/open-seo:latest | `ghcr.io/every-app/open-seo:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 3001 | - |
| `AUTH_MODE` | local_noauth | - |
| `DATAFORSEO_API_KEY` | (secret) | https://github.com/every-app/open-seo/blob/main/docs/DATAFORSEO_API_KEY.md |
| `VITE_SHOW_DEVTOOLS` | false | - |
| `CLOUDFLARE_INCLUDE_PROCESS_ENV` | true | - |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.wrangler`

**Category:** Other

[View on Railway →](https://railway.com/deploy/openseo-semrush-ahrefs-alternative)
