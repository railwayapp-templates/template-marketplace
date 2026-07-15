# Deploy OpenVideo Editor on Railway

Online react video editor using remotion. Capcut and canva clone.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openvideo-editor)

## About

OpenVideo Editor is a lightweight, browser-based video editor built with Next.js and the OpenVideo engine. It provides professional editing capabilities including multi-track timelines, real-time canvas editing, effects, transitions, asset management, and client-side video exporting using modern browser APIs. It is designed both as a production-ready web editor and a starter kit for developers building custom video editing SaaS applications.

Hosting OpenVideo Editor on Railway allows you to deploy a modern Next.js application without managing servers or infrastructure. Railway automatically builds the application directly from your repository, provisions HTTPS, and exposes it through secure public networking. The editor performs rendering, playback, and exporting inside the user's browser using WebCodecs and PixiJS, reducing server-side processing requirements. Railway also provides a centralized interface for configuring environment variables used by external integrations such as Cloudflare R2, Deepgram, and Pexels. Automatic deployments, scalable infrastructure, and simplified configuration make Railway an excellent platform for hosting OpenVideo Editor in development, staging, or production environments.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| react-video-editor | [iqbalexperience/react-video-editor](https://github.com/iqbalexperience/react-video-editor) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEEPGRAM_URL` | https://api.deepgram.com/v1 | - |
| `DEEPGRAM_MODEL` | nova-2 | - |
| `PEXELS_API_KEY` | (secret) | https://www.pexels.com/api/key |
| `DEEPGRAM_API_KEY` | (secret) | https://console.deepgram.com/ |
| `R2_SECRET_ACCESS_KEY` | (secret) | https://developers.cloudflare.com/r2/ |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** TypeScript, CSS, JavaScript

[View on Railway →](https://railway.com/deploy/openvideo-editor)
