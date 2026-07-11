# Deploy whoogle-search on Railway

Whoogle Search — privacy-respecting metasearch engine without tracking.

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
| `WHOOGLE_PASS` | - | Basic auth password. Auto-generated. Set alongside WHOOGLE_USER to enable authentication. |
| `WHOOGLE_USER` | (secret) | Basic auth username. Authentication is enabled by default; leave empty to disable. |
| `WHOOGLE_CONFIG_TOR` | 0 | Route searches through Tor: 1 for enabled, 0 for disabled. |
| `WHOOGLE_CONFIG_SAFE` | 1 | Enable safe search: 1 for enabled, 0 for disabled. |
| `WHOOGLE_CONFIG_THEME` | system | UI theme: light, dark, or system. |
| `WHOOGLE_CONFIG_LANGUAGE` | en | Interface language (e.g., en, ja, es). English is the default. |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/whoogle-search)
