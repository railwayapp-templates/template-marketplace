# Deploy Heimdall on Railway

One page of tiles linking to every app and service you run

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/heimdall)

## About

Heimdall is an application dashboard and launcher: one clean page holding a tile for every service you run, with a search bar and live status for apps that expose an API. Built by the LinuxServer.io team in PHP and Laravel and MIT-licensed, it is the default start page for tens of thousands of homelabs and small teams tired of hunting through bookmarks for an internal tool's URL. Pick an app from a catalogue of roughly 700 services and Heimdall fills in its name, colour, description and icon.

This template runs Heimdall as a single Railway service — nginx, PHP-FPM and Heimdall's background queue worker in one container, with a volume at `/config` holding the SQLite database, uploaded icons, backgrounds, sessions and the app catalogue. Railway's edge terminates HTTPS and proxies to nginx, which serves the dashboard and hands PHP requests to PHP-FPM. Self-host Heimdall with no database to size, no mail relay to configure, and an admin password set before the app accepts a request.

![Diagram of the single Heimdall service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788988524/heimdall-architecture.png)

Heimdall solves a small problem that gets worse the more you self-host: remembering where everything lives. A team running Grafana, Gitea, a media server and three internal tools ends up with four port numbers and no single door. Heimdall is that door.

Key features:

- **A catalogue of ~700 applications** with icons, brand colours and descriptions filled in
- **Enhanced apps** that poll a supported service's API and show live figures on the tile
- **Search** from the dashboard via Google, Bing, DuckDuckGo, Startpage or your own provider
- **Tags** that behave as folders, so fifty entries still fit on one screen
- **Multiple users** with their own tiles, plus an optional public front page
- **Custom icon uploads** and background images

The dashboard, the API and the worker share one container, and the volume is the whole backup story: snapshot `/config` and you have the deployment.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| heimdall | [gridalpha/heimdall-railway](https://github.com/gridalpha/heimdall-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Container and PHP timezone |
| `PORT` | 80 | Port nginx listens on |
| `APP_ENV` | production | Laravel environment |
| `APP_URL` | - | Root of every generated URL |
| `APP_DEBUG` | false | No stack traces on error pages |
| `LOG_LEVEL` | info | Laravel log verbosity |
| `FORCE_HTTPS` | true | Emit https links behind the edge |
| `LOG_CHANNEL` | stderr | Send Laravel's log to the deploy log |
| `TRUSTED_PROXIES` | 0.0.0.0/0,::/0 | Read the real client address from XFF |
| `SESSION_SECURE_COOKIE` | true | Mark session cookies Secure |
| `ALLOW_INTERNAL_REQUESTS` | false | Refuse server-side fetches of private addresses |
| `HEIMDALL_ADMIN_PASSWORD` | (secret) | Password hashed onto that user at boot |
| `HEIMDALL_ADMIN_USERNAME` | (secret) | First Heimdall user's username |

## Configuration

- **Healthcheck:** `/up`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** PHP, Dockerfile

[View on Railway →](https://railway.com/deploy/heimdall)
