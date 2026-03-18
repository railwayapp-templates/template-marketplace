# Deploy Fusion on Railway

A lightweight, self-hosted friendly RSS aggregator and reader

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/XSPFK0)

## About

# [Fusion](https://github.com/0x2E/fusion)

A lightweight RSS feed aggregator and reader.

![screenshot light](https://raw.githubusercontent.com/0x2E/fusion/refs/heads/main/assets/screenshot-light.png)

![screenshot dark](https://raw.githubusercontent.com/0x2E/fusion/refs/heads/main/assets/screenshot-dark.png)

Key features include:

- Group, Bookmark, Search, Sniff feeds automatically
- Import/Export OPML file
- Support RSS, Atom, JSON types feed
- Responsive, Light/Dark mode, PWA
- Lightweight, Self-hosted friendly
  - Built with Golang and SQLite, Deploy with a single binary
  - Pre-built Docker image
  - Uses about 80MB of memory

## Deployment

1. Just click the button!
2. Copy the `PASSWORD` variable after the service has been deployed
3. Go to your service's URL
4. Enter the password
5. Enjoy!

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Fusion | `rook1e404/fusion:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PASSWORD` | (secret) | Password to access Fusion |

## Configuration

- **Healthcheck:** `/`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Blogs

[View on Railway →](https://railway.com/template/XSPFK0)
