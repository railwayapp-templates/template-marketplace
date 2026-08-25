# Deploy LiteLLM on Railway

One API for every AI model, with keys, budgets and usage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/litellm-gateway)

## About

LiteLLM is an open-source AI gateway that puts more than 100 model providers — OpenAI, Anthropic, Google Vertex AI, AWS Bedrock, Azure, Groq, Mistral, Ollama and the rest — behind one OpenAI-compatible API. Teams reach for it when provider sprawl starts to hurt: nobody can say what inference cost last month, swapping a model means a code change in six repositories, or a contractor needs access that expires on Friday.

This template lets you self-host LiteLLM on Railway with the pieces a production gateway needs already wired together. Three services deploy as a unit: the gateway on a public HTTPS domain, a PostgreSQL database holding virtual keys, teams, budgets and spend logs, and a Redis instance backing the response cache, the shared rate-limit counters and the leader election that keeps scheduled jobs running exactly once. Requests are authenticated against a key record in Postgres, routed upstream, and written back to the spend tables in batches. Nothing but the gateway is reachable from the internet.

![Diagram of the LiteLLM, Redis and Postgres services on Railway](https://res.cloudinary.com/rroe4rtk/image/upload/v1787339875/litellm-architecture.png)

Once more than one team is calling language models, provider SDKs diverge, keys get pasted into environment files, spend is invisible until the invoice lands, and one provider's outage takes an application down. A gateway turns that into configuration. Self-hosting matters more here than for most tools: every prompt your company sends passes through this service.

Key features:

- One OpenAI-compatible API for 100+ providers, covering chat, embeddings, images, audio and batch endpoints
- Virtual keys with budgets, rate limits, model allow-lists and expiry dates
- Per-model cost tracking, with spend logs, daily rollups and exportable usage data
- Load balancing and automatic fallbacks across deployments of the same model
- Response caching, guardrails and an MCP gateway for tool servers

Each concern sits in its own service. The **gateway** handles requests and serves the admin UI. **PostgreSQL** is the system of record — virtual keys, teams, budgets, spend logs and the encrypted model store, which is why models added in the UI persist across deploys. **Redis** carries what must be shared rather than stored: the response cache, rate-limit counters, router cooldowns, and the lock electing one owner for jobs such as budget resets — which is what makes the gateway safe to scale horizontally.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| litellm | [gridalpha/litellm-railway](https://github.com/gridalpha/litellm-railway) | Web service |
| Redis | `redis:8.2` | Database |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |

## Environment variables

| Variable | Service | Default | Description |
| --------- | ------- | ------- | ----------- |
| `PORT` | litellm | 4000 | Gateway listening port |
| `REDIS_URL` | litellm | - | Redis connection string |
| `LITELLM_LOG` | litellm | INFO | Log level, use ERROR at high traffic |
| `UI_USERNAME` | litellm | (secret) | Admin UI username |
| `DATABASE_URL` | litellm | - | Postgres connection string |
| `LITELLM_MODE` | litellm | PRODUCTION | Disables loading a local .env file |
| `LITELLM_SALT_KEY` | litellm | - | Encrypts stored provider keys, keep stable |
| `LITELLM_MASTER_KEY` | litellm | - | Admin credential and UI password |
| `GRACEFUL_SHUTDOWN_TIMEOUT` | litellm | 30 | Seconds to drain in-flight requests |
| `REDISHOST` | Redis | - | Data panel alias, not read by the server |
| `REDISPORT` | Redis | 6379 | Data panel alias, not read by the server |
| `REDISUSER` | Redis | default | Data panel alias, not read by the server |
| `REDIS_URL` | Redis | - | Private connection string |
| `REDISPASSWORD` | Redis | (secret) | Data panel alias, not read by the server |
| `REDIS_PASSWORD` | Redis | (secret) | Auth password, read by the server |
| `POSTGRES_DB` | Postgres | railway | Database created on first boot |
| `DATABASE_URL` | Postgres | - | Private connection string |
| `POSTGRES_USER` | Postgres | (secret) | Superuser created on first boot |
| `POSTGRES_PASSWORD` | Postgres | (secret) | Superuser password |

## Configuration

- **Networking:** Public domain with automatic HTTPS
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`
- **Volume:** `/data`
- **Volume:** `/var/lib/postgresql/data`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/litellm-gateway)
