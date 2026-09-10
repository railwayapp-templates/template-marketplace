# Deploy Homer on Railway

Static homepage dashboard built from a simple YAML file

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/homer)

## About

Homer is a dead-simple static homepage for your server. It turns a single YAML file into a fast, searchable grid of cards linking to everything you run — internal tools, admin panels, monitoring, bookmarks. There is no database and no server-side work: the browser loads a small Vue bundle, reads your configuration and renders the dashboard. Teams reach for it as the front door to a homelab or an internal network.

Deploy Homer on Railway and you get one service, `homer`, built from the [gridalpha/homer-railway](https://github.com/gridalpha/homer-railway) source repository on top of the official `b4bz/homer` image. lighttpd serves it on the port Railway assigns, behind HTTP basic auth so the list of your services is not public, and the dashboard is installed from the repository's `config/config.yml` on every boot. Nothing is written inside the container, so this deployment needs no volume and no database — to self-host Homer here you edit YAML, not infrastructure.

![Diagram of the single Homer service on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788943937/homer-architecture.png)

Every self-hosted stack accumulates URLs nobody remembers. Homer solves that with the smallest possible piece of software: a compiled single-page app and a web server. Its configuration is declarative, so the dashboard lives in version control and a change is a diff.

Key features:

- YAML configuration with groups, tags, subtitles and per-card icons
- Fuzzy search and keyboard shortcuts over every card
- Multiple pages, each backed by its own YAML file
- Light, dark and automatic themes, with full colour overrides
- Smart cards that poll an app's API and show live status
- Installable as a progressive web app
- Font Awesome icons plus any image you supply

Architecture on Railway is deliberately flat. The `homer` service is the whole deployment: lighttpd serves the bundle and your configuration, answers the health check on `/healthz`, and requires credentials on every other path. Smart cards are fetched by the visitor's browser, not by the container, so there is no worker and no database.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| homer | [gridalpha/homer-railway](https://github.com/gridalpha/homer-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP listening port, also health-checked |
| `HOMER_PASSWORD` | (secret) | Basic-auth password, required at startup |
| `HOMER_USERNAME` | (secret) | Basic-auth user for the dashboard |
| `HOMER_CONFIG_URL` | - | Optional raw URL of your own config.yml |
| `HOMER_ASSETS_ARCHIVE_URL` | - | Optional tar.gz or zip of extra logos |

## Configuration

- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/homer)
