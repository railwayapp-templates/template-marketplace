# Deploy Headroom on Railway

Headroom compression proxy. Cuts LLM token usage

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/headroom)

## About

Headroom is a context-compression proxy for AI agents and apps. It sits between
your agent and an LLM provider and shrinks request context before forwarding it
upstream — cutting token usage (up to 60–95% on JSON-heavy payloads, ~15–20% on
coding-agent traffic) while preserving answer quality. Point any OpenAI- or
Anthropic-compatible client at it with a one-line base-URL change.

This template runs a single public service from the published image
`ghcr.io/chopratejas/headroom`. Your client sends requests to the service's URL
instead of the provider directly; Headroom compresses each request and forwards
it to Anthropic (`/v1/messages`) or OpenAI (`/v1/chat/completions`,
`/v1/responses`). It is a **bring-your-own-key relay** — it stores no provider
keys and forwards the `x-api-key` / `Authorization` your client sends. A volume
at `/home/nonroot/.headroom` persists config, the compression-model cache, and
savings history. **First boot is slow**: the image loads a ModernBERT
compression model before `/readyz` reports healthy, so initial deploys take a
few minutes — the healthcheck window is set to 600 s to allow for this.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Headroom | `ghcr.io/chopratejas/headroom:0.6.7-code-nonroot` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `HOME` | /home/nonroot | Home directory of the non-root container user; base path of the writable Headroom workspace. |
| `PORT` | 8787 | Railway's canonical port variable. Must equal HEADROOM_PORT (8787) — Railway's deploy healthcheck probes this port, so a mismatch leaves the deploy stuck in DEPLOYING. |
| `HEADROOM_HOST` | 0.0.0.0 | Interface the proxy binds to. Keep 0.0.0.0 so Railway's public edge and its healthcheck probe can reach the container. |
| `HEADROOM_PORT` | 8787 | Port the Headroom proxy process listens on. Must match PORT and the public domain's target port. |
| `HEADROOM_CONFIG_DIR` | /home/nonroot/.headroom/config | Directory Headroom reads and writes its configuration from. Lives inside the persisted workspace. |
| `HEADROOM_PROXY_TOKEN` | (secret) | Bearer token required from NON-loopback callers on the /v1/* data plane (e.g. other services reaching the proxy over Railway's private network at proxy.railway.internal). NOTE: Railway's public HTTP edge is treated as a loopback caller, so this token does NOT gate public-URL traffic — public callers must instead supply their own upstream provider credentials, which the proxy forwards (it stores none). Auto-generated. |
| `HEADROOM_UPDATE_CHECK` | off | Set to 'off' to disable the CLI update check in a long-lived server deployment. |
| `HEADROOM_WORKSPACE_DIR` | /home/nonroot/.headroom | Writable workspace directory (config, model/HTTP cache, savings history, and the local memory DB if enabled). Backed by the attached volume so it persists across deploys. |
| `HEADROOM_SKIP_UPSTREAM_CHECK` | 1 | When 1, /readyz does not gate readiness on reaching an upstream LLM API, so the deploy is healthy regardless of which provider you target. Set to 0 to have readiness verify the default upstream (api.anthropic.com). |

## Configuration

- **Healthcheck:** `/readyz`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/nonroot/.headroom`

**Category:** AI/ML

[View on Railway →](https://railway.com/deploy/headroom)
