# Deploy AI Gateway + Observability (LiteLLM × Langfuse) on Railway

[Aug'26] LiteLLM gateway + Langfuse tracing, pre-wired. 100+ LLMs

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-gateway-observability-litellm-langfus)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/ai-gateway-observability-litellm-langfus)

**One deploy = model gateway + spend tracking + tracing.** Route every LLM call in your company through one OpenAI-compatible endpoint — [LiteLLM](https://github.com/BerriAI/litellm) (30k★) proxies 100+ providers (Anthropic, OpenAI, Gemini, Mistral, Bedrock, …) with virtual keys, budgets, and rate limits — and see every request, latency, cost, and full prompt/response in [Langfuse](https://github.com/langfuse/langfuse) (18k★), the leading open-source LLM observability platform. The two are **pre-wired**: LiteLLM's success and failure callbacks stream straight into your private Langfuse, from the first request.

Swap `api.openai.com` for your gateway URL and you instantly get: per-team API keys with budgets, provider failover, one bill view across all models, and traces you can actually debug from — without sending a byte of your prompts to a third-party SaaS.

**Who it's for:** teams running LLM features in production, agencies managing model spend across clients, and anyone tired of guessing what their AI actually costs.

Seven services, wired over Railway's private network — everything pinned by sha256 digest:

| Service | Image | Role |
|---|---|---|
| **litellm** | `ghcr.io/berriai/litellm:main-stable` (digest-pinned) | OpenAI-compatible gateway: routing, virtual keys, budgets, admin UI |
| **langfuse-web** | `langfuse/langfuse:3.225.4` | Observability UI: traces, costs, prompt management, evals |
| **langfuse-worker** | `langfuse/langfuse-worker:3.225.4` | Async event ingestion pipeline |
| **PostgreSQL** | Railway managed | LiteLLM keys/spend + Langfuse metadata (separate schemas) |
| **Redis** | Railway managed | Langfuse queue + cache |
| **clickhouse** | `clickhouse/clickhouse-server:26.3` (volume) | Trace analytics storage — what makes Langfuse v3 fast at scale |
| **minio** | `minio/minio` (volume) | S3-compatible event blob storage, private-network only |

**Pre-configured out of the box:** Langfuse organization/project/API keys are provisioned headlessly on first boot, and LiteLLM's `success_callback`/`failure_callback` reference them over the private network — no clicking through two setup wizards and copy-pasting keys between dashboards. A built-in `mock-test` model lets you verify the whole gateway→trace pipeline before adding any provider key.

**Setup (~5 minutes):**

1. Click **Deploy Now**: set your **admin email + password** (used for Langfuse login) and optionally paste provider keys (`ANTHROPIC_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY` — you can add more later).
2. When services are green, verify the pipeline with the built-in mock model (no provider key needed):
   ```bash
   curl https:///v1/chat/completions \
     -H "Authorization: Bearer " \
     -H "Content-Type: application/json" \
     -d '{"model": "mock-test", "messages": [{"role": "user", "content": "ping"}]}'
   ```
3. Open the Langfuse URL, log in with your admin credentials — the trace from step 2 is already there, with latency and token counts.
4. Point your apps at the gateway: OpenAI-compatible, so set `base_url` to your LiteLLM domain and use models like `anthropic/claude-opus-4-8` or `openai/gpt-4o-mini`. Create per-team virtual keys with budgets in the LiteLLM admin UI (`/ui`, log in with the master key).

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| litellm | [Kjudeh/ai-gateway-stack](https://github.com/Kjudeh/ai-gateway-stack) | Web service |
| langfuse-web | `langfuse/langfuse:3.225.4@sha256:91794d5f42ccd09ed624ff101ff49a8486b3fbedeef7e48c763d19525bc33c03` | Web service |
| Postgres | `ghcr.io/railwayapp-templates/postgres-ssl:18` | Database |
| minio | `minio/minio:RELEASE.2025-09-07T16-13-09Z-cpuv1@sha256:13582eff79c6605a2d315bdd0e70164142ea7e98fc8411e9e10d089502a6d883` | Database |
| langfuse-worker | `langfuse/langfuse-worker:3.225.4@sha256:9917beee1cb2b66e698f5daf23ae0bc6af375233c0395a1a5c80eaa7535fe905` | Worker |
| clickhouse | `clickhouse/clickhouse-server:26.3@sha256:9a901f8d961005ea428be385211f96822f74fb4e299443a896e23fb6d4b5549e` | Database |
| Redis | `redis:8.2` | Database |

## Environment variables

| Variable | Service | Default |
| --------- | ------- | ------- |
| `LANGFUSE_SECRET_KEY` | litellm | (secret) |
| `CLICKHOUSE_USER` | langfuse-web | (secret) |
| `NEXTAUTH_SECRET` | langfuse-web | (secret) |
| `CLICKHOUSE_PASSWORD` | langfuse-web | (secret) |
| `LANGFUSE_INIT_USER_PASSWORD` | langfuse-web | (secret) |
| `LANGFUSE_INIT_PROJECT_SECRET_KEY` | langfuse-web | (secret) |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-web | (secret) |
| `POSTGRES_USER` | Postgres | (secret) |
| `POSTGRES_PASSWORD` | Postgres | (secret) |
| `MINIO_ROOT_USER` | minio | (secret) |
| `MINIO_ROOT_PASSWORD` | minio | (secret) |
| `CLICKHOUSE_USER` | langfuse-worker | (secret) |
| `CLICKHOUSE_PASSWORD` | langfuse-worker | (secret) |
| `LANGFUSE_S3_EVENT_UPLOAD_SECRET_ACCESS_KEY` | langfuse-worker | (secret) |
| `CLICKHOUSE_USER` | clickhouse | (secret) |
| `CLICKHOUSE_PASSWORD` | clickhouse | (secret) |
| `MINIO_ROOT_PASSWORD` | clickhouse | (secret) |
| `REDISPASSWORD` | Redis | (secret) |
| `REDIS_PASSWORD` | Redis | (secret) |

## Configuration

- **Healthcheck:** `/health/liveliness`
- **Networking:** Public domain with automatic HTTPS
- **Healthcheck:** `/api/public/health`
- **Volume:** `/var/lib/postgresql/data`
- **Start command:** `sh -c "mkdir -p /data/langfuse && minio server /data --address :9000"`
- **Volume:** `/data`
- **Healthcheck:** `/api/health`
- **Volume:** `/var/lib/clickhouse`
- **Start command:** `/bin/sh -c "rm -rf $RAILWAY_VOLUME_MOUNT_PATH/lost+found/ && exec docker-entrypoint.sh redis-server --requirepass $REDIS_PASSWORD --save 60 1 --dir $RAILWAY_VOLUME_MOUNT_PATH"`

**Category:** AI/ML · **Languages:** Dockerfile

[View on Railway →](https://railway.com/deploy/ai-gateway-observability-litellm-langfus)
