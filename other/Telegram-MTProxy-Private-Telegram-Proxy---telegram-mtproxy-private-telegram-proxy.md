# Deploy Telegram MTProxy (Private Telegram Proxy) on Railway

Private Telegram MTProto proxy. One click, zero config, stable tg:// link

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/telegram-mtproxy-private-telegram-proxy)

## About

Telegram MTProxy is the official MTProto proxy server from Telegram. It lets you run your own private Telegram proxy so you and your users can connect to Telegram reliably from networks where it is throttled or blocked. This template deploys the official `telegrammessenger/proxy` image with a persistent secret, so your `tg://proxy` link keeps working across restarts and redeploys.

Hosting an MTProto proxy normally means renting a VPS, opening a port, generating a secret, and keeping the process alive. On Railway this template does it in one click: the proxy listens on port 443 behind a Railway TCP proxy, a 32-character hex `SECRET` is generated once and stored on a volume at `/data`, and the container auto-restarts on failure. After deploy, open the service → Settings → Networking to read your public TCP proxy host and port, then share `tg://proxy?server=&amp;port=&amp;secret=`. No SSH, no firewall rules, no config files. Typical usage runs on a few MB of RAM, so it fits comfortably in Railway's Hobby plan.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| MTProxy | `telegrammessenger/proxy:1.4` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `SECRET` | (secret) | 32-char hex secret for your tg:// link. Generated once and persisted, so shared links keep working across restarts. |

## Configuration

- **TCP Proxies:** 443
- **Volume:** `/data`

**Category:** Other · **Tags:** telegram, proxy, mtproto, mtproxy, vpn, privacy

[View on Railway →](https://railway.com/deploy/telegram-mtproxy-private-telegram-proxy)
