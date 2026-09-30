# Deploy OpenClaw (Self-Hosted) on Railway

Self-host OpenClaw with Chromium, persistent memory and API key setup.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/openclaw-self-hosted)

## About

OpenClaw is a personal AI assistant with persistent conversations, tools, browser automation, and integrations with messaging channels. This template deploys the official stable image with Chromium and the native OpenClaw Control UI.

The service uses `ghcr.io/openclaw/openclaw:latest-browser`, a persistent `/data` volume, an HTTPS domain, and a `/healthz` health check. Bootstrap prepares volume permissions, then runs OpenClaw and Chromium as the image’s non-root `node` user. No separate setup application is required.

### Quick start

1. Add **one** optional API key before deploying: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, `GEMINI_API_KEY`, or `OPENROUTER_API_KEY`. Leave `OPENCLAW_AUTH_CHOICE=auto`; the first start configures that provider and its recommended model. Set `OPENCLAW_MODEL` if you prefer a particular model available to your account.
2. Alternatively, leave the keys blank. Connect a supported provider, subscription OAuth, or custom endpoint later from **Models → Connect provider** in OpenClaw.
3. If you add or change a custom domain, redeploy OpenClaw to apply it before opening the Control UI. For multiple domains, list their full HTTPS origins in `OPENCLAW_CONTROL_UI_ALLOWED_ORIGINS`, then redeploy. Your login, model selection, and data stay on `/data`.
4. Once Railway reports a successful deployment, open the service’s **Console** and run the following **once for your first browser**:

```bash
runuser -u node -- openclaw dashboard --json | node -e 'let s="";process.stdin.on("data",d=>s+=d);process.stdin.on("end",()=>{const u=new URL(JSON.parse(s).browserUrl);u.protocol="https:";u.hostname=process.env.RAILWAY_PUBLIC_DOMAIN;u.port="";const f=new URLSearchParams(u.hash.slice(1));f.set("gatewayUrl","wss://"+u.host);u.hash=f.toString();console.log(u.href)})'
```

Open the printed HTTPS link within ten minutes. It contains a single-use owner pairing credential; keep it private. This pairs that browser with administrator access without disabling device authentication. After pairing, use the normal service domain for chat, Models, channels, settings, and device approvals. A new browser profile needs its own pairing link or approval from an existing administrator.

API keys added after initial setup can be connected through Models. Existing provider, model, channel, and authentication configuration survives restarts; onboarding never resets an existing configuration.

If you supply several API keys on the first deployment, select `OPENCLAW_AUTH_CHOICE` explicitly: `openai-api-key`, `apiKey` (Anthropic), `gemini-api-key`, or `openrouter-api-key`. Use `skip` to configure through the UI. Each deployer supplies their own credentials. API usage is billed by the provider separately from Railway; subscription OAuth follows the connected account’s access and limits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OpenClaw | `ghcr.io/openclaw/openclaw:latest-browser` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `PORT` | 8080 | Public HTTP and WebSocket listener port used by Railway. The generated domain targets this port. |
| `GEMINI_API_KEY` | (secret) | Optional Google Gemini API key. On a fresh deployment, supply one provider key to configure its recommended model automatically. Leave blank to use the Models screen. Provider usage is billed separately. |
| `OPENAI_API_KEY` | (secret) | Optional OpenAI Platform API key for metered API usage. A single supplied key configures a fresh deployment automatically. Leave blank to connect OpenAI with OAuth or another provider from Models. ChatGPT subscriptions and API billing are separate. |
| `OPENCLAW_MODEL` | - | Optional provider/model identifier to apply at startup, such as openai/gpt-6-astra. Leave blank to keep the onboarding recommendation or your model chosen in the UI. Account model access can vary. |
| `ANTHROPIC_API_KEY` | (secret) | Optional Anthropic API key. On a fresh deployment, supply one provider key to configure its recommended model automatically. Leave blank to connect a provider from OpenClaw’s Models screen. Provider usage is billed separately. |
| `OPENCLAW_STATE_DIR` | /data/.openclaw | Persistent directory for configuration, credentials, sessions, agent state, and memory. Keep it inside the /data volume. |
| `OPENROUTER_API_KEY` | (secret) | Optional OpenRouter API key. A single supplied key configures a fresh deployment automatically. Set OPENCLAW_MODEL to your preferred OpenRouter model if desired, or leave blank for the provider recommendation. Provider usage is billed separately. |
| `OPENCLAW_AUTH_CHOICE` | auto | First-deployment provider setup: auto detects a single supplied API key. If supplying multiple keys, select openai-api-key, apiKey (Anthropic), gemini-api-key or openrouter-api-key. Use skip for setup in the Models screen. Existing configuration is preserved. |
| `OPENCLAW_GATEWAY_PORT` | - | Gateway HTTP and WebSocket port. Keep this reference equal to PORT; OpenClaw serves Railway traffic directly. |
| `OPENCLAW_GATEWAY_TOKEN` | (secret) | Unique generated administrator token for the Gateway and Control UI. Copy it from your deployed service variables when connecting; keep it private. |
| `OPENCLAW_WORKSPACE_DIR` | /data/workspace | Persistent workspace for agent files and artifacts. Keep it inside the /data volume. |
| `OPENCLAW_TRUSTED_PROXIES` | ["100.64.0.0/10"] | Trusted Railway ingress range observed in deployment tests. Railway overwrote client forwarding headers in those tests. Review this range if its ingress network changes. Gateway token authentication and device pairing remain enabled. |
| `OPENCLAW_BROWSER_HEADLESS` | 1 | Run the bundled Chromium browser without a graphical display. |
| `OPENCLAW_BROWSER_NO_SANDBOX` | true | Disable Chromium’s internal sandbox, required by the tested Railway runtime. Chromium still runs as the non-root node user inside the service container. Set false only on infrastructure that supports Chromium sandboxing. |
| `OPENCLAW_CONTROL_UI_ALLOWED_ORIGINS` | - | HTTPS origins allowed to open the Control UI. The default follows Railway's public domain on startup. Redeploy after adding or changing a custom domain. For multiple domains, include each full HTTPS origin in this JSON array before redeploying. |

