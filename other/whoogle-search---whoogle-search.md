# Deploy whoogle-search on Railway

Self-hosted ad-free privacy-respecting metasearch engine.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/whoogle-search)

## About

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.com/new/template/whoogle-search)

![OG Image](https://raw.githubusercontent.com/INAPP-Mobile/railway-whoogle-search/main/og-image.svg)

Whoogle Search is a self-hosted, ad-free, privacy-respecting metasearch engine that provides Google search results without ads, JavaScript, cookies, or IP address tracking. It runs as a single container service on Railway with no database dependencies required.

Whoogle Search runs as a single container on Railway with:
- Port: 5000 (automatically mapped to Railway's dynamic port)
- No persistent storage required (optional `/config` volume for settings)
- No database needed - standalone search service
- Built-in Tor support for anonymous searching (optional)

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| whoogle-search | `benbusby/whoogle-search:1.2.3` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WHOOGLE_CONFIG_ALTS` | 1 | 	Enable site alternatives |
| `WHOOGLE_CONFIG_SAFE` | 1 | 	Enable safe search |
| `WHOOGLE_CONFIG_THEME` | system | 	UI theme (light/dark/system) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/whoogle-search)
