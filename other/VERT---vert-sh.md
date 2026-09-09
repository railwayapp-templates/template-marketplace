# Deploy VERT on Railway

File converter, image converter, video converter, self-hosted on Railway

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/vert-sh)

## About

VERT is an open-source file converter that does the work in your browser instead of on a server. Images, audio and documents are converted by WebAssembly builds of ImageMagick, FFmpeg and Pandoc inside the tab, so the file never leaves the machine that opened the page — no queue, no upload wait, no third party holding your data. It covers more than 250 formats and looks like a product rather than an ad-funded conversion site. Video is the exception: transcoding a movie in WebAssembly is painfully slow, so VERT hands video to `vertd`, a small Rust service driving a real FFmpeg binary.

Deploy VERT on Railway and you get both halves wired together. The `vert` service builds the interface and serves it with nginx; the `vertd` service runs the FFmpeg daemon on the private network with a volume for files in flight. The web service also proxies `/api/*` to the daemon, so everything lives on one domain and the daemon is never exposed to the internet. To self-host VERT anywhere else you would rebuild the frontend to point at your own daemon, because its address is compiled into the bundle — this template does that rewrite from the domain Railway gives you.

![Diagram of the VERT and vertd services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1788820082/vert-architecture.png)

Most online file converters are the same trade: you hand a stranger your document and hope it is deleted afterwards. VERT removes that trade for everything except video. A team self-hosts it to give staff a converter that keeps files inside the organisation, or to put a fast, ad-free one on an intranet.

Key features:

- Over 250 formats across images, audio, documents and video
- Local conversion for images (ImageMagick), audio (FFmpeg) and documents (Pandoc)
- Batch conversion with per-file targets and a zip download
- Quality, sample-rate and metadata controls per category
- Server-side video conversion through your own FFmpeg daemon

The template deploys two services. `vert` is nginx serving the compiled interface, the only service with a public domain, and it proxies the conversion API. `vertd` accepts an upload, transcodes it, streams progress over a WebSocket and deletes the result once downloaded; its volume holds files only while a job is in flight.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| vertd | [gridalpha/vert-railway](https://github.com/gridalpha/vert-railway) | Database |
| vert | [gridalpha/vert-railway](https://github.com/gridalpha/vert-railway) | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | vertd | 24153 | HTTP and WebSocket port |
| `PUBLIC_URL` | vertd | - | Optional daemon URL used in webhook messages |
| `WEBHOOK_URL` | vertd | - | Optional Discord webhook for kept files |
| `WEBHOOK_PINGS` | vertd | - | Optional mention string for that webhook |
| `ADMIN_PASSWORD` | vertd | (secret) | Optional admin download token, blank disables |
| `VERTD_DATA_DIR` | vertd | /data | Working directory, matches the volume |
| `VERTD_FORCE_GPU` | vertd | cpu | Software encoding; Railway has no GPU |
| `PORT` | vert | 8080 | nginx listening port |
| `UPLOAD_RATE` | vert | 30r/m | Per-client upload rate limit |
| `VERT_PASSWORD` | vert | (secret) | Optional basic-auth password, blank disables |
| `VERT_USERNAME` | vert | (secret) | Optional basic-auth user, blank disables |
| `VERTD_UPSTREAM` | vert | - | Private address of the video daemon |
| `MAX_UPLOAD_SIZE` | vert | 512M | Largest video accepted per upload |
| `VERT_PUBLIC_URL` | vert | - | Override origin; set for a custom domain |
| `PUB_PLAUSIBLE_URL` | vert | - | Optional Plausible instance, rebuilds image |

## Configuration

- **Healthcheck:** `/api/version`
- **Volume:** `/data`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/vert-sh)
