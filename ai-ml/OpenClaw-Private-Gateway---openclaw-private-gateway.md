# Deploy OpenClaw Private Gateway on Railway

Private OpenClaw Gateway, reachable only over your Tailscale tailnet

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-private-gateway)

## About

OpenClaw Private Gateway runs your own [OpenClaw](https://openclaw.ai) Gateway on Railway, reachable only from your Tailscale tailnet. There is no public domain and no setup web server. The macOS app, the dashboard, and your phone connect to it privately over Tailscale, with HTTPS from your tailnet's certificate.

This template starts one service with one volume. The **openclaw** service runs the official OpenClaw image (a pinned release) with Tailscale inside the same container:

- The Gateway listens only on localhost. OpenClaw itself runs Tailscale Serve, so it appears in your tailnet under the name you give it: `Work Gateway` becomes `https://work-gateway.your-tailnet.ts.net`, and pairing codes and the dashboard origin follow automatically.
- On your tailnet, the dashboard signs you in with your Tailscale identity. Token authentication still protects everything else, and each device that runs the macOS app or a node is approved by hand.
- All state (OpenClaw's config, sessions, and credentials, plus Tailscale's identity and tool logins) lives on a volume at `/data`.

Before you deploy, turn on **MagicDNS** and **HTTPS certificates** in the Tailscale admin console and generate an auth key (not reusable, not ephemeral). The template asks for two values:

| Variable | Value |
| --- | --- |
| `OPENCLAW_MACHINE_DISPLAY_NAME` | a name for this Gateway, such as `Work Gateway`; it is lowercased and hyphenated for the tailnet address |
| `TS_AUTHKEY` | your Tailscale auth key, used once on first boot |

`OPENCLAW_GATEWAY_TOKEN` is generated for you. After deploying, add your model provider, open the dashboard at `https://work-gateway.your-tailnet.ts.net/` (with your Gateway's name), and pair the macOS app. Give each deployment its own name: if your tailnet already has a machine with that name, Tailscale adds a suffix (`work-gateway-1`) and the address follows; the deploy log and the admin console's Machines page show the name it got. The [Quickstart](https://github.com/stevekinney/openclaw-railway-template/blob/main/documentation/QUICKSTART.md) has every command.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw | [stevekinney/openclaw-railway-template](https://github.com/stevekinney/openclaw-railway-template) | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `TS_AUTHKEY` | - | Tailscale auth key: admin console, Settings, Keys, Generate auth key. Not reusable, not ephemeral. Used once on first boot. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | - |
| `OPENCLAW_MACHINE_DISPLAY_NAME` | - | A name for this Gateway, e.g. Work Gateway. Shown in OpenClaw's apps; lowercased and hyphenated, it becomes the tailnet address: https://work-gateway.your-tailnet.ts.net. Use a different name for each deployment. |

## Configuration

- **Healthcheck:** `/startupz`
- **Volume:** `/data`

**Category:** AI/ML · **Languages:** Shell, Dockerfile, JavaScript, TypeScript

[View on Railway →](https://railway.com/deploy/openclaw-private-gateway)
