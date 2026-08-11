# Deploy Wakapi coding statistics on Railway

Private coding statistics with durable PostgreSQL storage.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wakapi-coding-statistics)

## About

Wakapi is a self-hosted WakaTime-compatible backend for collecting coding activity. This template runs Wakapi 2.17.5 with durable PostgreSQL storage, automated schema migrations, a generated administrator, closed public registration, and dependency-aware health reporting.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Wakapi App | `ghcr.io/muety/wakapi:2.17.5@sha256:b2ed3753af47c5adef330243c2431b04940f2560b57b9dba6029fd851a8f64a9` | Worker |
| Wakapi | `caddy:2.11.4-alpine@sha256:5f5c8640aae01df9654968d946d8f1a56c497f1dd5c5cda4cf95ab7c14d58648` | Web service |
| Postgres | `postgres:16-alpine@sha256:57c72fd2a128e416c7fcc499958864df5301e940bca0a56f58fddf30ffc07777` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Wakapi App | 3000 | - |
| `WAKAPI_PORT` | Wakapi App | 3000 | - |
| `WAKAPI_DB_PORT` | Wakapi App | 5432 | - |
| `WAKAPI_DB_TYPE` | Wakapi App | postgres | - |
| `WAKAPI_DB_USER` | Wakapi App | (secret) | - |
| `WAKAPI_COOKIE_KEY` | Wakapi App | - | Stable generated session-signing key. |
| `WAKAPI_PUBLIC_URL` | Wakapi App | - | Canonical HTTPS URL through the public gateway. |
| `WAKAPI_DB_PASSWORD` | Wakapi App | (secret) | - |
| `WAKAPI_LISTEN_IPV4` | Wakapi App | 0.0.0.0 | - |
| `WAKAPI_LISTEN_IPV6` | Wakapi App | - | - |
| `WAKAPI_ALLOW_SIGNUP` | Wakapi App | true | Allows private bootstrap; the public gateway permanently blocks signup. |
| `WAKAPI_INVITE_CODES` | Wakapi App | false | - |
| `WAKAPI_MAIL_ENABLED` | Wakapi App | false | - |
| `WAKAPI_PASSWORD_SALT` | Wakapi App | (secret) | Stable generated password salt; never rotate casually. |
| `WAKAPI_IMPORT_ENABLED` | Wakapi App | false | Disables server-side imports by default to limit outbound requests. |
| `WAKAPI_INSECURE_COOKIES` | Wakapi App | false | - |
| `WAKAPI_OIDC_ALLOW_SIGNUP` | Wakapi App | false | - |
| `WAKAPI_DB_MAX_CONNECTIONS` | Wakapi App | 10 | - |
| `WAKAPI_LEADERBOARD_ENABLED` | Wakapi App | false | - |
| `PORT` | Wakapi | 8080 | - |
| `ADMIN_EMAIL` | Wakapi | admin@example.com | Administrator email; SMTP is disabled by default. |
| `ADMIN_PASSWORD` | Wakapi | (secret) | Generated administrator password used idempotently at startup. |
| `ADMIN_USERNAME` | Wakapi | (secret) | Generated administrator login username. |
| `GATEWAY_CONFIG` | Wakapi | :8080 {
  handle /healthz {
    root * /tmp
    rewrite * /wakapi-health
    file_server
  }
  @signup path /signup*
  respond @signup "Registration is disabled; use the generated administrator account." 403
  reverse_proxy {$WAKAPI_UPSTREAM}
} | Public reverse proxy that blocks all registration routes. |
| `PORT` | Postgres | 5432 | - |
| `POSTGRES_DB` | Postgres | wakapi | - |
| `POSTGRES_USER` | Postgres | (secret) | - |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Generated PostgreSQL password. |

## Configuration

- **Start command:** `/bin/sh -ec 'until curl -fsS -H "Content-Type: application/json" "$WAKAPI_UPSTREAM/api/health" | grep -q '"'"'"db":1'"'"'; do sleep 2; done; signup_status="$(curl -sS -o /dev/null -w '"'"'%{http_code}'"'"' --data-urlencode "username=$ADMIN_USERNAME" --data-urlencode "password=$ADMIN_PASSWORD" --data-urlencode "password_repeat=$ADMIN_PASSWORD" --data-urlencode "email=$ADMIN_EMAIL" "$WAKAPI_UPSTREAM/signup")"; case "$signup_status" in 302) login_status="$(curl -sS -o /dev/null -w '"'"'%{http_code}'"'"' --data-urlencode "username=$ADMIN_USERNAME" --data-urlencode "password=$ADMIN_PASSWORD" "$WAKAPI_UPSTREAM/login")"; [ "$login_status" = 302 ] ;; 409) ;; *) echo "Administrator bootstrap failed with HTTP $signup_status" >&2; exit 1 ;; esac; (while true; do if curl -fsS -H "Content-Type: application/json" "$WAKAPI_UPSTREAM/api/health" | grep -q '"'"'"db":1'"'"'; then printf "OK\n" >/tmp/wakapi-health; else rm -f /tmp/wakapi-health; fi; sleep 5; done) & printf "%s\n" "$GATEWAY_CONFIG" >/tmp/Caddyfile; exec caddy run --config /tmp/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/wakapi-coding-statistics)
