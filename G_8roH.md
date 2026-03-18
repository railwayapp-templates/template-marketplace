# Deploy Nitropage on Railway

A self-hosted visual website builder and CMS.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/G_8roH)

## About

Nitropage is an entirely free and open source, extensible visual website builder based on SolidStart, offering a growing library of versatile building blocks.

Features:

- Page revisions
- Element presets
- Reusable layouts
- Focal point image cropping
- Self and CDN hosted fonts
- Atom (RSS) feeds
- Support for multiple projects

Learn more at:<br>
https://nitropage.org

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Nitropage | `nitropage/nitropage:sqlite` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `DATABASE_URL` | file:../.data/dev.db |
| `NP_AUTH_PASSWORD` | (secret) |

## Configuration

- **Healthcheck:** `/admin`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/app/.data`

**Category:** CMS

[View on Railway →](https://railway.com/template/G_8roH)
