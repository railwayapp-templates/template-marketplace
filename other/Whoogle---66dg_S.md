# Deploy Whoogle on Railway

Google search results without ads and tracking

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/66dg_S)

## About

Get Google search results, but without any ads, JavaScript, AMP links, cookies, or IP address tracking. Easily deployable and customizable. Quick and simple to implement as a primary search engine replacement on both desktop and mobile.

Features
No ads or sponsored content
No JavaScript*
No cookies**
No tracking/linking of your personal IP address***
No AMP links
No URL tracking tags (i.e. utm=%s)
No referrer header
Tor and HTTP/SOCKS proxy support
Autocomplete/search suggestions
POST request search and suggestion queries (when possible)
View images at full res without site redirect (currently mobile only)
Light/Dark/System theme modes (with support for custom CSS theming)
Randomly generated User Agent
Easy to install/deploy
DDG-style bang (i.e. ! ) searches
Optional location-based searching (i.e. results near )
Optional NoJS mode to view search results in a separate window with JavaScript blocked

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Whoogle | `benbusby/whoogle-search:latest` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `PORT` | 5000 |
| `WHOOGLE_USER` | (secret) |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/template/66dg_S)
