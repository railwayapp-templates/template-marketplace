# Deploy Cobalt Tools [Updated May ’26] on Railway

Cobalt Tools [May ’26] (Media Downloader, Converter & Automation) Self Host

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cobalt)

## About

Cobalt Tools is a versatile, open-source software available on [Cobalt Tools GitHub](https://github.com/), designed to provide users with a wide range of utilities like file handling, media conversion, and productivity enhancements. It’s especially popular for its lightweight approach, customization options, and ability to run without vendor lock-in. With Cobalt Tools, users gain complete control over their environment, supported by an active developer community across GitHub and Reddit.

Self-hosting Cobalt Tools ensures you maintain full control over your data, configurations, and usage without restrictions often imposed by hosted solutions. By hosting Cobalt Tools on Railway, you benefit from seamless deployment, automatic scaling, and managed infrastructure, without needing advanced system administration skills. Railway makes it possible to launch Cobalt Tools with just a few clicks.

When self-hosted, Cobalt Tools can be integrated into workflows such as file management, media processing (including Cobalt MP3 features), and API-driven tasks. You decide how it’s used, removing any limitations imposed by third-party hosting providers.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cobalt | `ghcr.io/imputnet/cobalt:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 9000 |
| `API_KEY` | (secret) |
| `API_NAME` | railway-1 |
| `API_PORT` | 9000 |
| `API_LISTEN_ADDRESS` | 0.0.0.0 |

## Configuration

- **Healthcheck:** `/api/serverInfo`
- **Networking:** Public domain with automatic HTTPS

**Category:** Bots

[View on Railway →](https://railway.com/deploy/cobalt)
