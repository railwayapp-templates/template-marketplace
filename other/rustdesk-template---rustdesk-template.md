# Deploy rustdesk-template on Railway

Self-host RustDesk remote desktop (hbbs + hbbr relay) with one click

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rustdesk-template)

## About

Two Railway services run the official RustDesk OSS binaries from one pinned Docker image (`rustdesk/rustdesk-server:1.1.16`, plus a static busybox layer for the entrypoint and diagnostics). `hbbs` listens on TCP 21116 (ID/rendezvous) and `hbbr` on TCP 21117 (relay), each published through a Railway TCP proxy. Each service has a persistent volume at `/root` where hbbs keeps its Ed25519 keypair and SQLite database — the keypair must survive redeploys or every configured client breaks, which is why volumes are part of the template. hbbs prints and writes a client configuration card (`ID Server` / `Relay Server` / `Key`) to its logs and to `/root/client-config.txt` on every boot. The only environment variable, `RELAY_SERVERS`, is pre-configured as an expression pointing at hbbr's public proxy address — you deploy first and configure clients second.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| hbbr | [lNamelessl/rustdesk-railway-template](https://github.com/lNamelessl/rustdesk-railway-template) | Database |
| hbbs | [lNamelessl/rustdesk-railway-template](https://github.com/lNamelessl/rustdesk-railway-template) | Database |

## Configuration

- **TCP Proxies:** 21117
- **Volume:** `/root`
- **TCP Proxies:** 21116

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/rustdesk-template)
