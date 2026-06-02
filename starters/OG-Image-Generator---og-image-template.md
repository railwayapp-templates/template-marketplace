# Deploy OG Image Generator on Railway

Self-hosted OG Image Generation API using Node.js + Satori

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/og-image-template)

## About

---
title: OG Image Generator
description: Self-hosted OG Image Generation API using Node.js + Satori (JSX→SVG) + sharp (SVG→PNG). No Puppeteer — stays under 512MB RAM for Railway free tier.
tags:
  - nodejs
  - express
  - satori
  - sharp
  - og-image
  - serverless
---

# OG Image Generator

&gt; Generate beautiful Open Graph images on the fly. No Puppeteer, no headless browser — just pure SVG magic with Satori and sharp. Deploy on Railway free tier (512MB RAM) in one click.

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template?templateUrl=https://github.com/INAPP-Mobile/railway-og-image-template)

## Deploy and Host

### Deploy on Railway

Click the button above to deploy. No configuration needed — just deploy and go.

Or run:

```bash
git clone https://github.com/INAPP-Mobile/railway-og-image-template.git
cd railway-og-image-template
railway up
```

### About Hosting

This app runs on Node.js with Express.js as the web framework. It uses Satori for JSX→SVG rendering and sharp for SVG→PNG conversion.

### Why Deploy

Deploy this template to generate OG images for social media sharing without external dependencies or headless browsers. Perfect for:

- Blog posts with dynamic social thumbnails
- Discord bot embeds with custom images
- Twitter/Facebook link previews
- Slack message attachments

### Common Use Cases

- Generate social media cards for blog posts
- Create custom images for social sharing
- Automate OG image generation in CI/CD pipelines

### Deployment Dependencies

- **Node.js 18+**
- **npm** or **pnpm**

### Dependencies for

## Development

```bash
# Clone and install
git clone https://github.com/INAPP-Mobile/railway-og-image-template.git
cd railway-og-image-template
npm install

# Run locally
npm start

# Test it
curl "http://localhost:3000/og-image?title=Test&amp;description=Hello%20World" -o test.png
open test.png
```

## What It Does

- **Generate OG images** for social sharing (Twitter/X, Facebook, Discord, Slack)
- **Accept custom parameters** — title, description, and optional image URL
- **Return PNG** images at 1200×630px (standard OG image size)
- **Fallback gracefully** if generation takes too long or errors occur
- **Stay memory-efficient** — no Puppeteer, pure Node.js SVG rendering

## Quick Start

### Use the API

```bash
# Basic OG image
curl "https://your-app.railway.app/og-image?title=Hello%20World&amp;description=My%20first%20OG%20image" -o output.png

# With an image
curl "https://your-app.railway.app/og-image?title=Blog%20Post&amp;description=Check%20out%20this%20amazing%20content&amp;image=https://example.com/photo.jpg" -o output.png
```

### Embed in HTML

```html




```

## API Endpoints

### GET /og-image

Generate an OG image as PNG.

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `title` | No | `OG Image` | Main heading (max 60 chars) |
| `description` | No | `""` | Subtitle text (max 120 chars) |
| `image` | No | `""` | URL to embed as image on right side |

**Response:** `Content-Type: image/png` — binary PNG (1200×630px)

**Error:** `400` — JSON with `{ "error": "message" }`

### GET /health

Health check endpoint.

```bash
curl https://your-app.railway.app/health
```

**Response:**
```json
{ "status": "healthy" }
```

### GET /

Get API info.

```bash
curl https://your-app.railway.app/
```

**Response:**
```json
{
  "app": "OG Image Generator",
  "version": "1.0.0",
  "endpoints": {
    "/og-image": "GET ?title=&amp;description=&amp;image= → PNG",
    "/health": "GET → { status }"
  }
}
```

## Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `PORT` | ❌ | `3000` | Server port (auto-set by Railway) |
| `FONT_URL` | ❌ | Google Fonts (Noto Sans SC) | Custom font CSS URL |
| `TIMEOUT_MS` | ❌ | `8000` | Max generation time in ms |
| `LOG_LEVEL` | ❌ | `info` | `debug`, `info`, `warn`, `error` |

## Architecture

```
┌─────────────┐     GET /og-image?title=...&amp;desc=...&amp;image=...
│   Browser   │─────────────────────────────────────────────┐
│  / Social   │                                              ▼
│   Crawler   │   ┌──────────────────────────────────────────┐
└─────────────┘   │         Express.js (this app)             │
                   │                                          │
                   │  ┌──────────┐   ┌──────────┐             │
                   │  │  Satori  │──▶│   sharp  │             │
                   │  │ JSX→SVG  │   │ SVG→PNG  │             │
                   │  └──────────┘   └──────────┘             │
                   │                                          │
                   │  If Satori fails/times out:               │
                   │  ┌──────────┐   ┌──────────┐             │
                   │  │ Fallback │──▶│   sharp  │             │
                   │  │ SVG Gen  │   │ SVG→PNG  │             │
                   │  └──────────┘   └──────────┘             │
                   └──────────────────────────────────────────┘
                                    │
                                    ▼
                           image/png response
```

## Memory Profile

| Component | Memory |
|-----------|--------|
| Node.js runtime | ~30MB |
| Express + sharp | ~80MB |
| Satori (per request) | ~50MB (released after) |
| **Total (idle)** | **~120MB** |
| **Peak (under load)** | **~250MB** |

Well within Railway free tier (512MB limit).

## License

MIT

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| og-image-template | [INAPP-Mobile/railway-og-image-template](https://github.com/INAPP-Mobile/railway-og-image-template) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Starters · **Languages:** JavaScript

[View on Railway →](https://railway.com/deploy/og-image-template)
