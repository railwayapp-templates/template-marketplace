# Deploy OmniRoute on Railway

OmniRoute [Oct'26] — one OpenAI-compatible endpoint, your provider keys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/omniroute-llm-gateway)

## About

OmniRoute is an open-source AI gateway: one OpenAI-compatible endpoint in front of every LLM provider you use, with a dashboard for provider credentials, per-app keys, model aliases and fallback rules. Point your tools at one base URL instead of maintaining provider-specific integrations in each. This template deploys it with Redis, a volume mounted where the keys actually land, and the routing behaviour documented rather than assumed.

A gateway makes many providers look like one endpoint. The cost of that convenience is that it also becomes one place where your requests can change and one place where all your keys live.

**The model that answers may not be the model you asked for.** Quota-aware fallback and circuit breakers are the point of a gateway — when a provider rate-limits or errors, the request goes elsewhere. So a request you priced against one model can be served by another, with different cost per token and different output quality. Read the `model` field in responses, and build fallback chains only from models you would accept interchangeably.

**Prompt compression is lossy, and applied before the model sees your text.** Useful for bulk summarisation and long-context cost control; a correctness risk for few-shot prompts, structured extraction and anything where exact wording carries meaning, because the model receives something other than what you wrote. Leave it off until you have measured its effect on your own outputs.

**The dashboard is a bigger target than the endpoint.** Securing `/v1` with a generated key solves half the problem. The dashboard holds the provider credentials themselves, so a weak admin password does not leak one key — it leaks your OpenAI, Anthropic and Gemini accounts at once. Set `INITIAL_PASSWORD` long and random before the domain resolves; a public Railway URL is discoverable the moment it exists.

**The volume path and the application's data path are not the same string.** The app's internal setting points at `/app/data`; the Railway volume mounts at `/data`. Use the wrong one and the deployment looks healthy, the dashboard works, and every provider and key vanishes on the next redeploy. Confirm the mount before entering a single credential.

**Pin the tag.** The official image publishes `latest`, and a gateway sitting between your applications and every model you call is the wrong component to let change on its own schedule. Pin a version you have tested and bump it deliberately.

**A gateway is a shared point of failure.** Before it, a provider outage broke calls to that provider. After it, a gateway outage breaks every call you make. Usually a worthwhile trade for the operational simplicity — but a trade, and worth knowing you made it.

Typical cost: **~$10–20/month** for the gateway and Redis at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. Half a gigabyte is not enough headroom for this image. Inference bills to your own provider accounts.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Redis | `redis:8.2` | Database |
| OmniRoute | `diegosouzapw/omniroute:latest` | Web service |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `REDISHOST` | Redis | - | Private network hostname of the Redis service, only resolvable from services in the same environment |
| `REDISPORT` | Redis | 6379 | Port that Redis listens on |
| `REDISUSER` | Redis | default | Username for authenticating with Redis |
| `REDIS_URL` | Redis | - | Connection string for connecting to Redis using the private network |
| `REDISPASSWORD` | Redis | (secret) | Alias of REDIS_PASSWORD for clients that expect the unseparated name |
| `REDIS_PASSWORD` | Redis | (secret) | Randomly generated password for authenticating with Redis |
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

## Configuration

- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/omniroute-llm-gateway)
