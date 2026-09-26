# Deploy Apprise API on Railway

Apprise API 1.5: one REST endpoint to notify 100+ services. Basic auth.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/apprise-api-1)

## About

Apprise API is a small REST service that sends notifications to more than a hundred services with one request. Telegram, Discord, Slack, email, ntfy, Pushover, Microsoft Teams, Matrix and many more are addressed with simple URLs, so your apps need one integration instead of many.

This template runs the official `caronc/apprise:1.5.4` image as one service. Upstream Apprise API has no authentication, so the start command adds HTTP basic auth to its built-in nginx: every page and API call needs the user and password from the variables. Saved notification configurations live on a Railway volume and survive redeploys, so apps can call `/notify/` without knowing the targets. Attachments from private network addresses are rejected. Apps in the same Railway project can use the private hostname with the same credentials. The service needs about 150 MB of memory and fits the Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| apprise | `caronc/apprise:1.5.4` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `TZ` | UTC |
| `PORT` | 8000 |
| `APPRISE_AUTH_USER` | (secret) |
| `APPRISE_WORKER_COUNT` | 1 |
| `APPRISE_AUTH_PASSWORD` | (secret) |
| `APPRISE_STATEFUL_MODE` | simple |
| `APPRISE_ATTACH_REJECT_URL` | 127.0.* localhost* internal |

## Configuration

- **Start command:** `sh -c 'printf "%s:{PLAIN}%s\n" "$APPRISE_AUTH_USER" "$APPRISE_AUTH_PASSWORD" > /etc/nginx/apprise.htpasswd; printf "auth_basic \"Apprise API\";\nauth_basic_user_file /etc/nginx/apprise.htpasswd;\n" > /etc/nginx/server-override.conf; exec /opt/apprise/webapp/supervisord-startup'`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Bots

[View on Railway →](https://railway.com/deploy/apprise-api-1)
