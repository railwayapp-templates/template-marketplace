# Deploy Tinykit on Railway

Self-hosted Lovable/v0 alternative. Real-time database & storage included.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/tinykit)

## About

Tinykit is an open-source, agentic app builder that allows you to prompt, tweak, and deploy web apps instantly. Think of it as a self-hosted alternative to Replit, Lovable, or v0. It combines a natural language interface with a high-density runtime, allowing you to host 100+ small real-time apps on a single Railway service.

![screenshot](https://mintcdn.com/tinykit/Tf0C1lubauRtpCSg/images/screenshot-kanban.png?w=1650&fit=max&auto=format&n=Tf0C1lubauRtpCSg&q=85&s=eddd86a0639cdd2440c79019d8e9fba2)

Hosting Tinykit on Railway gives you a private, permanent home for your AI-generated apps. The system runs as a self-contained service powered by **PocketBase**, meaning it includes its own database, real-time subscriptions, authentication, and file storage out of the box.

Because it is architected for density, it is extremely lightweight. You can run dozens of distinct applications on a single service without needing separate containers for each one. All generated code and data are stored on a persistent volume, ensuring you own your data, files, and code completely.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| tinykit | [tinykit-studio/tinykit](https://github.com/tinykit-studio/tinykit) | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/pocketbase/pb_data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/tinykit)
