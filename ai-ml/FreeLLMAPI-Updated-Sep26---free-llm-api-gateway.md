# Deploy FreeLLMAPI [Updated Sep'26] on Railway

Self-host FreeLLMAPI — OpenAI-compatible router, failover, encrypted keys

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/free-llm-api-gateway)

## About

FreeLLMAPI is an open-source LLM gateway that collapses the free tiers of dozens of providers — Google, Groq, Cerebras, Mistral, OpenRouter, GitHub Models, Cloudflare, Cohere — behind one OpenAI-compatible `/v1` endpoint. A router picks an available model per request, fails over when a provider rate-limits, and tracks per-key usage so you stay inside every cap. This template runs it as a private gateway with keys on an encrypted volume and auth enforced before the domain goes live.

This is a localhost tool given a public URL. Almost every risk below follows from that one change.

**A public gateway is an open proxy to your provider keys.** Upstream assumes a local client and a local server. On Railway it gets an internet-reachable domain, and an unauthenticated instance lets anyone who finds the URL spend your quota — or reach the dashboard where keys are managed. Set the gateway key and lock the dashboard *before* the domain resolves. For clients that cannot send headers, use revocable URL tokens rather than disabling auth.

**Free tiers come with terms, and stacking them is your liability.** Upstream scopes this project to personal experimentation. Free tiers commonly restrict commercial use, resale and quota aggregation, and none of that changes because a gateway sits in front. Run it against keys you registered, for work you do yourself.

**The encryption secret matters as much as the volume.** Keys are stored encrypted, so a stable secret is required to read them back. Regenerate it on a later deploy and every stored key becomes undecryptable — the volume intact and useless.

**The model catalog goes stale, and stale routing fails.** Free-tier offerings shift weekly: models launch, get retired, quotas change without notice. The router stays current by pulling a signed catalog feed, which upstream sells as a paid subscription. Without it you route on whatever it last knew, and retired models surface as provider errors rather than an obvious stale-catalog message.

**Failover hides errors, not latency.** Free tiers are the lowest-priority queue at every provider. The router routes around a rate-limited provider but not a slow one, and tail latency on free inference is bad. Well suited to coding agents, batch jobs and experimentation; wrong behind a user-facing chat box.

**Pin the fork and the tag.** Several forks exist with different provider sets and very different capacity claims. Deploying `latest` means the gateway changes under you between redeploys. Pin a digest you tested.

Typical cost: **~$5–10/month** for one small Node service and a volume at $10/GB/month RAM, $20/vCPU/month CPU and $0.15/GB/month volumes. Inference itself is the free tiers you already signed up for.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Freellmapi | `ghcr.io/tashfeenahmed/freellmapi` | Database |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOST` | :: | To make it work locally |
| `ENCRYPTION_KEY` | 1564fae9e19ca39707bff8a3f69f67d50751bf3b1e1c625387b90a9ee3d2ee97 | Recommended to regenerate it just in case |
| `FREEAPI_DB_PATH` | /tmp/freellmapi.db | Path to the sqlite db. Dont change, as well as volume mounted path. |

## Configuration

- **Volume:** `/tmp`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/free-llm-api-gateway)
