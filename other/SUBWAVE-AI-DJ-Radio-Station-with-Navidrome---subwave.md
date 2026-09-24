# Deploy SUB/WAVE | AI DJ Radio Station with Navidrome on Railway

Internet radio with an AI DJ that picks and talks, fed by your music

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/subwave)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/subwave?utm_medium=integration&utm_source=button&utm_campaign=subwave)

[SUB/WAVE](https://github.com/perminder-klair/subwave) is a personal internet radio station with an AI DJ. There is one Icecast stream and every listener hears the same thing at the same time. The DJ picks tracks from your own music library, talks between them (station idents, time checks, weather, intros), and takes song requests in plain language. It is radio, not a playlist: no skip button, no per-listener shuffle.

Two services, each with its own volume, talking over Railway's private network:

- **SUBWAVE** runs the official all-in-one image: Icecast, Liquidsoap, the DJ controller, the Next.js player and admin, and Caddy in front, on one domain. Settings, the library database, jingles and archives live on the volume at `/var/sub-wave`.
- **Navidrome** is the music library the DJ plays from, with a drag-and-drop upload panel (Filebrowser) on a second domain. Upload music there and Navidrome imports it within seconds.

The station is already wired to Navidrome when it boots: the Navidrome admin user and its password are generated at deploy and handed to SUBWAVE, so there are no credentials to copy. The admin password for the station is generated too.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Navidrome | [nomideusz/navidrome-railway](https://github.com/nomideusz/navidrome-railway) (root: /) | Web service |
| SUBWAVE | [nomideusz/subwave-railway](https://github.com/nomideusz/subwave-railway) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | Navidrome | 4533 | Port Navidrome listens on - leave as is |
| `ND_ADDRESS` | Navidrome | [::] | Listen on IPv4 and IPv6 so the station reaches it over the private network |
| `FILEBROWSER_PASSWORD` | Navidrome | (secret) | Password for the music upload panel (user: admin), set on first boot |
| `ND_DEVAUTOCREATEADMINPASSWORD` | Navidrome | (secret) | Password of the Navidrome 'admin' user, created on first boot |
| `PORT` | SUBWAVE | 80 | Port the built-in Caddy listens on - leave as is |
| `SITE_URL` | SUBWAVE | - | Public URL, used for share cards, canonical links and the sitemap |
| `ADMIN_PASS` | SUBWAVE | - | Password for /admin, generated at deploy |
| `ADMIN_USER` | SUBWAVE | (secret) | Username for /admin |
| `NAVIDROME_URL` | SUBWAVE | - | Music library (Subsonic API) over the private network |
| `NAVIDROME_PASS` | SUBWAVE | - | Navidrome password - taken from the Navidrome service |
| `NAVIDROME_USER` | SUBWAVE | (secret) | Navidrome user the DJ reads the library as |

## Configuration

- **Healthcheck:** `/ping`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/sub-wave`

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/subwave)
