# Deploy Autobrr on Railway

Modern, easy to use download automation for torrents and usenet

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/autobrr)

## About

Autobrr is a modern, easy-to-use download automation tool for torrents and Usenet. It monitors IRC announce channels and RSS feeds, applies powerful filters, and pushes matching releases to your download clients (qBittorrent, Deluge, rTorrent, Transmission, SABnzbd, and more).

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/new/template/autobrr)

Hosting Autobrr on Railway runs a single container using the official image `ghcr.io/autobrr/autobrr:v1.87.0`. Configuration and database live on a persistent volume at `/config`. The web UI listens on port 7474 and is exposed through Railway’s public HTTPS domain. `RAILWAY_RUN_UID=0` is set so the process can write to the Railway volume without permission issues.

After the first deploy, open the public URL, create your admin account, then add indexers, filters, and download clients.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Autobrr | `ghcr.io/autobrr/autobrr:v1.87.0` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 7474 | Port the server listens on. |
| `DOMAIN` | - | Public domain where service is accessible. Railway automatically provides this domain. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/config`

**Category:** Storage

[View on Railway →](https://railway.com/deploy/autobrr)
