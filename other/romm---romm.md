# Deploy romm on Railway

A beautiful self-hosted ROM manager and player

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/romm)

## About

RomM is a beautiful, powerful self-hosted ROM manager and player. Browse your
game library in the browser, pull metadata and artwork, manage saves and
states, and share collections with friends.

This template runs the standard RomM stack: the app (web UI plus embedded
Valkey for background tasks) and MariaDB for metadata. Only the app is public;
the database stays on private networking. Persist a single volume at `/romm`
so library, resources, assets, and config survive redeploys (Railway allows one
volume per service). First boot runs database migrations and may take a minute
before `/api/heartbeat` is ready. After deploy, finish the setup wizard, place
ROMs under `/romm/library`, and run a scan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| app | [osbytes/template-romm](https://github.com/osbytes/template-romm) (root: /services/app) | Web service |
| mariadb | `mariadb:11.4` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `DB_HOST` | app | - | MariaDB private DNS — not the public URL |
| `DB_NAME` | app | - | Database name; must match MariaDB service |
| `DB_PORT` | app | 3306 | MariaDB port on private networking |
| `DB_USER` | app | (secret) | Database user; must match MariaDB service |
| `DB_PASSWD` | app | - | Database password; must match MariaDB service |
| `ROMM_PORT` | app | 8080 | Container HTTP port; match public networking target |
| `REDIS_HOST` | app | 127.0.0.1 | Use Valkey embedded in the RomM image (same as upstream Compose) |
| `REDIS_PORT` | app | 6379 | Embedded Valkey listen port |
| `OIDC_ENABLED` | app | false | Enable only when wiring an external IdP |
| `ROMM_BASE_URL` | app | - | Public HTTPS URL of this instance (no trailing slash) |
| `IGDB_CLIENT_ID` | app | - | Optional IGDB client ID (Twitch developer credentials) |
| `OIDC_CLIENT_ID` | app | - | OIDC client id when OIDC_ENABLED=true |
| `ROMM_BASE_PATH` | app | /romm | Base path for library, resources, assets, and config |
| `ROMM_DB_DRIVER` | app | mariadb | Database driver (keep mariadb for this template) |
| `MOBYGAMES_API_KEY` | app | (secret) | Optional MobyGames API key |
| `OIDC_REDIRECT_URI` | app | - | Absolute callback URL, usually https://<public>/api/oauth/openid |
| `IGDB_CLIENT_SECRET` | app | (secret) | Optional IGDB client secret |
| `OIDC_CLIENT_SECRET` | app | (secret) | OIDC client secret when OIDC_ENABLED=true |
| `SCREENSCRAPER_USER` | app | (secret) | Optional Screenscraper username for richer metadata |
| `STEAMGRIDDB_API_KEY` | app | (secret) | Optional SteamGridDB API key |
| `HASHEOUS_API_ENABLED` | app | true | Enable Hasheous metadata lookups (no API key required) |
| `ROMM_AUTH_SECRET_KEY` | app | (secret) | App signing secret; do not rotate after first deploy |
| `LAUNCHBOX_API_ENABLED` | app | false | Optional LaunchBox metadata integration |
| `PLAYMATCH_API_ENABLED` | app | false | Optional PlayMatch metadata integration |
| `SCREENSCRAPER_PASSWORD` | app | (secret) | Optional Screenscraper password |
| `RETROACHIEVEMENTS_API_KEY` | app | (secret) | Optional RetroAchievements API key |
| `ROMM_SESSION_SECURE_COOKIE` | app | true | Mark cookies Secure when served over Railway HTTPS |
| `OIDC_SERVER_APPLICATION_URL` | app | - | OIDC issuer / application base URL |
| `MARIADB_USER` | mariadb | (secret) | Database user referenced by app DB_USER |
| `MARIADB_DATABASE` | mariadb | romm | Database name referenced by app DB_NAME |
| `MARIADB_PASSWORD` | mariadb | (secret) | Database password; keep in sync with app DB_PASSWD |
| `MARIADB_ROOT_PASSWORD` | mariadb | (secret) | MariaDB root password (not used by the app) |

## Configuration

- **Healthcheck:** `/api/heartbeat`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/romm`
- **Volume:** `/var/lib/mysql`

**Category:** Other · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/romm)
