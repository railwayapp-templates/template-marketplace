# Deploy Koito on Railway

Koito is a modern, themeable ListenBrainz-compatible scrobbler

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/koito)

## About

Koito is a fast, modern, and themeable ListenBrainz-compatible music scrobbler and analytics server written in Go. Designed for self-hosters who want full ownership of their listening history and insights into their habits, Koito features automatic metadata and artwork enrichment, customizable themes, data imports from Last.fm, Spotify, ListenBrainz, and Maloja, and built-in scrobble relaying.

* [Website](https://koito.io/)
* [Documentation](https://koito.io/guides/installation/)
* [GitHub](https://github.com/gabehf/koito)

This template deploys Koito (`gabehf/koito:latest`) with an embedded SQLite database and a persistent volume mounted at `/etc/koito` to store your listening history, cached artist and album artwork, and data import folders across container restarts.

### Deployment Tips &amp; Configuration

- **Initial Admin Credentials:** On first boot, Koito creates an administrator account using `KOITO_DEFAULT_USERNAME` (default: `admin`) and `KOITO_DEFAULT_PASSWORD` (default: `changeme`). You can customize these variables on the deployment screen before first startup, or change them immediately after logging in by clicking the **Settings** icon (or pressing `\`) and opening the **Account** tab.
- **Generating Your Scrobble API Key:** After logging in, open **Settings** (`\`) and navigate to the **API Keys** tab to copy your auto-generated API token.
- **Connecting Music Servers &amp; Scrobblers:** Point any ListenBrainz-compatible application (such as Navidrome, Symfonium, Pano Scrobbler, or WebScrobbler) to `https:///apis/listenbrainz/1` and provide your Koito API key as the token.
- **Privacy &amp; Login Gate:** By default, your Koito dashboard is publicly viewable in read-only mode (`KOITO_LOGIN_GATE="false"`). Set `KOITO_LOGIN_GATE="true"` in your service variables if you want to require authentication before displaying any listening statistics.
- **Advanced Configuration:** To configure additional options such as Last.fm or Subsonic artist image fetching, ListenBrainz scrobble relaying, or forced timezones, refer to the [Koito Configuration Reference](https://koito.io/reference/configuration/) and add the desired variables in Railway's **Variables** tab.
- **Backups:** Because Koito stores its SQLite database and image cache inside `/etc/koito`, you can protect your entire instance using [Railway's native Volume Backups](https://docs.railway.com/reference/volumes#backups).

*Note: This is a community-made template and therefore not officially supported by the Koito developer. Please direct template-specific help requests to [the Railway thread for the template](https://station.railway.com/templates/koito-9c1e4099).*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Koito | `gabehf/koito:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 4110 | Port Koito listens on |
| `KOITO_LOGIN_GATE` | (secret) | Set to true to hide listening statistics from unauthenticated visitors |
| `KOITO_DEFAULT_PASSWORD` | (secret) | Initial administrator password created on first startup |
| `KOITO_DEFAULT_USERNAME` | (secret) | Initial administrator username created on first startup |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/etc/koito`

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/koito)
