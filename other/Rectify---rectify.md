# Deploy Rectify on Railway

Deploy a website you can edit by drawing on it.

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/rectify)

## About

Rectify is a self-hosted, LLM-powered website editor for static sites. Log in, draw a box over any element on your live page, and describe the change in plain English — Rectify's agent finds the real source file, edits the HTML, CSS, or JS directly, and the page updates. No SaaS, no lock-in.

Rectify runs as a single Docker container. It serves your website as a static site and layers an owner-only editing overlay on top — visitors only ever see the published page, never the editing UI. On first boot it seeds a bundled starter site into a persistent volume mounted at `/site`; bring your own content by populating that volume. All configuration is done through environment variables: set your owner password, a session signing key, and an LLM provider key. Rectify routes every edit through LiteLLM, so it works with any reachable model — Anthropic, OpenAI, or a self-hosted Ollama instance — letting you control both where your site runs and which model powers your edits.

## What gets deployed

| Service | Source | Type |
|---------|--------|------|
| rectify | `ghcr.io/wenig/rectify:latest` | Web service |

## Environment variables

| Variable | Default | Description |
| --------- | ------- | ----------- |
| `LLM_API_KEY` | (secret) | API key to your LLM provider. |
| `LLM_API_BASE` | - | URL to custom LLM provider. Leave empty if no custom provider used. |
| `LLM_MODEL_ID` | - | Model ID for the LLM that adapt your website, e.g. anthropic/claude-sonnet-4-6 |
| `OWNER_PASSWORD` | (secret) | Password to login to edit mode. |

## Configuration

- **Healthcheck:** `/_platform/health`
- **Networking:** Public domain with automatic HTTPS
- **Volume:** `/site`

**Category:** Other

[View on Railway →](https://railway.com/deploy/rectify)
