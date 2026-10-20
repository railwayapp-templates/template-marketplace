# Deploy Apprise API | (Just Updated) Notification Gateway for AI Agents, Password Generated on Railway

Easy for LLM agents: no setup, generated login, one curl sends alerts.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apprise-api-or-just-updated-notification)

## About

Apprise API is easy for an LLM agent to use: it deploys with no manual step, the credentials are generated for you, the contract below lists every URL and variable name, and one `curl` call sends a notification to any of 100+ services (Slack, Discord, Telegram, email, ntfy, webhooks and more).

Apprise API is a self-hosted gateway that turns one HTTP call into a notification on any of those services. This template runs the official image with a persistent volume, a generated password, and a public HTTPS endpoint. Stock Apprise API ships with no authentication; this template turns it on from the first boot.

This template runs the official `caronc/apprise` image (pinned by digest). Configuration saved through the API lives on a volume mounted at `/config`, so saved notification targets survive redeploys. HTTP Basic auth is enabled at boot: the username is `admin` and the password is the `APPRISE_PASSWORD` variable, generated at deploy time and stable across redeploys. Unauthenticated requests get 401 on every API route. The server binds to Railway's `$PORT`, and the start command logs the owner of `/config` at boot so the volume permissions are visible in the deploy log (the image chowns the mount itself).

Agent contract:

- Base URL variable: `APPRISE_URL` (`https://`)
- Private host variable: `APPRISE_PRIVATE_HOST` (use `http://$APPRISE_PRIVATE_HOST:8080` from other services in the project)
- Username: `admin`
- Password variable: `APPRISE_PASSWORD`
- Health path: `/login` (open, returns 200; every API route returns 401 without credentials)
- Stateless notify: `POST /notify` with form fields `urls` and `body`
- Stateful mode (simple): `POST /add/` saves URLs under a key, `POST /notify/` sends to them

```bash
curl -s -u admin:$APPRISE_PASSWORD -X POST "$APPRISE_URL/notify" \
  -d "urls=jsons://postman-echo.com/post" -d "title=Deploy done" -d "body=Build 42 finished"
```

Save a target once, notify by key afterwards:

```bash
curl -s -u admin:$APPRISE_PASSWORD -X POST "$APPRISE_URL/add/ops" -d "urls=jsons://postman-echo.com/post"
curl -s -u admin:$APPRISE_PASSWORD -X POST "$APPRISE_URL/notify/ops" -d "body=Hello from the agent"
```

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| apprise-api | `caronc/apprise@sha256:0b2913b15c8eb47c25345722985ffbfae701326edde21909c205d296d62dd52c` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `APPRISE_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c 'export HTTP_PORT=$PORT APPRISE_AUTH_REQUIRED=yes APPRISE_USER=admin APPRISE_STATEFUL_MODE=simple APPRISE_TRUSTED_ORIGINS="https://$RAILWAY_PUBLIC_DOMAIN"; echo "[railway] apprise uid=$(id -u) config_owner=$(stat -c %u:%g /config) port=$PORT"; exec /opt/apprise/webapp/supervisord-startup'`
- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/apprise-api-or-just-updated-notification)
