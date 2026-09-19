# Deploy cloudflared-template on Railway

Cloudflare Tunnel connector - no inbound ports, green without a token

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cloudflared-template)

## About

Deploying this template provisions one lightweight service, `cloudflared`, built from the
pinned official `cloudflare/cloudflared` image (2026.9.1) with a small entrypoint wrapper.
The service is stateless and outbound-only: it opens no inbound ports and needs no volume.
Railway healthchecks it over HTTP on the metrics port (`PORT=20241`, path `/ready`). The only
variable you ever configure is `TUNNEL_TOKEN`, a Railway secret variable you add after the
first deploy; without it the service stays healthy in a configure-me state with setup
instructions in the logs.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cloudflared | [lNamelessl/cloudflared-railway-template](https://github.com/lNamelessl/cloudflared-railway-template) | Worker |

## Configuration

- **Healthcheck:** `/ready`

**Category:** Other · **Languages:** Shell, Dockerfile

[View on Railway →](https://railway.com/deploy/cloudflared-template)
