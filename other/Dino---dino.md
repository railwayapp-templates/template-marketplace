# Deploy Dino on Railway

A quiet page of important news, with a pixel dinosaur for company

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dino)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/dino?utm_medium=integration&utm_source=button&utm_campaign=dino)

[Dino](https://github.com/nomideusz/dino) is a quiet page of important news. No feed, no ads, no sign-in, no infinite scroll — a few times a day, a story that actually matters appears as a calm block of text, and Zaur, a tiny pixel dinosaur, walks between the stories and keeps you company.

Two small Railway services: the static frontend (a Vite app served by a dependency-free Node file server) and the archive (an editor + story archive with an SSE stream that polls a handful of quality RSS sources — BBC, Guardian, NPR, Hacker News, USGS). Your instance starts as an empty world and builds its own two-day story history on a small volume. **No database, no accounts, no required secrets.** Add an `ANTHROPIC_API_KEY` and Claude becomes the editor, choosing stories and writing calm summaries; without one, a built-in heuristic editor does the picking — dino works either way. The frontend learns its archive's URL at build time via a Docker build arg, wired automatically.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| archive | [nomideusz/dino](https://github.com/nomideusz/dino) (root: /) | Web service |
| frontend | [nomideusz/dino](https://github.com/nomideusz/dino) (root: /) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `ALLOWED_ORIGINS` | archive | - | CORS allow-list — the frontend's domain. Wired automatically, don't change. |
| `ANTHROPIC_API_KEY` | archive | (secret) | Optional. With a key, Claude reads the day's sources and writes calm summaries. Without one, a built-in heuristic editor picks the stories instead — dino works either way. |
| `ARCHIVE_PERSIST_PATH` | archive | /data/archive.json | Where the story snapshot lives on the volume, so stories survive redeploys. Don't change. |
| `VITE_ARCHIVE_URL` | frontend | - | The archive service's public URL, baked in at build time. Wired automatically, don't change. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Healthcheck:** `/`

**Category:** Other · **Languages:** TypeScript, JavaScript, HTML, Shell, CSS, Python, Vim Snippet

[View on Railway →](https://railway.com/deploy/dino)
