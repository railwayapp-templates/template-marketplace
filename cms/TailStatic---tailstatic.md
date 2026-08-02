# Deploy TailStatic on Railway

Create SEO and AI optimized static websites without build pipeline.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tailstatic)

## About

TailStatic is a self-hosted website builder and static CMS for creating, editing, previewing, and publishing sites from a browser-based dashboard. It stores site files, rendered output, configuration, and app data on persistent storage, making it suitable for users who want control over their content and hosting workflow.

This Railway template deploys TailStatic as a Docker-based web service with persistent storage mounted at `/app/data`. The container includes both the main TailStatic ASP.NET application and the internal tools service used for site processing tasks such as Tailwind builds, HTML minification, and Open Graph image rendering. After deployment, open the generated Railway domain, complete the installation wizard, and configure your dashboard domain and optional integrations. Railway handles container hosting, public networking, environment variables, and volume persistence.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tailstatic/tailstatic:railway | `tailstatic/tailstatic:railway` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TOOLS_APP_URL` | http://127.0.0.1:3000 |
| `TAILSTATICPARENT` | /var/tailstatic |
| `ASPNETCORE_ENVIRONMENT` | Production |

**Category:** CMS

[View on Railway →](https://railway.com/deploy/tailstatic)
