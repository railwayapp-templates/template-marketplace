# Deploy OpenSEO on Railway

Pay-as-you-go Semrush and Ahrefs alternative with MCP

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/deploy-openseo-seo-tool-on-railway)

## About

This template deploys OpenSEO v0.1.13 behind a password gateway, with the app itself off the public internet and data on a Railway volume. Bring your own DataForSEO key and pay per request. For indie SEOs done with pricey suites but still needing rank tracking, backlinks, and AI visibility.

This template runs OpenSEO v0.1.13 behind a password-protected Caddy gateway. Your keyword research, rank tracking, backlinks, and site audit data stay on your Railway volume, not in a vendor's cloud. You bring a DataForSEO API key and pay only for the lookups you make.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenSEO | `ghcr.io/every-app/open-seo:v0.1.13@sha256:314ac3e08ee92a6b946d203d05421396918f66786678a030fbc62a64b877b8e8` | Database |
| Gateway | `caddy:2.11.7-alpine@sha256:d8542f48d34a9cf4e4c11a478865229840e87e4c96ea3f439101f31a5d35f75f` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | OpenSEO | 3001 | Port OpenSEO listens on inside the private network. |
| `AUTH_MODE` | OpenSEO | local_noauth | Self-host auth mode. local_noauth is safe here because this service has no public domain; the Gateway enforces the login. |
| `ALLOWED_HOST` | OpenSEO | .railway.app | Host allow-list for the app server; .railway.app covers your Railway domain and Railway's healthcheck. |
| `BETTER_AUTH_SECRET` | OpenSEO | (secret) | Generated secret that encrypts stored Google OAuth tokens (Search Console/Analytics). |
| `DATAFORSEO_API_KEY` | OpenSEO | (secret) | Optional. Base64 of your DataForSEO login:API password; add it to enable keyword and SERP data. |
| `VITE_SHOW_DEVTOOLS` | OpenSEO | false | Keeps the developer toolbar hidden in production. |
| `CLOUDFLARE_INCLUDE_PROCESS_ENV` | OpenSEO | true | Passes Railway variables into the Cloudflare Workers runtime that OpenSEO runs on. |
| `PORT` | Gateway | 8080 | Port the Caddy login gateway listens on; the public domain targets it. |
| `CADDYFILE_B64` | Gateway | ewoJYWRtaW4gb2ZmCglhdXRvX2h0dHBzIG9mZgoJcGVyc2lzdF9jb25maWcgb2ZmCglzZXJ2ZXJzIHsKCQl0cnVzdGVkX3Byb3hpZXMgc3RhdGljIDAuMC4wLjAvMCA6Oi8wCgl9Cn0KCjp7JFBPUlR9IHsKCSMgR2F0ZXdheSBsaXZlbmVzcyAobm8gYXV0aCkuIFJhaWx3YXkgaGVhbHRoY2hlY2sgZm9yIHRoaXMgc2VydmljZS4KCWhhbmRsZSAvaGVhbHRoeiB7CgkJcmVzcG9uZCAib2siIDIwMAoJfQoKCSMgT3BlblNFTydzIG93biBzZXR1cC9oZWFsdGggcmVwb3J0IChubyBhdXRoLCBubyBzZWNyZXQgdmFsdWVzKS4KCWhhbmRsZSAvYXBpL2hlYWx0aCB7CgkJcmV2ZXJzZV9wcm94eSB7JE9QRU5TRU9fVVBTVFJFQU19Cgl9CgoJIyBFdmVyeXRoaW5nIGVsc2UgKFVJLCBzZXJ2ZXIgZnVuY3Rpb25zLCAvbWNwLCAvYWdlbnRzIHdlYnNvY2tldHMpIG5lZWRzIHRoZSBsb2dpbi4KCWhhbmRsZSB7CgkJYmFzaWNfYXV0aCB7CgkJCXskT1BFTlNFT19VU0VSTkFNRX0geyRPUEVOU0VPX1BBU1NXT1JEX0hBU0h9CgkJfQoJCXJldmVyc2VfcHJveHkgeyRPUEVOU0VPX1VQU1RSRUFNfSB7CgkJCWZsdXNoX2ludGVydmFsIC0xCgkJfQoJfQoKCSMgU2hvd24gd2hpbGUgT3BlblNFTyBpcyAocmUpYnVpbGRpbmcgYWZ0ZXIgYSBkZXBsb3kgKH4xLTIgbWluKS4KCWhhbmRsZV9lcnJvcnMgNTAyIDUwMyA1MDQgewoJCXJlc3BvbmQgIk9wZW5TRU8gaXMgc3RhcnRpbmcuIFRoZSBmaXJzdCBib290IGJ1aWxkcyB0aGUgYXBwLCB3aGljaCB0YWtlcyBhYm91dCAyIG1pbnV0ZXMuIFJlZnJlc2ggc2hvcnRseS4iIDUwMwoJfQp9Cg== | Caddy config as one base64 line, decoded at boot: open health endpoints, password-protected everything else, startup page. |
| `OPENSEO_PASSWORD` | Gateway | (secret) | Generated login password for OpenSEO. Copy it from this tab to sign in. |
| `OPENSEO_UPSTREAM` | Gateway | - | Private address of the OpenSEO service that the gateway forwards to. |
| `OPENSEO_USERNAME` | Gateway | (secret) | Username for the OpenSEO login prompt. |

## Configuration

- **Healthcheck:** `/api/health`
- **Volume:** `/app/.wrangler`
- **Start command:** `sh -c 'export OPENSEO_PASSWORD_HASH="$(caddy hash-password --plaintext "$OPENSEO_PASSWORD")" && printf %s "$CADDYFILE_B64" | base64 -d > /etc/caddy/Caddyfile && exec caddy run --config /etc/caddy/Caddyfile --adapter caddyfile'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS

**Category:** Analytics

[View on Railway →](https://railway.com/deploy/deploy-openseo-seo-tool-on-railway)
