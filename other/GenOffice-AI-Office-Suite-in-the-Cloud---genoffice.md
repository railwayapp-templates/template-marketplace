# Deploy GenOffice | AI Office Suite in the Cloud on Railway

AI office suite: edit Word, Excel, PowerPoint & PDF with an agent. Cloud.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/genoffice)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/genoffice?referralCode=sLjDXb&utm_medium=integration&utm_source=button&utm_campaign=genoffice)

This template runs [GenOffice](https://github.com/genspark-ai/genoffice), the open-source AI office suite from Genspark, in the cloud. It's streamed to any browser through the [linuxserver.io](https://www.linuxserver.io/) Selkies web desktop. Open your Railway domain, log in, and GenOffice is running on the server. Your documents and settings are kept between visits.

GenOffice is a free alternative to Microsoft Office. It opens and saves real `.docx`, `.xlsx` and `.pptx` files, and edits PDF, Markdown and HTML. Every document has an AI agent next to it that makes the change and shows exactly what it touched, as tracked changes and diffs with one-click rollback. It's a desktop app, so this template runs it in a GPU-less desktop session streamed over WebSockets. Access is gated by HTTP basic auth (`CUSTOM_USER` and a generated `PASSWORD`), and everything under `/config` is kept on a Railway volume.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| genoffice | [nomideusz/genoffice-railway](https://github.com/nomideusz/genoffice-railway) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TZ` | UTC | Time zone inside the desktop session. |
| `PORT` | 3000 | Port for Railway healthcheck probing. Do not change. |
| `PASSWORD` | (secret) | Login password for the desktop session. Keep it strong - this gates who can use your cloud GenOffice. |
| `CUSTOM_USER` | (secret) | Login username for the desktop session. |

## Configuration

- **Healthcheck:** `/healthcheck`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Other · **Languages:** Shell, Dockerfile, Python

[View on Railway →](https://railway.com/deploy/genoffice)
