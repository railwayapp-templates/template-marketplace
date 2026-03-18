# Deploy FastAPI service with a firewall (via cloudflared) on Railway

Protect a web service of any kind (like FastAPI) behind a cloudflare tunnel

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/template/fastapi-service-with-a-firewall-via-clou)

## About

I loved using railway to host my api, it probably took me 30 minutes. The only thing I didn't know how to do though was blocking undesired traffic (the internet's free pen-testing kit).

So I looked up how to do it and didn't find any guide about it, so I wrote a guide. I used this template for the guide and you can re-use it to set up your own, secured api. [This is the link](https://medium.com/@dasfacc/firewall-your-railway-app-with-cloudflare-4709b287c494?sk=7525c83b10a67dc285563bb5e2da8008).

The only thing you'll need is a cloudflare account. Setting up the tunnel and the cloudflared service is easy. You might need to modify your HOST variable (`::`) or your Dockerfile's ENTRYPOINT so the app can be properly reached via railway's internal network (IPv6).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Cloudflared | `cloudflare/cloudflared` | Worker |
| pydantic-chat-app | [dsfaccini/pydantic-chat-app](https://github.com/dsfaccini/pydantic-chat-app) | Worker |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `TUNNEL_TOKEN` | Cloudflared | (secret) | Secret token from Cloudflare's Zero Trust dashboard |
| `APP_HOST` | pydantic-chat-app | :: | Set to `::` because railway's internal network is IPv6 only |
| `APP_PORT` | pydantic-chat-app | 8080 | The port needs to be the one that your app runs on |
| `LOGFIRE_TOKEN` | pydantic-chat-app | (secret) | You can setup logfire for observability of your application |
| `OPENAI_API_KEY` | pydantic-chat-app | (secret) | For AI applications |
| `LOGFIRE_SERVICE_NAME` | pydantic-chat-app | pydantic-ai-app | For querying logs of this application |

## Configuration

- **Start command:** `cloudflared tunnel --no-autoupdate run`
- **Start command:** `sh -c 'uv run alembic upgrade head && python -m uvicorn src.app:app --host :: --port ${PORT:-8080}'`

**Category:** Starters · **Languages:** Python, TypeScript, HTML, Dockerfile, Shell

[View on Railway →](https://railway.com/template/fastapi-service-with-a-firewall-via-clou)
