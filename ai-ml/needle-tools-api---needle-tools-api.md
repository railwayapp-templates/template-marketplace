# Deploy needle-tools-api on Railway

OpenAI-style tool-call, extraction & embeddings API on a 35 MB model

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/needle-tools-api)

## About

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/needle-tools-api)

Needle Tool-Calling API serves Cactus Compute's **Needle 3** — a 35.3 MB "Automation Foundation Model" (Apache-2.0, 115k+ downloads in its first three weeks) — as an **OpenAI-shaped HTTP API** for tool calling, structured extraction, and text embeddings. It is **not a chat LLM**: it returns grammar-guaranteed JSON tool calls and typed records, and it fits in roughly 150 MB of RAM on a free-plan-friendly 1 vCPU / 512 MB deployment.

This template ships with **zero required variables and zero credentials**. The 35 MB model and its linux-x86_64 engine are vendored inside the image, so deploys never download anything at runtime and never call Hugging Face.

Hosting this template runs a single FastAPI service (one uvicorn worker) on `python:3.12-slim`. Needle's engine keeps one active agent per process, so inference is serialized behind a lock — a deliberate demo-tier design for sub-512 MB instances. The container listens on Railway's injected `PORT`, exposes `/health` (used as the deploy healthcheck), and reports resident memory so you can watch it stay far below 512 MB.

Endpoints:

- `POST /v1/chat/completions` — OpenAI tool-calls loop: send `messages`, get `tool_calls` with **stringified JSON arguments** and `finish_reason:"tool_calls"`; execute tools on your client and send `role:"tool"` results back for `finish_reason:"stop"`. `stream:true` is rejected with 400 (Needle returns complete, grammar-constrained dicts — no token streaming).
- `POST /v1/extract` — `{text, schema}` in, typed JSON out; the decode grammar guarantees the output always parses (returns `null` when nothing matches). Opt-in `"strict":true` turns ungrounded values into a 422 instead.
- `POST /v1/embeddings` — OpenAI-shaped 3072-dimension sentence vectors (unit-norm). Useful for relative similarity and routing, not contrastively trained — cosine spread is narrow.
- `GET /v1/models`, `GET /health`.

Honest disclosures you should know before deploying: the deployed **toolset is fixed per deployment** (`TOOLSET_PATH`, demo: `get_weather`, `get_time`, `search_notes` — request-level `tools` are accepted but ignored); the model is **early-stage** and can answer off-topic requests with its nearest tool at a low confidence score — the response carries `confidence`, `reasoning` and `suppressed_calls` extras, and a server-side confidence floor (0.30 default, `CONFIDENCE_FLOOR` variable) suppresses weak calls into `finish_reason:"stop"`; the context window is **8,192 tokens** with a 400 on overflow; versions are pinned (`cactus-needle==3.1.1`, engine 3.1.0) — upgrades are a re-vendor + rebuild; **telemetry is disabled** (`NEEDLE_TELEMETRY=0`, `DO_NOT_TRACK=1`); tool execution stays client-side, so the service has **zero SSRF surface**; responses are in English.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| needle-api | [lNamelessl/needle-tools-api](https://github.com/lNamelessl/needle-tools-api) | Web service |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS

**Category:** AI/ML · **Languages:** Python, Dockerfile

[View on Railway →](https://railway.com/deploy/needle-tools-api)
