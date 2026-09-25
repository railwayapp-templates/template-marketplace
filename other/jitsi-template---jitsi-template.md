# Deploy jitsi-template on Railway

Self-host Jitsi Meet on Railway - 5 services, 3+ person meetings via TURN

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/jitsi-template)

## About

This template provisions five services (~3.8 GB RAM total): **web** (`ghcr.io/jitsi/web`, pinned `stable-11248`) serves the meeting UI on your Railway domain with TLS terminated at Railway's edge; **prosody** runs the XMPP signaling (private network only); **jicofo** manages conferences; **jvb** bridges media; **coturn** relays media over TCP/3478 through a Railway TCP proxy (Railway assigns the public port — the stack references it automatically via `${{coturn.RAILWAY_TCP_PROXY_DOMAIN}}`/`${{coturn.RAILWAY_TCP_PROXY_PORT}}`). Volumes persist prosody accounts and generated config. Railway does not expose UDP publicly, so all media (including 1:1) transits coturn — budget for relay bandwidth (~$10–25/mo for light use).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| jicofo | [lNamelessl/jitsi-railway-template](https://github.com/lNamelessl/jitsi-railway-template) (root: docker/jicofo) | Database |
| coturn | [lNamelessl/jitsi-railway-template](https://github.com/lNamelessl/jitsi-railway-template) (root: docker/coturn) | TCP service |
| prosody | [lNamelessl/jitsi-railway-template](https://github.com/lNamelessl/jitsi-railway-template) (root: docker/prosody) | Database |
| web | `ghcr.io/jitsi/web:stable-11248` | Web service |
| jvb | [lNamelessl/jitsi-railway-template](https://github.com/lNamelessl/jitsi-railway-template) (root: docker/jvb) | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `JICOFO_AUTH_PASSWORD` | jicofo | (secret) |
| `TURN_SHARED_SECRET` | coturn | (secret) |
| `TURN_CREDENTIALS` | prosody | (secret) |
| `JVB_AUTH_PASSWORD` | prosody | (secret) |
| `JICOFO_AUTH_PASSWORD` | prosody | (secret) |
| `JVB_AUTH_PASSWORD` | jvb | (secret) |

## Configuration

- **Volume:** `/config`
- **Start command:** `/usr/local/bin/railway-coturn-entrypoint.sh`
- **TCP Proxies:** 3478
- **Volume:** `/var/lib/prosody`
- **Networking:** Public domain with automatic HTTPS

**Category:** Other · **Languages:** Dockerfile, Shell

[View on Railway →](https://railway.com/deploy/jitsi-template)
