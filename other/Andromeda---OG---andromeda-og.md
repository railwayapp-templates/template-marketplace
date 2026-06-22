# Deploy Andromeda - OG on Railway

A minimal Open Graph data preview

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/andromeda-og)

## About

Andromeda - OG is a self-hosted Open Graph tag inspector written in Go. Paste any URL and it fetches the page, parses its Open Graph and meta tags, and renders a preview of how the link appears when shared. Templates and static assets are embedded in the binary.

Hosting Andromeda - OG means running a single, stateless Go binary that serves a search form and inspects URLs on demand over HTTP. There is no database and nothing to persist, so deployment requires only the bind host and port. The binary embeds all templates and static assets, and the image is built from the included Dockerfile. On Railway, the build produces the container, the service listens on the configured port, and no volume or external service is needed. The host needs outbound network access to fetch inspected URLs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| og | `ghcr.io/stevedylandev/andromeda/og` | Web service |

## Configuration

- **Networking:** Public domain with automatic HTTPS

**Category:** Other

[View on Railway →](https://railway.com/deploy/andromeda-og)
