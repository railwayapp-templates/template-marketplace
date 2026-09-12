# Deploy OmniRoute [Updated Sep '26] on Railway

OmniRoute — Route OpenAI, Claude, Gemini & More Through One Endpoint

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omniroute-ai-gatew-1)

## About

OmniRoute is an open-source, self-hosted AI gateway that puts every LLM provider you use — OpenAI, Anthropic, Gemini, OpenRouter-style providers, and more — behind one OpenAI-compatible endpoint, instead of making every tool and script manage its own provider-specific integration. This template deploys OmniRoute's real 2-service architecture, verified live end-to-end against the app's own official Docker image.

Running more than one LLM provider usually means separate API keys, separate base URLs, and separate client configs scattered across every tool that talks to a model. OmniRoute collapses that into one dashboard: connect your providers once, generate an API key, and every downstream tool — Claude Code, Cursor, Cline, Open WebUI, or any OpenAI SDK — points at the same `https://your-domain/v1` endpoint regardless of which provider actually handles the request.

Self-hosting it means your provider credentials and request logs never pass through a third-party company's infrastructure, unlike hosted gateways. Railway wires OmniRoute up with its Redis dependency automatically, over private networking, with a persistent volume on each service so dashboard configuration and cached state survive every redeploy.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| OmniRoute | `diegosouzapw/omniroute:latest` | Web service |
| Redis | `redis:8.2.1` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | OmniRoute | 20128 | Must be pinned explicitly — Railway's own auto-injected PORT would otherwise mismatch the image's internal default. |
| `BASE_URL` | OmniRoute | - | Public URL of this service. |
| `DATA_DIR` | OmniRoute | /app/data | Directory where OmniRoute stores its persistent data — matches the volume mount path. |
| `HOSTNAME` | OmniRoute | 0.0.0.0 | Must bind to all interfaces, not just loopback, for Railway to route traffic to it. |
| `NODE_ENV` | OmniRoute | production | Standard Node.js production mode flag. |
| `CLOUD_URL` | OmniRoute | https://9router.com | Upstream cloud sync endpoint used by the app's built-in cloud-sync feature. |
| `REDIS_URL` | OmniRoute | - | Live reference to the Redis service's private connection string. |
| `JWT_SECRET` | OmniRoute | (secret) | Signs session/auth JWTs. |
| `MODELS_DEV` | OmniRoute | false | Disables the models.dev catalog sync by default (enable later from Settings → AI). |
| `API_KEY_SECRET` | OmniRoute | (secret) | Secret used to sign/verify API keys generated inside OmniRoute. |
| `MACHINE_ID_SALT` | OmniRoute | - | Salts the internal machine-identity hash used for instance-level tracking. |
| `INITIAL_PASSWORD` | OmniRoute | (secret) | Dashboard login password on first boot. You must set this before deploying. |
| `NEXT_PUBLIC_BASE_URL` | OmniRoute | - | Client-side copy of BASE_URL, exposed to the browser bundle. |
| `PRICING_SYNC_ENABLED` | OmniRoute | true | Keeps the model pricing catalog synced from upstream. |
| `NEXT_PUBLIC_CLOUD_URL` | OmniRoute | https://omniroute.online/ | Client-side cloud-sync/marketing URL. |
| `REDISHOST` | Redis | - | Internal hostname. |
| `REDISPORT` | Redis | 6379 | Port Redis listens on. |
| `REDISUSER` | Redis | default | Default Redis username. |
| `REDIS_URL` | Redis | - | Private connection string — what OmniRoute.REDIS_URL actually references. |
| `REDISPASSWORD` | Redis | (secret) | Reference to the generated password below. |
| `REDIS_PASSWORD` | Redis | (secret) | Auto-generated auth password, enforced via the service's start command (--requirepass). |
| `REDIS_PUBLIC_URL` | Redis | - | Connection string for external access outside Railway's private network. Requires the TCP proxy to be enabled on this service (Networking → TCP Proxy → port 6379). |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/data`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **TCP Proxies:** 6379

**Category:** Other

[View on Railway →](https://railway.com/deploy/omniroute-ai-gatew-1)
