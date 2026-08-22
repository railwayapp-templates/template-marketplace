# Deploy CLIProxyAPI | (Just Updated) Your Subscription as an API, Key-Locked From Boot on Railway

OpenAI-compatible proxy for your CLI plans, API key enforced from boot

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/cliproxyapi)

## About

CLIProxyAPI (48k+ stars) wraps the CLI/subscription plans you already pay for — Claude Code,
ChatGPT Codex, Gemini/Antigravity, Grok — behind one OpenAI-, Gemini-, Claude- and
Codex-compatible HTTP API, so any tool that speaks the OpenAI API can use them.

This listing is the hardened build: the proxy comes up with a **generated API key already
enforced** and a **generated management password**, its OAuth logins live on a volume, and the
image is pinned by digest.

One container, ~15 MB resident, no database. Railway injects `PORT`; the service writes its
config to a mounted volume on first boot and keeps it there, so the accounts you sign in through
the management panel survive every redeploy. Two variables are pre-filled with per-deploy
secrets — there is nothing to type before clicking Deploy, and nothing left blank.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| cliproxyapi | `eceasy/cli-proxy-api@sha256:7145258f0bec00e12d6fa19488baaa15768c0e234538ce80528d0da9bc6aef2b` | Web service |

## Environment variables

| Variable | Default |
| --------- | ------- |
| `API_KEY` | (secret) |
| `MANAGEMENT_PASSWORD` | (secret) |

## Configuration

- **Start command:** `/bin/sh -c "mkdir -p /data/auths; if [ ! -f /data/config.yaml ]; then echo cG9ydDogUE9SVE5VTQpyZW1vdGUtbWFuYWdlbWVudDoKICBhbGxvdy1yZW1vdGU6IHRydWUKICBzZWNyZXQta2V5OiBNR01US0VZCmF1dGgtZGlyOiAvZGF0YS9hdXRocwphcGkta2V5czoKICAtIEFQSUtFWVZBTApkZWJ1ZzogZmFsc2UK | base64 -d > /data/config.yaml; fi; sed -i s/PORTNUM/${PORT:-8317}/ /data/config.yaml; sed -i s/MGMTKEY/$MANAGEMENT_PASSWORD/ /data/config.yaml; sed -i s/APIKEYVAL/$API_KEY/ /data/config.yaml; exec /CLIProxyAPI/CLIProxyAPI --config /data/config.yaml"`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/cliproxyapi)
