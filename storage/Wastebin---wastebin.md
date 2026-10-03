# Deploy Wastebin on Railway

Tiny Rust pastebin — encrypted, burn-after-reading, expirations, QR

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/wastebin)

## About

Wastebin Lite is a single container. Railway's reverse proxy terminates TLS at the edge and forwards plain HTTP to the container on port 8088; the external healthcheck targets `/`. The root wrapper exists solely to make the Railway volume mount writable by the Wastebin process — the binary itself is unchanged from the upstream `quxfoo/wastebin:3.7.1` image.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| wastebin-lite | [mc9max/wastebin-lite](https://github.com/mc9max/wastebin-lite) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `WASTEBIN_THEME` | catppuccin | Default UI theme. One of: ayu, base16ocean, catppuccin, coldark, gruvbox, monokai, onehalf, rosepine, solarized. |
| `WASTEBIN_TITLE` | Wastebin Lite | Site title shown in the browser tab and headers. |
| `WASTEBIN_BASE_URL` | - | Full public base URL used for paste links shown in the UI (https://your-domain). Auto-filled from the public domain. |
| `WASTEBIN_SIGNING_KEY` | - | Key for signing delete/owner tokens (must be >= 64 bytes — the server refuses to start otherwise). Auto-generated on first deploy; do not change on existing installs or owner tokens stop working. |
| `WASTEBIN_MAX_BODY_SIZE` | 1048576 | Maximum paste size in bytes (default 1 MiB). Raise for long logs, e.g. 5242880 for 5 MiB. |
| `WASTEBIN_PASSWORD_SALT` | (secret) | Random salt used for encrypting password-protected pastes (argon2). Auto-generated on first deploy. |
| `WASTEBIN_PASTE_EXPIRATIONS` | 0,10m,1h,1d,1M,1y | Expiry options offered in the UI, comma-separated. '0' means no-expiry; durations: 10m, 1h, 1d, 1M, 1y. |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** Storage · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/wastebin)
