# Deploy Scrob on Railway

Self-hosted media tracking app that syncs from Jellyfin, Plex, and Emby

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/scrob)

## About

Scrob is a self-hosted media tracking and scrobbling application that functions as your own private Trakt and Letterboxd combined. It syncs libraries, watch history, and ratings across Jellyfin, Plex, Emby, and Kodi, supports two-way Trakt syncing, and integrates directly with Radarr and Sonarr to manage media requests and watchlists.

* [Website](https://scrob.app/)
* [GitHub](https://github.com/ellite/scrob)

This template deploys the standard Scrob application container (`ghcr.io/ellite/scrob:latest`, running an Astro frontend on port `7330` and FastAPI backend on port `7331`) paired with a managed PostgreSQL 16 database (`postgres-ssl:16`) over Railway's private network. Application data is persisted in a volume mounted at `/app/backend/data`.

### Deployment Tips & Configuration

- **Initial Admin Account & Registration:** Even with `ENABLE_REGISTRATIONS="false"` set by default for security, **the first user can always register** on a fresh instance. Simply open your Railway public domain, click **Register** to create your administrator account, and your instance will automatically remain closed to public sign-ups. To invite friends or family later, set `ENABLE_REGISTRATIONS="true"`.
- **TMDB API Key (Required for Onboarding):** After logging in for the first time, Scrob's onboarding guide will prompt you to add a [TMDB API Read Access Token](https://www.themoviedb.org/settings/api) (use the longer *API Read Access Token*, not the shorter API Key) in **Settings** to fetch posters, backdrops, cast data, and episode metadata. You can also optionally add a TVDB API key.
- **Connecting Media Servers & Webhooks:** From the Scrob Settings menu, you can add connections to Jellyfin, Plex, and Emby for scheduled library and watch-state syncing, or configure real-time scrobbling webhooks pointing to your Railway domain.
- **OIDC / Single Sign-On:** Scrob natively supports OpenID Connect (Authelia, Authentik, Keycloak, Pocket ID) as well as built-in TOTP Two-Factor Authentication (2FA). Refer to the [Scrob GitHub README](https://github.com/ellite/scrob) for `OIDC_*` environment variables.
- **Backups & Recovery:** Scrob natively supports exporting a full SQL dump of your database directly from the settings interface, which can be restored seamlessly on a fresh install. Combine this with [Railway's native Volume Backups](https://docs.railway.com/reference/volumes#backups) to snapshot your `/app/backend/data` storage for complete peace of mind.

*Note: This is a community-made template and therefore not officially supported by the Scrob developer. Please direct template-specific help requests to the [Railway thread for the template](https://station.railway.com/templates/scrob-795da565).*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Scrob | `ghcr.io/ellite/scrob:latest` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:16` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TZ` | Scrob | UTC | Container timezone (e.g., America/Los_Angeles) |
| `PORT` | Scrob | 7330 | Port the Scrob web interface listens on inside the container |
| `SECRET_KEY` | Scrob | (secret) | Secret key used for cryptographic signing and token encryption |
| `DATABASE_URL` | Scrob | - | Asyncpg PostgreSQL connection string over the private network |
| `ENABLE_REGISTRATIONS` | Scrob | false | Allow additional users to register (the first admin user can always register even when set to false) |
| `REGISTRATION_MAX_ALLOWED_USERS` | Scrob | 0 | Maximum number of registered users when registrations are enabled (0 = unlimited) |
| `POSTGRES_DB` | Postgres | railway | Default database created when image is started. |
| `DATABASE_URL` | Postgres | - | URL to connect to Postgres database. |
| `POSTGRES_USER` | Postgres | (secret) | User to connect to Postgres DB |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Password to connect to DB |

## Configuration

- **Healthcheck:** `/login`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/backend/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/scrob)
