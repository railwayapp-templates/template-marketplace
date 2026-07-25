# Deploy Cobalt Self-Hosted — Fix YouTube Downloads on Railway on Railway

Self-host Cobalt: YouTube, TikTok & 20+ platforms. No ads. No tracking.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cobalt-youtube-downloader)

## About

![Cobalt open-source media downloader](https://res.cloudinary.com/dh2nt6hgh/image/upload/v1759035050/cobalt_tools_search_bar_i8jd6a.png)

Cobalt is the open-source, ad-free media downloader with **39.7k+ GitHub stars** — paste a URL from YouTube, TikTok, Instagram, Twitter/X, Reddit, SoundCloud, Vimeo, or 20+ other platforms and receive a direct download link with no ads, no tracking, no paywalls, and no files ever cached on the server.

The public cobalt.tools instance **no longer works for YouTube** — it was blocked by YouTube's anti-downloader measures and remains blocked as of 2026. A self-hosted Railway instance bypasses this entirely. If you need YouTube downloads in 2026, self-hosting is the solution.

---

Cobalt is a privacy-first downloader by design — no logs, no caches, no user accounts. The server processes each request independently and proxies the resolved stream directly to the client. Self-hosting normally means setting up Docker, CORS headers, SSL, and port configuration by hand.

Railway deploys Cobalt as a managed HTTPS container with zero server administration. Your instance runs on your own Railway domain — independent of the public cobalt.tools instance and unaffected by platform-level blocks on shared instances.

Typical cost: **~$2–5/month** on Railway's Hobby plan. Ad-supported sites like y2mate and 9convert are free but serve malware-adjacent ads and log your requests. A personal Cobalt instance is cleaner, faster, and fully private.

---

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cobalt | `ghcr.io/imputnet/cobalt:latest` | Worker |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9000 |
| `API_KEY` | (secret) |
| `API_NAME` | railway-1 |
| `API_PORT` | 9000 |
| `API_LISTEN_ADDRESS` | 0.0.0.0 |

**Category:** Automation

[View on Railway →](https://railway.com/deploy/cobalt-youtube-downloader)
