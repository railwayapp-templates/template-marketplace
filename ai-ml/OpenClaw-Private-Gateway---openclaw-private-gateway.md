# Deploy OpenClaw Private Gateway on Railway

Private OpenClaw Gateway, reachable only over your Tailscale tailnet

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-private-gateway)

## About

OpenClaw Private Gateway runs your own [OpenClaw](https://openclaw.ai) Gateway on Railway, reachable only from your Tailscale tailnet. There is no public domain and no setup web server. The macOS app, the dashboard, and your phone connect to it privately over Tailscale, with HTTPS from your tailnet's certificate.

This template starts one service with one volume. The **openclaw** service runs the official OpenClaw image (a pinned release) with Tailscale inside the same container:

- The Gateway listens only on localhost. OpenClaw itself runs Tailscale Serve, so it appears in your tailnet as `openclaw` at `https://openclaw.your-tailnet.ts.net`, and pairing codes and the dashboard origin follow automatically.
- On your tailnet, the dashboard signs you in with your Tailscale identity. Token authentication still protects everything else, and each device that runs the macOS app or a node is approved by hand.
- All state (OpenClaw's config, sessions, and credentials, plus Tailscale's identity and tool logins) lives on a volume at `/data`.

Before you deploy, turn on **MagicDNS** and **HTTPS certificates** in the Tailscale admin console and generate an auth key (not reusable, not ephemeral). The template asks for one value:

| Variable | Value |
| --- | --- |
| `TS_AUTHKEY` | your Tailscale auth key, used once on first boot |

`OPENCLAW_GATEWAY_TOKEN` is generated for you. After deploying, add your model provider, open the dashboard at `https://openclaw.your-tailnet.ts.net/`, and pair the macOS app. If your tailnet already has a machine named `openclaw`, Tailscale names this one `openclaw-1` and the address follows (`https://openclaw-1.your-tailnet.ts.net/`); the admin console's Machines page shows the name it got. The [Quickstart](https://github.com/stevekinney/openclaw-railway-template/blob/main/documentation/QUICKSTART.md) has every command.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw | [stevekinney/openclaw-railway-template](https://github.com/stevekinney/openclaw-railway-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TS_AUTHKEY` | - | Tailscale auth key: admin console, Settings, Keys, Generate auth key. Not reusable, not ephemeral. Used once on first boot. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | - |

## Configuration

- **Healthcheck:** `/startupz`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, TypeScript, JavaScript

[View on Railway →](https://railway.com/deploy/openclaw-private-gateway)