## Configuration

- **Start command:** `/bin/sh -ec 'set -eu; cd /app; mkdir -p "$OPENCLAW_STATE_DIR" "$OPENCLAW_WORKSPACE_DIR"; chown 1000:1000 /data "$OPENCLAW_STATE_DIR" "$OPENCLAW_WORKSPACE_DIR"; if [ ! -s "$OPENCLAW_STATE_DIR/openclaw.json" ]; then choice="$OPENCLAW_AUTH_CHOICE"; if [ "$choice" = auto ]; then set --; [ -z "${ANTHROPIC_API_KEY:-}" ] || set -- "$@" apiKey; [ -z "${GEMINI_API_KEY:-}" ] || set -- "$@" gemini-api-key; [ -z "${OPENAI_API_KEY:-}" ] || set -- "$@" openai-api-key; [ -z "${OPENROUTER_API_KEY:-}" ] || set -- "$@" openrouter-api-key; [ "$#" -le 1 ] || { echo "Set OPENCLAW_AUTH_CHOICE when supplying multiple API keys." >&2; exit 1; }; choice="${1:-skip}"; fi; if [ "$choice" != skip ]; then runuser -u node -- openclaw onboard --non-interactive --accept-risk --auth-choice "$choice" --secret-input-mode ref --gateway-auth token --gateway-token-ref-env OPENCLAW_GATEWAY_TOKEN --gateway-bind lan --gateway-port "$PORT" --workspace "$OPENCLAW_WORKSPACE_DIR" --skip-daemon --skip-channels --skip-health --skip-skills --skip-hooks --skip-search --skip-ui --suppress-gateway-token-output; fi; fi; browser_path=$(node -p "require(\"playwright-core\").chromium.executablePath()"); runuser -u node -- openclaw config set --batch-json "[{\"path\":\"browser.executablePath\",\"value\":\"$browser_path\"},{\"path\":\"browser.noSandbox\",\"value\":$OPENCLAW_BROWSER_NO_SANDBOX},{\"path\":\"gateway.allowRealIpFallback\",\"value\":false},{\"path\":\"gateway.auth.allowTailscale\",\"value\":false},{\"path\":\"gateway.bind\",\"value\":\"lan\"},{\"path\":\"gateway.controlUi.allowedOrigins\",\"value\":$OPENCLAW_CONTROL_UI_ALLOWED_ORIGINS},{\"path\":\"gateway.mode\",\"value\":\"local\"},{\"path\":\"gateway.port\",\"value\":$PORT},{\"path\":\"gateway.trustedProxies\",\"value\":$OPENCLAW_TRUSTED_PROXIES}]"; if [ -n "${OPENCLAW_MODEL:-}" ]; then runuser -u node -- openclaw models set "$OPENCLAW_MODEL"; fi; exec runuser -u node -- node openclaw.mjs gateway --bind lan --port "$PORT" --auth token'`
- **Healthcheck:** `/healthz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/openclaw-self-hosted)
