# Deploy Fabric on Railway

Fabric framework API with bundled AI prompt patterns and persistent config

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/fabric)

## About

[Fabric](https://github.com/danielmiessler/fabric) is an open-source framework for augmenting work with AI through reusable prompts called patterns. This template deploys Fabric as a hosted REST API, so apps, automations, and agents can call Fabric patterns, chat completions, model discovery, sessions, contexts, and helper tools over HTTP.

This Railway template builds Fabric from source using a custom Dockerfile, starts the Fabric REST API, and exposes it behind a Railway public domain. It includes bundled Fabric patterns and strategies, Swagger API docs, `/health` health checks, and API-key protection through the `X-API-Key` header. `FABRIC_API_KEY` is preconfigured by the template as `${{ secret(32) }}`, so Railway generates a strong API secret automatically. For persistent usage, attach or keep the Railway volume at `/home/appuser/.config/fabric`; this keeps config, sessions, contexts, patterns, and strategies across redeploys. Before first use, set `DEFAULT_VENDOR`, `DEFAULT_MODEL`, and one provider API key such as `OPENROUTER_API_KEY`, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `GEMINI_API_KEY`.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| Fabric | [RockinPaul/fabric_railway_template](https://github.com/RockinPaul/fabric_railway_template) | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `DEFAULT_MODEL` | - | Default AI model Fabric uses when request does not specify one. Example: gpt-4.1-mini. |
| `DEFAULT_VENDOR` | - | Default AI provider for Fabric. Must match configured provider name. Example: OpenAI. |
| `FABRIC_API_KEY` | (secret) | Secret key required in X-API-Key header for protected Fabric API routes. |

## Configuration

- **Healthcheck:** `/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/home/appuser/.config/fabric`

**Category:** AI/ML · **Languages:** Go, Svelte, Python, TypeScript, Shell, PowerShell, JavaScript, Nix, CSS, Batchfile, Dockerfile, HTML

[View on Railway →](https://railway.com/deploy/fabric)
