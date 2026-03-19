# Deploy Kernel Browser on Railway

Sandboxed Chrome for browser automation, scraping, and AI agents

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/kernel-browser)

## About

# Deploy Kernel Browser on Railway

Kernel Browser provides sandboxed, ready-to-use Chrome browsers for browser automation and AI agent workloads. Deploy a full Chromium environment with CDP (Chrome DevTools Protocol) support, live GUI streaming, and session recording.

## Features

- **Chrome DevTools Protocol** — Connect Playwright, Puppeteer, or any CDP-based framework
- **Live GUI streaming** — Monitor and control the browser via WebRTC or VNC
- **Session recording** — Capture and replay browser sessions as MP4 video
- **Pre-built Docker image** — Fast deploys from GHCR, no build-time compilation
- **REST API** — Control mouse, keyboard, and screen capture programmatically

## Getting Started

1. Click **Deploy on Railway**
2. The browser container starts automatically with supervisord
3. Connect via CDP at port 9222 or use the REST API at port 10001
4. Optionally enable live view with `ENABLE_WEBRTC=true`

## Connecting via Playwright

```typescript
const browser = await chromium.connectOverCDP('ws://YOUR_RAILWAY_URL:9222');
const page = await browser.newPage();
await page.goto('https://example.com');
```

## Environment Variables

All variables are pre-configured with sensible defaults. Key ones:

- `PORT` — API server port (default: 10001)
- `RUN_AS_ROOT` — Required for Railway (default: true)
- `CHROMIUM_FLAGS` — Browser launch flags for containerized environments

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| kernel-images | [serkanhaslak/kernel-images](https://github.com/serkanhaslak/kernel-images) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 10001 | API server port. |
| `DISPLAY_NUM` | 1 | X11 display number |
| `RUN_AS_ROOT` | true | Run container as root (required on Railway) |
| `CHROMIUM_FLAGS` | --no-sandbox --no-zygote --disable-dev-shm-usage | Chromium launch flags (required for containerized env) |
| `KERNEL_IMAGES_API_PORT` | 10001 | API port (used by supervisor) |
| `KERNEL_IMAGES_API_FRAME_RATE` | 10 | Recording frame rat |
| `KERNEL_IMAGES_API_OUTPUT_DIR` | /home/kernel/recordings | Recording output directory |
| `KERNEL_IMAGES_API_MAX_SIZE_MB` | 500 | Max recording size |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/kernel`

**Category:** Automation · **Languages:** Go, Shell, TypeScript, Vue, Makefile, JavaScript, C, Dockerfile, Python, HTML, SCSS, M4

[View on Railway →](https://railway.com/deploy/kernel-browser)
