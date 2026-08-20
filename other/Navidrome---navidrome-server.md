# Deploy Navidrome on Railway

Music server that streams your own audio files to any device

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/navidrome-server)

## About

Navidrome is a self-hosted music server for the collection you already own. Point it at a folder of audio files and it reads their tags, builds a browsable library of artists, albums and playlists, and streams them to a fast web player and to dozens of Subsonic-compatible phone and desktop apps. It is a single Go binary with an embedded SQLite database, handles very large libraries, and runs on hardware as small as a Raspberry Pi.

Deploy Navidrome on Railway in one click, with the pieces that make a public instance safe already wired up. Two services run: **navidrome**, the music server, holding its database, caches, backups and music on a persistent volume; and **proxy**, a small Caddy service that owns the public URL, normalises client-IP headers so the login rate limiter works, and adds a Strict-Transport-Security header. Only the proxy is exposed — the music server has no public domain and is reachable solely over the private network. An administrator is created from your variables on first boot, so nobody who finds the URL first can claim the instance.

![Diagram of the Navidrome and Caddy proxy services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787138631/navidrome-architecture.png)

Navidrome solves a specific problem: you own music — purchased downloads, ripped CDs, Bandcamp buys — and want it on every device without handing the files to a streaming company. It indexes the tags already in your files, so the library mirrors how you organised things, and serves it through both its web interface and the Subsonic API, so mature client apps work on day one.

Key features:

- Reads virtually any audio format, with on-the-fly transcoding when a client needs it
- Multi-user, with per-user play counts, favourites and playlists
- Smart playlists defined by rules, plus imported M3U playlists
- Scrobbling to Last.fm, ListenBrainz and Maloja
- Public share links for albums, songs or playlists
- Automatic library watching, plus scheduled rescans
- A themeable, responsive web player in dozens of languages

The **navidrome** service owns a volume at `/data` holding the SQLite database, the artwork and transcoding caches, scheduled backups and the music files. The **proxy** service is a Caddy instance holding the public domain and forwarding over the private network — see the FAQ for why it is there.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| proxy | [gridalpha/navidrome-railway](https://github.com/gridalpha/navidrome-railway) (root: proxy) | Web service |
| navidrome | [gridalpha/navidrome-railway](https://github.com/gridalpha/navidrome-railway) (root: navidrome) | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | proxy | 8080 | Public listening port for Caddy |
| `NAVIDROME_UPSTREAM` | proxy | - | Private address of the music server |
| `PORT` | navidrome | 4533 | HTTP port the music server listens on |
| `ND_BACKUP_COUNT` | navidrome | 7 | Backups retained on the volume |
| `ND_BACKUP_SCHEDULE` | navidrome | @daily | Database backup schedule |
| `ND_SCANNER_SCHEDULE` | navidrome | @every 1h | Periodic library rescan |
| `NAVIDROME_DEMO_MUSIC` | navidrome | true | Seed sample tracks while library is empty |
| `NAVIDROME_ADMIN_PASSWORD` | navidrome | (secret) | Password for that administrator |
| `NAVIDROME_ADMIN_USERNAME` | navidrome | (secret) | First administrator created on boot |
| `ND_PASSWORDENCRYPTIONKEY` | navidrome | (secret) | Encrypts stored credentials, never rotate |
| `ND_ENABLEINSIGHTSCOLLECTOR` | navidrome | true | Anonymous upstream usage report |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/navidrome-server)
