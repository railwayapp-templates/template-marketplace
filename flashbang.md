# Deploy flashbang on Railway

Instant duckduckgo style bang redirects - 14,000+ shortcuts in ~1ms

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/flashbang)

## About

Flashbang turns your browser's address bar into a shortcut launcher with over 14,000 bangs. Type `!g kittens` for Google, `!w dogs` for Wikipedia — a Service Worker handles redirects in ~1ms before your browser even renders a page. No tracking, no analytics, fully self-hostable.

Deploying flashbang on Railway is straightforward — Railway auto-detects the Dockerfile and builds everything automatically. The multi-stage Docker build fetches the latest bang definitions from DuckDuckGo and Kagi, compiles static assets with Bun, and produces a minimal runtime image. Static assets are pre-compressed with Brotli at build time for optimal performance. The `PORT` environment variable is set by Railway automatically. Once deployed, add your Railway URL as a custom search engine in your browser (`https://your-app.up.railway.app?q=%s`) and optionally enable search suggestions (`https://your-app.up.railway.app/suggest?q=%s`). Core redirects run entirely in the browser via the Service Worker — the server handles search suggestions and OpenSearch discovery.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| flashbang | [ph1losof/flashbang](https://github.com/ph1losof/flashbang) | Worker |

**Category:** Other · **Languages:** TypeScript, HTML, Dockerfile

[View on Railway →](https://railway.com/template/flashbang)
