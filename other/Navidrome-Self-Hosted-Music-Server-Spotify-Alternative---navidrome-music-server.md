# Deploy Navidrome — Self-Hosted Music Server & Spotify Alternative on Railway

Self-host Navidrome — stream your own music, FLAC, any device

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/navidrome-music-server)

## About

Navidrome is a lightweight, open-source music server — your own private Spotify, streaming your personal music collection to any device. It's built on the mature Subsonic API, so dozens of polished mobile and desktop clients work with it out of the box, and it streams FLAC and every common format with a fast, responsive web player. At roughly 50 MB of RAM it's remarkably light, making it an ideal always-on personal music server on Railway — stream the music you own, from anywhere, with no subscription and no algorithm.

---

Navidrome is an excellent fit for Railway — the one thing to plan for is how your music library gets onto the volume, and how big it is.

**Your music lives on the Railway volume — size it to a curated library.** Navidrome streams files stored at `/data/music` on the persistent volume. This is the key planning point: Railway volume storage is priced for application data, so this template is ideal for a modest, curated collection — your favorite albums, a few gigabytes — streamed privately from anywhere. For a very large library (hundreds of gigabytes of FLAC), a home server or NAS with cheap bulk storage is more economical; Railway shines for an always-on, remotely accessible core collection.

**Getting music onto the volume.** Unlike a home server where you copy files into a folder, on Railway you add music to the `/data/music` volume through your deployment's file access. Plan to upload a focused library rather than sync a massive collection; Navidrome scans it automatically on the `ND_SCANSCHEDULE` schedule (hourly by default).

**Works with every Subsonic client — that's the ecosystem win.** Because Navidrome implements the Subsonic/OpenSubsonic API, you're not locked into one app: point any Subsonic client — Symfonium, play:Sub, DSub, Amperfy, Feishin, and many more — at your Railway URL with your username and password, and stream. This mature client ecosystem is a major reason to choose Navidrome over heavier media servers.

**FLAC and lossless stream great — no GPU needed.** Audio streaming is light on CPU, so FLAC and other lossless formats play smoothly on Railway without the hardware-transcoding concerns that affect video servers. Navidrome can transcode down for bandwidth-limited connections if you set an output bitrate.

**Your data persists; create the admin on first visit.** The database, playlists, ratings, and play counts persist on the `/data` volume, and the first account you create through the web UI becomes the administrator. Open your Railway URL, create that account, and add users as needed — each with their own playlists and favorites.

Typical cost: **~$5/month** on Railway for Navidrome's tiny footprint, plus volume storage scaling with your library size. Navidrome is GPL-3.0, fully free, with no paid tiers or telemetry.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Navidrome | `deluan/navidrome:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 4533 |
| `ND_LOGLEVEL` | info |
| `ND_MUSICFOLDER` | /data/music |
| `ND_SCANSCHEDULE` | 1h |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Other

[View on Railway →](https://railway.com/deploy/navidrome-music-server)
