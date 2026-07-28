# Deploy IT-Tools on Railway

80+ handy online tools for developers and IT pros in one app.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/it-tools)

## About

IT-Tools is an open-source collection of 80+ handy online tools for developers and IT professionals — token generators, format converters, encoders/decoders, network utilities, and more — wrapped in a clean, fast UI that runs entirely in the browser.

Hosting IT-Tools is as simple as it gets: a single lightweight, fully stateless Docker service serving the web app on container port 80. There is no database, no volumes, no environment variables, and no accounts — every tool runs client-side in the browser, so nothing is ever stored server-side. Railway builds no code; it simply runs the pinned upstream image and exposes it through a generated domain with automatic TLS. Redeploys are instant and safe, and the service scales horizontally without any state concerns.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| it-tools | `corentinth/it-tools:2024.10.22-7ca5933@sha256:8b8128748339583ca951af03dfe02a9a4d7363f61a216226fc28030731a5a61f` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/it-tools)
