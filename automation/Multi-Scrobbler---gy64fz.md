# Deploy Multi-Scrobbler on Railway

Scrobble music from multiple sources to multiple clients

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/gy64fz)

## About

Multi-Scrobbler is a platform-independent application that monitors your music listening activity from multiple sources and scrobbles it anywhere. It supports a vast array of sources (including Spotify, Plex, Jellyfin, YouTube Music, Apple Music, and Subsonic-compatible servers like Navidrome) and clients (such as Last.fm, ListenBrainz, Maloja, and Discord "Now Playing"), featuring a mobile-friendly web dashboard for real-time monitoring, scrobble audits, and logs.

* [Website](https://docs.multi-scrobbler.app/)
* [GitHub](https://github.com/FoxxMD/multi-scrobbler)

This template deploys Multi-Scrobbler (`foxxmd/multi-scrobbler:latest`) with a persistent volume mounted at `/config` to store configuration files, authentication tokens, logs, and internal databases securely across container restarts.

### Deployment Tips & Configuration

- **Configuration:** Multi-Scrobbler can be configured using environment variables directly in Railway, or via a config file stored inside the persistent `/config` volume. 
- **Authentication & Callbacks:** On first startup, if you are connecting services like Spotify or Last.fm that require OAuth authorization, visit the Multi-Scrobbler web dashboard to complete the authentication callbacks.
- **Security & Public Access:** Because the web dashboard exposes your playback history, logs, and sensitive client configurations, consider toggling off **Public Networking** in your Railway service settings after completing your initial setup and OAuth callbacks so it runs purely as a private background worker.
- **Backups:** You can protect your configuration, auth tokens, and local logs using [Railway's native Volume Backups](https://docs.railway.com/reference/volumes#backups) to snapshot the `/config` volume.
- **Advanced Configuration:** A complete list of supported environment variables and source/client integration guides can be found in the [Multi-Scrobbler Documentation](https://docs.multi-scrobbler.app/).

*Note: This is a community-made template and therefore not officially supported by the Multi-Scrobbler team. Please direct template-specific help requests to the [Railway thread for the template](https://station.railway.com/templates/multi-scrobbler-9ae6b4f2).*

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Multi-Scrobbler | `foxxmd/multi-scrobbler` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 9078 | Port the Multi-Scrobbler web UI and server listen on inside the container |
| `BASE_URL` | - | The public service or customer domain |
| `CONFIG_DIR` | /config | Directory path where configuration files, tokens, and databases are stored |

## Configuration

- **Healthcheck:** `/api/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Automation

[View on Railway →](https://railway.com/deploy/gy64fz)
