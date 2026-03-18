# Deploy Dashy — Open Source Homer & Homarr Alternative on Railway on Railway

Self Host Dashy. Open Source Start Page with Widgets & Themes

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/dashy)

## About

Dashy is an open-source, self-hosted dashboard for your homelab — a single, beautiful interface for organizing all your services, links, and widgets. It replaces scattered browser bookmarks with a fully customizable start page complete with service status checks, 50+ pre-built widgets, multiple themes, and a built-in UI editor, all configured from a single YAML file. 
Self-hosting Dashy on Railway takes seconds: this one-click template deploys the `lissy93/dashy` image with a persistent volume at `/app/user-data` pre-wired, so your `conf.yml` and custom icons survive every redeploy. A starter config is automatically written on first boot — open the dashboard and start customizing immediately.

![Dashy Railway architecture](https://res.cloudinary.com/asset-cloudinary/image/upload/v1773563585/Dashy_railway_arch_opfk8z.png)

Dashy is a privacy-respecting, fully open-source homelab dashboard built by Alicia Sykes ([@Lissy93](https://github.com/Lissy93/dashy)) and licensed under MIT. It solves the problem of scattered bookmarks across dozens of self-hosted services by centralizing access in one place.

Key features:

- **50+ built-in widgets** — Docker stats, GitHub activity, weather, uptime, RSS feeds, and more
- **Service status indicators** — per-item health checks with response time on hover
- **Visual UI editor** — configure and preview changes without touching YAML
- **Theming engine** — dozens of built-in themes plus full custom CSS and CSS variable support
- **Multiple views** — default grid, minimal browser startpage, and workspace (multi-app iframe) modes
- **Auth & multi-user** — built-in basic auth, Keycloak, and other SSO provider support
- **PWA support** — installable as a progressive web app with basic offline access
- **Web search** — query DuckDuckGo, Google, or any custom engine directly from the dashboard

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Dashy | `lissy93/dashy:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `NODE_ENV` | production | Application runtime environment mode |

## Configuration

- **Start command:** `/bin/sh -c 'test -f /app/user-data/conf.yml || echo cGFnZUluZm86CiAgdGl0bGU6IERhc2h5CnNlY3Rpb25zOiBbXQo= | base64 -d > /app/user-data/conf.yml; yarn start'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/user-data`

**Category:** Analytics

[View on Railway →](https://railway.com/template/dashy)
