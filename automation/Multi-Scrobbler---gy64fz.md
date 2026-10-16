# Deploy Multi-Scrobbler on Railway

Scrobble music from multiple sources to multiple clients

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gy64fz)

## About

Multi-Scrobbler is a platform-independent application that monitors your music listening activity from multiple sources and scrobbles it anywhere. It supports nearly 30 sources (including Spotify, Plex, Jellyfin, YouTube Music, Apple Music, and Subsonic-compatible servers like Navidrome) and scrobble clients (such as Last.fm, ListenBrainz, Maloja, Koito, and Discord "Now Playing"), featuring a mobile-friendly web dashboard for real-time monitoring, scrobble audits, and logs.

* [Website](https://docs.multi-scrobbler.app/)
* [GitHub](https://github.com/FoxxMD/multi-scrobbler)

This template deploys Multi-Scrobbler (`foxxmd/multi-scrobbler:latest`) with a persistent volume mounted at `/config` to store configuration files, auth tokens, logs, and its internal SQLite database (`ms.db`) across container restarts.

### Deployment Tips & Configuration

- **Plug-and-Play Environment Variables:** The template comes pre-populated with optional environment variables for the most popular **Sources** (Spotify, Last.fm, Plex, and Jellyfin) and **Clients** (Last.fm, ListenBrainz, Maloja, and Koito). Simply fill in the credentials for the services you use during deployment and leave the rest blank. *(Note: Use `SOURCE_LASTFM_*` to pull and forward plays from your Last.fm profile, or `LASTFM_*` to scrobble plays to Last.fm.)*
- **Additional Sources & Custom Names:** To configure additional integrations (such as Subsonic/Navidrome, ListenBrainz Endpoint, YouTube Music, Apple Music, Music Assistant, or Discord) or assign custom display names via `<SOURCE>_ID` / `<CLIENT>_ID` variables, see the [Multi-Scrobbler Configuration Documentation](https://docs.multi-scrobbler.app/configuration/) and add the corresponding variables in your service's **Variables** tab.
- **OAuth Authentication & Callbacks:** Because `BASE_URL` is automatically linked to your Railway domain (`https://${{RAILWAY_PUBLIC_DOMAIN}}`), default callback URLs are configured automatically (`https://<your-domain>/callback` for Spotify and `https://<your-domain>/lastfm/callback` for Last.fm). On first startup, open the Multi-Scrobbler web dashboard and click **(Re)authenticate** on your configured cards to complete authorization.
- **Security & Disabling the Web UI (`DISABLE_WEB`):** Multi-Scrobbler's web dashboard does not have a built-in login wall and displays playback history, logs, and client status. Review the [Security Documentation](https://docs.multi-scrobbler.app/configuration/security/) for best practices. If you only use **polling-based sources** (such as Spotify, Last.fm Source, or Plex/Jellyfin API polling), you can set `DISABLE_WEB="true"` after completing your initial OAuth callbacks to shut down the internal HTTP server entirely. **Important:** Setting `DISABLE_WEB="true"` (or disabling Public Networking) disables all incoming HTTP routes, which means **Ingress Sources** (such as the ListenBrainz Endpoint, Last.fm Endpoint, WebScrobbler, and webhook integrations), OAuth callbacks, and healthcheck endpoints will be unusable while enabled.
- **Backups:** Protect your configuration, OAuth tokens, and local scrobble database using [Railway's native Volume Backups](https://docs.railway.com/reference/volumes#backups) to snapshot the `/config` volume.

*Note: This is a community-made template and therefore not officially supported by the Multi-Scrobbler team. Please direct template-specific help requests to the [Railway thread for the template](https://station.railway.com/templates/multi-scrobbler-9ae6b4f2).*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Multi-Scrobbler | `foxxmd/multi-scrobbler` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Timezone for logs and dashboard timestamps (e.g., America/Los_Angeles) |
| `PORT` | 9078 | Internal port for the Multi-Scrobbler web dashboard and API |
| `LZ_URL` | - | Optional: Custom ListenBrainz server URL (leave blank for official listenbrainz.org) |
| `LZ_USER` | (secret) | Optional: ListenBrainz Client username |
| `BASE_URL` | - | Public URL used to auto-generate OAuth callback redirect URIs |
| `LZ_TOKEN` | (secret) | Optional: ListenBrainz Client user token |
| `PLEX_URL` | - | Optional: Plex server URL (e.g., https://plex.mydomain.com:32400) |
| `KOITO_URL` | - | Optional: Koito server base URL |
| `KOITO_USER` | (secret) | Optional: Koito username |
| `MALOJA_URL` | - | Optional: Maloja server URL |
| `PLEX_TOKEN` | (secret) | Optional: Plex X-Plex-Token |
| `DISABLE_WEB` | false | Set to true to disable the web UI and HTTP server after setup (WARNING: Ingress/webhook sources will not work when enabled) |
| `KOITO_TOKEN` | (secret) | Optional: Koito API Key |
| `JELLYFIN_URL` | - | Optional: Jellyfin server URL (e.g., https://jellyfin.mydomain.com) |
| `JELLYFIN_USER` | (secret) | Optional: Jellyfin username to track |
| `LASTFM_SECRET` | (secret) | Optional: Last.fm Client Shared Secret |
| `LASTFM_API_KEY` | (secret) | Optional: Last.fm Client API Key for scrobbling TO Last.fm (Callback: https://<domain>/lastfm/callback) |
| `MALOJA_API_KEY` | (secret) | Optional: Maloja API Key |
| `JELLYFIN_APIKEY` | - | Optional: Jellyfin API Key (created under Dashboard -> API Keys) |
| `PLEX_USERS_ALLOW` | - | Optional: Comma-delimited list of Plex usernames to scrobble (defaults to token owner) |
| `SPOTIFY_CLIENT_ID` | - | Optional: Spotify Developer App Client ID (set Redirect URI to https://<domain>/callback) |
| `SOURCE_LASTFM_SECRET` | (secret) | Optional: Last.fm Source Shared Secret |
| `SOURCE_LASTFM_API_KEY` | (secret) | Optional: Last.fm Source API Key to monitor & forward your Last.fm history (Callback: https://<domain>/lastfm/callback) |
| `SPOTIFY_CLIENT_SECRET` | (secret) | Optional: Spotify Developer App Client Secret |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/gy64fz)
