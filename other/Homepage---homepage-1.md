# Deploy Homepage on Railway

Self-hosted dashboard for your services, configured from YAML variables

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homepage-1)

## About

[Homepage](https://github.com/gethomepage/homepage) is a fast, static-feeling dashboard for your services and bookmarks. It has 100+ service widgets (Plex, Sonarr, Proxmox, Home Assistant, GitHub and more) that show live stats, with API keys kept on the server.

This template runs the official `ghcr.io/gethomepage/homepage` image as a single service with no database and no volume.

Homepage is configured with YAML files. Here each file comes from a Railway variable, written on every start: `SETTINGS_YAML`, `SERVICES_YAML`, `WIDGETS_YAML` and `BOOKMARKS_YAML`. Edit a variable in the Variables tab and Railway redeploys with the new config. No shell or file upload needed. Clear a variable to get Homepage's built-in example file.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Homepage | `ghcr.io/gethomepage/homepage:v1.13.2` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 3000 |
| `WIDGETS_YAML` | - resources:
    cpu: true
    memory: true
- search:
    provider: duckduckgo
    target: _blank
 |
| `SERVICES_YAML` | - Getting started:
    - Edit this page:
        href: https://gethomepage.dev/configs/services/
        description: Set SERVICES_YAML in the Railway Variables tab
        icon: homepage.png
    - Railway:
        href: https://railway.com/dashboard
        description: Your Railway projects
        icon: railway.png
 |
| `SETTINGS_YAML` | title: Homepage
theme: dark
color: slate
headerStyle: clean
 |
| `BOOKMARKS_YAML` | - Developer:
    - GitHub:
        - abbr: GH
          href: https://github.com/
    - Railway docs:
        - abbr: RW
          href: https://docs.railway.com/
 |

## Configuration

- **Start command:** `/bin/sh -c "mkdir -p /config /app/config && cd /app/config; printenv SETTINGS_YAML | grep -q . && printenv SETTINGS_YAML > settings.yaml; printenv SERVICES_YAML | grep -q . && printenv SERVICES_YAML > services.yaml; printenv WIDGETS_YAML | grep -q . && printenv WIDGETS_YAML > widgets.yaml; printenv BOOKMARKS_YAML | grep -q . && printenv BOOKMARKS_YAML > bookmarks.yaml; cd /app && exec docker-entrypoint.sh node server.js"`
- **Healthcheck:** `/api/healthcheck`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/homepage-1)
