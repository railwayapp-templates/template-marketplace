# Deploy M3U-addon on Railway

Your M3U/IPTV playlist in Stremio with automatic IMDb ID via TMDB.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/m3u-addon)

## About

A Stremio addon that loads your personal M3U/IPTV playlist and automatically resolves IMDb IDs via TMDB. No code needed — just deploy, open the URL, fill a form, and install in Stremio.

This addon runs as a lightweight Node.js Express server. Each user gets a unique private install URL generated from their own M3U playlist URL and TMDB API key — no shared configuration, no database needed. The server caches each user's playlist in memory for 6 hours and prefetches IMDb IDs in the background on startup so content appears integrated with Stremio's global catalog.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| addon-m3u_friendly | [Esmequiinn/addon-m3u_friendly](https://github.com/Esmequiinn/addon-m3u_friendly) | Worker |

**Category:** Other · **Languages:** JavaScript, HTML

[View on Railway →](https://railway.com/deploy/m3u-addon)
