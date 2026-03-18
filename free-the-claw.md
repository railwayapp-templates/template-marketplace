# Deploy free-the-claw on Railway

Free Openclaw via Nvidia NIM + Claude Code

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/free-the-claw)

## About

A self-hosted AI chat setup using [openclaw](https://github.com/openclaw/openclaw) with free NVIDIA NIM models via [claude-code-free](https://github.com/Alishahryar1/claude-code-free).

For persistent hosting, deploy on [Railway](https://railway.com) with two services from this repo. You will probably need the Hobby Plan ($5/month) as the free tier may not be enough for the image size.

1. Click the **Deploy on Railway** badge above, or create a new project manually
2. Add two services, both pointing to the **`deploy` branch** of this repo (a GitHub Action auto-flattens submodules into this branch on every push to main):

   **claude-code-free**
   - Dockerfile path: `Dockerfile.claude-code-free.railway`
   - Port: `8082` (private networking only)
   - Add your env vars: `NVIDIA_NIM_API_KEY`, `MODEL`

   **openclaw**
   - Dockerfile path: `Dockerfile.openclaw.railway`
   - Port: `18789` (public networking)
   - Env vars: `PROXY_URL=http://claude-code-free.railway.internal:8082`, `ANTHROPIC_API_KEY=sk-placeholder`, `OPENCLAW_GATEWAY_TOKEN=`, `MODEL`
   - Add a persistent volume mounted at `/home/node/.openclaw`

3. Enable public networking on the openclaw service
4. Open `https://.up.railway.app/?token=`

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| openclaw | [polats/free-the-claw](https://github.com/polats/free-the-claw) (branch: deploy) | Web service |
| claude-code-free | [polats/free-the-claw](https://github.com/polats/free-the-claw) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `HOME` | openclaw | /home/node | Home directory for the node user |
| `MODEL` | openclaw | stepfun-ai/step-3.5-flash | NVIDIA NIM model name |
| `PROXY_URL` | openclaw | http://claude-code-free.railway.internal:8082 | Internal URL of the claude-code-free |
| `COMFY_UI_API_KEY` | openclaw | (secret) | Reply with gen AI content, get on cloud.comfy.org |
| `GITHUB_PAT_TOKEN` | openclaw | (secret) | To define agent persona via github profile and allow git operations |
| `ANTHROPIC_API_KEY` | openclaw | (secret) | Placeholder key (proxied through     claude-code-free) |
| `TWITTER_CLIENT_ID` | openclaw | - | OAuth 2.0 Client ID (used for token refresh) |
| `TWITTER_BEARER_TOKEN` | openclaw | (secret) | OAuth 2.0 access token (used for all API calls — expires every 2 hours) |
| `TWITTER_CLIENT_SECRET` | openclaw | (secret) | OAuth 2.0 Client Secret (used for token refresh) |
| `TWITTER_REFRESH_TOKEN` | openclaw | (secret) | Refresh token (used to get a new bearer token when it expires) |
| `ETH_WALLET_PRIVATE_KEY` | openclaw | - | To create and interact with smart contracts. CREATE A BURNER AND DON'T USE YOUR PERSONAL KEYS |
| `OPENCLAW_GATEWAY_TOKEN` | openclaw | (secret) | Access token for the gateway UI (add #token=[OPENCLAW_GATEWAY_TOKEN] to the URL) |
| `MODEL` | claude-code-free | nvidia_nim/qwen/qwen3.5-122b-a10b | NVIDIA NIM model to use |
| `NVIDIA_NIM_API_KEY` | claude-code-free | (secret) | Your NVIDIA NIM API key from https://build.nvidia.com/settings/api-keys |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/node/.openclaw`

**Category:** Bots · **Languages:** JavaScript, Shell

[View on Railway →](https://railway.com/template/free-the-claw)
