# Deploy ntfy private push on Railway

Private ntfy topics with scoped credentials and persistent replay.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ntfy-private-push)

## About

Private ntfy topics with scoped credentials and persistent replay.

Run [ntfy](https://ntfy.sh/) as one digest-pinned ntfy 2.28.0 service with one exclusive 5,000 MB `/var/lib/ntfy` volume for authentication and cached messages. Topic access is denied by default; signup/reservations and attachments are disabled. A non-admin bootstrap user's ACL grants `alerts-*`, and ntfy also permits that user's own private sync topic. Static UI/login, health, public configuration and aggregate traffic statistics are public; message endpoints require authentication.

Startup initializes SQLite through a loopback-only listener, then stops it before installing credentials and opening the public listener. Every restart forces the bootstrap user back to non-admin, resets its ACL/password and clears anonymous grants. Manually created users remain and require their own access review.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| ntfy | [tech-progress/ntfy-private-push](https://github.com/tech-progress/ntfy-private-push) (branch: release-v1) (root: /) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | HTTP listener and healthcheck target, default 8080. |
| `NTFY_BASE_URL` | - | Public HTTPS base URL, matching the Railway domain; required for links and browser push. |
| `NTFY_TOPIC_PREFIX` | alerts- | Topic ACL grants prefix*; ntfy also allows the user's own private sync topic. |
| `NTFY_BOOTSTRAP_USER` | (secret) | Non-admin user reconciled at startup; alphanumeric, dash and underscore only. |
| `NTFY_CACHE_DURATION` | 24h | Finite persistent message replay retention, default 24h; not indefinite delivery. |
| `NTFY_MANAGER_INTERVAL` | 1m | Message pruning and statistics cadence, default 1m; retention is enforced on this schedule. |
| `NTFY_BOOTSTRAP_PASSWORD` | (secret) | Generated 32-character password; persisted bcrypt credential is rotated on each startup. |

## Configuration

- **Healthcheck:** `/v1/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/var/lib/ntfy`

**Category:** Automation · **Languages:** Python, JavaScript, Shell, TypeScript, Dockerfile

[View on Railway →](https://railway.com/deploy/ntfy-private-push)
