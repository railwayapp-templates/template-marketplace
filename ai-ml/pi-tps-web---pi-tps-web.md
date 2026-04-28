# Deploy pi-tps-web on Railway

A web interface to capture pi session customType exports from pi-tps.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/pi-tps-web)

## About

![pi-tps-web preview](https://raw.githubusercontent.com/monotykamary/pi-tps-web/main/public/preview.png)

pi-tps-web is a static telemetry inspector for pi's tokens-per-second (TPS) exports. Drag a `.jsonl` file straight from an LLM session into your browser — no upload, no cloud, no persistence. Everything stays local while you analyze cache behavior, routing thresholds, and conversation performance.

This is a Vite-based React/TypeScript frontend that compiles into a static `dist/` directory ready for any static host. Because all telemetry parsing, chart rendering, and session analysis runs entirely in the browser, the application requires no backend server, database, or persistent storage. Hosting involves installing Node.js dependencies, running the production build, and serving the resulting static assets — making it a perfect lightweight candidate for Railway's static deployment options.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| pi-tps-web | [monotykamary/pi-tps-web](https://github.com/monotykamary/pi-tps-web) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 5173 | Vite server port. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** TypeScript, CSS, JavaScript, HTML

[View on Railway →](https://railway.com/deploy/pi-tps-web)
