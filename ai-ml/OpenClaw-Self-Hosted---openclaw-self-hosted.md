# Deploy OpenClaw (Self-Hosted) on Railway

Self-host OpenClaw with Chromium, persistent memory and the Control UI.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-self-hosted)

## About

OpenClaw is a personal AI assistant with persistent conversations, tools, browser automation, and integrations with messaging channels. This template deploys the official stable image with Chromium and the native OpenClaw Control UI.

The service uses `ghcr.io/openclaw/openclaw:latest-browser`, a persistent `/data` volume, an HTTPS domain, and a `/healthz` health check. The first start initializes Railway’s web origin, proxy trust, and Chromium settings through the official CLI. Later starts use the saved configuration and the image’s native Docker initializer. No separate setup application is required.

### Quick start

1. Deploy the template without adding provider API keys in Railway. Credentials and model selection are configured inside OpenClaw.
2. If you add or change a custom domain after the first deployment, add its full HTTPS origin to `gateway.controlUi.allowedOrigins` in OpenClaw’s configuration, then restart the service. You can use the original Railway domain to update this setting. Your login, model selection, and data stay on `/data`.
3. Once Railway reports a successful deployment, open the service’s **Console** and run the following **once for your first browser**:

```bash
openclaw dashboard --json | node -e 'let s="";process.stdin.on("data",d=>s+=d);process.stdin.on("end",()=>{const u=new URL(JSON.parse(s).browserUrl);u.protocol="https:";u.hostname=process.env.RAILWAY_PUBLIC_DOMAIN;u.port="";const f=new URLSearchParams(u.hash.slice(1));f.set("gatewayUrl","wss://"+u.host);u.hash=f.toString();console.log(u.href)})'
```

Open the printed HTTPS link within ten minutes. It contains a single-use owner pairing credential; keep it private. This pairs that browser with administrator access without disabling device authentication. After pairing, use the normal service domain for chat, Models, channels, settings, and device approvals. A new browser profile needs its own pairing link or approval from an existing administrator.

Open **Models → Connect provider** to add your own API key, connect a supported subscription with OAuth, or configure a custom endpoint. Choose the model in OpenClaw; Railway startup does not change that selection. Credentials and configuration stay on the persistent volume across redeployments.

API usage is billed by the provider separately from Railway. Subscription OAuth follows the connected account’s access and limits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | `ghcr.io/openclaw/openclaw:latest-browser` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Public HTTP and WebSocket listener port used by Railway. The generated domain targets this port. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Persistent directory for configuration, credentials, sessions, agent state, and memory. Keep it inside the /data volume. |
| `OPENCLAW_GATEWAY_PORT` | - | Gateway HTTP and WebSocket port. Keep this reference equal to PORT; OpenClaw serves Railway traffic directly. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Unique generated administrator token for the Gateway and Control UI. Copy it from your deployed service variables when connecting; keep it private. |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Persistent workspace for agent files and artifacts. Keep it inside the /data volume. |
| `OPENCLAW_INITIAL_CONFIG` | - | Official CLI batch configuration applied only when the persistent OpenClaw configuration does not exist. Sets the Railway web origin, trusted ingress range and Chromium sandbox setting. After initialization, manage settings inside OpenClaw; redeploys preserve your configuration. |
| `OPENCLAW_BROWSER_HEADLESS` | 1 | Run the bundled Chromium browser without a graphical display. |

## Configuration

- **Start command:** `/bin/sh -ec '[ -f "$OPENCLAW_STATE_DIR/openclaw.json" ] || openclaw config set --batch-json "$OPENCLAW_INITIAL_CONFIG"; exec node /app/docker-entrypoint.mjs node /app/openclaw.mjs gateway'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openclaw-self-hosted)
