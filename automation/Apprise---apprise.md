# Deploy Apprise on Railway

Send one HTTP request and it notifies Discord, Slack, Telegram and more

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apprise)

## About

Apprise API is a small HTTP service that turns one request into a notification on more than a hundred platforms — Discord, Slack, Telegram, Matrix, Teams, ntfy, Gotify, Pushover, Home Assistant, email, SMS gateways and more. It wraps the Apprise Python library in a REST endpoint and a web interface, so every script, cron job, monitoring tool and CI job you own can post to one URL and stop caring which webhook format each destination expects. Homelab operators and platform teams self-host it for that reason: one integration point, no vendor holding your alerting.

Self-host Apprise API on Railway with this template and you get one service, named `apprise`, running the official `caronc/apprise` image behind nginx and gunicorn. A persistent volume holds saved configurations, attachments and custom plugins. HTTP basic authentication guards every route, because Apprise API ships with no login of its own and an ungated notification endpoint is an open relay. The exception is the health endpoint Railway's prober calls, which confirms the volume is writable rather than that the container is merely alive.

![Diagram of the single Apprise service and its volume on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788483492/apprise-api-architecture.png)

Apprise solves a dull but expensive problem: every notification service has its own API, payload shape and authentication scheme, and wiring each into every tool multiplies fast. Apprise collapses that into one URL grammar — `discord://`, `slack://`, `tgram://`, `mailto://` — and Apprise API puts it behind HTTP. Self-host it to keep alerting inside infrastructure you control, or to change a destination without redeploying the tools that notify.

- **Stateless notifications** — post URLs and a message together to `/notify`, storing nothing
- **Stateful configurations** — save a named set of destinations and call it by key
- **Tags** — one call hits "ops" or "alerts" without listing every URL
- **Attachments** — send files with a notification, by upload or by URL
- **A web UI** — build, review and test configurations without touching curl

The architecture is deliberately small. nginx terminates the request, applies basic authentication and proxies to gunicorn, which runs the Django app with gevent workers so slow outbound webhooks do not block each other. The volume at `/data` holds configurations, attachments and plugins. There is no database or queue: Apprise's state is a handful of text files.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| apprise | [gridalpha/apprise-api-railway](https://github.com/gridalpha/apprise-api-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | Etc/UTC | Timezone for log timestamps |
| `PORT` | 8000 | Port Railway probes and routes to |
| `HTTP_PORT` | 8000 | Port nginx listens on |
| `SECRET_KEY` | (secret) | Django signing key |
| `APPRISE_ADMIN` | yes | Enables the configuration listing page |
| `BASIC_AUTH_PASSWORD` | (secret) | Password for the basic auth gate |
| `BASIC_AUTH_USERNAME` | (secret) | Username for the basic auth gate |
| `APPRISE_WORKER_COUNT` | 4 | gunicorn workers sending notifications |
| `APPRISE_STATEFUL_MODE` | simple | Stores configurations under their key |
| `NGINX_WORKER_PROCESSES` | 2 | nginx worker processes |
| `APPRISE_ATTACH_REJECT_URL` | internal 127.0.* localhost* | Blocks private-address attachment fetches |

## Configuration

- **Healthcheck:** `/status`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Automation · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/apprise)
